import { Segment } from "./types";

export default function SegmentBadge({ segment }: { segment: Segment }) {
  return <span className="inline-block rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">{segment}</span>;
}
