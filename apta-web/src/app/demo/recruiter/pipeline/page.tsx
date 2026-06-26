"use client";

import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { useSearchStore } from "@/features/search/useSearchStore";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2 } from "lucide-react";

export default function RecruiterPipeline() {
  const { shortlisted } = useSearchStore();

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
      <MotionWrapper animation="fade-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Recruitment Pipeline</h1>
            <p className="text-text-secondary">Manage your shortlisted candidates and AI outreach.</p>
          </div>
          <Button>Generate AI Emails</Button>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shortlisted Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-semibold">Shortlisted</h3>
            <span className="bg-bg-tertiary text-text-muted px-2 py-0.5 rounded-full text-xs font-bold">{shortlisted.length}</span>
          </div>

          {shortlisted.map((candidate, idx) => (
            <MotionWrapper key={candidate.candidate_id} animation="fade-up" delay={idx * 100}>
              <div className="bg-bg-secondary p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold">{candidate.uiPresentationMetadata?.name || 'Candidate'}</div>
                  <div className="text-xs font-bold text-sky-500 bg-sky-500/10 px-2 py-1 rounded-md">
                    {candidate.uiPresentationMetadata?.visualRankTier || 'Unranked'}
                  </div>
                </div>
                <p className="text-xs text-text-secondary mb-4 line-clamp-1">{candidate.uiPresentationMetadata?.domain || 'General'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {(candidate.uiPresentationMetadata?.verifiedSkills || []).slice(0, 3).map((s: any, i: number) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center text-[10px] text-emerald" title={s.name}>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                  <button className="text-xs font-medium text-orange-500 flex items-center gap-1 hover:text-orange-600 transition-colors">
                    <Mail className="w-3 h-3" /> Draft AI Email
                  </button>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* Contacted Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-semibold">Contacted</h3>
            <span className="bg-bg-tertiary text-text-muted px-2 py-0.5 rounded-full text-xs font-bold">0</span>
          </div>
          <div className="h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-muted text-sm">
            Drag candidates here
          </div>
        </div>

        {/* Interviewing Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-semibold">Interviewing</h3>
            <span className="bg-bg-tertiary text-text-muted px-2 py-0.5 rounded-full text-xs font-bold">0</span>
          </div>
          <div className="h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-muted text-sm">
            Drag candidates here
          </div>
        </div>
      </div>
    </div>
  );
}
