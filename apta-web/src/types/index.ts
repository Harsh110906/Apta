export interface Candidate {
  id: string;
  name: string;
  avatarUrl?: string;
  headline: string;
  domain: string;
  rank: RankTier;
  points: number;
  streak: number;
  skills: string[];
  certifications: Certification[];
  isPro: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: "verified" | "pending" | "self-declared";
  date: string;
}

export interface Recruiter {
  id: string;
  name: string;
  companyName: string;
  companyLogoUrl?: string;
  plan: "Starter" | "Growth" | "Enterprise";
}

export type RankTier =
  | "Unranked"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Elite"
  | "Legend";

export interface PricingPlan {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

// ── Quiz System Types ──

export type QuestionType = "theory" | "code-write" | "debug-fix";
export type DifficultyTier = "easy" | "medium" | "hard";

export interface TheoryQuestion {
  type: "theory";
  id: string;
  difficulty: DifficultyTier;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodeWriteQuestion {
  type: "code-write";
  id: string;
  difficulty: DifficultyTier;
  domain: string;
  question: string;
  starterCode: string;
  solutionCode: string;
  language: string;
  testCases: TestCase[];
  hiddenTestCount: number;
  explanation: string;
}

export interface DebugFixQuestion {
  type: "debug-fix";
  id: string;
  difficulty: DifficultyTier;
  domain: string;
  question: string;
  buggyCode: string;
  bugLine: number;
  bugHint?: string;
  solutionCode: string;
  language: string;
  testCases: TestCase[];
  hiddenTestCount: number;
  explanation: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isVisible: boolean;
}

export type QuizQuestion = TheoryQuestion | CodeWriteQuestion | DebugFixQuestion;

export interface EvalResult {
  status: "running" | "pass" | "partial" | "fail" | "error";
  testResults: TestCaseResult[];
  hiddenPassed: number;
  hiddenTotal: number;
  score: number;
  aiFeedback?: string;
}

export interface TestCaseResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}
