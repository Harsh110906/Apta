import competitionData from './competition_candidates.json';

export type RankTier = 'Unranked' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Elite' | 'Legend';

export interface Candidate {
  id: string;
  name: string;
  role: 'candidate';
  domain: string;
  rankTier: RankTier;
  globalRank: number;
  domainRank: number;
  points: number;
  streak: number;
  skills: { name: string; level: number; verified: boolean }[];
  certifications: { title: string; issuer: string; verified: boolean }[];
  verificationStatus: 'Verified' | 'Under Review' | 'Self-Declared';
  avatarUrl: string;
}

export interface Recruiter {
  id: string;
  name: string;
  role: 'recruiter';
  company: string;
  activeRoles: number;
  avatarUrl: string;
}

export interface JobRole {
  id: string;
  recruiterId: string;
  title: string;
  domain: string;
  requiredSkills: string[];
  active: boolean;
}

// Map the competition data to the mockCandidates format used by the rest of the application
export const mockCandidates: Candidate[] = (competitionData as any[]).slice(0, 50).map((c, index) => {
  const profileCompleteness = c.redrob_signals?.profile_completeness_score || 0;
  
  let rankTier: RankTier = 'Bronze';
  if (profileCompleteness > 90) rankTier = 'Diamond';
  else if (profileCompleteness > 80) rankTier = 'Platinum';
  else if (profileCompleteness > 70) rankTier = 'Gold';
  else if (profileCompleteness > 60) rankTier = 'Silver';

  return {
    id: c.candidate_id,
    name: c.profile?.anonymized_name || 'Unknown Candidate',
    role: 'candidate',
    domain: c.profile?.current_industry || c.profile?.current_title || 'General',
    rankTier,
    globalRank: index + 1,
    domainRank: (index % 10) + 1,
    points: Math.floor(profileCompleteness * 100),
    streak: Math.floor(c.redrob_signals?.github_activity_score || 0) % 30,
    skills: (c.skills || []).slice(0, 5).map((s: any) => ({
      name: s.name,
      level: s.proficiency === 'expert' ? 95 : s.proficiency === 'advanced' ? 80 : s.proficiency === 'intermediate' ? 60 : 40,
      verified: true
    })),
    certifications: (c.certifications || []).map((cert: any) => ({
      title: cert.name,
      issuer: cert.issuer,
      verified: true
    })),
    verificationStatus: 'Verified',
    avatarUrl: `https://i.pravatar.cc/150?u=${c.candidate_id}`
  };
});

export const mockRecruiters: Recruiter[] = [
  {
    id: 'r1',
    name: 'TechCorp Hiring',
    role: 'recruiter',
    company: 'TechCorp',
    activeRoles: 3,
    avatarUrl: 'https://i.pravatar.cc/150?u=r1'
  }
];

export const mockRoles: JobRole[] = [
  {
    id: 'role1',
    recruiterId: 'r1',
    title: 'Senior Frontend Engineer',
    domain: 'Frontend Engineering',
    requiredSkills: ['React', 'TypeScript'],
    active: true,
  }
];
