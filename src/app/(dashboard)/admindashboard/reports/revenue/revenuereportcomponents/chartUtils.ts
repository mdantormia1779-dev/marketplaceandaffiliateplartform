export interface Pt {
  x: number;
  y: number;
}

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function smoothPath(pts: Pt[]) {
  if (!pts.length) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    d += ` C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  }
  return d;
}

export function areaPath(pts: Pt[], baseY: number) {
  if (!pts.length) return "";
  return `${smoothPath(pts)} L${pts[pts.length - 1].x},${baseY} L${pts[0].x},${baseY} Z`;
}

export function niceStep(max: number, ticks: number, unit: number) {
  const step = Math.ceil(max / ticks / unit) * unit || unit;
  return { step, max: step * ticks, ticks };
}
