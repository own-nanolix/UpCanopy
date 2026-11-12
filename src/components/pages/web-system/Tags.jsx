'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import { AREAS, DESCRIPTOR, DIRECTION, PILLARS, SCALES, SECTORS } from '@/lib/brand';
import { range } from '@/lib/site';
import s from './web-system.module.css';

function Group({ title, children, navy }) {
  return (
    <div>
      <h3 className="t-label" style={{ marginBottom: 8 }}>{title}</h3>
      <div className={navy ? s.stripNavy : s.chipGroup}>{children}</div>
    </div>
  );
}

export function Tags() {
  const [on, setOn] = useState({ CRM: true, Agenda: false, Financeiro: false });
  return (
    <div className="stack">
      <Group title="Descriptor"><Chip>{DESCRIPTOR}</Chip></Group>
      <Group title="Areas">
        <Chip tone="green">{AREAS[0]}</Chip>
        <Chip tone="navy">{AREAS[1]}</Chip>
        <Chip tone="ink">{AREAS[2]}</Chip>
      </Group>
      <Group title="Pillars" >
        {PILLARS.map((p) => <Chip key={p} tone="navy" lang="pt-BR">{p}</Chip>)}
      </Group>
      <Group title="Sectors, on navy" navy>
        {SECTORS.map((p, i) => <Chip key={p} tone={i ? 'mint' : 'green'}>{p}</Chip>)}
      </Group>
      <Group title="Direction">
        {DIRECTION.words.map((w) => <Chip key={w} size="sm" lang="pt-BR">{w}</Chip>)}
      </Group>
      <Group title="Toggle chips, pressed state">
        {AREAS.map((a) => (
          <Chip key={a} pressed={on[a]} onClick={() => setOn((o) => ({ ...o, [a]: !o[a] }))}>{a}</Chip>
        ))}
      </Group>
      <div>
        <h3 className="t-label" style={{ marginBottom: 8 }}>Toggle chip, static states</h3>
        <div className={s.pairRow}>
          <span className="chip">Default</span>
          <span className={`chip ${s.pressedStatic}`}>Pressed</span>
          <span className="chip" style={{ background: 'var(--navy)', color: 'var(--white)', borderColor: 'var(--navy)' }}>Hover</span>
          <span className="chip" style={{ opacity: 0.4 }}>Disabled</span>
        </div>
      </div>
    </div>
  );
}

// The ten-dot scale as a status component: the green dot is the chosen step; click or use the arrow keys.
function ScaleRow({ sc }) {
  const [v, setV] = useState(sc.chosen);
  return (
    <div className={s.scaleRow} role="group" aria-label={`${sc.left} to ${sc.right}`}>
      <div className={`${s.scaleLabels} t-caps`}>
        <span lang="pt-BR">{sc.left}</span>
        <span lang="pt-BR">{sc.right}</span>
      </div>
      <div className={s.scaleDots}>
        {range(10, (k) => k + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={s.dotBtn}
            aria-label={`Step ${n} of 10`}
            aria-pressed={v === n}
            onClick={() => setV(n)}
          >
            <span className={`dot ${v === n ? 'dot-on lock' : ''}`} style={{ '--i': n }} />
          </button>
        ))}
      </div>
      <p className="t-small" style={{ margin: 0 }}>{v} / 10</p>
    </div>
  );
}

export function ScaleStatus() {
  return (
    <div className={`${s.stage} ${s.gWhite}`}>
      {SCALES.map((sc) => <ScaleRow key={sc.left} sc={sc} />)}
    </div>
  );
}
