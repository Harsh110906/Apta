import type { CodeWriteQuestion, DebugFixQuestion, EvalResult, TestCaseResult } from "@/types";

/**
 * Mock Code Evaluation Engine
 * 
 * Simulates code execution by comparing user code against the solution
 * using heuristic string matching. Designed to be replaced post-competition
 * with Judge0 API or Pyodide WASM — the EvalResult interface stays the same.
 */

// ── Key token extraction ──
function extractKeyTokens(code: string): string[] {
  // Remove comments, whitespace-normalize, extract meaningful tokens
  const cleaned = code
    .replace(/\/\/.*$/gm, "")      // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/\s+/g, " ")          // Normalize whitespace
    .trim();
  
  // Extract function names, keywords, operators, patterns
  const tokens: string[] = cleaned.match(/\b(?:function|const|let|var|return|if|else|for|while|map|filter|reduce|forEach|setTimeout|clearTimeout|setInterval|Promise|async|await|new|this|null|undefined|true|false|class|extends|constructor|super|import|export|try|catch|throw|typeof|instanceof|delete|void|yield|switch|case|break|continue|default|do|in|of|with|debugger|arguments|eval|isNaN|parseInt|parseFloat|push|pop|shift|unshift|splice|slice|concat|join|split|indexOf|includes|find|findIndex|some|every|sort|reverse|Object|Array|String|Number|Boolean|Date|Math|JSON|RegExp|Error|Map|Set|WeakMap|WeakSet|Symbol|Proxy|Reflect|console|window|document|module|require|exports|useMemo|useCallback|useEffect|useState|useRef|useReducer|useContext)\b/g) || [];
  
  // Also extract arrow functions, template literals, spread operators
  if (cleaned.includes("=>")) tokens.push("=>");
  if (cleaned.includes("...")) tokens.push("...");
  if (cleaned.includes("?.")) tokens.push("?.");
  if (cleaned.includes("??")) tokens.push("??");
  
  return tokens;
}

// ── Similarity calculation ──
function calculateSimilarity(userCode: string, solutionCode: string): number {
  const userTokens = extractKeyTokens(userCode);
  const solutionTokens = extractKeyTokens(solutionCode);
  
  if (solutionTokens.length === 0) return 0;
  
  // Check exact match first
  const userNorm = userCode.replace(/\s+/g, " ").trim();
  const solNorm = solutionCode.replace(/\s+/g, " ").trim();
  if (userNorm === solNorm) return 100;
  
  // Token overlap
  const solutionSet = new Set(solutionTokens);
  const matchedTokens = userTokens.filter(t => solutionSet.has(t));
  const tokenScore = (matchedTokens.length / solutionTokens.length) * 100;
  
  // Line-level similarity
  const userLines = userCode.split("\n").map(l => l.trim()).filter(Boolean);
  const solLines = solutionCode.split("\n").map(l => l.trim()).filter(Boolean);
  const matchedLines = userLines.filter(l => solLines.some(sl => sl === l || sl.includes(l) || l.includes(sl)));
  const lineScore = solLines.length > 0 ? (matchedLines.length / solLines.length) * 100 : 0;
  
  // Weighted combination
  return Math.min(100, Math.round(tokenScore * 0.5 + lineScore * 0.5));
}

// ── Basic syntax checking ──
function checkSyntaxIssues(code: string): string | null {
  // Check bracket balance
  const opens = (code.match(/[{([\[]/g) || []).length;
  const closes = (code.match(/[})\]]/g) || []).length;
  if (opens !== closes) {
    return `Syntax error: Unmatched brackets (${opens} opening, ${closes} closing)`;
  }
  
  // Check for common issues
  if (code.includes("// Your code here") || code.includes("// TODO")) {
    return "Incomplete: Starter code placeholder still present";
  }
  
  // Check for empty function bodies
  const emptyFuncMatch = code.match(/\{[\s]*\}/);
  if (emptyFuncMatch && code.split("\n").length < 4) {
    return "Incomplete: Function body is empty";
  }
  
  return null;
}

// ── Mock AI feedback generator ──
function generateAIFeedback(similarity: number, question: CodeWriteQuestion | DebugFixQuestion): string {
  if (similarity >= 90) {
    return "Excellent solution! Your code is clean and handles all edge cases correctly.";
  }
  if (similarity >= 70) {
    return "Good approach! Your core logic is correct but you may be missing some edge case handling. Consider reviewing the expected output for edge cases.";
  }
  if (similarity >= 50) {
    return "You're on the right track! The fundamental approach is correct, but the implementation needs refinement. Focus on the key operation — check if you're handling all function parameters correctly.";
  }
  if (similarity >= 30) {
    return "Your solution shows some understanding, but key parts of the logic are missing. Re-read the problem statement carefully and consider what data structures or patterns would help.";
  }
  return "It looks like the solution needs significant work. Review the problem requirements and try breaking it down into smaller steps.";
}

// ── Main evaluation function ──
export function evaluateCode(
  userCode: string,
  question: CodeWriteQuestion | DebugFixQuestion
): EvalResult {
  const syntaxError = checkSyntaxIssues(userCode);
  
  // If there's a syntax error, fail early
  if (syntaxError) {
    return {
      status: "error",
      testResults: question.testCases
        .filter(tc => tc.isVisible)
        .map(tc => ({
          testCaseId: tc.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: "",
          passed: false,
          error: syntaxError,
        })),
      hiddenPassed: 0,
      hiddenTotal: question.hiddenTestCount,
      score: 0,
      aiFeedback: syntaxError,
    };
  }
  
  const similarity = calculateSimilarity(userCode, question.solutionCode);
  
  const visibleTests = question.testCases.filter(tc => tc.isVisible);
  const testResults: TestCaseResult[] = visibleTests.map((tc, idx) => {
    // Graduated pass/fail based on similarity
    let passed = false;
    let actualOutput = tc.expectedOutput;
    let error: string | undefined;
    
    if (similarity >= 90) {
      passed = true;
    } else if (similarity >= 60) {
      // First tests pass, later ones may fail
      passed = idx < Math.ceil(visibleTests.length * (similarity / 100));
      if (!passed) {
        actualOutput = "undefined";
        error = "Edge case failed — output doesn't match expected";
      }
    } else if (similarity >= 35) {
      // Only first test passes
      passed = idx === 0;
      if (!passed) {
        actualOutput = "Error: unexpected behavior";
        error = "Logic error — result doesn't match expected output";
      }
    } else {
      passed = false;
      actualOutput = "Error";
      error = "Test failed — function returned incorrect result";
    }
    
    return {
      testCaseId: tc.id,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput,
      passed,
      error,
    };
  });
  
  // Hidden tests scale with similarity
  const hiddenTotal = question.hiddenTestCount;
  let hiddenPassed = 0;
  if (similarity >= 95) hiddenPassed = hiddenTotal;
  else if (similarity >= 80) hiddenPassed = Math.floor(hiddenTotal * 0.8);
  else if (similarity >= 60) hiddenPassed = Math.floor(hiddenTotal * 0.5);
  else hiddenPassed = 0;
  
  const allVisiblePassed = testResults.every(t => t.passed);
  const anyPassed = testResults.some(t => t.passed);
  
  let status: EvalResult["status"];
  if (allVisiblePassed && hiddenPassed === hiddenTotal) status = "pass";
  else if (anyPassed) status = "partial";
  else status = "fail";
  
  const totalTests = visibleTests.length + hiddenTotal;
  const totalPassed = testResults.filter(t => t.passed).length + hiddenPassed;
  const score = Math.round((totalPassed / totalTests) * 100);
  
  return {
    status,
    testResults,
    hiddenPassed,
    hiddenTotal,
    score,
    aiFeedback: generateAIFeedback(similarity, question),
  };
}
