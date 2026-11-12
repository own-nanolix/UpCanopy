'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { ease, dur, stagger } from '@/lib/motion';
import { tr } from './shared';
import s from './motion.module.css';

const DURS = [
  { token: 'dur-1', ms: 120, sec: dur.d1, use: 'Hover' },
  { token: 'dur-2', ms: 240, sec: dur.d2, use: 'Toggles' },
  { token: 'dur-3', ms: 480, sec: dur.d3, use: 'Cards and reveals' },
  { token: 'dur-4', ms: 800, sec: dur.d4, use: 'Charts' },
  { token: 'dur-5', ms: 1400, sec: dur.d5, use: 'Drawing' },
];

export function Durations() {
  const [run, setRun] = useState(0);
  return (
    <motion.div className={s.durs} onViewportEnter={() => setRun((r) => r + 1)} viewport={{ once: true, amount: 0.5 }}>
      <div className={s.durHead}>
        <span className="t-caps">Five durations, real time</span>
        <Button size="sm" variant="mint" icon="play" onClick={() => setRun((r) => r + 1)}>Play all</Button>
      </div>
      {DURS.map((d) => (
        <div key={d.token} className={s.durLane}>
          <div className={s.durName}>
            <b>{`${d.ms} ms`}</b>
            {`--${d.token}`}
            <br />
            {d.use}
          </div>
          <div className={s.durTrack}>
            <motion.div key={run} className={s.durFill} initial={run ? { scaleX: 0 } : false} animate={{ scaleX: 1 }} transition={tr(d.sec, ease.inOut)} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// The 45 ms stagger on the frond (fan) and on the ten-dot scale (lock), two exportable plates.
export function Stagger() {
  const [run, setRun] = useState(0);
  const white = '#FFFFFF';
  return (
    <motion.div onViewportEnter={() => setRun((r) => r + 1)} viewport={{ once: true, amount: 0.4 }}>
      <div className={s.pair2}>
        <div>
          <Art key={`f${run}`} className={s.art} viewBox="0 0 420 270" title="Stagger on the frond: leaflets fan out 45 ms apart" exportName="motion-stagger-frond">
            <rect width="420" height="270" fill="#162557" />
            <FrondG fan tone="onNavy" cx={210} cy={262} r={150} a0={198} a1={342} count={14} len={104} width={7} lean={62} />
            <text x="16" y="28" fontSize="15" fontWeight="700" fill="#26CF7B" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>FROND · FAN</text>
            <text x="16" y="254" fontSize="14" fill={white}>Leaflet i starts at i x 45 ms</text>
          </Art>
        </div>
        <div>
          <Art key={`d${run}`} className={s.art} viewBox="0 0 420 270" title="Stagger on the ten-dot scale: dots lock in 45 ms apart" exportName="motion-stagger-dots">
            <rect width="420" height="270" fill="#162557" />
            <ScaleDotsG lock x={36} y={120} w={348} r={14} chosen={8} off="#6F78B8" />
            <text x="16" y="28" fontSize="15" fontWeight="700" fill="#26CF7B" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>DOTS · LOCK</text>
            <text x="16" y="254" fontSize="14" fill={white}>Dot i locks at i x 45 ms + 200 ms</text>
          </Art>
        </div>
      </div>
      <div className={s.cap}>
        <span className="t-small muted">{`Stagger: ${Math.round(stagger * 1000)} ms`}</span>
        <Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Replay</Button>
      </div>
    </motion.div>
  );
}
