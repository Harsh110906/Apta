"use client";

import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  FileText,
  LogOut,
  AlertTriangle,
} from "lucide-react";

interface RoomControlBarProps {
  isMuted: boolean;
  isCameraActive: boolean;
  isPaused: boolean;
  isFullscreen: boolean;
  showTranscript: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onTogglePause: () => void;
  onToggleFullscreen: () => void;
  onToggleTranscript: () => void;
  onEndInterview: () => void;
}

export function RoomControlBar({
  isMuted,
  isCameraActive,
  isPaused,
  isFullscreen,
  showTranscript,
  onToggleMute,
  onToggleCamera,
  onTogglePause,
  onToggleFullscreen,
  onToggleTranscript,
  onEndInterview,
}: RoomControlBarProps) {
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  return (
    <>
      <div className="h-16 bg-bg-secondary dark:bg-midnight-900 border-t border-border dark:border-midnight-700 px-4 md:px-8 flex items-center justify-between sticky bottom-0 z-40 backdrop-blur-md">
        {/* Left: Media Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isMuted
                ? "bg-rose/10 border-rose/30 text-rose"
                : "bg-midnight-800 hover:bg-midnight-700 border-midnight-600 text-neutral-200"
            }`}
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <MicOff className="w-4 h-4 text-rose" /> : <Mic className="w-4 h-4 text-emerald" />}
            <span className="hidden sm:inline">{isMuted ? "Muted" : "Mic"}</span>
          </button>

          <button
            onClick={onToggleCamera}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isCameraActive
                ? "bg-midnight-800 hover:bg-midnight-700 border-midnight-600 text-neutral-200"
                : "bg-midnight-800/50 border-midnight-700 text-neutral-400"
            }`}
            title={isCameraActive ? "Disable camera" : "Enable camera"}
          >
            {isCameraActive ? (
              <Video className="w-4 h-4 text-sky" />
            ) : (
              <VideoOff className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isCameraActive ? "Camera On" : "Camera Off"}</span>
          </button>
        </div>

        {/* Center: Session Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePause}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPaused
                ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                : "bg-midnight-800 hover:bg-midnight-700 border-midnight-600 text-neutral-200"
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span>{isPaused ? "Resume Session" : "Pause Session"}</span>
          </button>

          <button
            onClick={onToggleTranscript}
            className={`p-2.5 rounded-xl border transition-colors text-xs font-semibold flex items-center gap-1.5 ${
              showTranscript
                ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                : "bg-midnight-800 hover:bg-midnight-700 border-midnight-600 text-neutral-400"
            }`}
            title="Toggle Transcript Drawer"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Transcript</span>
          </button>
        </div>

        {/* Right: Fullscreen & Exit */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFullscreen}
            className="p-2.5 rounded-xl bg-midnight-800 hover:bg-midnight-700 border border-midnight-600 text-neutral-300 transition-colors hidden sm:flex"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowConfirmEnd(true)}
            className="px-3.5 py-2 rounded-xl bg-rose/10 hover:bg-rose/20 text-rose border border-rose/30 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Finish & Exit</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Ending Early */}
      {showConfirmEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-secondary dark:bg-midnight-800 border border-border dark:border-midnight-600 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-500">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-foreground dark:text-white">End Interview Simulation?</h3>
            </div>

            <p className="text-sm text-text-secondary dark:text-neutral-300 leading-relaxed">
              Are you sure you want to wrap up this interview now? You will immediately receive a coaching performance report evaluating the questions you answered so far.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-text-muted hover:text-foreground dark:hover:text-white transition-colors"
              >
                Continue Interview
              </button>
              <button
                onClick={() => {
                  setShowConfirmEnd(false);
                  onEndInterview();
                }}
                className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-glow transition-all"
              >
                Generate Report & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
