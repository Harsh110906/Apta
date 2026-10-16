"use client";

import React, { useState } from "react";
import { InterviewQuestion } from "@/types/interview";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";

interface QuestionDisplayProps {
  question: InterviewQuestion;
  turnNumber: number;
  totalPlanned: number;
  isFollowUp?: boolean;
  followUpLevel?: number;
  persona: string;
}

export function QuestionDisplay({
  question,
  turnNumber,
  totalPlanned,
  isFollowUp,
  followUpLevel,
  persona,
}: QuestionDisplayProps) {
  const [showHint, setShowHint] = useState(false);
  const [showRubric, setShowRubric] = useState(false);

  const allowsHints = persona === "Supportive";

  return (
    <div className="bg-bg-secondary dark:bg-midnight-800 rounded-2xl p-6 border border-border dark:border-midnight-600 shadow-md transition-all">
      {/* Header bar with badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-border dark:border-midnight-700">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
            {isFollowUp ? `Follow-up Probe ${followUpLevel ? `#${followUpLevel}` : ""}` : `Question ${turnNumber} of ${totalPlanned}`}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-midnight-700 text-neutral-300 font-medium text-xs">
            {question.competency}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> ~{Math.round(question.timeBudgetSeconds / 60)} min
          </span>
          <span className="capitalize font-semibold text-text-secondary">
            {question.difficulty} Level
          </span>
        </div>
      </div>

      {/* Main Question Text */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground dark:text-white leading-snug mb-4">
        &ldquo;{question.text}&rdquo;
      </h2>

      {/* Collapsible Hint (for Supportive persona) */}
      {allowsHints && question.hint && (
        <div className="mt-4 pt-3 border-t border-border/50 dark:border-midnight-700">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky hover:text-sky/80 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "Hide Coaching Hint" : "Need a hint? (Supportive Mode)"}</span>
            {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-sky/10 border border-sky/20 rounded-xl text-xs font-medium text-sky-200 animate-fade-in leading-relaxed">
              💡 <strong>Coaching tip:</strong> {question.hint}
            </div>
          )}
        </div>
      )}

      {/* Rubric Criteria Preview Toggle */}
      {question.rubricCriteria && question.rubricCriteria.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowRubric(!showRubric)}
            className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-foreground transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{showRubric ? "Hide Evaluation Criteria" : "View Scoring Criteria"}</span>
            {showRubric ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showRubric && (
            <div className="mt-2 p-3.5 bg-neutral-100 dark:bg-midnight-900 rounded-xl border border-border dark:border-midnight-700 animate-fade-in text-xs space-y-1.5">
              <p className="font-semibold text-text-secondary dark:text-neutral-300 mb-1">
                Evaluation dimensions for this competency:
              </p>
              <ul className="space-y-1 text-text-secondary dark:text-neutral-400">
                {question.rubricCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
