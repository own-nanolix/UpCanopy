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
