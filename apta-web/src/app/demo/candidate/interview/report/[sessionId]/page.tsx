"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Briefcase,
  Building2,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileText,
  History,
  Loader2,
} from "lucide-react";
import { InterviewReport } from "@/types/interview";
import { interviewStorage } from "@/services/interview/storageAdapter";
import { useInterviewStore } from "@/features/interview/useInterviewStore";

interface ReportPageProps {
  params: Promise<{ sessionId: string }>;
}

export default function InterviewReportPage({ params }: ReportPageProps) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();
  const { setConfig } = useInterviewStore();

  const [report, setReport] = useState<InterviewReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReport() {
      try {
        // Try local storage first
        let rep = await interviewStorage.getReport(sessionId);

        // If not found locally, fetch from API
        if (!rep) {
          const res = await fetch(`/api/interview/session/${sessionId}/report`);
          if (res.ok) {
            const data = await res.json();
            rep = data.report;
            if (rep) {
              await interviewStorage.saveReport(rep);
            }
          }
        }

        if (isMounted) {
          if (rep) {
            setReport(rep);
          } else {
            setError("Coaching report not found for this session.");
          }
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load coaching report.");
          setIsLoading(false);
        }
      }
    }

    loadReport();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const handleRetakeEquivalent = () => {
    if (!report) return;
    setConfig({
      jobRole: report.role,
      interviewType: report.interviewType,
      durationMinutes: (report.durationMinutes as any) || 10,
      targetCompany: report.targetCompany,
      mode: "demo",
    });
    router.push("/demo/candidate/interview/device-check");
  };

  const handleHarderSession = () => {
    if (!report) return;
    setConfig({
      jobRole: report.role,
      interviewType: report.interviewType,
      durationMinutes: (report.durationMinutes as any) || 20,
      interviewerPersona: "Challenging",
      targetCompany: report.targetCompany,
      mode: "demo",
    });
    router.push("/demo/candidate/interview/device-check");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="font-bold text-sm text-text-secondary">Synthesizing Performance Evaluation...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-rose mb-3" />
        <h2 className="text-xl font-bold mb-2">Report Not Found</h2>
        <p className="text-sm text-text-secondary max-w-md mb-6">
          {error || "Could not retrieve report data for this interview."}
        </p>
        <Link
          href="/demo/candidate/interview"
          className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-glow"
        >
          Start New Simulation
        </Link>
      </div>
    );
  }

  const isComplete = report.completionStatus === "completed";

  return (
    <div className="flex-1 py-10 px-4 md:px-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border dark:border-midnight-700 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Performance Report
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Interview Coaching Analysis</h1>
          <p className="text-text-secondary text-sm md:text-base mt-1">
            Detailed evaluation, competency scores, and actionable growth plan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/demo/candidate/interview/history"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-secondary dark:bg-midnight-800 border border-border dark:border-midnight-600 text-xs font-semibold hover:border-orange-500/50 transition-colors shadow-sm"
          >
            <History className="w-4 h-4 text-orange-500" /> All Sessions
          </Link>
          <Link
            href="/demo/candidate/ai-tools"
            className="px-4 py-2 rounded-xl bg-bg-secondary dark:bg-midnight-800 border border-border dark:border-midnight-600 text-xs font-semibold text-text-muted hover:text-foreground transition-colors"
          >
            Exit to AI Tools
          </Link>
        </div>
      </div>

      {/* Overview Card: Score, Role & Status */}
      <div className="bg-bg-secondary dark:bg-midnight-800 rounded-3xl p-6 md:p-8 border border-border dark:border-midnight-600 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Score Badge (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-midnight-900 rounded-2xl border border-midnight-700 text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Overall Coaching Estimate
          </span>
          {report.overallScore !== null ? (
            <div className="relative my-2">
              <span className="text-5xl md:text-6xl font-black text-orange-500 font-display">
                {report.overallScore}
              </span>
              <span className="text-lg font-bold text-neutral-400">/100</span>
            </div>
          ) : (
            <div className="my-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-semibold">
              Insufficient Evidence (&lt; 2 questions completed)
            </div>
          )}
          <p className="text-[11px] text-neutral-400 mt-2 max-w-[220px]">
            Private coaching score based on evaluated competencies. Not a public hiring endorsement.
          </p>
        </div>

        {/* Metadata & Status (8 cols) */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 dark:text-orange-400 text-xs font-bold border border-orange-500/20">
              {report.role}
            </span>
            <span className="px-3 py-1 rounded-lg bg-midnight-700 text-neutral-200 text-xs font-semibold border border-midnight-600">
              {report.interviewType} Round
            </span>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                isComplete
                  ? "bg-emerald/10 text-emerald border-emerald/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {isComplete ? "Completed Simulation" : "Ended Early"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            {report.targetCompany && (
              <div className="p-3 bg-bg-primary dark:bg-midnight-900 rounded-xl border border-border dark:border-midnight-700">
                <span className="text-text-muted block text-[10px] font-bold uppercase">Target Company</span>
                <span className="font-semibold text-foreground dark:text-white flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-sky" /> {report.targetCompany}
                </span>
              </div>
            )}
            <div className="p-3 bg-bg-primary dark:bg-midnight-900 rounded-xl border border-border dark:border-midnight-700">
              <span className="text-text-muted block text-[10px] font-bold uppercase">Questions Answered</span>
              <span className="font-semibold text-foreground dark:text-white mt-0.5 block">
                {report.totalQuestionsAnswered} Questions
              </span>
            </div>
            <div className="p-3 bg-bg-primary dark:bg-midnight-900 rounded-xl border border-border dark:border-midnight-700">
              <span className="text-text-muted block text-[10px] font-bold uppercase">Time Elapsed</span>
              <span className="font-semibold text-foreground dark:text-white mt-0.5 block">
                {Math.round(report.activeElapsedSeconds / 60)} minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Breakdown Grid */}
      <div className="bg-bg-secondary dark:bg-midnight-800 rounded-3xl p-6 md:p-8 border border-border dark:border-midnight-600 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-500" /> Competency Breakdown
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Scores reflect evidence collected across your responses and follow-up probes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.competencyScores.map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-700 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground dark:text-white">{c.competency}</span>
                <span className="font-bold text-sm font-mono text-orange-500">
                  {c.assessed ? `${c.score}/100` : "Unassessed"}
                </span>
              </div>

              {/* Score bar */}
              <div className="w-full bg-neutral-200 dark:bg-midnight-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    c.assessed ? "bg-gradient-to-r from-orange-500 to-amber-400" : "bg-neutral-600"
                  }`}
                  style={{ width: `${c.assessed ? c.score : 0}%` }}
                />
              </div>

              <p className="text-xs text-text-secondary dark:text-neutral-400 leading-relaxed">
                {c.evidence}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvement Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3 Strengths */}
        <div className="p-6 bg-emerald/10 border border-emerald/20 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-base text-emerald flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Top Observed Strengths
          </h3>
          <ul className="space-y-3 text-xs md:text-sm font-medium text-emerald-300">
            {report.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="shrink-0 mt-0.5 text-emerald font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3 Areas of Improvement */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-base text-amber-400 flex items-center gap-2">
            <Zap className="w-5 h-5" /> High-Impact Improvement Areas
          </h3>
          <ul className="space-y-3 text-xs md:text-sm font-medium text-amber-200">
            {report.improvementAreas.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="shrink-0 mt-0.5 text-amber-400 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Traceable Question-by-Question Review */}
      <div className="bg-bg-secondary dark:bg-midnight-800 rounded-3xl p-6 md:p-8 border border-border dark:border-midnight-600 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-500" /> Question-by-Question Feedback
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Traceable analysis linking your exact response to the competency criteria.
          </p>
        </div>

        <div className="space-y-6">
          {report.perQuestionFeedback.map((item, idx) => (
            <div
              key={item.turnId || idx}
              className="p-5 rounded-2xl bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-700 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 dark:border-midnight-700 pb-3">
                <span className="text-xs font-bold text-orange-500">
                  Question {idx + 1}: {item.competency}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-300 px-2 py-0.5 rounded bg-midnight-800">
                  Score: {item.score}/100
                </span>
              </div>

              {/* Question Text */}
              <p className="text-sm font-bold text-foreground dark:text-neutral-100">
                &ldquo;{item.questionText}&rdquo;
              </p>

              {/* Candidate Transcript */}
              <div className="p-3.5 rounded-xl bg-midnight-800/80 border border-midnight-700 text-xs text-neutral-300">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Your Answer Excerpt:
                </p>
                <p className="italic leading-relaxed">
                  {item.answerTranscript.length > 300
                    ? `"${item.answerTranscript.substring(0, 300)}..."`
                    : `"${item.answerTranscript}"`}
                </p>
              </div>

              {/* Coach Evaluation Feedback */}
              <div className="text-xs text-neutral-300 space-y-1 leading-relaxed">
                <p className="font-semibold text-emerald">Coach Feedback:</p>
                <p>{item.feedback}</p>
              </div>

              {/* Suggested Answer Framework */}
              <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-xs text-neutral-300">
                <p className="font-bold text-orange-400 mb-0.5 text-[11px]">
                  💡 Recommended Answer Framework:
                </p>
                <p className="text-neutral-300">{item.suggestedFramework}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Practice & Action Items */}
      <div className="bg-midnight-900 rounded-3xl p-6 md:p-8 border border-midnight-600 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" /> Actionable Next Steps
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Targeted drills recommended based on your response patterns:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {report.nextActions.map((action, i) => (
            <div key={i} className="p-4 rounded-xl bg-midnight-800 border border-midnight-700 text-xs text-neutral-200">
              <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-bold inline-flex items-center justify-center mb-2">
                {i + 1}
              </span>
              <p className="font-medium leading-relaxed">{action}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-midnight-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRetakeEquivalent}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Equivalent Simulation
            </button>
            <button
              onClick={handleHarderSession}
              className="px-5 py-2.5 rounded-xl bg-midnight-700 hover:bg-midnight-600 text-neutral-200 font-bold text-xs border border-midnight-600 transition-colors flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Practice Harder Level (Bar Raiser)
            </button>
          </div>

          <Link
            href="/demo/candidate/ai-tools"
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            Back to AI Career Tools &rarr;
          </Link>
        </div>
      </div>

      {/* Disclaimers & Ethics Guarantee */}
      <div className="p-4 rounded-2xl bg-midnight-950 border border-midnight-800 text-[11px] text-neutral-400 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-neutral-300">Methodology & Privacy Disclosure</p>
          <p>{report.providerNotice}</p>
          <p>
            All coaching scores are strictly non-public formative practice aids. They are never transmitted to recruiters or used to calculate leaderboard rankings without candidate initiation.
          </p>
        </div>
      </div>
    </div>
  );
}
