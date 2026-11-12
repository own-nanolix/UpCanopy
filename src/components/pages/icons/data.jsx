import { CORE } from '@/components/site/icons';

// The 32 icons of CORE sorted into four groups. Group names are our own plain words.
export const GROUPS = [
  { id: 'icons-group-trade', label: 'Trade and place', names: ['layers', 'crane', 'hardhat', 'ruler', 'cube', 'truck', 'pin', 'home'] },
  { id: 'icons-group-office', label: 'Office', names: ['briefcase', 'folder', 'note', 'chart', 'calendar', 'clock', 'bell', 'headset'] },
  { id: 'icons-group-people', label: 'People and links', names: ['user', 'users', 'link', 'share', 'gear', 'logout'] },
  { id: 'icons-group-actions', label: 'Actions', names: ['arrow-right', 'arrow-up-right', 'arrow-up', 'chevron-down', 'more', 'search', 'filter', 'check', 'plus', 'close'] },
];

export const SECTIONS = [
  { id: 'icons-construction', label: 'Construction' },
  { id: 'icons-use', label: 'Icons in use' },
  { id: 'icons-illustrations', label: 'Illustrations' },
];

// The one drawing rule of the set: 24 px grid, 2 px stroke, butt caps, mitre joins, no fills.
export function Glyph({ name, sw = 2, ...rest }) {
  return <path d={CORE[name]} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="butt" strokeLinejoin="miter" {...rest} />;
}

// An icon placed inside a larger SVG at x, y with a given pixel size and colour.
export function GlyphAt({ name, x = 0, y = 0, size = 24, color = 'currentColor', sw = 2 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} color={color}>
      <Glyph name={name} sw={sw} />
    </g>
  );
}

export const SPECS = ['24 px grid', '2 px stroke', 'Butt caps', 'Mitre joins', '2 px margin', 'No fills'];
