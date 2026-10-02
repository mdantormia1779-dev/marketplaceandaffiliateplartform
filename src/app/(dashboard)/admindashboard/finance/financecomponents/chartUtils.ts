export interface Pt {
  x: number;
  y: number;
}

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

export function niceScale(max: number, ticks = 4) {
  const step = Math.ceil(max / ticks / 5000) * 5000 || 5000;
  return { step, max: step * ticks, ticks };
}
