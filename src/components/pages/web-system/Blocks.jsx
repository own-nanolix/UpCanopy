import CopyValue from '@/components/site/CopyValue';
import Icon from '@/components/site/Icon';
import { Line } from '@/components/ui/Card';
import { MANIFESTO } from '@/lib/brand';
import s from './web-system.module.css';

export function PullQuote() {
  const text = MANIFESTO[4];
  return (
    <figure className={s.quote}>
      <blockquote style={{ margin: 0 }}>
        <p lang="pt-BR" className="t-line">
          <Line text={text} strong="crescimento visível" className="strong" />
        </p>
      </blockquote>
      <figcaption className={`t-label ${s.quoteCap}`}>Manifesto</figcaption>
    </figure>
  );
}

// Real tokens from globals.css.
const GROUPS = [
  { title: 'Palette', rows: [['--green', '#26cf7b'], ['--navy', '#162557'], ['--green-dark', '#052e25'], ['--asphalt', '#1d1d1b'], ['--mint', '#f2ffe4'], ['--gray', '#dadada']] },
  { title: 'Shape', rows: [['--stroke', '2px'], ['--r-0', '0px']] },
  { title: 'Motion', rows: [['--ease-out', 'cubic-bezier(0.16, 1, 0.3, 1)'], ['--ease-in-out', 'cubic-bezier(0.7, 0, 0.3, 1)'], ['--ease-draw', 'cubic-bezier(0.45, 0, 0.15, 1)'], ['--ease-lock', 'cubic-bezier(0.2, 1.2, 0.4, 1)'], ['--dur-1', '120ms'], ['--dur-2', '240ms'], ['--dur-3', '480ms'], ['--dur-4', '800ms'], ['--dur-5', '1400ms']] },
];
const ALL = GROUPS.flatMap((g) => g.rows.map(([k, v]) => `${k}: ${v};`)).join('\n');

export function TokenBlock() {
  return (
    <div className={s.code}>
      <div className={s.codeHead}>
        <span className="tag">:root</span>
        <CopyValue value={ALL} label="all tokens" className={s.copyAll}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="copy" size={14} /> Copy all
          </span>
        </CopyValue>
      </div>
      <div className={s.tokBody} role="group" aria-label="Design tokens">
        {GROUPS.map((g, gi) => (
          <div key={g.title}>
            {gi > 0 && <div className={s.tokGap} />}
            {g.rows.map(([k, v]) => (
              <div key={k} className={s.tokRow}>
                <span className={s.tokSwatch} style={g.title === 'Palette' ? { background: v } : { visibility: 'hidden' }} aria-hidden="true" />
                <span className={s.tokName}>{k}</span>
                <CopyValue value={v} label={`${k} value`}>{v}</CopyValue>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
