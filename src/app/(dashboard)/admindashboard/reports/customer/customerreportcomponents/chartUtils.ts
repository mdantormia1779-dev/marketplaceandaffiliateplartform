export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function niceStep(max: number, ticks: number, unit: number) {
  const step = Math.ceil(max / ticks / unit) * unit || unit;
  return { step, max: step * ticks, ticks };
}

export function topRounded(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h, w / 2);
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}
