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
