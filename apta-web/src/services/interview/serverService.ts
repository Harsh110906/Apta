import type {
  InterviewConfig,
  InterviewSession,
  InterviewTurn,
  InterviewQuestion,
  InterviewReport,
} from "../../types/interview.ts";
import {
  DemoQuestionProvider,
  DemoEvaluationProvider,
  DemoReportProvider,
} from "./providers/demoProvider.ts";
import { sanitizeInterviewConfig, sanitizeText } from "./promptProtection.ts";

// In-memory active session cache on the server
const serverSessions = new Map<string, InterviewSession>();
const serverReports = new Map<string, InterviewReport>();

const demoQuestionProvider = new DemoQuestionProvider();
const demoEvaluationProvider = new DemoEvaluationProvider();
const demoReportProvider = new DemoReportProvider();

export class InterviewServerService {
  private hasLiveApiKey(): boolean {
    return Boolean(
      process.env.AI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GROQ_API_KEY
    );
  }

  async createSession(rawConfig: InterviewConfig): Promise<InterviewSession> {
    const sanitized = sanitizeInterviewConfig(rawConfig);
    const config: InterviewConfig = {
      ...rawConfig,
      jobRole: sanitized.jobRole || "Full-Stack Engineer",
      targetCompany: sanitized.targetCompany,
      jobDescription: sanitized.jobDescription,
      resumeContext: sanitized.resumeContext,
      focusSkills: sanitized.focusSkills,
      mode: this.hasLiveApiKey() && rawConfig.mode === "live" ? "live" : "demo",
    };

    const sessionId = `apt-session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const plannedQuestions = await demoQuestionProvider.generatePlan(config);

    const session: InterviewSession = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      activeElapsedSeconds: 0,
      status: "in_progress",
      config,
      turns: [],
      currentTurnIndex: 0,
      questionPlan: plannedQuestions,
      currentFollowUpCount: 0,
    };

    serverSessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<InterviewSession | null> {
    return serverSessions.get(sessionId) || null;
  }

  async submitTurn(
    sessionId: string,
    payload: {
      turnNumber: number;
      answerTranscript: string;
      isVoiceInput: boolean;
      deliverySeconds: number;
      fillerWords?: string[];
      speakingPaceWpm?: number;
    }
  ): Promise<{
    turn: InterviewTurn;
    nextQuestion: InterviewQuestion | null;
    isFinished: boolean;
  }> {
    const session = serverSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Idempotency check: If this turnNumber was already submitted, return it
    const existingTurn = session.turns.find((t) => t.turnNumber === payload.turnNumber);
    if (existingTurn) {
      const nextQ =
        session.currentTurnIndex < session.questionPlan.length
          ? session.questionPlan[session.currentTurnIndex]
          : null;
      return {
        turn: existingTurn,
        nextQuestion: nextQ,
        isFinished: session.status === "completed" || !nextQ,
      };
    }

    // Determine current active question
    // If the last turn was a follow-up or main question:
    let currentQuestion: InterviewQuestion;
    if (session.turns.length === 0) {
      currentQuestion = session.questionPlan[0];
    } else {
      const lastTurn = session.turns[session.turns.length - 1];
      if (lastTurn.question.isFollowUp && session.currentFollowUpCount <= 2) {
        currentQuestion = lastTurn.question;
      } else {
        currentQuestion = session.questionPlan[session.currentTurnIndex] || session.questionPlan[0];
      }
    }

    const cleanAnswer = sanitizeText(payload.answerTranscript, 5000);

    // Evaluate answer
    const evaluation = await demoEvaluationProvider.evaluateAnswer(
      currentQuestion,
      cleanAnswer,
      payload.deliverySeconds
    );

    const turnId = `turn-${session.id}-${payload.turnNumber}`;
    evaluation.turnId = turnId;

    const newTurn: InterviewTurn = {
      id: turnId,
      sessionId: session.id,
      turnNumber: payload.turnNumber,
      question: currentQuestion,
      answerTranscript: cleanAnswer,
      isVoiceInput: payload.isVoiceInput,
      startedAt: new Date(Date.now() - payload.deliverySeconds * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      deliveryMetrics: {
        durationSeconds: payload.deliverySeconds,
        wordCount: cleanAnswer.split(/\s+/).filter(Boolean).length,
        fillerWords: payload.fillerWords,
        speakingPaceWpm: payload.speakingPaceWpm,
      },
      evaluation,
    };

    session.turns.push(newTurn);
    session.activeElapsedSeconds += payload.deliverySeconds;

    // Check duration limit (convert minutes to seconds)
    const timeLimitSeconds = session.config.durationMinutes * 60;
    const remainingSeconds = Math.max(0, timeLimitSeconds - session.activeElapsedSeconds);

    // Decide if follow-up should be generated
    let nextQuestion: InterviewQuestion | null = null;
    let isFinished = false;

    if (session.currentFollowUpCount < 2 && remainingSeconds > 60 && !currentQuestion.isFollowUp) {
      const followUp = await demoQuestionProvider.generateFollowUp(
        currentQuestion,
        cleanAnswer,
        session.currentFollowUpCount + 1,
        remainingSeconds
      );

      if (followUp) {
        session.currentFollowUpCount += 1;
        nextQuestion = followUp;
      }
    }

    if (!nextQuestion) {
      // Move to next main question in plan
      session.currentFollowUpCount = 0;
      session.currentTurnIndex += 1;

      if (session.currentTurnIndex < session.questionPlan.length && remainingSeconds > 30) {
        nextQuestion = session.questionPlan[session.currentTurnIndex];
      } else {
        // All planned questions finished or time expired
        isFinished = true;
        session.status = "completed";
      }
    }

    serverSessions.set(session.id, session);

    return {
      turn: newTurn,
      nextQuestion,
      isFinished,
    };
  }

  async completeSession(
    sessionId: string,
    reason: "completed" | "ended_early" | "interrupted" = "completed"
  ): Promise<InterviewReport> {
    const session = serverSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = reason;
    session.completedAt = new Date().toISOString();

    const report = await demoReportProvider.generateReport(session);
    session.report = report;

    serverSessions.set(sessionId, session);
    serverReports.set(sessionId, report);

    return report;
  }

  async getReport(sessionId: string): Promise<InterviewReport | null> {
    if (serverReports.has(sessionId)) {
      return serverReports.get(sessionId)!;
    }
    const session = serverSessions.get(sessionId);
    return session?.report || null;
  }

  async listHistory(): Promise<InterviewSession[]> {
    return Array.from(serverSessions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    serverSessions.delete(sessionId);
    serverReports.delete(sessionId);
    return true;
  }
}

export const serverInterviewService = new InterviewServerService();
