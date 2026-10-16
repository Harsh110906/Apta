"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Clock,
  Building2,
  Briefcase,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useInterviewStore } from "@/features/interview/useInterviewStore";
import { InterviewerAvatar } from "@/components/interview/InterviewerAvatar";
import { CandidateVideoPreview } from "@/components/interview/CandidateVideoPreview";
import { QuestionDisplay } from "@/components/interview/QuestionDisplay";
import { LiveTranscriptPanel } from "@/components/interview/LiveTranscriptPanel";
import { RoomControlBar } from "@/components/interview/RoomControlBar";
import { voiceService } from "@/services/interview/voiceService";

interface RoomPageProps {
  params: Promise<{ sessionId: string }>;
}

export default function InterviewRoomPage({ params }: RoomPageProps) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();

  const {
    session,
    currentQuestion,
    uiState,
    currentTranscript,
    isListening,
    isSpeaking,
    isSubmitting,
    isPaused,
    isFullscreen,
    isMuted,
    isCameraActive,
    showTranscriptDrawer,
    remainingSeconds,
    error,
    loadSessionById,
    setUiState,
    setCurrentTranscript,
    setIsListening,
    setIsSpeaking,
    togglePause,
    toggleMute,
    toggleCamera,
    toggleTranscriptDrawer,
    decrementRemainingSeconds,
    submitAnswer,
    endInterviewEarly,
    setError,
  } = useInterviewStore();

  const [hasStartedVoice, setHasStartedVoice] = useState(false);

  // 1. Load session on mount
  useEffect(() => {
    let isMounted = true;

    async function init() {
      const s = await loadSessionById(sessionId);
      if (!s && isMounted) {
        setError("Interview session not found. Please create a new session.");
      }
    }

    init();

    return () => {
      isMounted = false;
      voiceService.cleanup();
    };
  }, [sessionId, loadSessionById, setError]);

  // 2. Active timer countdown
  useEffect(() => {
    if (uiState === "completed" || isPaused) return;

    const interval = setInterval(() => {
      decrementRemainingSeconds();
    }, 1000);

    return () => clearInterval(interval);
  }, [uiState, isPaused, decrementRemainingSeconds]);

  // 3. Auto-end when remaining time reaches 0
  useEffect(() => {
    if (remainingSeconds <= 0 && session && uiState !== "completed" && !isSubmitting) {
      handleCompleteAndRedirect();
    }
  }, [remainingSeconds, session, uiState, isSubmitting]);

  // 4. Speak current question aloud whenever currentQuestion changes
  useEffect(() => {
    if (!currentQuestion || isMuted || isPaused || uiState === "completed") return;

    // Stop candidate mic while interviewer speaks
    voiceService.stopListening();
    setIsListening(false);
    setIsSpeaking(true);
    setUiState("interviewer_speaking");

    voiceService.speakQuestion(
      currentQuestion.text,
      session?.config.interviewerPersona || "Neutral",
      () => {
        setIsSpeaking(true);
      },
      () => {
        setIsSpeaking(false);
        setUiState("awaiting_candidate");
      },
      (err) => {
        console.warn("[InterviewRoom] Speech synthesis notice:", err);
        setIsSpeaking(false);
        setUiState("awaiting_candidate");
      }
    );

    return () => {
      voiceService.stopSpeaking();
    };
  }, [currentQuestion?.id, isMuted, isPaused]);

  // Toggle voice recognition
  const handleToggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      if (isSpeaking) {
        voiceService.stopSpeaking();
        setIsSpeaking(false);
      }

      setError(null);
      setIsListening(true);
      setUiState("candidate_answering");

      voiceService.startListening(
        (result) => {
          if (result.transcript) {
            setCurrentTranscript(result.transcript);
          }
        },
        (err) => {
          console.warn("[InterviewRoom] Speech recognition error:", err);
          setIsListening(false);
          setUiState("awaiting_candidate");
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const handleReplayQuestion = () => {
    if (!currentQuestion) return;
    voiceService.stopListening();
    setIsListening(false);
    setIsSpeaking(true);
    setUiState("interviewer_speaking");

    voiceService.speakQuestion(
      currentQuestion.text,
      session?.config.interviewerPersona || "Neutral",
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setUiState("awaiting_candidate");
      }
    );
  };

  const handleSubmitAnswer = async () => {
    voiceService.stopListening();
    setIsListening(false);

    try {
      const res = await submitAnswer();
      if (res.isFinished) {
        router.push(`/demo/candidate/interview/report/${sessionId}`);
      }
    } catch (err: any) {
      console.error("[InterviewRoom] Failed to submit answer:", err);
    }
  };

  const handleCompleteAndRedirect = async () => {
    voiceService.cleanup();
    try {
      await endInterviewEarly();
      router.push(`/demo/candidate/interview/report/${sessionId}`);
    } catch (err) {
      router.push(`/demo/candidate/interview/report/${sessionId}`);
    }
  };

  // Format countdown mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(Math.max(0, secs) / 60);
    const s = Math.max(0, secs) % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!session && !error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="font-bold text-sm text-text-secondary">Loading Interview Arena Session...</p>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose mb-3" />
        <h2 className="text-xl font-bold mb-2">Session Error</h2>
        <p className="text-sm text-text-secondary max-w-md mb-6">{error}</p>
        <button
          onClick={() => router.push("/demo/candidate/interview")}
          className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-glow"
        >
          Create New Simulation
        </button>
      </div>
    );
  }

  const turns = session?.turns || [];
  const currentTurnNumber = turns.length + 1;
  const totalPlanned = session?.questionPlan.length || 3;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg-primary dark:bg-midnight text-foreground dark:text-neutral-100">
      {/* Top Session Bar */}
      <header className="h-14 border-b border-border dark:border-midnight-700 bg-bg-secondary dark:bg-midnight-900 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm font-bold text-xs">
            A
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-bold tracking-tight text-foreground dark:text-white flex items-center gap-2">
              Apta Interview Arena
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald bg-emerald/10 border border-emerald/20 px-2 py-0.5 rounded-full">
                Active Round
              </span>
            </h1>
          </div>
        </div>

        {/* Target Context Badges */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-text-secondary dark:text-neutral-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-orange-500" />
            {session?.config.jobRole}
          </span>
          {session?.config.targetCompany && (
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-sky" />
              {session.config.targetCompany}
            </span>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-colors ${
              remainingSeconds < 120
                ? "bg-rose/10 border-rose/30 text-rose animate-pulse"
                : "bg-midnight-800 border-midnight-600 text-neutral-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(remainingSeconds)}</span>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual AI Interviewer & Optional Candidate Cam (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* AI Interviewer Avatar */}
          <InterviewerAvatar
            isSpeaking={isSpeaking}
            isListening={isListening}
            isMuted={isMuted}
            persona={session?.config.interviewerPersona || "Neutral"}
            isDemo={session?.config.mode === "demo"}
            onToggleMute={toggleMute}
            onReplayQuestion={handleReplayQuestion}
          />

          {/* Optional Local Candidate Camera Preview */}
          <CandidateVideoPreview
            isActive={isCameraActive}
            onToggleCamera={toggleCamera}
          />
        </div>

        {/* Right Column: Question Card & Live Interactive Transcript (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              turnNumber={currentTurnNumber}
              totalPlanned={totalPlanned}
              isFollowUp={currentQuestion.isFollowUp}
              followUpLevel={currentQuestion.followUpLevel}
              persona={session?.config.interviewerPersona || "Neutral"}
            />
          )}

          {/* Live Dialogue & Answering Box */}
          {showTranscriptDrawer && (
            <LiveTranscriptPanel
              turns={turns}
              currentTranscript={currentTranscript}
              isListening={isListening}
              isSpeaking={isSpeaking}
              isSubmitting={isSubmitting}
              error={error}
              onTranscriptChange={setCurrentTranscript}
              onToggleListening={handleToggleListening}
              onSubmitAnswer={handleSubmitAnswer}
              onClearTranscript={() => setCurrentTranscript("")}
            />
          )}
        </div>
      </main>

      {/* Bottom Control Bar */}
      <RoomControlBar
        isMuted={isMuted}
        isCameraActive={isCameraActive}
        isPaused={isPaused}
        isFullscreen={isFullscreen}
        showTranscript={showTranscriptDrawer}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onTogglePause={togglePause}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {});
          } else {
            document.exitFullscreen?.().catch(() => {});
          }
        }}
        onToggleTranscript={toggleTranscriptDrawer}
        onEndInterview={handleCompleteAndRedirect}
      />
    </div>
  );
}
