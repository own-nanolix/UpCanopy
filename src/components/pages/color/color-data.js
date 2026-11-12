// Colour page data. Printed values come from PALETTE / HEX; every scale step is computed here.
import { HEX } from '@/lib/brand';
import { hexToRgb, contrast } from '@/lib/site';

const hex2 = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');

// Mix two hex colours: t = 0 gives a, t = 1 gives b.
export function mix(a, b, t) {
  const pa = hexToRgb(a).split(', ').map(Number);
  const pb = hexToRgb(b).split(', ').map(Number);
  return '#' + pa.map((v, i) => hex2(v + (pb[i] - v) * t)).join('').toUpperCase();
}

// Nine steps around a base colour: four tints (mixed with white), the base at 500, four shades (mixed with black).
const TINTS = [0.85, 0.7, 0.5, 0.25];
const SHADES = [0.15, 0.3, 0.45, 0.6];
export function scaleAround(name, base) {
  const rows = [];
  TINTS.forEach((t, i) => rows.push({ token: `${name}-${(i + 1) * 100}`, hex: mix(base, '#FFFFFF', t), how: `${Math.round(t * 100)}% white` }));
  rows.push({ token: `${name}-500`, hex: base, how: 'as printed' });
  SHADES.forEach((t, i) => rows.push({ token: `${name}-${(i + 6) * 100}`, hex: mix(base, '#000000', t), how: `${Math.round(t * 100)}% black` }));
  return rows;
}

export const LIGHT = HEX.mint;
export const DARK = HEX.navy;

export const GREEN_SCALE = scaleAround('green', HEX.green);
export const BLUE_SCALE = scaleAround('navy', HEX.navy);

// Neutrals, light to dark. Green Ligth, Gray, Asfalt and Green Dark are printed; white, slide grey and muted are
// the brand's own tokens from the shared styles.
export const NEUTRALS = [
  { token: 'white', hex: HEX.white, how: 'surface' },
  { token: 'mint', hex: HEX.mint, how: 'Green Ligth' },
  { token: 'slide', hex: HEX.slide, how: 'slide grey' },
  { token: 'gray', hex: HEX.gray, how: 'Gray' },
  { token: 'muted', hex: HEX.muted, how: 'small text' },
  { token: 'asphalt', hex: HEX.asphalt, how: 'Asfalt' },
  { token: 'green-dark', hex: HEX.greenDark, how: 'Green Dark' },
];

export const withRatios = (rows) => rows.map((r) => ({ ...r, rgb: hexToRgb(r.hex), onLight: contrast(r.hex, LIGHT), onDark: contrast(r.hex, DARK) }));

export function level(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'Below 3';
}

// Best ink on a colour: navy or white, whichever reads better.
export const inkOn = (hex) => (contrast(hex, HEX.navy) >= contrast(hex, HEX.white) ? HEX.navy : HEX.white);

export const PAIRINGS = [
  { id: 'navy-green', label: 'Blue Ocean on Green Park', fg: HEX.navy, bg: HEX.green },
  { id: 'green-navy', label: 'Green Park on Blue Ocean', fg: HEX.green, bg: HEX.navy },
  { id: 'white-navy', label: 'White on Blue Ocean', fg: HEX.white, bg: HEX.navy },
  { id: 'mint-dark', label: 'Green Ligth on Green Dark', fg: HEX.mint, bg: HEX.greenDark },
  { id: 'navy-mint', label: 'Blue Ocean on Green Ligth', fg: HEX.navy, bg: HEX.mint },
  { id: 'ink-mint', label: 'Deep green on Green Ligth', fg: HEX.greenInk, bg: HEX.mint },
].map((p) => ({ ...p, ratio: contrast(p.fg, p.bg) }));

export const PROPORTION = [
  { id: 'navy', label: 'Blue Ocean', pct: 40, parts: [HEX.navy] },
  { id: 'green', label: 'Greens', pct: 35, parts: [HEX.green] },
  { id: 'pale', label: 'Pale mint and white', pct: 20, parts: [HEX.mint, HEX.white] },
  { id: 'dark', label: 'Asfalt and Gray', pct: 5, parts: [HEX.asphalt, HEX.gray] },
];

// Ladders: eleven steps from the printed colour (0%) to white (tints) or black (shades) at 100%.
const ladder = (id, label, base, to) => ({
  id,
  label,
  steps: Array.from({ length: 11 }, (_, i) => ({ token: `${id}-${i * 10}`, pct: i * 10, hex: mix(base, to, i / 10) })),
});
export const LADDERS = [
  ladder('green-tint', 'Green Park tints', HEX.green, '#FFFFFF'),
  ladder('green-shade', 'Green Park shades', HEX.green, '#000000'),
  ladder('navy-tint', 'Blue Ocean tints', HEX.navy, '#FFFFFF'),
  ladder('navy-shade', 'Blue Ocean shades', HEX.navy, '#000000'),
];

// The palette plus white, for the pairing tester.
export const TESTER_COLORS = [
  { name: 'Green Park', hex: HEX.green },
  { name: 'Blue Ocean', hex: HEX.navy },
  { name: 'Green Dark', hex: HEX.greenDark },
  { name: 'Asfalt', hex: HEX.asphalt },
  { name: 'Green Ligth', hex: HEX.mint },
  { name: 'Gray', hex: HEX.gray },
  { name: 'White', hex: HEX.white },
];

// The mark on each ground, as the case study sets it.
export const GROUNDS = [
  { id: 'navy', name: 'Blue Ocean', ground: HEX.navy, mark: HEX.green },
  { id: 'green', name: 'Green Park', ground: HEX.green, mark: HEX.navy },
  { id: 'dark', name: 'Green Dark', ground: HEX.greenDark, mark: HEX.mint },
  { id: 'asphalt', name: 'Asfalt', ground: HEX.asphalt, mark: HEX.green },
  { id: 'mint', name: 'Green Ligth', ground: HEX.mint, mark: HEX.navy },
  { id: 'gray', name: 'Gray', ground: HEX.gray, mark: HEX.navy },
];

// The frond's tones on its four grounds (keys of FROND_TONES).
export const FRONDS = [
  { tone: 'onDark', name: 'On Green Dark', ground: HEX.greenDark },
  { tone: 'onNavy', name: 'On Blue Ocean', ground: HEX.navy },
  { tone: 'onGreen', name: 'On Green Park', ground: HEX.green },
  { tone: 'onMint', name: 'On Green Ligth', ground: HEX.mint },
];

export const TOKENS = [
  { name: 'background', css: '--bg', light: HEX.mint, dark: HEX.navy },
  { name: 'surface', css: '--surface', light: HEX.white, dark: HEX.navyDeep },
  { name: 'text', css: '--fg', light: HEX.navy, dark: HEX.white },
  { name: 'accent', css: '--accent', light: HEX.green, dark: HEX.green },
  { name: 'muted', css: '--muted', light: HEX.muted, dark: HEX.navyMuted },
  { name: 'line', css: '--line', light: HEX.navy, dark: HEX.white, lightA: 0.14, darkA: 0.18 },
];
export const tokenValue = (t, mode) => {
  const a = t[mode === 'light' ? 'lightA' : 'darkA'];
  const hex = t[mode];
  return a ? { swatch: hex, alpha: a, text: `${hex} at ${Math.round(a * 100)}%`, copy: `rgba(${hexToRgb(hex)}, ${a})` } : { swatch: hex, alpha: 1, text: hex, copy: hex };
};
