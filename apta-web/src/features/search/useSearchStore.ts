import { create } from 'zustand';

export interface SearchParams {
  role: string;
  skills: string[];
  count: number;
  streakDays?: number;
  minRank?: string;
  mustHaveSkills?: string[];
  goodToHaveSkills?: string[];
}

export interface RankedCandidate {
  candidate_id: string;
  rank: number;
  score: number;
  reasoning: string;
  // UI presentation fields (derived/fabricated for product aesthetics, do not export)
  uiPresentationMetadata?: {
    name: string;
    domain: string;
    avatarUrl: string;
    visualRankTier: string;
    pseudoStreak: number;
    verifiedSkills: { name: string; verified: boolean }[];
  };
}

export interface ExportMetadata {
  totalEvaluated: number;
  totalEligible: number;
  totalExported: number;
  searchTimeMs: number;
}

interface SearchState {
  searchParams: SearchParams | null;
  rankedResults: RankedCandidate[];
  searchStatus: 'idle' | 'processing' | 'completed' | 'error';
  exportMetadata: ExportMetadata | null;
  error: string | null;

  setSearchParams: (params: SearchParams) => void;
  setRankedResults: (results: RankedCandidate[], metadata: ExportMetadata) => void;
  setSearchStatus: (status: 'idle' | 'processing' | 'completed' | 'error', error?: string) => void;
  shortlisted: RankedCandidate[];
  addToShortlist: (candidate: RankedCandidate) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchParams: null,
  rankedResults: [],
  searchStatus: 'idle',
  exportMetadata: null,
  error: null,

  setSearchParams: (params) => set({ searchParams: params, searchStatus: 'idle' }),
  setRankedResults: (results, metadata) => set({ rankedResults: results, exportMetadata: metadata, searchStatus: 'completed' }),
  setSearchStatus: (status, error) => set({ searchStatus: status, error: error || null }),
  shortlisted: [],
  addToShortlist: (candidate) => set((state) => ({ 
    shortlisted: [...state.shortlisted, candidate] 
  })),
  resetSearch: () => set({ searchParams: null, rankedResults: [], searchStatus: 'idle', exportMetadata: null, error: null }),
}));
