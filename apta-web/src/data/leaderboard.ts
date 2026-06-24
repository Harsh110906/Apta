import { MOCK_CANDIDATES } from "./candidates";

export const LEADERBOARD_DATA = {
  domain: "Frontend Engineering",
  lastUpdated: "2 hours ago",
  topRanked: MOCK_CANDIDATES.filter(c => c.domain === "Frontend Engineering").sort((a, b) => b.points - a.points),
  globalRanked: [...MOCK_CANDIDATES].sort((a, b) => b.points - a.points),
  currentUserRank: 124,
  totalParticipants: 45200,
  tierDistribution: {
    "Legend": 1,
    "Elite": 4,
    "Diamond": 10,
    "Platinum": 20,
    "Gold": 30,
    "Silver": 25,
    "Bronze": 10,
  }
};
