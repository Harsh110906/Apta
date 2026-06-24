"use client";

import Link from "next/link";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { CURRENT_USER } from "@/data/candidates";
import { CheckCircle2, TrendingUp, ShieldCheck, Brain, Trophy, Sparkles, ArrowRight } from "lucide-react";

// Generate a simple streak heatmap for the last 28 days
function StreakHeatmap() {
  const days = Array.from({ length: 28 }, (_, i) => {
    // Simulate: most days active, a few missed
    const missed = [5, 12, 19].includes(i);
    return { day: i, active: !missed };
  });

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div>
      <div className="flex gap-0.5 mb-1">
        {dayLabels.map((d, i) => (
          <div key={i} className="w-6 h-4 text-[9px] text-text-muted flex items-center justify-center font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d) => (
          <div
            key={d.day}
            className={`w-6 h-6 rounded-md transition-colors ${
              d.active
                ? "bg-orange-500/80 hover:bg-orange-500"
                : "bg-neutral-200 dark:bg-midnight-600 hover:bg-neutral-300 dark:hover:bg-midnight-500"
            }`}
            title={d.active ? "Active" : "Missed"}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-text-muted">
        <span>4 weeks ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

// Rank tiers in order with their progress thresholds
const RANK_THRESHOLDS = [
  { tier: "Bronze", min: 0 },
  { tier: "Silver", min: 2000 },
  { tier: "Gold", min: 5000 },
  { tier: "Platinum", min: 10000 },
  { tier: "Diamond", min: 15000 },
  { tier: "Elite", min: 20000 },
  { tier: "Legend", min: 30000 },
];

import { RankBadge } from "@/components/ui/RankBadge";

function RankProgressCard() {
  const currentTierIdx = RANK_THRESHOLDS.findIndex((t) => t.tier === CURRENT_USER.rank);
  const nextTier = RANK_THRESHOLDS[currentTierIdx + 1];
  const currentMin = RANK_THRESHOLDS[currentTierIdx]?.min ?? 0;
  const nextMin = nextTier?.min ?? CURRENT_USER.points;

  const rangeTotal = nextMin - currentMin;
  const rangeCurrent = CURRENT_USER.points - currentMin;
  const progressPercent = Math.min(100, Math.round((rangeCurrent / rangeTotal) * 100));
  const pointsToNext = nextMin - CURRENT_USER.points;

  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-secondary">Rank Progress</h3>
        <TrendingUp className="w-5 h-5 text-sky" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <RankBadge rank={CURRENT_USER.rank} size="lg" />
        {nextTier && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-text-muted font-medium mb-1">Next Rank</span>
            <RankBadge rank={nextTier.tier as any} size="sm" />
          </div>
        )}
      </div>
      <div className="w-full bg-neutral-200 dark:bg-midnight-600 rounded-full h-3 mb-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-text-muted">
        <span>{CURRENT_USER.points.toLocaleString()} pts</span>
        {nextTier && <span>{pointsToNext.toLocaleString()} pts to {nextTier.tier}</span>}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

function IdentityVerification({ onVerifiedCountChange }: { onVerifiedCountChange: (count: number) => void }) {
  const [loginMethod, setLoginMethod] = useState<string | null>(null);
  const [verifiedStates, setVerifiedStates] = useState<Record<string, boolean>>({});
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const method = params.get("login");
    setLoginMethod(method);
    const initialStates = {
      phone: false,
      email: ["google", "email"].includes(method || ""),
      linkedin: false,
      github: method === "github",
    };
    setVerifiedStates(initialStates);
    onVerifiedCountChange(Object.values(initialStates).filter(Boolean).length);
  }, []);

  const handleVerifySubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const newStates = { ...verifiedStates, [id]: true };
      setVerifiedStates(newStates);
      setVerifyingId(null);
      setInputValue("");
      setIsSubmitting(false);
      onVerifiedCountChange(Object.values(newStates).filter(Boolean).length);
    }, 800);
  };

  const items = [
    { id: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 000-0000" },
    { id: "email", label: "Email Address", required: true, placeholder: "alex@example.com" },
    { id: "linkedin", label: "LinkedIn ID", required: true, placeholder: "linkedin.com/in/alex" },
    { id: "github", label: "GitHub ID", required: true, placeholder: "github.com/alex" },
  ];

  const verifiedCount = Object.values(verifiedStates).filter(Boolean).length;
  const isComplete = verifiedCount === items.length;

  return (
    <div className={`bg-bg-secondary rounded-2xl p-6 border transition-colors duration-500 ${isComplete ? 'border-emerald/30' : 'border-rose/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text-secondary flex items-center gap-2">
            Identity Verification 
            {isComplete ? (
              <span className="text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full font-bold">100% Complete</span>
            ) : (
              <span className="text-xs bg-rose/10 text-rose px-2 py-0.5 rounded-full font-bold animate-pulse">Action Required</span>
            )}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            {isComplete 
              ? "Your profile is fully verified and prioritized for recruiters." 
              : "Incomplete verification reduces your readiness and visibility to hiring teams."}
          </p>
        </div>
        <ShieldCheck className={`w-6 h-6 transition-colors duration-500 ${isComplete ? 'text-emerald' : 'text-rose'}`} />
      </div>

      <div className="space-y-3 mt-4">
        {items.map(item => {
          const isVerified = verifiedStates[item.id];
          const isVerifying = verifyingId === item.id;
          
          return (
            <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isVerified ? 'border-border bg-bg-tertiary' : 'border-rose/20 bg-rose/5'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full transition-colors ${isVerified ? 'bg-emerald' : 'bg-rose'}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {item.required && <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Required</span>}
              </div>
              
              {isVerified ? (
                <span className="text-emerald text-xs font-bold flex items-center gap-1 animate-fade-in"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
              ) : isVerifying ? (
                <form onSubmit={(e) => handleVerifySubmit(e, item.id)} className="flex items-center gap-2 animate-fade-in">
                  <input 
                    type="text" 
                    placeholder={item.placeholder} 
                    className="text-xs bg-bg-primary border border-border rounded px-2 py-1.5 outline-none focus:border-orange-500 w-36 transition-colors" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)} 
                    autoFocus 
                  />
                  <button type="submit" disabled={isSubmitting} className="text-white text-xs font-bold px-3 py-1.5 bg-orange-500 rounded flex items-center justify-center min-w-[60px] hover:bg-orange-600 transition-colors">
                    {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                  </button>
                  <button type="button" onClick={() => setVerifyingId(null)} className="text-text-muted hover:text-foreground text-xs ml-1 font-medium transition-colors">Cancel</button>
                </form>
              ) : (
                <button 
                  onClick={() => { setVerifyingId(item.id); setInputValue(""); }} 
                  className="text-orange-500 hover:text-orange-600 text-xs font-bold px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg transition-colors"
                >
                  Verify Now
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      {!isComplete && (
        <div className="mt-4 text-xs text-rose/80 font-medium bg-rose/5 p-3 rounded-lg border border-rose/10">
          Your profile will not be shown to top-tier verified recruiters until all required identities are confirmed.
        </div>
      )}
    </div>
  );
}

function AIAnalysisModal({ isOpen, onClose, verifiedCount }: { isOpen: boolean; onClose: () => void; verifiedCount: number }) {
  if (!isOpen) return null;

  // Dynamic mock state interpretation
  const mockQuizScore = 92; 
  const isProfileStrong = CURRENT_USER.streak > 5 && verifiedCount >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-secondary w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-bg-tertiary">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> AI Performance Analysis
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-primary text-text-muted hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 text-orange-600 dark:text-orange-500">
            <span className="font-bold block mb-1.5 text-base">Strong Momentum Detected 🚀</span>
            <span className="text-sm font-medium leading-relaxed block">
              Your recent mock quiz score of {mockQuizScore}% is exceptional. Combined with your {CURRENT_USER.streak}-day streak, you are highly competitive for Mid-to-Senior level {CURRENT_USER.domain} roles right now.
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-xl p-5 bg-bg-primary shadow-sm">
              <h3 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-3">Current Strengths</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" /> Component Architecture</li>
                <li className="flex items-start gap-2.5 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" /> State Management</li>
                <li className="flex items-start gap-2.5 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" /> High test consistency</li>
              </ul>
            </div>
            <div className="border border-border rounded-xl p-5 bg-bg-primary shadow-sm">
              <h3 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-3">Improvement Areas</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-rose/20 text-rose flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">!</div> 
                  System Design Concepts
                </li>
                <li className="flex items-start gap-2.5 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-rose/20 text-rose flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">!</div> 
                  Resume Impact Metrics
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-border rounded-xl p-5 bg-bg-primary shadow-sm flex items-start gap-4">
            <Trophy className="w-8 h-8 text-gold shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-foreground mb-1">Rank Insight</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your ranking is steadily climbing. Adding one more verified certification could push you into the top 10% of the {CURRENT_USER.rank} tier. Keep up the {CURRENT_USER.streak}-day streak!
              </p>
            </div>
          </div>
          
          {verifiedCount < 4 && (
            <div className="border border-rose/30 bg-rose/5 rounded-xl p-5 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-rose shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-rose mb-1">Identity Action Required</h3>
                <p className="text-sm text-rose/80 leading-relaxed">
                  You have {4 - verifiedCount} unverified identity items. This severely limits your visibility to top-tier verified recruiters.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-border bg-bg-tertiary flex items-center justify-end gap-3">
          <Link href="/demo/candidate/ai-tools">
            <button className="bg-bg-primary border border-border px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-midnight-600 transition-colors shadow-sm">
              Analyze Resume
            </button>
          </Link>
          <Link href="/demo/candidate/ai-tools">
            <button className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-glow flex items-center gap-2">
              Improve with AI Tools <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDashboard() {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [verifiedCount, setVerifiedCount] = useState(0);

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
      <AIAnalysisModal isOpen={isAnalysisOpen} onClose={() => setIsAnalysisOpen(false)} verifiedCount={verifiedCount} />
      
      <MotionWrapper animation="fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {CURRENT_USER.name.split(' ')[0]}</h1>
            <p className="text-text-secondary">Here&apos;s your current standing in {CURRENT_USER.domain}.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="bg-bg-secondary border border-border px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="text-orange-500 animate-pulse">🔥</span>
              <span className="font-bold">{CURRENT_USER.streak} Days</span>
            </div>
            <Link href="/demo/candidate/daily-test">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold shadow-glow hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Brain className="w-4 h-4" /> Take Daily Test
              </button>
            </Link>
          </div>
        </div>
      </MotionWrapper>

      <div className="mb-6">
        <MotionWrapper animation="fade-up" delay={50}>
          <IdentityVerification onVerifiedCountChange={setVerifiedCount} />
        </MotionWrapper>
      </div>

      {/* Top Row: Rank Progress + Streak Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MotionWrapper animation="fade-up" delay={100} className="h-full">
          <RankProgressCard />
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={200} className="h-full">
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-secondary">Streak Calendar</h3>
              <span className="text-sm font-bold text-orange-500 flex items-center gap-1">
                🔥 {CURRENT_USER.streak} days
              </span>
            </div>
            <StreakHeatmap />
          </div>
        </MotionWrapper>
      </div>

      {/* Middle Row: Skills + AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MotionWrapper animation="fade-up" delay={300}>
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-secondary">Verified Skills</h3>
              <ShieldCheck className="w-5 h-5 text-emerald" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {CURRENT_USER.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-emerald/10 text-emerald rounded-lg text-sm font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {skill}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-2">
              <div className="text-xs text-text-muted font-medium">Top 5% of your domain for verified skill count</div>
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={400}>
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border h-full relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="font-semibold text-text-secondary">AI Coach Suggestions</h3>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <ul className="space-y-3 relative z-10 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                <span className="font-medium text-text-secondary">Your resume lacks specific impact metrics. Add quantified achievements to stand out.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-sky mt-1.5 shrink-0" />
                <span className="font-medium text-text-secondary">Practice a mock interview for &quot;Senior Frontend Engineer&quot; role.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
                <span className="font-medium text-text-secondary">Consider adding a &quot;System Design&quot; certification to your profile.</span>
              </li>
            </ul>
            <button 
              onClick={() => setIsAnalysisOpen(true)}
              className="mt-4 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors relative z-10 self-start inline-flex items-center gap-1"
            >
              View AI Analysis <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </MotionWrapper>
      </div>

      {/* Quick Actions */}
      <MotionWrapper animation="fade-up" delay={450}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Link href="/demo/candidate/daily-test" className="group">
            <div className="bg-bg-secondary rounded-xl p-4 border border-border flex items-center gap-4 hover:shadow-md hover:border-orange-500/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="font-semibold text-sm">Daily Test</div>
                <div className="text-xs text-text-muted">5 questions · 5 min</div>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/demo/candidate/leaderboard" className="group">
            <div className="bg-bg-secondary rounded-xl p-4 border border-border flex items-center gap-4 hover:shadow-md hover:border-gold/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-sm">Leaderboard</div>
                <div className="text-xs text-text-muted">See your ranking</div>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/demo/candidate/ai-tools" className="group">
            <div className="bg-bg-secondary rounded-xl p-4 border border-border flex items-center gap-4 hover:shadow-md hover:border-sky/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-sky/10 border border-sky/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-sky" />
              </div>
              <div>
                <div className="font-semibold text-sm">AI Tools Hub</div>
                <div className="text-xs text-text-muted">Resume & interview prep</div>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </MotionWrapper>

      {/* Certifications */}
      <MotionWrapper animation="fade-up" delay={500}>
        <h2 className="text-xl font-bold mb-4">Certifications</h2>
        <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-sm">
          {CURRENT_USER.certifications.map((cert, i) => (
            <div key={cert.id} className={`p-4 flex items-center justify-between hover:bg-bg-tertiary transition-colors ${i !== 0 ? 'border-t border-border' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center shadow-sm">📄</div>
                <div>
                  <div className="font-bold text-sm">{cert.name}</div>
                  <div className="text-xs text-text-secondary font-medium">{cert.issuer}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {cert.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald bg-emerald/10 px-3 py-1 rounded-full border border-emerald/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs font-bold text-text-muted bg-bg-tertiary px-3 py-1 rounded-full border border-border">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </div>
  );
}
