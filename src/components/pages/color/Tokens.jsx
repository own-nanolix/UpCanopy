import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { TOKENS, tokenValue } from './color-data';
import Hotspots from './Hotspots';

const MODES = [
  { id: 'light', title: 'Light mode, the mint page', x: 0, ground: HEX.mint, ink: HEX.navy, muted: HEX.muted },
  { id: 'dark', title: 'Dark mode, the navy page', x: 520, ground: HEX.navy, ink: HEX.white, muted: HEX.navyMuted },
];
const rowY = (i) => 76 + i * 74;

// Semantic tokens as two columns, light and dark (exportable sheet).
function TokensArt() {
  return (
    <Art viewBox="0 0 1000 540" title="Semantic tokens for light and dark mode" exportName="color-tokens">
      {MODES.map((m) => (
        <g key={m.id}>
          <rect x={m.x} y="0" width="480" height="540" fill={m.ground} />
          {m.id === 'light' && <rect x="1" y="1" width="478" height="538" fill="none" stroke={HEX.navy} strokeWidth="2" />}
          <text x={m.x + 28} y="46" fontSize="12" fontWeight="500" letterSpacing="1.2" fill={m.ink} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{m.title.toUpperCase()}</text>
          {TOKENS.map((t, i) => {
            const v = tokenValue(t, m.id);
            const y = rowY(i);
            return (
              <g key={t.name} className="slide-up" style={{ '--i': i + (m.id === 'dark' ? 6 : 0) }}>
                <rect x={m.x + 28} y={y} width="52" height="52" fill={v.swatch} fillOpacity={v.alpha} />
                <rect x={m.x + 28} y={y} width="52" height="52" fill="none" stroke={m.muted} strokeOpacity="0.7" />
                <text x={m.x + 100} y={y + 24} fontSize="20" fontWeight="700" fill={m.ink}>{t.name}</text>
                <text x={m.x + 100} y={y + 46} fontSize="14" fontWeight="400" fill={m.muted}>{t.css}</text>
                <text x={m.x + 452} y={y + 34} fontSize="16" fontWeight="500" textAnchor="end" fill={m.ink}>{v.text}</text>
              </g>
            );
          })}
        </g>
      ))}
    </Art>
  );
}

// Each row has two buttons over the sheet: the token name copies the CSS variable, the value copies the value.
const SPOTS = MODES.flatMap((m) =>
  TOKENS.flatMap((t, i) => {
    const v = tokenValue(t, m.id);
    const y = rowY(i) - 6;
    return [
      { key: `${m.id}-${t.name}-css`, x: m.x + 20, y, w: 250, h: 64, value: t.css, label: `${m.id} mode ${t.name} variable ${t.css}` },
      { key: `${m.id}-${t.name}-val`, x: m.x + 280, y, w: 184, h: 64, value: v.copy, label: `${m.id} mode ${t.name} value ${v.text}` },
    ];
  }),
);

export default function Tokens() {
  return (
    <Hotspots vw={1000} vh={540} spots={SPOTS}>
      <TokensArt />
    </Hotspots>
  );
}
