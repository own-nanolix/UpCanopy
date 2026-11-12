'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { tMove } from '@/lib/motion';
import s from './lp-agenda.module.css';

// The live week: days across, hours down, placeholder blocks that can be selected and moved one slot at a time.
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FIRST = 7;
const ROWS = 12;
const TODAY = 2;
const hour = (r) => `${String(FIRST + r).padStart(2, '0')}:00`;

const START = [
  { id: 1, d: 0, r: 4, n: 2, w: 6 },
  { id: 2, d: 1, r: 3, n: 3, w: 8 },
  { id: 3, d: 2, r: 5, n: 1, w: 5 },
  { id: 4, d: 3, r: 1, n: 2, w: 7 },
  { id: 5, d: 3, r: 6, n: 2, w: 4 },
  { id: 6, d: 4, r: 3, n: 3, w: 9 },
  { id: 7, d: 5, r: 2, n: 2, w: 6 },
  { id: 8, d: 6, r: 7, n: 1, w: 5 },
];

export default function WeekGrid() {
  const [blocks, setBlocks] = useState(START);
  const [sel, setSel] = useState(null);
  const [note, setNote] = useState('');

  const tryMove = (id, dd, dr) => {
    const b = blocks.find((x) => x.id === id);
    if (!b) return;
    const d = b.d + dd, r = b.r + dr;
    let ok = d >= 0 && d < 7 && r >= 0 && r + b.n <= ROWS;
    if (ok && blocks.some((o) => o.id !== id && o.d === d && r < o.r + o.n && o.r < r + b.n)) ok = false;
    if (!ok) { setNote(`Block ${id} cannot move there.`); return; }
    setBlocks((bs) => bs.map((x) => (x.id === id ? { ...x, d, r } : x)));
    setNote(`Block ${id}: ${DAYS[d]}, ${hour(r)}.`);
  };
  const onKey = (e, id) => {
    const m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (m) { e.preventDefault(); setSel(id); tryMove(id, m[0], m[1]); }
    if (e.key === 'Escape') setSel(null);
  };
  const today = () => { setBlocks(START); setSel(null); setNote('Week reset to today.'); };
  const act = (dd, dr) => { if (sel) tryMove(sel, dd, dr); else setNote('Select a block first.'); };

  return (
    <div className={s.weekWrap} role="group" aria-label="Week agenda">
      <div className={s.scroll} tabIndex={-1}>
        <div className={s.grid}>
          {/* rules draw first, then the blocks rise */}
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <span key={`h${i}`} className={s.hline} style={{ gridRow: i + 2, '--i': i }} aria-hidden="true" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <span key={`v${i}`} className={s.vline} style={{ gridColumn: i + 1, '--i': i }} aria-hidden="true" />
          ))}
          <span className={s.todayCol} style={{ gridColumn: TODAY + 2 }} aria-hidden="true" />
          {DAYS.map((d, i) => (
            <span key={d} className={`${s.dayHead} ${i === TODAY ? s.isToday : ''}`} style={{ gridColumn: i + 2, gridRow: 1 }}>
              {d}{i === TODAY && <span className="sr-only"> (today)</span>}
            </span>
          ))}
          {Array.from({ length: ROWS }, (_, r) => (
            <span key={r} className={s.hourLabel} style={{ gridColumn: 1, gridRow: r + 2 }}>{hour(r)}</span>
          ))}
          {blocks.map((b) => (
            <motion.div
              key={b.id}
              layout
              transition={tMove}
              className={s.blockSlot}
              style={{ gridColumn: b.d + 2, gridRow: `${b.r + 2} / span ${b.n}` }}
            >
              <button
                type="button"
                className={`${s.block} ${sel === b.id ? s.blockOn : ''}`}
                style={{ '--i': b.id }}
                aria-pressed={sel === b.id}
                aria-label={`Block ${b.id}, ${DAYS[b.d]} ${hour(b.r)}. Press an arrow key to move one slot.`}
                onClick={() => setSel((x) => (x === b.id ? null : b.id))}
                onKeyDown={(e) => onKey(e, b.id)}
              >
                <span className="ph" style={{ minWidth: 0, width: `${b.w}em`, maxWidth: '80%' }} aria-hidden="true" />
                {b.n > 1 && <span className="ph" style={{ minWidth: 0, width: `${Math.max(3, b.w - 3)}em`, maxWidth: '55%' }} aria-hidden="true" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={s.bar}>
        <button type="button" className="btn btn-sm" onClick={today}><Icon name="calendar" size={16} /> Today</button>
        <span className="chip chip-sm" aria-hidden="true">Week</span>
        <span className={s.pad} role="group" aria-label="Move the selected block">
          <button type="button" className={s.pb} onClick={() => act(-1, 0)} aria-label="Move block to the previous day"><Icon name="arrow-left" size={18} /></button>
          <button type="button" className={s.pb} onClick={() => act(0, -1)} aria-label="Move block one hour earlier"><Icon name="arrow-up" size={18} /></button>
          <button type="button" className={s.pb} onClick={() => act(0, 1)} aria-label="Move block one hour later"><Icon name="arrow-down" size={18} /></button>
          <button type="button" className={s.pb} onClick={() => act(1, 0)} aria-label="Move block to the next day"><Icon name="arrow-right" size={18} /></button>
        </span>
        <span className="t-label on-navy" aria-hidden="true">{sel ? `Block ${sel} selected` : 'Select a block'}</span>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{note}</p>
    </div>
  );
}
