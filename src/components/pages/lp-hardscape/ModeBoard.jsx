'use client';

import { useEffect, useRef, useState } from 'react';
import { AREAS, MODES } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { range, still } from '@/lib/site';
import { Segmented } from '@/components/ui/Toggle';
import s from './lp-hardscape.module.css';

// Nine placeholder task cards. In "sobrevivência" they lie in a scattered pile; in "expansão" they snap
// into ordered columns, one column per area. Positions are seeded so server and browser agree.
const rnd = seeded(314);
const TASKS = range(9, (i) => ({
  i, c: i % 3, r: Math.floor(i / 3),
  jx: Math.round((rnd() - 0.5) * 90), jy: Math.round((rnd() - 0.5) * 120), rot: Math.round((rnd() - 0.5) * 34), z: 1 + Math.floor(rnd() * 9),
}));

export default function ModeBoard() {
  const [mode, setMode] = useState(MODES[0]);
  const touched = useRef(false);
  const stage = useRef(null);

  // Signature moment: the first time the board is seen, the pile sets itself in order (from a timer).
  useEffect(() => {
    const el = stage.current;
    if (!el || still()) return undefined;
    let timer = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      timer = window.setTimeout(() => { if (!touched.current) setMode(MODES[1]); }, 1400);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const ordered = mode === MODES[1];
  const pick = (m) => { touched.current = true; setMode(m); };

  return (
    <div>
      <div className={s.modeBar}>
        <div lang="pt-BR"><Segmented id="lp-hardscape-mode" label="Mode" options={MODES} value={mode} onChange={pick} /></div>
        <p className="t-small" style={{ color: 'var(--navy-muted)' }} aria-live="polite">{ordered ? 'Ordered columns' : 'Scattered pile'}</p>
      </div>
      <div ref={stage} className={`${s.stage} ${ordered ? s.ordered : s.pile}`}>
        <div className={s.heads} aria-hidden="true">{AREAS.map((a) => <span key={a}>{a}</span>)}</div>
        <div className={s.field}>
          {TASKS.map((t) => (
            <div key={t.i} className={`${s.task} ${s[`t${t.c}`]}`} style={{ '--i': t.i, '--c': t.c, '--r': t.r, '--jx': t.jx, '--jy': t.jy, '--rot': t.rot, '--z': t.z }}>
              <span className={s.taskRow}><i className={s.taskBox} /><span className={s.taskPh} style={{ width: `${40 + ((t.i * 17) % 40)}%` }} /></span>
              <span className={s.taskPh} style={{ width: `${30 + ((t.i * 23) % 50)}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
