"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  History,
  Briefcase,
  Clock,
  ArrowRight,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { InterviewSession } from "@/types/interview";
import { useInterviewStore } from "@/features/interview/useInterviewStore";

export default function InterviewHistoryPage() {
  const { history, loadHistory, deleteSessionHistory } = useInterviewStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory().finally(() => setIsLoading(false));
  }, [loadHistory]);

  return (
    <div className="flex-1 py-10 px-4 md:px-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border dark:border-midnight-700 pb-6">
        <div>
          <Link
            href="/demo/candidate/interview"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Interview Arena
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Interview Simulation History</h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Review your past mock sessions, coaching evaluations, and progress over time.
          </p>
        </div>

        <Link
          href="/demo/candidate/interview"
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-glow flex items-center gap-2 self-start sm:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Start New Simulation
        </Link>
      </div>

      {/* History List */}
      {history.length === 0 && !isLoading ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-lg max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">No Interview Sessions Yet</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Configure your target company, expected compensation, and role to run your first virtual interview simulation.
          </p>
          <Link
            href="/demo/candidate/interview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-glow"
          >
            Launch Interview Arena <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((session) => {
            const isCompleted = session.status === "completed";
            const dateStr = new Date(session.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            const score = session.report?.overallScore ?? null;

            return (
              <div
                key={session.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-orange-500/40"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      {session.config.jobRole}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {session.config.interviewType}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                        isCompleted
                          ? "bg-emerald/10 text-emerald"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" /> Ended Early
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{dateStr}</span>
                    <span>•</span>
                    <span>{session.config.durationMinutes} min target</span>
                    <span>•</span>
                    <span>{session.turns.length} questions answered</span>
                    {session.config.targetCompany && (
                      <>
                        <span>•</span>
                        <span className="text-sky font-medium">{session.config.targetCompany}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Score</span>
                    <span className="text-lg font-black font-display text-orange-500">
                      {score !== null ? `${score}/100` : "N/A"}
                    </span>
                  </div>

                  <Link
                    href={`/demo/candidate/interview/report/${session.id}`}
                    className="px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    View Report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => deleteSessionHistory(session.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose hover:bg-rose/10 transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
