import { ChecklistItem } from "./types";

export function getCompletionPercentage(checklist: ChecklistItem[]): number {
  if (!checklist.length) return 0;
  const done = checklist.filter((item) => item.done).length;
  return Math.round((done / checklist.length) * 100);
}

export function getCompletionLabel(percentage: number): string {
  if (percentage === 100) return "Complete";
  if (percentage >= 80) return "Nearly there";
  if (percentage >= 50) return "Halfway there";
  return "Just getting started";
}