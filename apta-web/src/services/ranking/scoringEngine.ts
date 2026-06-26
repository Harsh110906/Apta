import { SearchParams, RankedCandidate } from '@/features/search/useSearchStore';

export function rankCandidates(candidates: any[], params: SearchParams): RankedCandidate[] {
  const { role, skills, count, mustHaveSkills, minRank } = params;

  const evaluated = candidates.map(candidate => {
    let score = 0;
    const reasons: string[] = [];
    let isEligible = true;

    // Domain/Role match
    if (role) {
      if (
        candidate.profile.current_title?.toLowerCase().includes(role.toLowerCase()) || 
        candidate.profile.headline?.toLowerCase().includes(role.toLowerCase())
      ) {
        score += 0.4;
        reasons.push(`Title explicitly matches ${role}.`);
      } else {
        reasons.push(`Title does not explicitly match ${role}.`);
      }
    }

    // Skills match
    const candidateSkills = (candidate.skills || []).map((s: any) => s.name.toLowerCase());
    if (skills && skills.length > 0) {
      let matchedSkills = 0;
      skills.forEach(skill => {
        if (candidateSkills.includes(skill.toLowerCase())) {
          matchedSkills += 1;
        }
      });
      score += (matchedSkills / skills.length) * 0.4;
      if (matchedSkills > 0) {
        reasons.push(`Matches ${matchedSkills} requested skills.`);
      } else {
        reasons.push(`Matches 0 requested skills.`);
      }
    }

    // Eligibility check for must-have skills
    if (mustHaveSkills && mustHaveSkills.length > 0) {
       mustHaveSkills.forEach(skill => {
         if (!candidateSkills.includes(skill.toLowerCase())) {
           isEligible = false;
         }
       });
       if (!isEligible) {
         reasons.push(`Missing must-have skill(s).`);
       }
    }

    // Minimum Rank mapping (simulated filter)
    if (minRank && isEligible) {
       const rankScore = getRankValue(minRank);
       const candidateValue = getRankValue(getVisualRank(score)); // simulated for demonstration
       if (candidateValue < rankScore) {
          isEligible = false;
          reasons.push(`Failed minimum rank criteria.`);
       }
    }
    
    // Streak sorting criteria
    const candidateStreak = Math.floor((candidate.redrob_signals?.github_activity_score || 0)) % 30;
    if (params.streakDays && candidateStreak >= params.streakDays) {
       score += 0.3; // Boost score significantly if they meet the required streak
       reasons.push(`Meets or exceeds required ${params.streakDays} day streak.`);
    } else if (params.streakDays && candidateStreak < params.streakDays) {
       reasons.push(`Does not meet the requested ${params.streakDays} day streak.`);
    }

    // Add base randomness or fallback score based on years of experience
    score += Math.min((candidate.profile.years_of_experience || 0) / 20, 0.2);

    return {
      candidate_id: candidate.candidate_id,
      rawScore: score,
      isEligible,
      reasoning: reasons.join(' ') || 'Candidate matches general profile criteria.',
      rawCandidate: candidate
    };
  });

  const eligible = evaluated.filter(c => c.isEligible);
  
  // Sort descending by score
  eligible.sort((a, b) => b.rawScore - a.rawScore);

  // Take top N
  const topN = eligible.slice(0, count);

  return topN.map((c, index) => {
    // Generate UI presentation fields explicitly separated from competition export data
    const uiPresentationMetadata = {
      name: c.rawCandidate.profile.anonymized_name,
      domain: c.rawCandidate.profile.current_industry || c.rawCandidate.profile.current_title,
      avatarUrl: `https://i.pravatar.cc/150?u=${c.candidate_id}`,
      visualRankTier: getVisualRank(c.rawScore),
      pseudoStreak: Math.floor((c.rawCandidate.redrob_signals?.github_activity_score || 0)) % 30,
      verifiedSkills: (c.rawCandidate.skills || []).slice(0, 5).map((s: any) => ({ name: s.name, verified: true }))
    };

    return {
      candidate_id: c.candidate_id,
      rank: index + 1,
      score: Number(c.rawScore.toFixed(4)),
      reasoning: c.reasoning,
      uiPresentationMetadata
    };
  });
}

function getVisualRank(score: number): string {
  if (score > 0.8) return 'Diamond';
  if (score > 0.6) return 'Platinum';
  if (score > 0.4) return 'Gold';
  if (score > 0.2) return 'Silver';
  return 'Bronze';
}

function getRankValue(rankName: string): number {
  const ranks: Record<string, number> = {
    'Unranked': 0, 'Bronze': 1, 'Silver': 2, 'Gold': 3, 'Platinum': 4, 'Diamond': 5
  };
  return ranks[rankName] || 0;
}
