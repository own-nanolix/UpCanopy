// Shared data and small SVG helpers for the gradients page. Every id starts with the idp given by the caller,
// and every idp starts with `gradients-`.
import { r2 } from '@/lib/charts';

// The six brand gradients, named plainly from what they are. `v` is the vector [x1, y1, x2, y2] in the unit box
// (0,1 is the lower left corner, 1,0 the upper right one).
export const GRADS = [
  { key: 'ocean-park', name: 'Ocean to Park', kind: 'linear', v: [0, 1, 1, 0], stops: [[0.1, '#162557'], [0.6, '#1C5C66'], [1, '#26CF7B']],
    seen: 'Box lid, truck, wall sign', grain: 0.16, dots: false },
  { key: 'dark-ocean', name: 'Dark Green to Ocean', kind: 'linear', v: [0.2, 1, 0.8, 0], stops: [[0, '#052E25'], [1, '#162557']],
    seen: 'Citylight', grain: 0.16, dots: false },
  { key: 'mint-paper', name: 'Mint Paper', kind: 'linear', v: [1, 0, 0, 1], stops: [[0, '#F8FFF4'], [1, '#BFEFD3']],
    seen: 'Letter, window panel', grain: 0.06, dots: true },
  { key: 'park-pale', name: 'Park to Pale Green', kind: 'linear', v: [0, 1, 1, 0], stops: [[0, '#26CF7B'], [0.55, '#6FE0A5'], [1, '#BFEFD3']],
    seen: 'Folder cover', grain: 0.1, dots: false },
  { key: 'dark-field', name: 'Dark Green Field', kind: 'radial', base: '#052E25', c: [0.72, 0.24, 0.85], stops: [[0, '#17624D'], [1, '#052E25']],
    seen: 'Poster', grain: 0.2, dots: false },
  { key: 'navy-ground', name: 'Deep Navy Ground', kind: 'radial', base: '#0C1445', c: [0.5, 0.32, 0.9], stops: [[0, '#162557'], [1, '#0C1445']],
    seen: 'Studio sweep', grain: 0.1, dots: false },
];

export const gradById = (key) => GRADS.find((g) => g.key === key);

// Angle of a linear gradient on a square box, in degrees counter-clockwise from the right.
export const angleOf = (g) => Math.round((Math.atan2(g.v[1] - g.v[3], g.v[2] - g.v[0]) * 180) / Math.PI);

export const specOf = (g) =>
  g.kind === 'linear'
    ? g.stops.map(([o, c]) => `${c} ${Math.round(o * 100)}%`).join(', ') + `, ${angleOf(g)}°`
    : `${g.stops[0][1]} centre to ${g.stops[1][1]} edge, light at ${Math.round(g.c[0] * 100)}% across, ${Math.round(g.c[1] * 100)}% down`;

// The gradient itself as <defs> content: id `${idp}-g`.
export function GradDef({ idp, g, spread }) {
  if (g.kind === 'radial') {
    return (
      <radialGradient id={`${idp}-g`} cx={g.c[0]} cy={g.c[1]} r={g.c[2]}>
        {g.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
      </radialGradient>
    );
  }
  return (
    <linearGradient id={`${idp}-g`} x1={g.v[0]} y1={g.v[1]} x2={g.v[2]} y2={g.v[3]} spreadMethod={spread}>
      {g.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </linearGradient>
  );
}

// Fine print grain: filter `${idp}-grain`. amt is the strength (alpha of the dark speckle, 0.06 to 0.5).
export function GrainDef({ idp, amt = 0.16, freq = 1.1, seed = 7 }) {
  return (
    <filter id={`${idp}-grain`} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${amt} 0`} result="g" />
      <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="gi" />
      </feMerge>
    </filter>
  );
}

// Grain on its own (no source colour): filter `${idp}-noise`, to lay over artwork that is animated.
export function NoiseDef({ idp, amt = 0.16, freq = 1.1, seed = 7 }) {
  return (
    <filter id={`${idp}-noise`} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${amt} 0`} />
    </filter>
  );
}

// The small regular dot texture of the mint surfaces: pattern `${idp}-dots`.
export function DotsDef({ idp, gap = 7, r = 0.9, op = 0.14, color = '#162557' }) {
  return (
    <pattern id={`${idp}-dots`} width={gap} height={gap} patternUnits="userSpaceOnUse">
      <circle cx={r2(gap / 2)} cy={r2(gap / 2)} r={r} fill={color} opacity={op} />
    </pattern>
  );
}

// A filled rectangle in a gradient, optionally with grain. Needs GradDef (and GrainDef when grain > 0) in the defs.
export function GradRect({ idp, g, x = 0, y = 0, w, h, grain = true }) {
  return (
    <g>
      {g.base && <rect x={x} y={y} width={w} height={h} fill={g.base} />}
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-g)`} filter={grain ? `url(#${idp}-grain)` : undefined} />
    </g>
  );
}

// One frond leaflet group per item, as FrondG draws them, with a class and an order index on each so a page can
// animate them (FrondG only supports the shared `fan`). Returns plain data; the caller maps it.
export function leaflets({ cx = 0, cy = 0, r = 300, a0 = 200, a1 = 340, count = 36, len = 220, width = 9, lean = 62 }) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const a = a0 + (a1 - a0) * t;
    const rad = (a * Math.PI) / 180;
    const env = 0.35 + 0.65 * Math.sin(Math.PI * (0.12 + 0.88 * t));
    return { i, x: r2(cx + r * Math.cos(rad)), y: r2(cy + r * Math.sin(rad)), rot: r2(a + lean), L: r2(len * env), W: r2(width * (0.7 + 0.5 * env)) };
  });
}

export function Leaflet({ L, W, a, b }) {
  return (
    <>
      <path d={`M0 0Q${r2(L * 0.5)} ${-W} ${L} 0Q${r2(L * 0.5)} ${W} 0 0Z`} fill={a} />
      <path d={`M0 0Q${r2(L * 0.5)} ${-W} ${L} 0Q${r2(L * 0.5)} ${r2(-W * 0.15)} 0 0Z`} fill={b} />
    </>
  );
}
