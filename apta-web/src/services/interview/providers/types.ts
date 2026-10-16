import type {
  InterviewConfig,
  InterviewQuestion,
  InterviewSession,
  InterviewReport,
  AnswerEvaluation,
} from "../../../types/interview.ts";

export interface IQuestionGenerationProvider {
  generatePlan(config: InterviewConfig): Promise<InterviewQuestion[]>;
  generateFollowUp(
    parentQuestion: InterviewQuestion,
    candidateAnswer: string,
    followUpIndex: number,
    remainingSeconds: number
  ): Promise<InterviewQuestion | null>;
}

export interface IAnswerEvaluationProvider {
  evaluateAnswer(
    question: InterviewQuestion,
    candidateAnswer: string,
    deliverySeconds: number
  ): Promise<AnswerEvaluation>;
}

export interface IReportGenerationProvider {
  generateReport(session: InterviewSession): Promise<InterviewReport>;
}

export interface ISpeechToTextProvider {
  transcribeAudio(
    audioBlob: Blob,
    mimeType: string
  ): Promise<{ transcript: string; confidence: number }>;
}

export interface ITextToSpeechProvider {
  synthesizeSpeech(
    text: string,
    persona?: string
  ): Promise<{
    audioUrl?: string;
    audioData?: ArrayBuffer;
    useWebSpeechFallback?: boolean;
  }>;
}

export interface IAvatarProvider {
  getAvatarProfile(): {
    name: string;
    roleTitle: string;
    avatarUrl: string;
    isInteractive: boolean;
  };
}
