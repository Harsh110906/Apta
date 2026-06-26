"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { ThumbsUp, X, CheckCircle2, Keyboard } from "lucide-react";
import { RankBadge } from "@/components/ui/RankBadge";
import { useSearchStore } from "@/features/search/useSearchStore";

export default function RecruiterSwipe() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState<"left" | "right" | null>(null);

  const { rankedResults, addToShortlist } = useSearchStore();

  const candidates = rankedResults.map(c => ({
    originalCandidate: c,
    name: c.uiPresentationMetadata?.name || 'Candidate',
    rank: (c.uiPresentationMetadata?.visualRankTier || 'Unranked') as "Elite" | "Diamond" | "Platinum" | "Gold" | "Silver" | "Unranked",
    headline: c.uiPresentationMetadata?.domain || 'General',
    skills: (c.uiPresentationMetadata?.verifiedSkills || []).map((s: any) => s.name),
    points: Math.floor(c.score * 100),
    streak: c.uiPresentationMetadata?.pseudoStreak || 0,
    certifications: [] as any[],
    reasoning: c.reasoning
  }));

  const handleSwipe = useCallback((direction: "left" | "right") => {
    if (animating) return;
    setAnimating(direction);
    
    if (direction === "right" && candidates[currentIndex]) {
      addToShortlist(candidates[currentIndex].originalCandidate);
    }
    
    setTimeout(() => {
      setAnimating(null);
      if (currentIndex < candidates.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.push("/demo/recruiter/pipeline");
      }
    }, 400);
  }, [animating, candidates, currentIndex, router, addToShortlist]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwipe]);

  if (candidates.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-grid">
        <h2 className="text-xl font-bold mb-4">No candidates to review</h2>
        <Button onClick={() => router.push("/demo/recruiter/setup")}>Go back to Search</Button>
      </div>
    );
  }

  if (currentIndex >= candidates.length) return null;

  const candidate = candidates[currentIndex];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-grid overflow-hidden">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-lg">Curated Stack</h2>
          <p className="text-sm text-text-muted">{currentIndex + 1} of {candidates.length} candidates</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/demo/recruiter/pipeline")}>
          View Pipeline
        </Button>
      </div>

      <div className="relative w-full max-w-md h-[600px]">
        {/* Next Card Background */}
        {currentIndex < candidates.length - 1 && (
          <div className="absolute inset-0 bg-bg-secondary rounded-3xl border border-border shadow-md scale-95 translate-y-4 opacity-50 z-0" />
        )}

        {/* Current Card */}
        <div 
          className={`absolute inset-0 bg-bg-secondary rounded-3xl border border-border shadow-2xl z-10 flex flex-col overflow-hidden transition-all duration-400 ease-out
            ${animating === 'left' ? '-translate-x-full rotate-[-15deg] opacity-0' : ''}
            ${animating === 'right' ? 'translate-x-full rotate-[15deg] opacity-0' : ''}
          `}
        >
          <div className="p-6 border-b border-border bg-bg-tertiary">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0">
                {candidate.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <RankBadge rank={candidate.rank} size="md" />
            </div>
            <h3 className="text-2xl font-bold">{candidate.name}</h3>
            <p className="text-text-secondary">{candidate.headline}</p>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            
            <div className="mb-6">
              <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Engine Reasoning</div>
              <div className="text-sm text-text-secondary bg-sky-500/10 border border-sky-500/20 p-3 rounded-xl italic">
                "{candidate.reasoning}"
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Verified Skills</div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1.5 bg-emerald/10 text-emerald border border-emerald/20 rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Apta Metrics</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-tertiary p-3 rounded-xl border border-border">
                  <div className="text-xs text-text-secondary mb-1">Total Points</div>
                  <div className="font-bold">{candidate.points.toLocaleString()}</div>
                </div>
                <div className="bg-bg-tertiary p-3 rounded-xl border border-border">
                  <div className="text-xs text-text-secondary mb-1">Current Streak</div>
                  <div className="font-bold flex items-center gap-1">
                    <span className="text-orange-500">🔥</span> {candidate.streak}
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="p-6 border-t border-border flex gap-4 bg-bg-primary">
            <button 
              onClick={() => handleSwipe("left")}
              className="flex-1 py-4 rounded-2xl border-2 border-border flex items-center justify-center text-rose hover:bg-rose/10 hover:border-rose/30 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button 
              onClick={() => handleSwipe("right")}
              className="flex-1 py-4 rounded-2xl bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors shadow-glow"
            >
              <ThumbsUp className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-text-muted text-sm animate-pulse">
        <Keyboard className="w-4 h-4" /> Use ← → arrow keys to swipe
      </div>
    </div>
  );
}
