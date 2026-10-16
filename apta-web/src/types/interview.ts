export type InterviewRoleOption =
  | "Frontend Engineer"
  | "Backend Engineer"
  | "Full-Stack Engineer"
  | "Custom role";

export type ExperienceLevel =
  | "Student / Fresher"
  | "1–3 years"
  | "3–5 years"
  | "5+ years";

export type InterviewType = "Technical" | "HR / Behavioral" | "Mixed";

export type InterviewDuration = 10 | 20 | 30; // minutes

export type InterviewerPersona = "Supportive" | "Neutral" | "Challenging";

export type InteractionMode = "Voice interview" | "Text interview";

export interface CompensationConfig {
  currency: "INR" | "USD" | "EUR" | "GBP";
  amount: string; // e.g. "15" for 15 LPA or "120,000" for USD annual
  period: "annual";
  label: string; // e.g. "15 LPA (INR Annual)"
}

export interface InterviewConfig {
  jobRole: string; // Can be selected or custom
  customRoleName?: string;
  experienceLevel: ExperienceLevel;
  interviewType: InterviewType;
  durationMinutes: InterviewDuration;
  targetCompany?: string;
  expectedCompensation?: CompensationConfig;
  jobDescription?: string;
  focusSkills: string[];
  resumeContext?: string;
  interviewerPersona: InterviewerPersona;
  interactionMode: InteractionMode;
  enableCamera: boolean;
  mode: "demo" | "live";
}

export type InterviewSessionStatus =
  | "created"
  | "in_progress"
  | "paused"
  | "completed"
  | "ended_early"
  | "interrupted";

export interface InterviewQuestion {
  id: string;
  text: string;
  competency: string;
  difficulty: "junior" | "mid" | "senior" | "lead";
  timeBudgetSeconds: number;
  rubricCriteria: string[];
  hint?: string;
  isFollowUp?: boolean;
  parentQuestionId?: string;
  followUpLevel?: number; // 1 or 2 max
}

export interface AnswerDeliveryMetrics {
  durationSeconds: number;
  wordCount: number;
  speakingPaceWpm?: number;
  fillerWords?: string[];
  fillerWordCount?: number;
}

export interface AnswerEvaluation {
  turnId: string;
  competency: string;
  score: number; // 0 - 100
  feedback: string;
  strengths: string[];
  improvementAreas: string[];
  suggestedFramework: string;
  evidenceSnippet: string;
  deliveryAdvisory?: string;
}

export interface InterviewTurn {
  id: string;
  sessionId: string;
  turnNumber: number;
  question: InterviewQuestion;
  answerTranscript: string;
  isVoiceInput: boolean;
  startedAt: string;
  submittedAt: string;
  deliveryMetrics?: AnswerDeliveryMetrics;
  evaluation?: AnswerEvaluation;
}

export interface CompetencyScore {
  competency: string;
  score: number; // 0 - 100
  weight: number;
  assessed: boolean;
  evidence: string;
  limitations?: string;
}

export interface PerQuestionReportFeedback {
  turnId: string;
  questionText: string;
  answerTranscript: string;
  competency: string;
  score: number;
  feedback: string;
  evidenceSnippet: string;
  suggestedFramework: string;
  deliveryNotes?: string;
}

export interface InterviewReport {
  id: string;
  sessionId: string;
  generatedAt: string;
  completionStatus: InterviewSessionStatus;
  role: string;
  targetCompany?: string;
  interviewType: InterviewType;
  durationMinutes: number;
  activeElapsedSeconds: number;
  totalQuestionsAnswered: number;
  overallScore: number | null; // null if too few questions answered (< 2)
  competencyScores: CompetencyScore[];
  unassessedCompetencies: string[];
  strengths: string[];
  improvementAreas: string[];
  perQuestionFeedback: PerQuestionReportFeedback[];
  nextActions: string[];
  recommendedNextSession: {
    role: string;
    focusSkill: string;
    difficulty: string;
    reason: string;
  };
  limitations: string[];
  isDemo: boolean;
  providerNotice: string;
}

export interface InterviewSession {
  id: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  activeElapsedSeconds: number;
  status: InterviewSessionStatus;
  config: InterviewConfig;
  turns: InterviewTurn[];
  currentTurnIndex: number;
  questionPlan: InterviewQuestion[];
  currentFollowUpCount: number;
  report?: InterviewReport;
}

export interface DeviceCheckState {
  micPermission: "idle" | "prompt" | "granted" | "denied" | "unsupported";
  cameraPermission: "idle" | "prompt" | "granted" | "denied" | "unsupported";
  selectedAudioInputId: string;
  selectedAudioOutputId: string;
  selectedVideoInputId: string;
  availableAudioInputs: MediaDeviceInfo[];
  availableAudioOutputs: MediaDeviceInfo[];
  availableVideoInputs: MediaDeviceInfo[];
  micVolume: number; // 0 to 100
  audioTestPlaying: boolean;
  audioTestPassed: boolean;
  isCameraActive: boolean;
  textModeFallback: boolean;
}

export type RoomUiState =
  | "preparing"
  | "interviewer_speaking"
  | "awaiting_candidate"
  | "candidate_answering"
  | "transcribing"
  | "reviewing_answer"
  | "generating_follow_up"
  | "paused"
  | "reconnecting"
  | "completing"
  | "generating_report"
  | "completed";
