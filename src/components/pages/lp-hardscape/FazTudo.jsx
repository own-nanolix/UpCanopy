'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AREAS, LINES } from '@/lib/brand';
import { range } from '@/lib/site';
import { ease } from '@/lib/motion';
import Button from '@/components/ui/Button';
import s from './lp-hardscape.module.css';

// Nine chips, three per area. The pile is one overloaded column with the chips leaning on each other;
// ordered, each area gets its own column. Framer's layout animation moves the chips between the two grids.
const TONES = ['chipWhite', 'chipGreen', 'chipNavy'];
const CHIPS = range(9, (i) => ({ i, area: i % 3, rot: ((i * 7) % 11) - 5, nudge: ((i * 13) % 9) - 4 }));

export default function FazTudo() {
  const [ordered, setOrdered] = useState(false);
  const still = useReducedMotion();
  const move = still ? { duration: 0 } : { duration: 0.8, ease: ease.lock };

  return (
    <div className={`${s.faz} ${ordered ? s.fazOrdered : s.fazPile}`}>
      <div className={s.fazBar}>
        <div className={s.fazWho}>
          <span className={s.eyebrow}>{ordered ? 'CEO' : 'Faz-tudo'}</span>
          <p className="t-small on-navy" aria-live="polite">{ordered ? 'Three ordered columns, one per area.' : 'One column carrying everything.'}</p>
        </div>
        <Button variant={ordered ? 'ghost' : 'green'} icon={ordered ? 'arrow-left' : 'arrow-up'} onClick={() => setOrdered((v) => !v)}>
          {ordered ? 'Back to the pile' : 'Sort into areas'}
        </Button>
      </div>
      <div className={s.fazStage}>
        <div className={s.fazHeads} aria-hidden="true">{AREAS.map((a) => <span key={a}>{a}</span>)}</div>
        <ul className={s.fazGrid} aria-label="Task chips">
          {CHIPS.map((c) => (
            <motion.li
              key={c.i}
              layout
              transition={{ layout: move, rotate: move }}
              animate={{ rotate: ordered ? 0 : c.rot, x: ordered ? 0 : c.nudge * 6 }}
              className={`${s.fazChip} ${s[TONES[c.area]]}`}
              style={{ gridColumn: ordered ? c.area + 1 : 1, gridRow: ordered ? Math.floor(c.i / 3) + 1 : c.i + 1, zIndex: ordered ? 1 : 1 + c.i }}
            >
              <i className={s.taskBox} />{AREAS[c.area]}
            </motion.li>
          ))}
        </ul>
      </div>
      <p className={s.fazLine} lang="pt-BR">{LINES.control}</p>
    </div>
  );
}
