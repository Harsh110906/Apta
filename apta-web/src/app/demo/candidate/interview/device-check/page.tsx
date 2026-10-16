"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Volume2,
  Video,
  VideoOff,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  HelpCircle,
} from "lucide-react";
import { useInterviewStore } from "@/features/interview/useInterviewStore";
import { voiceService } from "@/services/interview/voiceService";

export default function DeviceCheckPage() {
  const router = useRouter();
  const { config, deviceCheck, setDeviceCheck, initializeSession, setIsFullscreen } = useInterviewStore();

  const [micStatus, setMicStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");
  const [cameraStatus, setCameraStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isPlayingAudioTest, setIsPlayingAudioTest] = useState(false);
  const [audioTestPassed, setAudioTestPassed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Stop hardware media tracks when navigating away
  useEffect(() => {
    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      voiceService.stopMicVolumeMeter();
    };
  }, []);

  // Request Microphone Permission explicitly
  const handleRequestMic = async () => {
    setMicStatus("requesting");
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      micStreamRef.current = stream;
      setMicStatus("granted");
      setDeviceCheck({ micPermission: "granted" });

      // Start live volume meter
      voiceService.startMicVolumeMeter(stream, (vol) => {
        setVolumeLevel(vol);
      });
    } catch (err: any) {
      console.warn("[DeviceCheck] Mic error:", err);
      setMicStatus("denied");
      setDeviceCheck({ micPermission: "denied" });
      setErrorMsg("Microphone permission was denied or no input device was found.");
    }
  };

  // Request Camera Permission explicitly
  const handleRequestCamera = async () => {
    setCameraStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: false,
      });

      cameraStreamRef.current = stream;
      setCameraStatus("granted");
      setDeviceCheck({ cameraPermission: "granted", isCameraActive: true });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn("[DeviceCheck] Camera error:", err);
      setCameraStatus("denied");
      setDeviceCheck({ cameraPermission: "denied", isCameraActive: false });
    }
  };

  // Play Speaker Chime
  const handlePlaySpeakerTest = async () => {
    setIsPlayingAudioTest(true);
    await voiceService.playAudioTestChime();
    setIsPlayingAudioTest(false);
    setAudioTestPassed(true);
    setDeviceCheck({ audioTestPassed: true });
  };

  // Start Interview & Request Fullscreen
  const handleStartInterview = async () => {
    setIsInitializing(true);
    setErrorMsg(null);

    // Request browser fullscreen if supported
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
    } catch {
      // Ignored: continue smoothly if user or browser rejects fullscreen
    }

    try {
      const session = await initializeSession();
      router.push(`/demo/candidate/interview/room/${session.id}`);
    } catch (err: any) {
      setIsInitializing(false);
      setErrorMsg(err.message || "Failed to start interview session.");
    }
  };

  return (
    <div className="flex-1 py-10 px-4 md:px-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-border dark:border-midnight-700 pb-6">
        <div>
          <Link
            href="/demo/candidate/interview"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Configuration
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Audio & Device Check</h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Ensure your microphone and speakers are functioning clearly before entering the Arena.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Device Test Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Microphone Test */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Microphone Input</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Speech capture & transcription</p>
                  </div>
                </div>

                {micStatus === "granted" && (
                  <span className="flex items-center gap-1 text-emerald text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Ready
                  </span>
                )}
              </div>

              {micStatus === "idle" && (
                <div className="py-6 text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                    Click below to allow microphone access. We never access your mic without your explicit consent.
                  </p>
                  <button
                    onClick={handleRequestMic}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-glow transition-all"
                  >
                    Allow Microphone Access
                  </button>
                </div>
              )}

              {micStatus === "requesting" && (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400 animate-pulse">
                  Prompting browser for microphone permissions...
                </div>
              )}

              {micStatus === "granted" && (
                <div className="space-y-3 py-2">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Speak into your microphone to test volume:
                  </p>
                  {/* Volume Level Meter Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald to-orange-500 transition-all duration-75"
                      style={{ width: `${Math.max(5, Math.min(100, volumeLevel))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Input level: {volumeLevel}%</span>
                    <span>{volumeLevel > 15 ? "Voice detected" : "Awaiting speech"}</span>
                  </div>
                </div>
              )}

              {micStatus === "denied" && (
                <div className="p-4 bg-rose/10 border border-rose/20 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose font-bold">
                    <AlertTriangle className="w-4 h-4" /> Mic access blocked or not found
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    You can still proceed seamlessly with the <strong>Text Interview Fallback</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setDeviceCheck({ textModeFallback: true });
                      setMicStatus("granted");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    Switch to Text Mode Fallback
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Audio is processed for real-time transcription and not stored as permanent raw recordings.
            </div>
          </div>

          {/* Card 2: Audio Output & Speaker Test */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-sky/10 text-sky border border-sky/20">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Audio & Speaker Output</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Interviewer speech playback</p>
                  </div>
                </div>

                {audioTestPassed && (
                  <span className="flex items-center gap-1 text-emerald text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Heard
                  </span>
                )}
              </div>

              <div className="py-6 text-center space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Play our verification chime to ensure you can clearly hear the AI interviewer&apos;s questions.
                </p>

                <button
                  onClick={handlePlaySpeakerTest}
                  disabled={isPlayingAudioTest}
                  className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 mx-auto ${
                    isPlayingAudioTest
                      ? "bg-sky text-white border-sky animate-pulse"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700 shadow-sm"
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isPlayingAudioTest ? "Playing Test Chime..." : "Play Speaker Test Sound"}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              You can also read full subtitles and question text on screen at any time.
            </div>
          </div>
        </div>

        {/* Optional Camera Preview Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald/10 text-emerald border border-emerald/20">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Camera Preview (Optional)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Off by default. Helps you practice eye focus and posture.
                </p>
              </div>
            </div>

            {cameraStatus !== "granted" ? (
              <button
                onClick={handleRequestCamera}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <Video className="w-3.5 h-3.5 text-sky" /> Test Camera Preview
              </button>
            ) : (
              <button
                onClick={() => {
                  if (cameraStreamRef.current) {
                    cameraStreamRef.current.getTracks().forEach((t) => t.stop());
                  }
                  setCameraStatus("idle");
                  setDeviceCheck({ isCameraActive: false });
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-rose transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <VideoOff className="w-3.5 h-3.5" /> Turn Camera Off
              </button>
            )}
          </div>

          {cameraStatus === "granted" && (
            <div className="relative aspect-video max-w-sm mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 my-4 shadow-inner">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-medium">
                Local Preview Only
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900 dark:text-white">Privacy Guarantee:</strong> Camera streams stay strictly in your browser. Video is never uploaded, recorded, or used for automated scoring.
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose/10 border border-rose/30 rounded-2xl text-xs font-semibold text-rose">
            {errorMsg}
          </div>
        )}

        {/* Start Interview Action Banner with explicit dark container */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a] text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h4 className="font-bold text-white text-base">Ready to enter the Arena?</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Role: <span className="text-orange-400 font-semibold">{config.jobRole}</span> • Type:{" "}
              <span className="text-slate-100 font-semibold">{config.interviewType}</span> • Duration:{" "}
              <span className="text-slate-100 font-semibold">{config.durationMinutes} min</span>
            </p>
          </div>

          <button
            onClick={handleStartInterview}
            disabled={isInitializing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isInitializing ? (
              "Preparing Room..."
            ) : (
              <>
                <Maximize2 className="w-4 h-4" /> Start Interview Room
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
