"use client";

import React, { useEffect, useRef } from "react";
import { Video, VideoOff, ShieldCheck } from "lucide-react";

interface CandidateVideoPreviewProps {
  isActive: boolean;
  onToggleCamera: () => void;
}

export function CandidateVideoPreview({
  isActive,
  onToggleCamera,
}: CandidateVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function initCamera() {
      if (!isActive) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
          audio: false,
        });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("[CandidateVideoPreview] Camera access failed:", err);
      }
    }

    initCamera();

    return () => {
      isCancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isActive]);

  return (
    <div className="relative bg-midnight-900 rounded-2xl border border-midnight-600 overflow-hidden shadow-lg aspect-video flex items-center justify-center">
      {isActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          {/* Privacy badge */}
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-midnight-950/80 backdrop-blur text-[10px] text-neutral-300 font-medium border border-midnight-700">
            <ShieldCheck className="w-3 h-3 text-emerald" />
            <span>Local Preview Only • Not Recorded</span>
          </div>
          {/* Quick toggle button */}
          <button
            onClick={onToggleCamera}
            title="Turn camera off"
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-midnight-800/80 hover:bg-midnight-700 text-neutral-300 hover:text-white transition-colors border border-midnight-600"
          >
            <VideoOff className="w-4 h-4 text-rose" />
          </button>
        </>
      ) : (
        <div className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-midnight-800 border border-midnight-700 flex items-center justify-center mb-3 text-neutral-400">
            <VideoOff className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-neutral-300 mb-1">Camera is off</p>
          <p className="text-[11px] text-neutral-400 max-w-[200px] mb-3">
            Video is optional and not required to complete the interview.
          </p>
          <button
            onClick={onToggleCamera}
            className="px-3 py-1.5 rounded-lg bg-midnight-700 hover:bg-midnight-600 border border-midnight-600 text-xs font-semibold text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5 text-sky" /> Enable Camera
          </button>
        </div>
      )}
    </div>
  );
}
