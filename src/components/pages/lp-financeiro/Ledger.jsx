'use client';

import { useEffect, useRef, useState } from 'react';
import { DOCUMENT } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { range, still } from '@/lib/site';
import Chip from '@/components/ui/Chip';
import { Placeholder } from '@/components/ui/Card';
import s from './lp-financeiro.module.css';

// Row lengths are structure, not amounts: seeded so server and browser agree.
const rnd = seeded(23);
const WIDTHS = range(8, () => 30 + Math.round(rnd() * 62));
const ALL = WIDTHS.reduce((a, b) => a + b, 0);

// The hero ledger: every row has a square checkbox; the thick running bar grows with the ticked rows.
// On entry three rows tick themselves one after another (timers), unless the visitor has already touched it.
export default function Ledger() {
  const [ticked, setTicked] = useState([]);
  const touched = useRef(false);

  useEffect(() => {
    if (still()) return undefined;
    const timers = [1, 4, 6].map((row, n) =>
      setTimeout(() => {
        if (touched.current) return;
        setTicked((t) => (t.includes(row) ? t : [...t, row]));
      }, 1900 + n * 520),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggle = (i) => {
    touched.current = true;
    setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));
  };
  const sum = ticked.reduce((a, i) => a + WIDTHS[i], 0);
  const frac = sum / ALL;

  return (
    <div className={s.ledger} data-screen="lp-financeiro-ledger">
      <div className={s.ledgerHead}>
        <h2 className="t-caps-lg">Financeiro</h2>
        <Chip size="sm">{ticked.length} / {WIDTHS.length}</Chip>
      </div>
      <div className={s.ledgerCols} aria-hidden="true">
        <span />
        <span className={s.ledgerColsIn}><span>{DOCUMENT.invoice[0]}</span><span>{DOCUMENT.invoice[2]}</span></span>
      </div>
      <ul className={s.rows} aria-label="Ledger rows">
        {WIDTHS.map((w, i) => {
          const on = ticked.includes(i);
          return (
            <li key={i} className={`${s.row} ${on ? s.on : ''}`}>
              <input type="checkbox" className={s.box} id={`lp-financeiro-row-${i}`} checked={on} onChange={() => toggle(i)} />
              <label htmlFor={`lp-financeiro-row-${i}`} className={s.track} style={{ cursor: 'pointer' }}>
                <span className="sr-only">Row {i + 1}</span>
                <span className={s.fill} style={{ width: `${w}%`, '--i': i }} />
              </label>
            </li>
          );
        })}
      </ul>
      <div className={s.run}>
        <div className={s.runHead}>
          <span>{DOCUMENT.invoice[2]}</span>
          <Placeholder width={7} />
        </div>
        <div className={s.runTrack} role="progressbar" aria-label="Ticked rows" aria-valuemin={0} aria-valuemax={WIDTHS.length} aria-valuenow={ticked.length}>
          <div className={s.runFill} style={{ transform: `scaleX(${frac})` }} />
        </div>
      </div>
    </div>
  );
}
