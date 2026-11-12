import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { TOKENS, tokenValue } from './color-data';
import s from './color.module.css';

const MODES = [
  { id: 'light', title: 'Light mode, the mint page', x: 0, ground: HEX.mint, ink: HEX.navy, muted: HEX.muted },
  { id: 'dark', title: 'Dark mode, the navy page', x: 520, ground: HEX.navy, ink: HEX.white, muted: HEX.navyMuted },
];

// Semantic tokens as two columns (exportable sheet).
export function TokensArt() {
  return (
    <Art viewBox="0 0 1000 540" title="Semantic tokens for light and dark mode" exportName="color-tokens">
      {MODES.map((m) => (
        <g key={m.id}>
          <rect x={m.x} y="0" width="480" height="540" fill={m.ground} />
          {m.id === 'light' && <rect x="1" y="1" width="478" height="538" fill="none" stroke={HEX.navy} strokeWidth="2" />}
          <text x={m.x + 28} y="46" fontSize="12" fontWeight="500" letterSpacing="1.2" fill={m.ink} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{m.title.toUpperCase()}</text>
          {TOKENS.map((t, i) => {
            const v = tokenValue(t, m.id);
            const y = 76 + i * 74;
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

// The same tokens as two click-to-copy columns.
export function TokenColumns() {
  return (
    <div className={s.tokenCols}>
      {MODES.map((m) => (
        <div key={m.id} className={`${s.tokenCol} ${m.id === 'light' ? s.tokenLight : s.tokenDark}`}>
          <div className={s.tokenHead}>{m.id === 'light' ? 'Light' : 'Dark'}</div>
          {TOKENS.map((t) => {
            const v = tokenValue(t, m.id);
            return (
              <div key={t.name} className={s.tokenRow}>
                <span className={s.tokenSw} style={{ background: v.swatch, opacity: v.alpha < 1 ? 0.5 : 1 }} />
                <span>
                  <span className={s.tokenName}>{t.name}</span>
                  <br />
                  <CopyValue value={t.css} label={`${m.id} ${t.name} token`} className={s.tokenCss} />
                </span>
                <CopyValue value={v.copy} label={`${m.id} ${t.name} value`} className={s.tokenVal}>{v.text}</CopyValue>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
