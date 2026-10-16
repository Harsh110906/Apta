"use client";

import React, { useRef, useEffect } from "react";
import { Mic, MicOff, Send, Loader2, Sparkles, MessageSquare, RotateCcw } from "lucide-react";
import { InterviewTurn } from "@/types/interview";

interface LiveTranscriptPanelProps {
  turns: InterviewTurn[];
  currentTranscript: string;
  isListening: boolean;
  isSpeaking: boolean;
  isSubmitting: boolean;
  error: string | null;
  onTranscriptChange: (text: string) => void;
  onToggleListening: () => void;
  onSubmitAnswer: () => void;
  onClearTranscript: () => void;
}

export function LiveTranscriptPanel({
  turns,
  currentTranscript,
  isListening,
  isSpeaking,
  isSubmitting,
  error,
  onTranscriptChange,
  onToggleListening,
  onSubmitAnswer,
  onClearTranscript,
}: LiveTranscriptPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const historyBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll history to bottom when new turns arrive
  useEffect(() => {
    historyBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns.length]);

  const wordCount = currentTranscript.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
      {/* Transcript Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Dialogue Transcript</h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
          Editable Response
        </span>
      </div>

      {/* History Turn Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] lg:max-h-[380px] text-sm">
        {turns.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-xs">
            Dialogue history will appear here as the interview progresses.
          </div>
        ) : (
          turns.map((t, idx) => (
            <div key={t.id || idx} className="space-y-2">
              {/* Question message */}
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-orange-500/30">
                  AI
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 flex-1 text-xs leading-relaxed">
                  <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1 text-[11px]">
                    Turn {t.turnNumber}: {t.question.competency}
                  </p>
                  &ldquo;{t.question.text}&rdquo;
                </div>
              </div>

              {/* Candidate answer message */}
              <div className="flex gap-2.5 items-start justify-end pl-8">
                <div className="bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 p-3 rounded-xl text-slate-900 dark:text-slate-100 text-xs leading-relaxed max-w-[90%]">
                  <p className="font-semibold text-slate-500 dark:text-slate-400 text-[10px] mb-1">Your response:</p>
                  <p>{t.answerTranscript}</p>
                  {t.evaluation && (
                    <div className="mt-2 pt-2 border-t border-orange-500/20 text-[11px] text-emerald dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Turn Coaching Score: {t.evaluation.score}/100
                    </div>
                  )}
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-700">
                  You
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={historyBottomRef} />
      </div>

      {/* Candidate Live Answering Box */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col gap-3">
        {/* Active listening status bar */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {isListening ? (
              <span className="flex items-center gap-1.5 text-emerald font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald inline-block" />
                Listening... Speak naturally
              </span>
            ) : isSpeaking ? (
              <span className="flex items-center gap-1.5 text-orange-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-ping" />
                Interviewer is asking question
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                Click microphone to speak or type your answer below:
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            <span>{wordCount} words</span>
          </div>
        </div>

        {/* Textarea for transcript review & manual editing */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={currentTranscript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            disabled={isSubmitting}
            placeholder={
              isListening
                ? "Your spoken words will appear here in real time. You can edit before submitting..."
                : "Type your answer or click the microphone to speak..."
            }
            rows={3}
            className="w-full rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-3 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none transition-all shadow-inner"
          />
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose bg-rose/10 border border-rose/20 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Bottom Answering Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            {/* Mic Button */}
            <button
              onClick={onToggleListening}
              disabled={isSpeaking || isSubmitting}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                isListening
                  ? "bg-rose text-white hover:bg-rose/90 animate-pulse"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 shadow-sm"
              } disabled:opacity-50`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" /> Stop Voice
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-emerald" /> Speak Answer
                </>
              )}
            </button>

            {currentTranscript && (
              <button
                onClick={onClearTranscript}
                disabled={isSubmitting}
                className="px-2.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                title="Clear input"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Submit Answer CTA */}
          <button
            onClick={onSubmitAnswer}
            disabled={!currentTranscript.trim() || isSubmitting}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold shadow-glow flex items-center gap-2 transition-transform active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Evaluating...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Submit Answer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
