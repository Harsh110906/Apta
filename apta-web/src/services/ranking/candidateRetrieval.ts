import rawCandidates from '@/data/competition_candidates.json';

export async function fetchCandidates() {
  // In a production environment with the 100k dataset, this would stream from 
  // a database or a file stream API. For this prototype, we load the JSON.
  return rawCandidates;
}
