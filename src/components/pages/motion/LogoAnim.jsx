'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { MarkG, MARK_ARCH, MARK_BAR } from '@/components/art/Mark';
import s from './motion.module.css';

const label = { fontSize: 14, fill: '#FFFFFF' };
const wide = { fontFamily: 'var(--font-wide)' };

// Key frames sampled from the shared roof-arch / roof-bar keyframes: the arch starts 46% of its height up
// (28.4 mark units) on ease-lock over 1400 ms, the bar 40% down (9.9 units) on ease-out over 800 ms.
// [arch offset, arch opacity, bar offset, bar opacity, caption]. The start frame is drawn faint so it can be seen.
const FRAMES = [
  [-28.4, 0.2, 9.9, 0.2, '0 ms  Start: apart, transparent'],
  [-14.7, 0.94, 2.9, 0.7, '140 ms  Both rising into place'],
  [-2.6, 1, 0.2, 1, '420 ms  Bar set, arch lowering'],
  [0, 1, 0, 1, '1400 ms  Locked'],
];

export default function LogoAnim() {
  const [run, setRun] = useState(0);
  return (
    <motion.div onViewportEnter={() => setRun((r) => r + 1)} viewport={{ once: true, amount: 0.4 }}>
      <div className={s.stack1}>
        <div>
          <Art key={run} className={s.art} style={{ maxWidth: 460 }} viewBox="0 0 400 270" title="The arch lowering onto the bar like a roof being set" exportName="motion-logo-roof">
            <rect width="400" height="270" fill="#162557" />
            <MarkG x={100} y={26} size={200} fill="#26CF7B" archClass="roof-arch" barClass="roof-bar" />
            <text x="16" y="28" fontSize="15" fontWeight="700" fill="#26CF7B" className="wide" style={wide}>ROOF SET</text>
            <text x="16" y="236" {...label}>roof-bar 800 ms, ease.out</text>
            <text x="16" y="256" {...label}>roof-arch 1400 ms, ease.lock</text>
          </Art>
          <div className={s.cap}>
            <span className="t-small muted">The un-animated state is the finished mark.</span>
            <Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Replay</Button>
          </div>
        </div>
        <div>
          <Art className={s.art} viewBox="0 0 800 560" title="Storyboard: four key frames of the mark being set" exportName="motion-logo-storyboard">
            <rect width="800" height="560" fill="#F0F0F0" />
            {FRAMES.map(([ay, ao, by, bo, cap], i) => {
              const x = 16 + (i % 2) * 396;
              const y = 16 + Math.floor(i / 2) * 272;
              return (
                <g key={cap}>
                  <rect x={x} y={y} width="372" height="256" fill="#162557" />
                  <g transform={`translate(${x + 120} ${y + 58}) scale(1.32)`} fill="#26CF7B">
                    <path d={MARK_ARCH} transform={`translate(0 ${ay})`} opacity={ao} />
                    <path d={MARK_BAR} transform={`translate(0 ${by})`} opacity={bo} />
                  </g>
                  <text x={x + 14} y={y + 238} fontSize="20" fill="#FFFFFF">{cap}</text>
                </g>
              );
            })}
          </Art>
          <div className={s.cap}>
            <span className="t-small muted">Storyboard: four key frames.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
