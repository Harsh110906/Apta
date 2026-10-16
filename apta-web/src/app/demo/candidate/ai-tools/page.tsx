"use client";

import Link from "next/link";
import { useState } from "react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Brain, FileText, MessageSquare, LineChart, Map, Bot, Upload, Loader2, Play, CheckCircle2, RefreshCw, Sparkles, ArrowRight, History, Volume2, ShieldCheck } from "lucide-react";

// Mock Tools Data
const TOOLS = [
  { id: "resume", name: "AI Resume Analyzer", tagline: "Strengthen your resume with smart feedback", icon: FileText, interactive: true, color: "text-sky" },
  { id: "interview", name: "AI Interview Coach", tagline: "Apta Interview Arena: Full virtual mock interviews with voice and evidence-backed coaching", icon: MessageSquare, interactive: true, color: "text-emerald" },
  { id: "skillgap", name: "Skill Gap Analyzer", tagline: "Find your skill gaps before recruiters do", icon: LineChart, interactive: true, color: "text-orange-500" },
  { id: "roadmap", name: "Roadmap Generator", tagline: "Turn weak performance into a focused learning plan", icon: Map, interactive: false, color: "text-purple-500" },
  { id: "quiz", name: "Quiz Performance Insights", tagline: "Deep dive into your daily test performance", icon: Brain, interactive: false, color: "text-gold" },
];

export default function AIToolsHub() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Resume State
  const [resumeState, setResumeState] = useState<'idle'|'uploading'|'analyzing'|'done'>('idle');
  
  // Interview State
  const [interviewState, setInterviewState] = useState<'intro'|'question'|'feedback'>('intro');
  const [answer, setAnswer] = useState("");

  // Skill Gap State
  const [skillGapState, setSkillGapState] = useState<'idle'|'analyzing'|'done'>('idle');

  // Render Resume Analyzer
  const renderResumeAnalyzer = () => {
     if (resumeState === 'idle') {
       return (
         <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-orange-500/50 hover:bg-orange-500/5 transition-colors cursor-pointer group" onClick={() => setResumeState('uploading')}>
           <Upload className="w-10 h-10 text-text-muted mx-auto mb-4 group-hover:text-orange-500 transition-colors" />
           <p className="font-bold mb-1">Drag and drop your resume</p>
           <p className="text-sm text-text-secondary mb-4">PDF or DOCX up to 5MB</p>
           <button className="bg-bg-primary border border-border px-4 py-2 rounded-lg text-sm font-bold shadow-sm">Select File</button>
         </div>
       )
     }
     if (resumeState === 'uploading' || resumeState === 'analyzing') {
       if (resumeState === 'uploading') setTimeout(() => setResumeState('analyzing'), 1200);
       if (resumeState === 'analyzing') setTimeout(() => setResumeState('done'), 2000);
       return (
         <div className="border border-border bg-bg-secondary rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
           <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
           <p className="font-bold mb-1">{resumeState === 'uploading' ? 'Uploading resume securely...' : 'AI analyzing impact metrics & layout...'}</p>
         </div>
       )
     }
     return (
       <div className="animate-fade-in space-y-6">
         <div className="flex items-center justify-between border-b border-border pb-4">
           <div>
             <h3 className="font-bold text-2xl flex items-center gap-2">Resume Score: <span className="text-orange-500">74/100</span></h3>
             <p className="text-sm text-text-secondary mt-1">Analysis complete for Frontend Developer roles.</p>
           </div>
           <button onClick={() => setResumeState('idle')} className="text-sm font-bold text-text-muted hover:text-foreground bg-bg-secondary px-3 py-1.5 rounded-lg border border-border">Upload Another</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-emerald/10 border border-emerald/20 rounded-xl shadow-sm">
               <h4 className="text-emerald font-bold mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Profile Strengths</h4>
               <ul className="text-sm space-y-3 text-emerald/90 font-medium">
                 <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">•</span> Strong technical keyword density match (React, Next.js, TS).</li>
                 <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">•</span> Clear, chronological education and work history timeline.</li>
               </ul>
            </div>
            <div className="p-5 bg-rose/10 border border-rose/20 rounded-xl shadow-sm">
               <h4 className="text-rose font-bold mb-3 flex items-center gap-2"><Bot className="w-5 h-5"/> Weak Sections</h4>
               <ul className="text-sm space-y-3 text-rose/90 font-medium">
                 <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">•</span> Missing quantifiable metrics (e.g., "improved speed by X%").</li>
                 <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">•</span> Objective summary is too generic for mid/senior roles.</li>
               </ul>
            </div>
         </div>
         <div className="bg-bg-tertiary border border-border p-5 rounded-xl shadow-sm">
            <h4 className="font-bold mb-2 text-xs uppercase tracking-wider text-text-muted">Top Suggested Improvement</h4>
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <p className="text-sm text-text-secondary mb-2">Rewrite your second bullet point under "Experience":</p>
              <p className="text-sm font-bold text-foreground">"Architected frontend components in Next.js, reducing TTI (Time to Interactive) by 30% and increasing user retention."</p>
            </div>
         </div>
       </div>
     )
  }

  // Render Interview Coach — Connected to Apta Interview Arena
  const renderInterviewCoach = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Arena Featured Banner */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-midnight-800 to-midnight-900 border border-orange-500/30 rounded-3xl text-left relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-glow opacity-30 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Full Virtual Experience
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Apta Interview Arena
            </h3>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
              Enter an immersive, focused virtual interview room with our AI Interviewer. Configure your target company, expected compensation (LPA), and interview difficulty. Practice speaking aloud with live voice recognition and receive an evidence-backed coaching report.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-orange-400" />
                <span>Spoken audio questions & voice input</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald" />
                <span>Dynamic follow-up probing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky" />
                <span>Competency & trade-off rubrics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% private practice coaching</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/demo/candidate/interview"
                className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-glow flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                Launch Interview Arena <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo/candidate/interview/history"
                className="px-5 py-3 rounded-xl bg-midnight-700 hover:bg-midnight-600 text-neutral-200 font-bold text-xs border border-midnight-600 transition-colors flex items-center gap-2"
              >
                <History className="w-4 h-4 text-orange-400" /> View Past Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Quick-Launch Track Cards */}
        <div>
          <h4 className="font-bold text-base mb-3 text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Recommended Interview Tracks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/demo/candidate/interview"
              className="p-5 bg-bg-secondary border border-border rounded-2xl hover:border-orange-500/50 hover:-translate-y-0.5 transition-all block group"
            >
              <div className="font-bold text-sm text-foreground mb-1 group-hover:text-orange-500 transition-colors">
                Frontend Architecture
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                React rendering bottlenecks, INP optimization, and state management.
              </p>
              <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                Configure & Start &rarr;
              </span>
            </Link>

            <Link
              href="/demo/candidate/interview"
              className="p-5 bg-bg-secondary border border-border rounded-2xl hover:border-orange-500/50 hover:-translate-y-0.5 transition-all block group"
            >
              <div className="font-bold text-sm text-foreground mb-1 group-hover:text-orange-500 transition-colors">
                Backend & Distributed
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                Idempotency, database indexing, and cache stampede prevention.
              </p>
              <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                Configure & Start &rarr;
              </span>
            </Link>

            <Link
              href="/demo/candidate/interview"
              className="p-5 bg-bg-secondary border border-border rounded-2xl hover:border-orange-500/50 hover:-translate-y-0.5 transition-all block group"
            >
              <div className="font-bold text-sm text-foreground mb-1 group-hover:text-orange-500 transition-colors">
                HR & Behavioral
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                Conflict resolution, navigating ambiguity, and ownership (STAR).
              </p>
              <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                Configure & Start &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderSkillGap = () => {
     if (skillGapState === 'idle') {
       return (
         <div className="text-center p-12 bg-bg-secondary border border-border rounded-2xl shadow-sm">
           <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <LineChart className="w-10 h-10 text-orange-500" />
           </div>
           <h3 className="font-bold text-2xl mb-3">Analyze Skill Gaps</h3>
           <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">Compare your currently verified skills and test scores against the top-tier market requirements for your target role.</p>
           <button onClick={() => setSkillGapState('analyzing')} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 shadow-glow mx-auto flex items-center justify-center transition-transform hover:scale-105">
             Generate Gap Analysis
           </button>
         </div>
       )
     }
     if (skillGapState === 'analyzing') {
        setTimeout(() => setSkillGapState('done'), 1800);
        return (
          <div className="border border-border bg-bg-secondary rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mb-6" />
            <p className="font-bold text-lg mb-1">Cross-referencing profile...</p>
            <p className="text-sm text-text-secondary">Comparing against 10,000+ top recruiter criteria.</p>
          </div>
        )
     }
     return (
        <div className="animate-fade-in bg-bg-secondary border border-border rounded-2xl p-6 md:p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
             <div>
               <h3 className="font-bold text-2xl mb-1">Target: Senior Frontend Engineer</h3>
               <p className="text-sm font-bold text-text-secondary">Readiness Score: <span className="text-orange-500 text-lg ml-1">82%</span></p>
             </div>
             <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center shadow-glow">
               <span className="font-bold text-lg">A-</span>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-bg-primary p-5 rounded-xl border border-border">
               <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-4">Verified Strengths</h4>
               <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-emerald" /> React.js (Advanced Level)</li>
                 <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-emerald" /> TypeScript Mastery</li>
                 <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-emerald" /> Consistent streak (High engagement)</li>
               </ul>
             </div>
             <div className="bg-bg-primary p-5 rounded-xl border border-border">
               <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-4">Critical Missing Skills</h4>
               <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-rose/20 text-rose flex items-center justify-center text-[10px] font-bold">!</div> WebGL / Three.js Basics</li>
                 <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-rose/20 text-rose flex items-center justify-center text-[10px] font-bold">!</div> System Architecture & Design</li>
               </ul>
             </div>
           </div>
           
           <div className="mt-6 pt-6 border-t border-border flex items-start gap-4">
             <Brain className="w-8 h-8 text-sky shrink-0" />
             <div>
               <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-1">Recommended Next Step</h4>
               <p className="text-sm font-bold text-foreground">Complete the "Advanced System Design" daily quiz path this week to boost your verification in architecture.</p>
             </div>
           </div>
        </div>
     )
  }

  const activeToolData = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
      <MotionWrapper animation="fade-up">
         <div className="mb-8">
           <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-500 mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> Candidate AI Hub
           </div>
           <h1 className="text-3xl md:text-4xl font-bold mb-3">AI Career Tools</h1>
           <p className="text-text-secondary text-lg max-w-2xl">Use these mock tools to analyze your profile, practice interviews, and improve your Apta ranking readiness.</p>
         </div>
      </MotionWrapper>

      {activeTool ? (
        <MotionWrapper animation="fade-up" delay={100}>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button onClick={() => setActiveTool(null)} className="text-sm font-bold text-text-muted hover:text-foreground bg-bg-secondary px-3 py-1.5 rounded-lg border border-border transition-colors">
                 &larr; Back to Hub
               </button>
               <h2 className="text-2xl font-bold flex items-center gap-3">
                 {activeToolData && <activeToolData.icon className={`w-7 h-7 ${activeToolData.color}`} />}
                 {activeToolData?.name}
               </h2>
            </div>
          </div>
          
          <div className="max-w-4xl">
            {activeTool === 'resume' && renderResumeAnalyzer()}
            {activeTool === 'interview' && renderInterviewCoach()}
            {activeTool === 'skillgap' && renderSkillGap()}
          </div>
        </MotionWrapper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <MotionWrapper key={tool.id} animation="fade-up" delay={i * 50}>
                <div 
                  onClick={() => tool.interactive && setActiveTool(tool.id)}
                  className={`bg-bg-secondary border border-border rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${tool.interactive ? 'cursor-pointer hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1' : 'opacity-60 grayscale'}`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center mb-5 shadow-sm ${tool.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{tool.name}</h3>
                  <p className="text-sm font-medium text-text-secondary flex-1 mb-8 leading-relaxed">{tool.tagline}</p>
                  
                  {tool.interactive ? (
                    <div className="mt-auto flex items-center text-sm font-bold text-foreground group">
                      Launch Tool <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  ) : (
                    <div className="mt-auto flex items-center text-xs font-bold text-text-muted uppercase tracking-wider">
                      Coming Soon
                    </div>
                  )}
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      )}
    </div>
  )
}
