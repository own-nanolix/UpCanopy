'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { clamp } from '@/lib/site';
import { tMove } from '@/lib/motion';
import { motion } from 'framer-motion';
import s from './modules.module.css';
import w from './lp-agenda.module.css';

// A day on an hour axis with a "now" rule the visitor steps through, hour by hour.
export const FIRST = 7;
export const HOURS = 12;
const ROW = 46;
const hour = (i) => `${String(FIRST + i).padStart(2, '0')}:00`;
// Which rows hold a block, and how many rows it spans.
const SLOTS = { 1: 2, 4: 1, 6: 3, 10: 1 };

export default function DayNow() {
  const [h, setH] = useState(2);
  const go = (d) => setH((x) => clamp(x + d, 0, HOURS - 1));
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'Home') { e.preventDefault(); setH(0); }
    if (e.key === 'End') { e.preventDefault(); setH(HOURS - 1); }
  };
  const inBlock = Object.entries(SLOTS).some(([r, n]) => h >= Number(r) && h < Number(r) + n);

  return (
    <div className={s.now}>
      <div className={s.nowBar}>
        <button type="button" className={w.pb} onClick={() => go(-1)} disabled={h === 0} aria-label="Move the now rule one hour earlier"><Icon name="arrow-up" size={18} /></button>
        <button type="button" className={w.pb} onClick={() => go(1)} disabled={h === HOURS - 1} aria-label="Move the now rule one hour later"><Icon name="arrow-down" size={18} /></button>
        <button type="button" className="btn btn-sm btn-navy" onClick={() => setH(0)}>Start of day</button>
        <span className="t-label" style={{ color: "var(--navy)" }} role="status" aria-live="polite">Now {hour(h)}{inBlock ? ', in a block' : ', free'}</span>
      </div>
      <div className={s.nowDay} role="group" tabIndex={0} aria-label="Day timeline. Arrow keys move the now rule." onKeyDown={onKey}>
        {Array.from({ length: HOURS }, (_, i) => (
          <div key={i} className={`${s.nowRow} ${i === h ? s.nowRowOn : ''}`}>
            <span className={s.nowHour}>{hour(i)}</span>
          </div>
        ))}
        {Object.entries(SLOTS).map(([r, n]) => (
          <span key={r} className={`${s.nowBlock} ${h >= Number(r) && h < Number(r) + n ? s.nowBlockOn : ''}`} style={{ top: Number(r) * ROW + 3, height: n * ROW - 6 }} aria-hidden="true">
            <span className="ph" style={{ width: '8em' }} />
            {n > 1 && <span className="ph" style={{ width: '5em' }} />}
          </span>
        ))}
        <motion.span className={s.nowRule} initial={false} animate={{ y: h * ROW }} transition={tMove} aria-hidden="true">
          <span className={s.nowTag}>Now</span>
        </motion.span>
      </div>
    </div>
  );
}
