import type { RankTier, DifficultyTier, QuizQuestion } from "@/types";

/**
 * Question Selection Engine
 * 
 * Selects 10 questions for a daily test based on user rank.
 * Distribution: 2 theory + 4 code-write + 4 debug-fix
 */

// ── Rank → Difficulty mapping ──
export function getDifficultyForRank(rank: RankTier): DifficultyTier {
  switch (rank) {
    case "Unranked":
    case "Bronze":
    case "Silver":
      return "easy";
    case "Gold":
    case "Platinum":
      return "medium";
    case "Diamond":
    case "Elite":
    case "Legend":
      return "hard";
    default:
      return "easy";
  }
}

// ── Timer per difficulty ──
export function getTimerForDifficulty(difficulty: DifficultyTier): number {
  switch (difficulty) {
    case "easy": return 45;
    case "medium": return 30;
    case "hard": return 20;
  }
}

// ── Points per correct answer per difficulty ──
export function getPointsForDifficulty(difficulty: DifficultyTier): number {
  switch (difficulty) {
    case "easy": return 30;
    case "medium": return 50;
    case "hard": return 80;
  }
}

// ── Fisher-Yates shuffle ──
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Main selector ──
export function selectDailyQuestions(
  rank: RankTier,
  allQuestions: QuizQuestion[]
): QuizQuestion[] {
  const difficulty = getDifficultyForRank(rank);
  const pool = allQuestions.filter(q => q.difficulty === difficulty);
  
  const theory = shuffle(pool.filter(q => q.type === "theory")).slice(0, 2);
  const code = shuffle(pool.filter(q => q.type === "code-write")).slice(0, 4);
  const debug = shuffle(pool.filter(q => q.type === "debug-fix")).slice(0, 4);
  
  // Interleave: theory first, then alternate code/debug
  const combined: QuizQuestion[] = [];
  combined.push(...theory);
  for (let i = 0; i < Math.max(code.length, debug.length); i++) {
    if (i < code.length) combined.push(code[i]);
    if (i < debug.length) combined.push(debug[i]);
  }
  
  return combined.slice(0, 10);
}
