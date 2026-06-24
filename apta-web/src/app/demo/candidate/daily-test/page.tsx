"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { ALL_QUESTIONS } from "@/data/questions";
import { selectDailyQuestions, getDifficultyForRank, getTimerForDifficulty, getPointsForDifficulty } from "@/lib/questionSelector";
import { evaluateCode } from "@/lib/mockEvaluator";
import type { QuizQuestion, TheoryQuestion, CodeWriteQuestion, DebugFixQuestion, EvalResult, DifficultyTier } from "@/types";
import {
  CheckCircle2, XCircle, Clock, Zap, ArrowRight, Trophy,
  BookOpen, Code2, Bug, Play, Send, Lock, AlertCircle,
  Lightbulb, ChevronRight
} from "lucide-react";

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// ── Difficulty labels ──
const DIFFICULTY_CONFIG: Record<DifficultyTier, { label: string; emoji: string; color: string; bgColor: string }> = {
  easy:   { label: "Easy Mode",   emoji: "🟢", color: "text-emerald",    bgColor: "bg-emerald/10 border-emerald/30" },
  medium: { label: "Medium Mode", emoji: "🟡", color: "text-gold",       bgColor: "bg-gold/10 border-gold/30" },
  hard:   { label: "Hard Mode",   emoji: "🔴", color: "text-rose",       bgColor: "bg-rose/10 border-rose/30" },
};

// ── Question type badges ──
const TYPE_CONFIG: Record<string, { label: string; icon: typeof BookOpen; color: string; bgColor: string }> = {
  "theory":     { label: "Theory",    icon: BookOpen, color: "text-sky",     bgColor: "bg-sky/10" },
  "code-write": { label: "Code",      icon: Code2,    color: "text-orange-500", bgColor: "bg-orange-500/10" },
  "debug-fix":  { label: "Debug",     icon: Bug,      color: "text-rose",    bgColor: "bg-rose/10" },
};

type QuestionStatus = "answering" | "submitted";

export default function DailyTestPage() {
  const router = useRouter();
  
  // Mock user rank — Silver (easy difficulty for demo)
  const userRank = "Silver" as const;
  const difficulty = getDifficultyForRank(userRank);
  const timerDuration = getTimerForDifficulty(difficulty);
  const pointsPerQuestion = getPointsForDifficulty(difficulty);
  const diffConfig = DIFFICULTY_CONFIG[difficulty];
  
  // Select questions once (client-side only to avoid hydration mismatch due to random sorting)
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setQuestions(selectDailyQuestions(userRank, ALL_QUESTIONS));
    setIsMounted(true);
  }, []);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>("answering");
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [isFinished, setIsFinished] = useState(false);
  
  // Per-question scoring
  const [scores, setScores] = useState<{ type: string; passed: boolean; points: number }[]>([]);
  
  // Theory state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [theoryCorrect, setTheoryCorrect] = useState<boolean | null>(null);
  
  // Code editor state
  const [editorCode, setEditorCode] = useState("");
  const [evalResult, setEvalResult] = useState<EvalResult | null>(null);
  const [hasRunCheck, setHasRunCheck] = useState(false);
  
  const currentQuestion = questions[currentIndex] as QuizQuestion | undefined;
  
  // Timer countdown
  useEffect(() => {
    if (questionStatus !== "answering" || isFinished || !currentQuestion) return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, questionStatus, isFinished]);
  
  // Reset state on new question
  useEffect(() => {
    if (!currentQuestion) return;
    setTimeLeft(timerDuration);
    setQuestionStatus("answering");
    setSelectedOption(null);
    setTheoryCorrect(null);
    setEvalResult(null);
    setHasRunCheck(false);
    
    if (currentQuestion.type === "code-write") {
      setEditorCode(currentQuestion.starterCode);
    } else if (currentQuestion.type === "debug-fix") {
      setEditorCode(currentQuestion.buggyCode);
    } else {
      setEditorCode("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  
  // ── Time up handler ──
  const handleTimeUp = useCallback(() => {
    if (!currentQuestion) return;
    setQuestionStatus("submitted");
    if (currentQuestion.type === "theory") {
      setTheoryCorrect(false);
    } else {
      setEvalResult({
        status: "fail",
        testResults: currentQuestion.testCases.filter(tc => tc.isVisible).map(tc => ({
          testCaseId: tc.id, input: tc.input, expectedOutput: tc.expectedOutput,
          actualOutput: "", passed: false, error: "Time expired"
        })),
        hiddenPassed: 0, hiddenTotal: currentQuestion.hiddenTestCount, score: 0,
        aiFeedback: "Time ran out. Try to manage your time better — start with the core logic first."
      });
    }
    setScores(prev => [...prev, { type: currentQuestion.type, passed: false, points: 0 }]);
  }, [currentQuestion]);
  
  // ── Theory: select option ──
  const handleTheorySelect = useCallback((idx: number) => {
    if (questionStatus !== "answering" || !currentQuestion || currentQuestion.type !== "theory") return;
    setSelectedOption(idx);
    const isCorrect = idx === currentQuestion.correctAnswer;
    setTheoryCorrect(isCorrect);
    setQuestionStatus("submitted");
    setScores(prev => [...prev, {
      type: "theory",
      passed: isCorrect,
      points: isCorrect ? pointsPerQuestion : 0
    }]);
  }, [questionStatus, currentQuestion, pointsPerQuestion]);
  
  // ── Code: Run Check ──
  const handleRunCheck = useCallback(() => {
    if (!currentQuestion || (currentQuestion.type !== "code-write" && currentQuestion.type !== "debug-fix")) return;
    setHasRunCheck(true);
    
    // Simulate loading
    setEvalResult({ status: "running", testResults: [], hiddenPassed: 0, hiddenTotal: currentQuestion.hiddenTestCount, score: 0 });
    
    setTimeout(() => {
      const result = evaluateCode(editorCode, currentQuestion);
      setEvalResult(result);
    }, 800);
  }, [currentQuestion, editorCode]);
  
  // ── Code: Submit Answer ──
  const handleSubmitCode = useCallback(() => {
    if (!currentQuestion || (currentQuestion.type !== "code-write" && currentQuestion.type !== "debug-fix")) return;
    
    const result = evaluateCode(editorCode, currentQuestion);
    setEvalResult(result);
    setQuestionStatus("submitted");
    
    const passed = result.status === "pass";
    setScores(prev => [...prev, {
      type: currentQuestion.type,
      passed,
      points: passed ? pointsPerQuestion : Math.round(pointsPerQuestion * result.score / 100 * 0.5)
    }]);
  }, [currentQuestion, editorCode, pointsPerQuestion]);
  
  // ── Next question ──
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  // ═══════════════════════════
  //  SCORE SCREEN
  // ═══════════════════════════
  if (isFinished) {
    const theoryScores = scores.filter(s => s.type === "theory");
    const codeScores = scores.filter(s => s.type === "code-write");
    const debugScores = scores.filter(s => s.type === "debug-fix");
    
    const theoryPassed = theoryScores.filter(s => s.passed).length;
    const codePassed = codeScores.filter(s => s.passed).length;
    const debugPassed = debugScores.filter(s => s.passed).length;
    const totalPassed = theoryPassed + codePassed + debugPassed;
    const totalPoints = scores.reduce((sum, s) => sum + s.points, 0);
    const percentage = Math.round((totalPassed / questions.length) * 100);
    
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-grid">
        <MotionWrapper animation="scale" className="w-full max-w-lg">
          <div className="bg-bg-secondary rounded-3xl border border-border p-8 shadow-2xl text-center">
            {/* Trophy */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-rose mx-auto mb-6 flex items-center justify-center shadow-glow">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Test Complete!</h1>
            <p className="text-text-secondary mb-6">Here&apos;s your performance breakdown</p>
            
            {/* Difficulty badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6 ${diffConfig.bgColor}`}>
              <span>{diffConfig.emoji}</span>
              <span className={diffConfig.color}>{diffConfig.label}</span>
            </div>
            
            {/* Overall stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
                <div className="text-2xl font-bold text-emerald">{totalPassed}/{questions.length}</div>
                <div className="text-xs text-text-muted">Correct</div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
                <div className="text-2xl font-bold text-orange-500">{percentage}%</div>
                <div className="text-xs text-text-muted">Accuracy</div>
              </div>
              <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
                <div className="text-2xl font-bold text-sky">+{totalPoints}</div>
                <div className="text-xs text-text-muted">Points</div>
              </div>
            </div>
            
            {/* Per-type breakdown */}
            <div className="bg-bg-tertiary rounded-xl p-4 border border-border mb-6">
              <h3 className="text-sm font-semibold mb-3 text-text-secondary">Score Breakdown</h3>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky" />
                  <span>Theory</span>
                </div>
                <span className="font-bold">{theoryPassed}/{theoryScores.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-500" />
                  <span>Code</span>
                </div>
                <span className="font-bold">{codePassed}/{codeScores.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center gap-2">
                  <Bug className="w-4 h-4 text-rose" />
                  <span>Debug</span>
                </div>
                <span className="font-bold">{debugPassed}/{debugScores.length}</span>
              </div>
            </div>
            
            {/* AI Summary */}
            <div className="bg-gradient-to-r from-orange-500/10 to-rose/10 border border-orange-500/20 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold mb-2 text-orange-500">
                <Lightbulb className="w-4 h-4" />
                AI Performance Summary
              </div>
              <p className="text-sm text-text-secondary">
                {percentage >= 80
                  ? "Outstanding performance! You're consistently solving both coding and debugging challenges. Keep up this momentum to climb the ranks."
                  : percentage >= 50
                  ? "Solid foundation — your theory is strong. Focus on practicing more code-write and debug challenges to break through to the next tier."
                  : "Keep pushing! Consistent daily practice is key. Focus on understanding the patterns in debugging questions — they'll sharpen your coding instincts."
                }
              </p>
            </div>
            
            {/* Streak */}
            <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald font-semibold">
                <Zap className="w-5 h-5" />
                Streak maintained! 46 days 🔥
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => router.push("/demo/candidate/leaderboard")}>
                Leaderboard
              </Button>
              <Button className="flex-1" onClick={() => router.push("/demo/candidate/dashboard")}>
                Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </MotionWrapper>
      </div>
    );
  }
  
  if (!currentQuestion) return null;
  
  const progressPercent = (currentIndex / questions.length) * 100;
  const timerPercent = (timeLeft / timerDuration) * 100;
  const typeConfig = TYPE_CONFIG[currentQuestion.type];
  const TypeIcon = typeConfig.icon;
  
  return (
    <div className="flex-1 flex flex-col items-center p-4 md:p-6 bg-grid overflow-y-auto">
      {/* ── Top Bar ── */}
      <div className="w-full max-w-3xl mb-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="font-bold">Daily Test</span>
            <span className="text-text-muted">· Frontend Engineering</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Difficulty badge */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${diffConfig.bgColor}`}>
              <span>{diffConfig.emoji}</span>
              <span className={diffConfig.color}>{diffConfig.label}</span>
            </span>
            {/* Streak */}
            <div className="flex items-center gap-1 text-sm font-bold">
              <span className="text-orange-500">🔥</span> 45
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-neutral-200 dark:bg-midnight-600 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${typeConfig.bgColor}`}>
              <TypeIcon className={`w-3 h-3 ${typeConfig.color}`} />
              <span className={`font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
            </div>
          </div>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
      </div>
      
      {/* ── Question Card ── */}
      <MotionWrapper animation="scale" className="w-full max-w-3xl" key={currentIndex}>
        <div className="bg-bg-secondary rounded-2xl border border-border shadow-2xl overflow-hidden">
          {/* Timer */}
          <div className="px-6 pt-5 pb-0">
            <div className="flex items-center gap-2 mb-4">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose animate-pulse' : 'text-text-muted'}`} />
              <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-midnight-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 10 ? 'bg-rose' : timeLeft <= 20 ? 'bg-gold' : 'bg-emerald'}`}
                  style={{ width: `${timerPercent}%` }}
                />
              </div>
              <span className={`text-sm font-mono font-bold tabular-nums ${timeLeft <= 10 ? 'text-rose' : 'text-text-muted'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          
          {/* Question content based on type */}
          {currentQuestion.type === "theory" && (
            <TheoryRenderer
              question={currentQuestion}
              selectedOption={selectedOption}
              theoryCorrect={theoryCorrect}
              questionStatus={questionStatus}
              onSelect={handleTheorySelect}
              onNext={handleNext}
              isLast={currentIndex >= questions.length - 1}
              pointsPerQuestion={pointsPerQuestion}
            />
          )}
          
          {currentQuestion.type === "code-write" && (
            <CodeWriteRenderer
              question={currentQuestion}
              editorCode={editorCode}
              onCodeChange={setEditorCode}
              evalResult={evalResult}
              hasRunCheck={hasRunCheck}
              questionStatus={questionStatus}
              onRunCheck={handleRunCheck}
              onSubmit={handleSubmitCode}
              onNext={handleNext}
              isLast={currentIndex >= questions.length - 1}
              pointsPerQuestion={pointsPerQuestion}
            />
          )}
          
          {currentQuestion.type === "debug-fix" && (
            <DebugFixRenderer
              question={currentQuestion}
              editorCode={editorCode}
              onCodeChange={setEditorCode}
              evalResult={evalResult}
              hasRunCheck={hasRunCheck}
              questionStatus={questionStatus}
              onRunCheck={handleRunCheck}
              onSubmit={handleSubmitCode}
              onNext={handleNext}
              isLast={currentIndex >= questions.length - 1}
              pointsPerQuestion={pointsPerQuestion}
            />
          )}
        </div>
      </MotionWrapper>
    </div>
  );
}


// ═══════════════════════════════════════════
//  THEORY RENDERER
// ═══════════════════════════════════════════

function TheoryRenderer({
  question, selectedOption, theoryCorrect, questionStatus, onSelect, onNext, isLast, pointsPerQuestion
}: {
  question: TheoryQuestion;
  selectedOption: number | null;
  theoryCorrect: boolean | null;
  questionStatus: QuestionStatus;
  onSelect: (idx: number) => void;
  onNext: () => void;
  isLast: boolean;
  pointsPerQuestion: number;
}) {
  return (
    <div className="px-6 pb-6">
      <h2 className="text-lg font-bold mb-5 leading-snug whitespace-pre-line">{question.question}</h2>
      
      <div className="space-y-2.5 mb-5">
        {question.options.map((option, idx) => {
          let classes = "w-full p-3.5 rounded-xl border-2 text-left transition-all duration-200 font-medium text-sm ";
          
          if (questionStatus === "answering") {
            classes += selectedOption === idx
              ? "border-orange-500 bg-orange-500/10"
              : "border-border hover:border-neutral-400 hover:bg-bg-tertiary cursor-pointer";
          } else {
            if (idx === question.correctAnswer) {
              classes += "border-emerald bg-emerald/10 text-emerald";
            } else if (idx === selectedOption && !theoryCorrect) {
              classes += "border-rose bg-rose/10 text-rose";
            } else {
              classes += "border-border opacity-50";
            }
          }
          
          return (
            <button key={idx} className={classes} onClick={() => onSelect(idx)} disabled={questionStatus !== "answering"}>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {questionStatus !== "answering" && idx === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                )}
                {questionStatus !== "answering" && idx === selectedOption && !theoryCorrect && (
                  <XCircle className="w-5 h-5 text-rose shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {questionStatus !== "answering" && (
        <MotionWrapper animation="fade-up">
          <div className={`rounded-xl p-4 mb-4 border ${theoryCorrect ? "bg-emerald/10 border-emerald/20" : "bg-rose/10 border-rose/20"}`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {theoryCorrect ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald" /> Correct! +{pointsPerQuestion} points</>
              ) : (
                <><XCircle className="w-4 h-4 text-rose" /> {selectedOption === null ? "Time's up!" : "Not quite"}</>
              )}
            </div>
            <p className="text-sm text-text-secondary">{question.explanation}</p>
          </div>
          <Button className="w-full" onClick={onNext}>
            {!isLast ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </MotionWrapper>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
//  CODE-WRITE RENDERER
// ═══════════════════════════════════════════

function CodeWriteRenderer({
  question, editorCode, onCodeChange, evalResult, hasRunCheck, questionStatus,
  onRunCheck, onSubmit, onNext, isLast, pointsPerQuestion
}: {
  question: CodeWriteQuestion;
  editorCode: string;
  onCodeChange: (code: string) => void;
  evalResult: EvalResult | null;
  hasRunCheck: boolean;
  questionStatus: QuestionStatus;
  onRunCheck: () => void;
  onSubmit: () => void;
  onNext: () => void;
  isLast: boolean;
  pointsPerQuestion: number;
}) {
  return (
    <div className="flex flex-col">
      {/* Problem statement */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-orange-500" />
          <h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wide">Code Challenge</h2>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-line">{question.question}</p>
      </div>
      
      {/* Monaco Editor */}
      <div className="border-t border-b border-border bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
          <span className="text-xs text-neutral-400 font-mono">solution.{question.language === "typescript" ? "ts" : "js"}</span>
          <span className="text-xs text-neutral-500">{question.language}</span>
        </div>
        <MonacoEditor
          height="200px"
          language={question.language === "javascript" ? "javascript" : "typescript"}
          theme="vs-dark"
          value={editorCode}
          onChange={(value) => onCodeChange(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            readOnly: questionStatus !== "answering",
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </div>
      
      {/* Test Cases */}
      <div className="px-6 py-4">
        <TestCasePanel
          testCases={question.testCases}
          evalResult={evalResult}
          hiddenTestCount={question.hiddenTestCount}
        />
        
        {/* Action buttons */}
        {questionStatus === "answering" && (
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onRunCheck}
              disabled={evalResult?.status === "running"}
            >
              <Play className="w-4 h-4 mr-1.5" />
              {evalResult?.status === "running" ? "Running..." : "Run Check"}
            </Button>
            <Button className="flex-1" onClick={onSubmit}>
              <Send className="w-4 h-4 mr-1.5" />
              Submit Answer
            </Button>
          </div>
        )}
        
        {/* Feedback after submission */}
        {questionStatus !== "answering" && evalResult && (
          <MotionWrapper animation="fade-up">
            <SubmissionFeedback evalResult={evalResult} question={question} pointsPerQuestion={pointsPerQuestion} />
            <Button className="w-full mt-3" onClick={onNext}>
              {!isLast ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </MotionWrapper>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
//  DEBUG-FIX RENDERER
// ═══════════════════════════════════════════

function DebugFixRenderer({
  question, editorCode, onCodeChange, evalResult, hasRunCheck, questionStatus,
  onRunCheck, onSubmit, onNext, isLast, pointsPerQuestion
}: {
  question: DebugFixQuestion;
  editorCode: string;
  onCodeChange: (code: string) => void;
  evalResult: EvalResult | null;
  hasRunCheck: boolean;
  questionStatus: QuestionStatus;
  onRunCheck: () => void;
  onSubmit: () => void;
  onNext: () => void;
  isLast: boolean;
  pointsPerQuestion: number;
}) {
  return (
    <div className="flex flex-col">
      {/* Problem statement */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-5 h-5 text-rose" />
          <h2 className="text-sm font-semibold text-rose uppercase tracking-wide">Debug Challenge</h2>
        </div>
        <p className="text-sm leading-relaxed mb-2">{question.question}</p>
        {question.bugHint && (
          <div className="flex items-start gap-2 text-xs text-gold bg-gold/10 border border-gold/20 rounded-lg px-3 py-2">
            <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Hint: {question.bugHint}</span>
          </div>
        )}
      </div>
      
      {/* Monaco Editor with bug line highlight */}
      <div className="border-t border-b border-border bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-mono">buggy.{question.language === "typescript" ? "ts" : "js"}</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose/20 text-[10px] text-rose font-medium">
              <AlertCircle className="w-2.5 h-2.5" /> Bug on line {question.bugLine}
            </span>
          </div>
          <span className="text-xs text-neutral-500">{question.language}</span>
        </div>
        <MonacoEditor
          height="220px"
          language={question.language === "javascript" ? "javascript" : "typescript"}
          theme="vs-dark"
          value={editorCode}
          onChange={(value) => onCodeChange(value || "")}
          onMount={(editor) => {
            // Highlight bug line with red decoration
            const monaco = (window as unknown as Record<string, unknown>).monaco as typeof import("monaco-editor") | undefined;
            if (monaco) {
              editor.deltaDecorations([], [{
                range: new monaco.Range(question.bugLine, 1, question.bugLine, 1),
                options: {
                  isWholeLine: true,
                  className: "bg-rose/20",
                  glyphMarginClassName: "bg-rose",
                }
              }]);
            }
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            readOnly: questionStatus !== "answering",
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            glyphMargin: true,
          }}
        />
      </div>
      
      {/* Test Cases */}
      <div className="px-6 py-4">
        <TestCasePanel
          testCases={question.testCases}
          evalResult={evalResult}
          hiddenTestCount={question.hiddenTestCount}
        />
        
        {/* Action buttons */}
        {questionStatus === "answering" && (
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onRunCheck}
              disabled={evalResult?.status === "running"}
            >
              <Play className="w-4 h-4 mr-1.5" />
              {evalResult?.status === "running" ? "Running..." : "Run Check"}
            </Button>
            <Button className="flex-1" onClick={onSubmit}>
              <Send className="w-4 h-4 mr-1.5" />
              Submit Answer
            </Button>
          </div>
        )}
        
        {/* Feedback after submission */}
        {questionStatus !== "answering" && evalResult && (
          <MotionWrapper animation="fade-up">
            <SubmissionFeedback evalResult={evalResult} question={question} pointsPerQuestion={pointsPerQuestion} />
            <Button className="w-full mt-3" onClick={onNext}>
              {!isLast ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </MotionWrapper>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════

function TestCasePanel({
  testCases, evalResult, hiddenTestCount
}: {
  testCases: { id: string; input: string; expectedOutput: string; isVisible: boolean }[];
  evalResult: EvalResult | null;
  hiddenTestCount: number;
}) {
  const visibleTests = testCases.filter(tc => tc.isVisible);
  
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Test Cases</h3>
      
      {visibleTests.map((tc, idx) => {
        const result = evalResult?.testResults.find(r => r.testCaseId === tc.id);
        const isRunning = evalResult?.status === "running";
        
        let statusIcon = <div className="w-4 h-4 rounded border border-border" />;
        let statusColor = "border-border";
        
        if (isRunning) {
          statusIcon = <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />;
          statusColor = "border-orange-500/30";
        } else if (result) {
          if (result.passed) {
            statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald" />;
            statusColor = "border-emerald/30 bg-emerald/5";
          } else {
            statusIcon = <XCircle className="w-4 h-4 text-rose" />;
            statusColor = "border-rose/30 bg-rose/5";
          }
        }
        
        return (
          <div key={tc.id} className={`rounded-lg border p-3 transition-all ${statusColor}`}>
            <div className="flex items-start gap-2">
              <div className="shrink-0 mt-0.5">{statusIcon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium mb-1">Test {idx + 1}</div>
                <div className="text-xs text-text-muted font-mono truncate">Input: {tc.input}</div>
                <div className="text-xs text-text-muted font-mono truncate">Expected: {tc.expectedOutput}</div>
                {result && !result.passed && result.error && (
                  <div className="text-xs text-rose mt-1 font-mono">{result.error}</div>
                )}
                {result && !result.passed && result.actualOutput && !result.error && (
                  <div className="text-xs text-rose mt-1 font-mono">Got: {result.actualOutput}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Hidden tests */}
      <div className="flex items-center gap-2 text-xs text-text-muted px-1">
        <Lock className="w-3 h-3" />
        <span>{hiddenTestCount} hidden test{hiddenTestCount !== 1 ? "s" : ""}</span>
        {evalResult && evalResult.status !== "running" && (
          <span className="ml-auto font-medium">
            {evalResult.hiddenPassed}/{evalResult.hiddenTotal} passed
          </span>
        )}
      </div>
    </div>
  );
}


function SubmissionFeedback({
  evalResult, question, pointsPerQuestion
}: {
  evalResult: EvalResult;
  question: CodeWriteQuestion | DebugFixQuestion;
  pointsPerQuestion: number;
}) {
  const isPassed = evalResult.status === "pass";
  const earnedPoints = isPassed ? pointsPerQuestion : Math.round(pointsPerQuestion * evalResult.score / 100 * 0.5);
  
  return (
    <div className="mt-4 space-y-3">
      {/* Status banner */}
      <div className={`rounded-xl p-4 border ${
        isPassed ? "bg-emerald/10 border-emerald/20" :
        evalResult.status === "partial" ? "bg-gold/10 border-gold/20" :
        "bg-rose/10 border-rose/20"
      }`}>
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          {isPassed ? (
            <><CheckCircle2 className="w-4 h-4 text-emerald" /> All tests passed! +{earnedPoints} points</>
          ) : evalResult.status === "partial" ? (
            <><AlertCircle className="w-4 h-4 text-gold" /> Partial pass — +{earnedPoints} points</>
          ) : (
            <><XCircle className="w-4 h-4 text-rose" /> {evalResult.status === "error" ? "Error" : "Tests failed"}</>
          )}
        </div>
        <p className="text-sm text-text-secondary">{question.explanation}</p>
      </div>
      
      {/* AI Feedback */}
      {evalResult.aiFeedback && (
        <div className="rounded-xl p-4 border border-orange-500/20 bg-orange-500/5">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 mb-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            AI Coach Feedback
          </div>
          <p className="text-sm text-text-secondary">{evalResult.aiFeedback}</p>
        </div>
      )}
    </div>
  );
}
