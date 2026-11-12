'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { CoverArt } from './HardArt';
import s from './lp-hardscape.module.css';

// The mark crop slides in from the right edge and lands on its place (a wrapper moves; the artwork does not).
export default function HeroCover() {
  const skip = useReducedMotion();
  return (
    <motion.div className={s.cover} initial={skip ? false : { x: '16%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.4, ease: ease.draw }}>
      <CoverArt />
    </motion.div>
  );
}
