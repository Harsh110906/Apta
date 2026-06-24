import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { LEADERBOARD_DATA } from "@/data/leaderboard";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";

export const metadata = {
  title: "Domain Rankings | Apta",
  description: "View the weekly verified leaderboards across engineering and design domains.",
};

export default function RankingsPage() {
  const { globalRanked, domain, lastUpdated } = LEADERBOARD_DATA;

  return (
    <main className="flex-1 w-full pt-20">
      <SectionWrapper background="primary">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <MotionWrapper animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-gradient-orange">Merit</span> Leaderboard
            </h1>
            <p className="text-lg text-text-secondary">
              Current rankings for {domain}. Updated weekly.
            </p>
            <div className="mt-4 text-sm text-text-muted">Last updated: {lastUpdated}</div>
          </MotionWrapper>
        </div>

        <div className="max-w-5xl mx-auto">
          <MotionWrapper animation="fade-up" delay={200}>
            <div className="bg-bg-secondary rounded-2xl border border-border shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bg-tertiary border-b border-border">
                      <th className="py-4 px-6 font-semibold text-text-secondary">Rank</th>
                      <th className="py-4 px-6 font-semibold text-text-secondary">Candidate</th>
                      <th className="py-4 px-6 font-semibold text-text-secondary">Tier</th>
                      <th className="py-4 px-6 font-semibold text-text-secondary text-right">Points</th>
                      <th className="py-4 px-6 font-semibold text-text-secondary text-right">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalRanked.map((candidate, index) => {
                      const rankMovement = index === 0 ? "up" : index === 2 ? "down" : "same";
                      
                      return (
                        <tr key={candidate.id} className="border-b border-border hover:bg-bg-tertiary/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-lg w-6">{index + 1}</span>
                              {rankMovement === "up" && <ArrowUp className="w-4 h-4 text-emerald" />}
                              {rankMovement === "down" && <ArrowDown className="w-4 h-4 text-rose" />}
                              {rankMovement === "same" && <Minus className="w-4 h-4 text-text-muted" />}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-foreground">{candidate.name}</div>
                            <div className="text-sm text-text-secondary">{candidate.headline}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-midnight-700 px-3 py-1 text-sm font-bold">
                              {candidate.rank}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-mono font-medium">
                            {candidate.points.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right font-medium">
                            <span className="text-orange-500 mr-1">🔥</span> {candidate.streak}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-bg-tertiary border-t border-border flex items-center justify-between">
                <div className="text-sm text-text-secondary">Showing top 5 candidates</div>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                  View Full Leaderboard &rarr;
                </button>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>
    </main>
  );
}
