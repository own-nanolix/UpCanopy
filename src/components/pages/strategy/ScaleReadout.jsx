import { SCALES, PERSONALITY } from '@/lib/brand';
import s from './strategy.module.css';

// The five scales of the slide as a readable list: ten square steps, the chosen one in Green Park.
// The numbers are the ones printed on the slide (8, 7, 9, 8, 7 of 10); nothing else is measured.
export default function ScaleReadout() {
  return (
    <div className={s.readout}>
      <h3 className="t-caps-lg">Reading the scales</h3>
      <ul className={s.readList}>
        {SCALES.map((sc) => (
          <li key={sc.left} className={s.readRow}>
            <span className={s.readEnd} lang="pt-BR">{sc.left}</span>
            <span className={s.readSteps} role="img" aria-label={`${sc.left} to ${sc.right}: step ${sc.chosen} of 10`}>
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} className={i + 1 === sc.chosen ? s.stepOn : s.step} style={{ '--i': i }} />
              ))}
            </span>
            <span className={`${s.readEnd} ${s.readRight}`} lang="pt-BR">{sc.right}</span>
            <b className={s.readNo}>{sc.chosen}/10</b>
          </li>
        ))}
      </ul>
      <p className="t-small muted">
        The personality these scales sit beside:{' '}
        {PERSONALITY.map((p, i) => (
          <span key={p} lang="pt-BR">{i ? ' · ' : ''}<b>{p}</b></span>
        ))}
      </p>
    </div>
  );
}
