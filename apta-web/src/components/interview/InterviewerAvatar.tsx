"use client";

import React from "react";
import { Bot, Volume2, VolumeX, RotateCcw, Sparkles } from "lucide-react";

interface InterviewerAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  isMuted: boolean;
  persona: string;
  isDemo: boolean;
  onToggleMute: () => void;
  onReplayQuestion: () => void;
}

export function InterviewerAvatar({
  isSpeaking,
  isListening,
  isMuted,
  persona,
  isDemo,
  onToggleMute,
  onReplayQuestion,
}: InterviewerAvatarProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-[#0f172a] text-white rounded-2xl border border-slate-700 shadow-xl overflow-hidden text-center backdrop-blur-md">
      {/* Background glow when active */}
      <div
        className={`absolute inset-0 bg-radial-glow transition-opacity duration-700 pointer-events-none ${
          isSpeaking
            ? "opacity-60 scale-110"
            : isListening
            ? "opacity-30 scale-100"
            : "opacity-15"
        }`}
      />

      {/* Mode Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
            isDemo
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-emerald/10 text-emerald border-emerald/30"
          }`}
        >
          <Sparkles className="w-3 h-3" />
          {isDemo ? "Practice Mode (Demo)" : "Live AI"}
        </span>
      </div>

      {/* Top right quick actions */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={onReplayQuestion}
          title="Replay Question Audio"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 text-xs flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Replay</span>
        </button>
        <button
          onClick={onToggleMute}
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose" /> : <Volume2 className="w-4 h-4 text-slate-200" />}
        </button>
      </div>

      {/* Avatar Graphic with Waveform Animation */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Pulsing ring when speaking */}
        {isSpeaking && (
          <>
            <div className="absolute w-36 h-36 rounded-full border-2 border-orange-500/40 animate-ping" />
            <div className="absolute w-44 h-44 rounded-full border border-sky/30 animate-pulse" />
          </>
        )}

        {/* Listening ring when candidate answers */}
        {isListening && (
          <div className="absolute w-36 h-36 rounded-full border-2 border-emerald/40 animate-pulse" />
        )}

        <div
          className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            isSpeaking
              ? "bg-gradient-to-b from-orange-500/20 to-midnight-800 border-orange-500 shadow-glow scale-105"
              : isListening
              ? "bg-gradient-to-b from-emerald/20 to-midnight-800 border-emerald shadow-lg"
              : "bg-midnight-700 border-midnight-600"
          }`}
        >
          <Bot
            className={`w-14 h-14 transition-colors duration-300 ${
              isSpeaking
                ? "text-orange-400"
                : isListening
                ? "text-emerald"
                : "text-neutral-400"
            }`}
          />
        </div>
      </div>

      {/* Waveform indicator bars */}
      <div className="flex items-center gap-1 h-6 my-2">
        {[40, 75, 95, 60, 85, 50, 100, 65, 80, 45].map((height, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-150 ${
              isSpeaking
                ? "bg-orange-500"
                : isListening
                ? "bg-emerald"
                : "bg-midnight-600 h-1.5"
            }`}
            style={{
              height: isSpeaking
                ? `${Math.max(4, (height * Math.random()) | 0)}px`
                : isListening
                ? `${Math.max(4, (height * 0.4) | 0)}px`
                : "4px",
            }}
          />
        ))}
      </div>

      {/* Identity Label */}
      <div className="z-10 mt-1">
        <h3 className="font-bold text-white text-base flex items-center justify-center gap-2">
          Apta AI Interviewer
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Persona: <span className="font-semibold text-neutral-200">{persona}</span> •{" "}
          <span className={isSpeaking ? "text-orange-400 font-medium" : isListening ? "text-emerald font-medium" : "text-neutral-400"}>
            {isSpeaking ? "Speaking question..." : isListening ? "Listening to your answer..." : "Ready"}
          </span>
        </p>
      </div>
    </div>
  );
}
