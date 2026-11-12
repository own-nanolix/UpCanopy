'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { ease, dur } from '@/lib/motion';
import { r2 } from '@/lib/charts';
import { range } from '@/lib/site';
import { tr } from './shared';
import s from './motion.module.css';

const TOKENS = [
  { key: 'out', css: 'ease-out', note: 'Rising into place', e: ease.out },
  { key: 'inOut', css: 'ease-in-out', note: 'Moves between states', e: ease.inOut },
  { key: 'draw', css: 'ease-draw', note: 'Arcs and the frond sweeping', e: ease.draw },
  { key: 'lock', css: 'ease-lock', note: 'The last pixels of a piece locking in', e: ease.lock },
];

const X0 = 50, Y0 = 254, S = 170;
const px = (x) => r2(X0 + x * S);
const py = (y) => r2(Y0 - y * S);

// One easing curve on a unit grid, with its control handles and its cubic-bezier values.
function CurvePlate({ id, name, e }) {
  const [a, b, c, d] = e;
  const values = `cubic-bezier(${e.join(', ')})`;
  const navy = '#162557';
  const green = '#26CF7B';
  return (
    <Art className={s.plate} viewBox="0 0 300 314" title={`Easing curve ${name}: ${values}`} exportName={`motion-${id}`}>
      <rect width="300" height="314" fill="#FFFFFF" />
      {range(5, (i) => i / 4).map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(1)} stroke="#DADADA" strokeWidth="1" />
          <line x1={px(0)} y1={py(t)} x2={px(1)} y2={py(t)} stroke="#DADADA" strokeWidth="1" />
        </g>
      ))}
      <rect x={px(0)} y={py(1)} width={S} height={S} fill="none" stroke={navy} strokeWidth="2" />
      <line x1={px(0)} y1={py(1.2)} x2={px(1)} y2={py(1.2)} stroke="#DADADA" strokeWidth="1" strokeDasharray="4 4" />
      <text x="8" y={py(1) + 5} fontSize="13" fill="#4A5568">1.0</text>
      <text x="8" y={py(0) + 5} fontSize="13" fill="#4A5568">0</text>
      <text x={px(0.5)} y={py(0) + 22} fontSize="13" fill="#4A5568" textAnchor="middle">time</text>
      <line x1={px(0)} y1={py(0)} x2={px(a)} y2={py(b)} stroke={green} strokeWidth="3" />
      <line x1={px(1)} y1={py(1)} x2={px(c)} y2={py(d)} stroke={green} strokeWidth="3" />
      <path className="draw" style={{ '--len': 400 }} pathLength="400" d={`M${px(0)} ${py(0)}C${px(a)} ${py(b)} ${px(c)} ${py(d)} ${px(1)} ${py(1)}`} fill="none" stroke={navy} strokeWidth="5" />
      <rect x={px(0) - 5} y={py(0) - 5} width="10" height="10" fill={navy} />
      <rect x={px(1) - 5} y={py(1) - 5} width="10" height="10" fill={navy} />
      <circle cx={px(a)} cy={py(b)} r="7" fill={green} stroke={navy} strokeWidth="2" />
      <circle cx={px(c)} cy={py(d)} r="7" fill={green} stroke={navy} strokeWidth="2" />
      <text x="8" y="22" fontSize="16" fontWeight="700" fill={navy} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{`ease.${name}`}</text>
      <text x="8" y="306" fontSize="14" fill={navy}>{values}</text>
    </Art>
  );
}

function EaseRow({ t }) {
  const [run, setRun] = useState(0);
  // One horizontal lane per token: the block crosses the lane in 800 ms on that curve and stops on the end line.
  return (
    <div className={s.easeRow}>
      <div className={s.easePlate}>
        <CurvePlate id={`ease-${t.css.replace('ease-', '')}`} name={t.key} e={t.e} />
      </div>
      <div className={s.laneCol}>
        <p className={s.laneNote}><b>{`--${t.css}`}</b> 800 ms. {t.note}</p>
        <motion.div className={s.track} onViewportEnter={() => setRun((r) => r + 1)} viewport={{ once: true, amount: 0.6 }}>
          <span className={s.endLine} aria-hidden="true" />
          <motion.div key={run} className={s.runner} initial={run ? { x: '0%' } : false} animate={{ x: '100%' }} transition={tr(dur.d4, t.e)}>
            <span className={s.block} />
          </motion.div>
        </motion.div>
        <Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Play</Button>
      </div>
    </div>
  );
}

export default function Easing() {
  return (
    <div>
      {TOKENS.map((t) => (
        <EaseRow key={t.key} t={t} />
      ))}
    </div>
  );
}
