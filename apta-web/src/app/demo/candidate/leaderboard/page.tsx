"use client";

import { useState } from "react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { LEADERBOARD_DATA } from "@/data/leaderboard";
import { MOCK_CANDIDATES } from "@/data/candidates";
import { Trophy, ArrowUp, ArrowDown, Minus, Crown, Search } from "lucide-react";
import { RankBadge } from "@/components/ui/RankBadge";

const DOMAINS = ["All Domains", "Frontend Engineering", "Backend Engineering", "Data Science", "Product Design"];

export default function LeaderboardPage() {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const { lastUpdated, totalParticipants, tierDistribution } = LEADERBOARD_DATA;

  const candidates = selectedDomain === "All Domains"
    ? [...MOCK_CANDIDATES].sort((a, b) => b.points - a.points)
    : MOCK_CANDIDATES.filter((c) => c.domain === selectedDomain).sort((a, b) => b.points - a.points);

  const currentUserId = "c1"; // Alex Rivera

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
      <MotionWrapper animation="fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-gold" /> Domain Leaderboard
            </h1>
            <p className="text-text-secondary">
              Updated {lastUpdated} · {totalParticipants.toLocaleString()} total participants
            </p>
          </div>
        </div>
      </MotionWrapper>

      {/* Domain Filter */}
      <MotionWrapper animation="fade-up" delay={100}>
        <div className="flex flex-wrap gap-2 mb-8">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedDomain === domain
                  ? "bg-orange-500 text-white shadow-glow"
                  : "bg-bg-secondary border border-border text-text-secondary hover:bg-bg-tertiary"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </MotionWrapper>

      {/* Tier Distribution Bar */}
      <MotionWrapper animation="fade-up" delay={200}>
        <div className="bg-bg-secondary rounded-2xl border border-border p-6 mb-8">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Tier Distribution</h3>
          <div className="flex rounded-full overflow-hidden h-4 mb-3">
            {Object.entries(tierDistribution).reverse().map(([tier, pct]) => {
              const colorMap: Record<string, string> = {
                Legend: "bg-gradient-to-r from-gold via-orange-500 to-rose",
                Elite: "bg-rank-elite",
                Diamond: "bg-rank-diamond",
                Platinum: "bg-rank-platinum",
                Gold: "bg-rank-gold",
                Silver: "bg-rank-silver",
                Bronze: "bg-rank-bronze",
              };
              return (
                <div
                  key={tier}
                  className={`${colorMap[tier] || "bg-neutral-400"} transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${tier}: ${pct}%`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            {Object.entries(tierDistribution).reverse().map(([tier, pct]) => (
              <span key={tier} className="text-text-muted">
                <span className="font-semibold text-foreground">{tier}</span> {pct}%
              </span>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Leaderboard Table */}
      <MotionWrapper animation="fade-up" delay={300}>
        <div className="bg-bg-secondary rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-tertiary border-b border-border">
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Rank</th>
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Candidate</th>
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Tier</th>
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm hidden md:table-cell">Domain</th>
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm text-right">Points</th>
                  <th className="py-4 px-6 font-semibold text-text-secondary text-sm text-right">Streak</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => {
                  const isCurrentUser = candidate.id === currentUserId;
                  const rankMovement = index === 0 ? "up" : index === 2 ? "down" : "same";

                  return (
                    <tr
                      key={candidate.id}
                      className={`border-b border-border transition-colors ${
                        isCurrentUser
                          ? "bg-orange-500/5 border-l-4 border-l-orange-500"
                          : "hover:bg-bg-tertiary/50"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {index === 0 ? (
                            <Crown className="w-5 h-5 text-gold" />
                          ) : (
                            <span className="font-mono font-bold text-lg w-6 text-center">{index + 1}</span>
                          )}
                          {rankMovement === "up" && <ArrowUp className="w-4 h-4 text-emerald" />}
                          {rankMovement === "down" && <ArrowDown className="w-4 h-4 text-rose" />}
                          {rankMovement === "same" && <Minus className="w-4 h-4 text-text-muted" />}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {candidate.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className={`font-bold ${isCurrentUser ? "text-orange-500" : "text-foreground"}`}>
                              {candidate.name} {isCurrentUser && <span className="text-xs font-normal text-text-muted">(You)</span>}
                            </div>
                            <div className="text-xs text-text-secondary">{candidate.headline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <RankBadge rank={candidate.rank} size="md" showLabel={true} />
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <span className="text-sm text-text-secondary">{candidate.domain}</span>
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
            <div className="text-sm text-text-secondary">
              Showing {candidates.length} of {totalParticipants.toLocaleString()} candidates
            </div>
            <div className="text-sm text-text-muted flex items-center gap-2">
              <Search className="w-4 h-4" /> Rankings update weekly
            </div>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
