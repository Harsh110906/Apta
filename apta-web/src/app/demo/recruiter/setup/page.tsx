"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

export default function RecruiterSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/demo/recruiter/swipe"), 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-grid">
      <MotionWrapper animation="scale" className="w-full max-w-lg">
        <div className="bg-bg-secondary rounded-3xl border border-border p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Define your requirements</h1>
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald/10 border border-emerald/20 text-emerald text-[10px] font-bold rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Recruiter
            </div>
          </div>
          <p className="text-text-secondary mb-6">Apta will build a stack of candidates who meet these verified standards.</p>
          
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Domain</label>
              <select className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-orange-500">
                <option>Frontend Engineering</option>
                <option>Backend Engineering</option>
                <option>Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Minimum Rank</label>
              <select className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-orange-500">
                <option>Gold (Top 25%)</option>
                <option>Platinum (Top 10%)</option>
                <option>Diamond (Top 5%)</option>
                <option>Elite (Top 1%)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Must-have Skills</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-500 rounded-lg text-sm font-medium">React</span>
                <span className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-500 rounded-lg text-sm font-medium">TypeScript</span>
                <span className="px-3 py-1.5 border border-dashed border-border text-text-muted rounded-lg text-sm cursor-pointer hover:bg-bg-tertiary">+ Add Skill</span>
              </div>
            </div>
          </div>

          <Button className="w-full glow-blue bg-sky-500 hover:bg-sky-600 text-white" onClick={handleStart} disabled={isLoading}>
            {isLoading ? "Curating Stack..." : "Generate Candidate Stack"}
          </Button>
        </div>
      </MotionWrapper>
    </div>
  );
}
