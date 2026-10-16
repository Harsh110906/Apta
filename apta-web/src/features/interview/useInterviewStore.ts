import { create } from "zustand";
import {
  InterviewConfig,
  InterviewSession,
  InterviewQuestion,
  DeviceCheckState,
  RoomUiState,
  InterviewReport,
} from "@/types/interview";
import { interviewStorage } from "@/services/interview/storageAdapter";
import { voiceService } from "@/services/interview/voiceService";

export const DEFAULT_CONFIG: InterviewConfig = {
  jobRole: "Frontend Engineer",
  experienceLevel: "1–3 years",
  interviewType: "Mixed",
  durationMinutes: 10,
  targetCompany: "",
  expectedCompensation: {
    currency: "INR",
    amount: "15",
    period: "annual",
    label: "15 LPA (INR Annual)",
  },
  jobDescription: "",
  focusSkills: ["React", "TypeScript", "Performance"],
  resumeContext: "",
  interviewerPersona: "Supportive",
  interactionMode: "Voice interview",
  enableCamera: false,
  mode: "demo",
};

export const DEFAULT_DEVICE_CHECK: DeviceCheckState = {
  micPermission: "idle",
  cameraPermission: "idle",
  selectedAudioInputId: "default",
  selectedAudioOutputId: "default",
  selectedVideoInputId: "default",
  availableAudioInputs: [],
  availableAudioOutputs: [],
  availableVideoInputs: [],
  micVolume: 0,
  audioTestPlaying: false,
  audioTestPassed: false,
  isCameraActive: false,
  textModeFallback: false,
};

interface InterviewState {
  config: InterviewConfig;
  session: InterviewSession | null;
  currentQuestion: InterviewQuestion | null;
  deviceCheck: DeviceCheckState;
  uiState: RoomUiState;
  currentTranscript: string;
  isListening: boolean;
  isSpeaking: boolean;
  isSubmitting: boolean;
  error: string | null;
  remainingSeconds: number;
  isPaused: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isCameraActive: boolean;
  showTranscriptDrawer: boolean;
  history: InterviewSession[];
  activeTurnStartTime: number;

  setConfig: (config: Partial<InterviewConfig>) => void;
  setDeviceCheck: (state: Partial<DeviceCheckState>) => void;
  setSession: (session: InterviewSession | null) => void;
  setCurrentQuestion: (q: InterviewQuestion | null) => void;
  setUiState: (uiState: RoomUiState) => void;
  setCurrentTranscript: (text: string) => void;
  setIsListening: (isListening: boolean) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
  setRemainingSeconds: (seconds: number) => void;
  decrementRemainingSeconds: () => void;
  togglePause: () => void;
  setIsFullscreen: (val: boolean) => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleTranscriptDrawer: () => void;
  setError: (err: string | null) => void;

  initializeSession: () => Promise<InterviewSession>;
  loadSessionById: (sessionId: string) => Promise<InterviewSession | null>;
  submitAnswer: () => Promise<{ isFinished: boolean; report?: InterviewReport }>;
  endInterviewEarly: () => Promise<InterviewReport>;
  loadHistory: () => Promise<void>;
  deleteSessionHistory: (sessionId: string) => Promise<void>;
  resetActiveSession: () => void;
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  config: DEFAULT_CONFIG,
  session: null,
  currentQuestion: null,
  deviceCheck: DEFAULT_DEVICE_CHECK,
  uiState: "preparing",
  currentTranscript: "",
  isListening: false,
  isSpeaking: false,
  isSubmitting: false,
  error: null,
  remainingSeconds: DEFAULT_CONFIG.durationMinutes * 60,
  isPaused: false,
  isFullscreen: false,
  isMuted: false,
  isCameraActive: false,
  showTranscriptDrawer: true,
  history: [],
  activeTurnStartTime: Date.now(),

  setConfig: (partial) =>
    set((state) => ({
      config: { ...state.config, ...partial },
      remainingSeconds: (partial.durationMinutes ?? state.config.durationMinutes) * 60,
    })),

  setDeviceCheck: (partial) =>
    set((state) => ({
      deviceCheck: { ...state.deviceCheck, ...partial },
      isCameraActive: partial.isCameraActive ?? state.isCameraActive,
    })),

  setSession: (session) =>
    set({
      session,
      currentQuestion: session?.questionPlan?.[0] || null,
      remainingSeconds: (session?.config?.durationMinutes ?? 10) * 60,
    }),

  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  setUiState: (uiState) => set({ uiState }),
  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),
  setIsListening: (isListening) => set({ isListening }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
  setRemainingSeconds: (remainingSeconds) => set({ remainingSeconds }),
  decrementRemainingSeconds: () =>
    set((state) => {
      if (state.isPaused || state.remainingSeconds <= 0) return {};
      return { remainingSeconds: state.remainingSeconds - 1 };
    }),

  togglePause: () =>
    set((state) => {
      const nextPaused = !state.isPaused;
      if (nextPaused) {
        voiceService.stopSpeaking();
        voiceService.stopListening();
        return { isPaused: true, uiState: "paused", isListening: false, isSpeaking: false };
      } else {
        return { isPaused: false, uiState: "awaiting_candidate" };
      }
    }),

  setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
  toggleMute: () =>
    set((state) => {
      if (!state.isMuted) {
        voiceService.stopSpeaking();
      }
      return { isMuted: !state.isMuted };
    }),

  toggleCamera: () =>
    set((state) => ({
      isCameraActive: !state.isCameraActive,
      deviceCheck: { ...state.deviceCheck, isCameraActive: !state.isCameraActive },
    })),

  toggleTranscriptDrawer: () =>
    set((state) => ({ showTranscriptDrawer: !state.showTranscriptDrawer })),

  setError: (error) => set({ error }),

  initializeSession: async () => {
    const { config } = get();
    set({ uiState: "preparing", error: null });

    try {
      const res = await fetch("/api/interview/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to initialize session");
      }

      const { session } = await res.json();
      await interviewStorage.saveSession(session);

      set({
        session,
        currentQuestion: session.questionPlan[0],
        remainingSeconds: session.config.durationMinutes * 60,
        uiState: "interviewer_speaking",
        activeTurnStartTime: Date.now(),
        currentTranscript: "",
      });

      return session;
    } catch (err: any) {
      set({ error: err.message, uiState: "preparing" });
      throw err;
    }
  },

  loadSessionById: async (sessionId: string) => {
    set({ error: null });
    try {
      // Check local storage first for instant responsiveness
      let session = await interviewStorage.getSession(sessionId);

      if (!session) {
        const res = await fetch(`/api/interview/session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          session = data.session;
          if (session) {
            await interviewStorage.saveSession(session);
          }
        }
      }

      if (session) {
        set({
          session,
          config: session.config,
          currentQuestion:
            session.questionPlan[session.currentTurnIndex] ||
            session.questionPlan[0] ||
            null,
          uiState: session.status === "completed" ? "completed" : "awaiting_candidate",
        });
      }

      return session;
    } catch (err: any) {
      set({ error: err.message });
      return null;
    }
  },

  submitAnswer: async () => {
    const { session, currentTranscript, currentQuestion, activeTurnStartTime, isSubmitting } = get();
    if (!session || !currentQuestion || isSubmitting) {
      return { isFinished: false };
    }

    const answer = currentTranscript.trim();
    if (!answer) {
      set({ error: "Please provide an answer before submitting." });
      return { isFinished: false };
    }

    set({ isSubmitting: true, uiState: "transcribing", error: null });

    const deliverySeconds = Math.max(5, Math.round((Date.now() - activeTurnStartTime) / 1000));
    const turnNumber = session.turns.length + 1;

    try {
      const res = await fetch(`/api/interview/session/${session.id}/turn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnNumber,
          answerTranscript: answer,
          isVoiceInput: get().deviceCheck.micPermission === "granted",
          deliverySeconds,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit answer turn");
      }

      const { turn, nextQuestion, isFinished } = await res.json();

      // Update local session
      const updatedSession: InterviewSession = {
        ...session,
        turns: [...session.turns, turn],
      };

      if (isFinished || !nextQuestion) {
        set({ uiState: "generating_report" });
        const report = await get().endInterviewEarly();
        return { isFinished: true, report };
      }

      updatedSession.activeElapsedSeconds += deliverySeconds;
      await interviewStorage.saveSession(updatedSession);

      set({
        session: updatedSession,
        currentQuestion: nextQuestion,
        currentTranscript: "",
        uiState: "interviewer_speaking",
        activeTurnStartTime: Date.now(),
        isSubmitting: false,
      });

      return { isFinished: false };
    } catch (err: any) {
      set({ error: err.message, isSubmitting: false, uiState: "awaiting_candidate" });
      throw err;
    }
  },

  endInterviewEarly: async () => {
    const { session } = get();
    if (!session) throw new Error("No active interview session");

    set({ uiState: "generating_report", isSubmitting: true });

    try {
      const reason = session.turns.length >= session.questionPlan.length ? "completed" : "ended_early";
      const res = await fetch(`/api/interview/session/${session.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to finalize report");
      }

      const { report } = await res.json();
      await interviewStorage.saveReport(report);

      const updatedSession: InterviewSession = {
        ...session,
        status: reason,
        report,
      };
      await interviewStorage.saveSession(updatedSession);

      set({
        session: updatedSession,
        uiState: "completed",
        isSubmitting: false,
      });

      return report;
    } catch (err: any) {
      set({ error: err.message, isSubmitting: false });
      throw err;
    }
  },

  loadHistory: async () => {
    try {
      const localSessions = await interviewStorage.listSessions();
      set({ history: localSessions });
    } catch (err: any) {
      console.warn("[useInterviewStore] Failed to load history:", err);
    }
  },

  deleteSessionHistory: async (sessionId: string) => {
    try {
      await interviewStorage.deleteSession(sessionId);
      await fetch(`/api/interview/session/${sessionId}`, { method: "DELETE" }).catch(() => {});
      const updated = get().history.filter((s) => s.id !== sessionId);
      set({ history: updated });
    } catch (err: any) {
      console.warn("[useInterviewStore] Failed to delete session:", err);
    }
  },

  resetActiveSession: () => {
    voiceService.cleanup();
    set({
      session: null,
      currentQuestion: null,
      uiState: "preparing",
      currentTranscript: "",
      isListening: false,
      isSpeaking: false,
      isSubmitting: false,
      isPaused: false,
      error: null,
    });
  },
}));
