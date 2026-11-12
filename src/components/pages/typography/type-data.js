// Typography page data. Samples are brand lines and labels from @/lib/brand; sizes are the t-* classes of globals.css.
import { LINES, TAGLINE, DESCRIPTOR, DIRECTION, BRAND, CONTACT, PILLARS, SCALES, MANIFESTO } from '@/lib/brand';

export const TEXT_FACE = 'Text voice';
export const WIDE_FACE = 'Logotype voice';
export const TEXT_WEIGHTS = [[300, 'Light'], [400, 'Regular'], [500, 'Medium'], [700, 'Bold']];
export const WIDE_WEIGHTS = [[400, 'Regular'], [500, 'Medium'], [600, 'SemiBold']];

// Measured on the two free faces at 1000 px (em fractions, rounded).
export const METRICS = {
  text: { asc: 0.72, cap: 0.7, x: 0.5, desc: 0.2 },
  wide: { asc: 0.75, cap: 0.7, x: 0.53, desc: 0.22 },
};

const sp = (t) => t.slice(0, t.length - LINES.bridge.strong.length);

// The type scale, one row per t-* class. `sample` is a real brand line or label.
export const SCALE_ROWS = [
  { cls: 't-display', size: '38 to 84', w: 300, lh: '1.12', max: 64, text: LINES.level, pt: true },
  { cls: 't-h1', size: '32 to 64', w: 300, lh: '1.14', max: 56, text: TAGLINE, pt: true },
  { cls: 't-h2', size: '26 to 44', w: 300, lh: '1.18', max: 44, text: LINES.control, pt: true },
  { cls: 't-h3', size: '20 to 28', w: 400, lh: '1.25', max: 28, text: PILLARS.join(' • '), pt: true },
  { cls: 't-line', size: '22 to 36', w: 300, lh: '1.22', max: 36, text: sp(LINES.bridge.text), strong: LINES.bridge.strong, pt: true },
  { cls: 't-lead', size: '18 to 23', w: 300, lh: '1.45', max: 23, text: LINES.credibility.text, pt: true },
  { cls: 't-body', size: '17', w: 400, lh: '1.55', max: 17, text: MANIFESTO[1], pt: true },
  { cls: 't-small', size: '13', w: 400, lh: '1.45', max: 13, text: CONTACT.footer },
  { cls: 't-caps', size: '11', w: 500, lh: '1.3', max: 11, text: DESCRIPTOR, wide: true },
  { cls: 't-caps-lg', size: '13 to 18', w: 600, lh: '1.2', max: 18, text: DIRECTION.label, wide: true, pt: true },
  { cls: 't-label', size: '11', w: 400, lh: '1.35', max: 11, text: `${SCALES[0].left} … ${SCALES[0].right}`, wide: true, pt: true },
  { cls: 't-wide', size: 'inherits', w: 500, lh: '1', max: 56, text: BRAND, wide: true },
  { cls: 't-figure', size: '34 to 56', w: 500, lh: '1', max: 56, text: CONTACT.phone, wide: true },
  { cls: 't-figure-xl', size: '64 to 200', w: 500, lh: '0.86', max: 200, text: String(SCALES[0].chosen), wide: true },
  { cls: 't-wide-xl', size: '48 to 190', w: 500, lh: '0.9', max: 190, text: 'Up', wide: true },
];

export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const LOWER = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const DIGITS = '0123456789'.split('');
export const MARKS = ['.', ',', ':', ';', '!', '?', '(', ')', '+', '–', '•', '@', '&'];
export const ACC_LOW = 'á â ã ç é ê í ó ô õ ú'.split(' ');
export const ACC_UP = 'Á Â Ã Ç É Ê Í Ó Ô Õ Ú'.split(' ');
