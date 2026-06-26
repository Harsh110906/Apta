"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import { useSearchStore } from "@/features/search/useSearchStore";
import { fetchCandidates } from "@/services/ranking/candidateRetrieval";
import { rankCandidates } from "@/services/ranking/scoringEngine";
import { downloadCsv } from "@/services/export/csvExportUtil";

export default function RecruiterSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    searchStatus, 
    setSearchStatus, 
    setSearchParams, 
    setRankedResults, 
    rankedResults, 
    exportMetadata,
    resetSearch
  } = useSearchStore();

  const [role, setRole] = useState("Frontend Engineering");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "TypeScript"]);
  const [minRank, setMinRank] = useState("Unranked");
  const [count, setCount] = useState("All");
  const [streakDays, setStreakDays] = useState("");

  useEffect(() => {
    const DOMAIN_SKILLS: Record<string, string[]> = {
      "Frontend Engineering": ["React", "TypeScript", "Next.js"],
      "Backend Engineering": ["Node.js", "Python", "SQL"],
      "Full Stack Engineering": ["React", "Node.js", "TypeScript"],
      "Data Science": ["Python", "Machine Learning", "Pandas"],
      "Machine Learning": ["PyTorch", "Python", "TensorFlow"],
      "Product Management": ["Agile", "Jira", "Product Strategy"]
    };
    setSelectedSkills(DOMAIN_SKILLS[role] || []);
  }, [role]);

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchStatus('processing');
    
    // Simulate network delay for ranking engine
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const allCandidates = await fetchCandidates();
      
      const params = {
        role,
        skills: selectedSkills,
        mustHaveSkills: [],
        count: count.toLowerCase() === 'all' || count.trim() === '' ? 100000 : parseInt(count, 10) || 100000,
        minRank: minRank === "Unranked" ? undefined : minRank,
        streakDays: streakDays ? parseInt(streakDays, 10) : undefined
      };
      
      setSearchParams(params);
      
      const startTime = performance.now();
      const ranked = rankCandidates(allCandidates, params);
      const endTime = performance.now();

      setRankedResults(ranked, {
        totalEvaluated: allCandidates.length,
        totalEligible: ranked.length,
        totalExported: ranked.length,
        searchTimeMs: Math.round(endTime - startTime)
      });
      
    } catch (error) {
      console.error(error);
      setSearchStatus('error', 'Failed to retrieve and rank candidates.');
    } finally {
      setIsLoading(false);
    }
  };

  if (searchStatus === 'completed' && exportMetadata) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-grid">
        <MotionWrapper animation="scale" className="w-full max-w-lg">
          <div className="bg-bg-secondary rounded-3xl border border-border p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-2">Search Complete</h2>
            <p className="text-text-secondary mb-8">Found {rankedResults.length} eligible candidates out of {exportMetadata.totalEvaluated} evaluated.</p>
            
            <div className="flex flex-col gap-4">
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg border-2 border-border"
                onClick={() => downloadCsv(rankedResults, 'candidate_rankings.csv')}
              >
                Export as CSV
              </Button>
              <Button 
                className="w-full py-6 text-lg glow-blue bg-sky-500 hover:bg-sky-600 text-white shadow-glow"
                onClick={() => router.push('/demo/recruiter/swipe')}
              >
                Swipe through cards
              </Button>
            </div>
            <button className="mt-6 text-sm text-sky-500 hover:underline" onClick={resetSearch}>Run another search</button>
          </div>
        </MotionWrapper>
      </div>
    );
  }

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
              <label className="block text-sm font-medium mb-2">Job Role / Domain</label>
              <select 
                className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-sky-500 text-foreground"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Frontend Engineering">Frontend Engineering</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="Full Stack Engineering">Full Stack Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Product Management">Product Management</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(s => (
                  <span 
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center gap-1.5"
                  >
                    {s}
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-sky-700" 
                      onClick={() => setSelectedSkills(prev => prev.filter(x => x !== s))}
                    />
                  </span>
                ))}
                <span className="px-3 py-1.5 border border-dashed border-border text-text-muted rounded-lg text-sm cursor-pointer hover:bg-bg-tertiary">
                  + Add Skill
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Rank (Optional)</label>
                <select 
                  className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-sky-500 text-foreground"
                  value={minRank}
                  onChange={(e) => setMinRank(e.target.value)}
                >
                  <option value="Unranked">Any</option>
                  <option value="Silver">Silver +</option>
                  <option value="Gold">Gold +</option>
                  <option value="Platinum">Platinum +</option>
                  <option value="Diamond">Diamond +</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Streak Days (Optional)</label>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-sky-500 text-foreground"
                  placeholder="Any"
                  value={streakDays}
                  onChange={(e) => setStreakDays(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Candidates</label>
              <input 
                type="text" 
                className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-3 outline-none focus:border-sky-500 text-foreground"
                placeholder="All"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full glow-blue bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center gap-2" 
            onClick={handleSearch} 
            disabled={isLoading}
          >
            <Sparkles className="w-5 h-5 text-white" fill="white" />
            {isLoading ? "Searching..." : "Generate Candidate Stack"}
          </Button>
        </div>
      </MotionWrapper>
    </div>
  );
}
