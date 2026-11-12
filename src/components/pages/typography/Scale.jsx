import Art from '@/components/art/Art';
import { HEX, LINES } from '@/lib/brand';
import { SCALE_ROWS } from './type-data';
import s from './typography.module.css';

// The ladder: each t-* class with its size printed wide and a real brand line set in the class itself.
export function Ladder() {
  return (
    <div className={s.ladder}>
      {SCALE_ROWS.map((r) => {
        const big = r.cls === 't-figure-xl' || r.cls === 't-wide-xl';
        return (
          <div key={r.cls} className={s.step}>
            <div>
              <span className={s.stepCls}>{r.cls}</span>
              <span className={s.stepSize}>{r.size}{r.size.includes('inherits') ? '' : ' px'}</span>
              <span className={s.stepSpec}>Weight {r.w} · line-height {r.lh}</span>
            </div>
            <div className={`${s.sample} ${big ? s.sampleBig : ''} ${r.cls}`} lang={r.pt ? 'pt-BR' : undefined}>
              {r.text}{r.strong ? <strong className="hl-ink">{r.strong}</strong> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// The same ladder as one exportable sheet (sizes capped at 64 px so that it fits).
const SHORT = { 't-line': LINES.bridge.rows4[2], 't-lead': LINES.credibility.rows[1] };
export function LadderArt() {
  const rows = SCALE_ROWS.filter((r) => !['t-figure-xl', 't-wide-xl', 't-wide'].includes(r.cls));
  const sized = rows.map((r) => ({ ...r, px: Math.min(r.max, 64) }));
  const tops = sized.map((r, i) => 30 + sized.slice(0, i).reduce((a, q) => a + q.px * 1.25 + 26, 0));
  const H = tops[tops.length - 1] + sized[sized.length - 1].px * 1.25 + 40;
  return (
    <Art viewBox={`0 0 1200 ${Math.round(H)}`} title="Type scale: each step with size, weight and line-height" exportName="typography-scale">
      <rect width="1200" height={Math.round(H)} fill={HEX.white} />
      {sized.map((r, i) => {
        const y = tops[i] + r.px;
        return (
          <g key={r.cls} className="slide-up" style={{ '--i': i }}>
            <text x="30" y={y - 4} fontSize="12" fontWeight="700" fill={HEX.greenInk} letterSpacing="0.6">{r.cls}</text>
            <text x="30" y={y + 14} fontSize="12" fontWeight="400" fill={HEX.muted}>{r.size} px · {r.w} · {r.lh}</text>
            <text x="270" y={y} fontSize={r.px} fontWeight={r.w} fill={HEX.navy} lang={r.pt ? 'pt-BR' : undefined}
              className={r.wide ? 'wide' : undefined} style={r.wide ? { fontFamily: 'var(--font-wide)' } : undefined}
              letterSpacing={r.wide ? (r.cls === 't-caps' || r.cls === 't-caps-lg' || r.cls === 't-label' ? r.px * 0.07 : -r.px * 0.04) : 0}>
              {SHORT[r.cls] || r.text}
            </text>
            <path d={`M30 ${y + r.px * 0.25 + 6}H1170`} stroke={HEX.navy} strokeOpacity="0.1" />
          </g>
        );
      })}
    </Art>
  );
}
