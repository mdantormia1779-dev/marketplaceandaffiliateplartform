export interface Pt {
  x: number;
  y: number;
}

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function smoothPath(points: Pt[]) {
  if (!points.length) return "";
  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];
    const midpoint = (previous.x + current.x) / 2;
    path += ` C${midpoint},${previous.y} ${midpoint},${current.y} ${current.x},${current.y}`;
  }
  return path;
}

export function areaPath(points: Pt[], baseY: number) {
  if (!points.length) return "";
  return `${smoothPath(points)} L${points[points.length - 1].x},${baseY} L${points[0].x},${baseY} Z`;
}

export function niceStep(maximum: number, ticks: number, unit: number) {
  const step = Math.ceil(maximum / ticks / unit) * unit || unit;
  return { step, max: step * ticks, ticks };
}

export function topRounded(x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, height, width / 2);
  return `M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`;
}
