'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { MarkG, MARK_ARCH, MARK_BAR } from '@/components/art/Mark';
import s from './motion.module.css';

const label = { fontSize: 14, fill: '#FFFFFF' };
const wide = { fontFamily: 'var(--font-wide)' };

// Key frames: [arch offset in mark units, arch opacity, bar offset, bar opacity, caption]
const FRAMES = [
  [-31, 0.2, 7.5, 0.2, '1  Start: both pieces hidden'],
  [-31, 1, 0, 1, '2  Bar set, arch above (800 ms)'],
  [-9, 1, 0, 1, '3  Arch lowering'],
  [0, 1, 0, 1, '4  Locked (1400 ms)'],
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
                  <g transform={`translate(${x + 100} ${y + 16}) scale(1.72)`} fill="#26CF7B">
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
