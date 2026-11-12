'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { Placeholder } from '@/components/ui/Card';
import { AREAS } from '@/lib/brand';
import { ease } from '@/lib/motion';
import s from './lp-home.module.css';

const ICONS = ['users', 'calendar', 'chart'];

// The body of each hero card is structure only: placeholder rows, as no product screen exists in the case study.
function Body({ kind }) {
  if (kind === 0) {
    return [0, 1, 2].map((i) => (
      <li key={i} className={s.miniRow}>
        <span className={s.miniTile} />
        <span className={s.miniText}><Placeholder width={7} label="Client name" /><Placeholder width={4} label="Client detail" /></span>
        <span className={i === 1 ? 'dot' : 'dot dot-on'} />
      </li>
    ));
  }
  if (kind === 1) {
    return (
      <>
        <li className={s.miniWeek}>{Array.from({ length: 7 }, (_, i) => <span key={i} className={i === 2 ? s.miniDayOn : s.miniDay} />)}</li>
        {[0, 1].map((i) => (
          <li key={i} className={s.miniRow}>
            <span className={s.miniTile} />
            <span className={s.miniText}><Placeholder width={8} label="Appointment" /></span>
          </li>
        ))}
      </>
    );
  }
  return [30, 55, 80].map((w, i) => (
    <li key={i} className={s.miniRow}>
      <span className={s.miniText}><Placeholder width={6} label="Ledger entry" /></span>
      <span className={s.miniBar}><span style={{ width: `${w}%` }} /></span>
    </li>
  ));
}

// Three overlapping product cards, stepping diagonally up and to the right (as the mockup cascades do).
export default function HeroStack() {
  return (
    <div className={s.stack} aria-hidden="true">
      {AREAS.map((name, i) => (
        <motion.div
          key={name}
          className={s.stackCard}
          style={{ left: `${i * 19}%`, top: `${(2 - i) * 21}%`, zIndex: i + 1 }}
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.9 + i * 0.16 }}
        >
          <div className={s.miniHead}>
            <span className="t-caps">{name}</span>
            <Icon name={ICONS[i]} size={18} />
          </div>
          <ul className={s.miniList}><Body kind={i} /></ul>
        </motion.div>
      ))}
    </div>
  );
}
