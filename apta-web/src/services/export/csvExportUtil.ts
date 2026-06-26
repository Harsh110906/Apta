import { RankedCandidate } from '@/features/search/useSearchStore';

export function downloadCsv(candidates: RankedCandidate[], filename: string = 'submission.csv') {
  // Competition specified strict headers
  const headers = ['candidate_id', 'rank', 'score', 'reasoning'];
  
  const csvRows = candidates.map(c => {
    return [
      c.candidate_id,
      c.rank,
      c.score,
      // Wrap reasoning in quotes to escape potential commas in text
      `"${c.reasoning.replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...csvRows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
