'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { MarkG } from '@/components/art/Mark';
import { ease, dur, stagger, tLock, tEnter } from '@/lib/motion';
import { range } from '@/lib/site';
import { tr } from './shared';
import s from './motion.module.css';

const RISE = -84;

function Mini({ id }) {
  return (
    <Art className={s.ddMark} viewBox="0 0 100 100" title="The mark" exportName={`motion-dd-${id}`} decorative>
      <MarkG fill="currentColor" />
    </Art>
  );
}

const PAIRS = [
  {
    key: 'bounce',
    title: 'Rise and lock',
    doText: 'Do: rise and lock with a tiny overshoot (ease-lock).',
    dontText: 'Do not: bounce.',
    doStage: (run) => <motion.div key={run} className={s.ddBlock} initial={run ? { y: 0 } : false} animate={{ y: RISE }} transition={tr(tLock.duration, tLock.ease)} />,
    dontStage: (run) => <motion.div key={run} className={s.ddBlock} initial={run ? { y: 0 } : false} animate={{ y: [0, RISE, -30, RISE, -58, RISE] }} transition={tr(dur.d5, ease.inOut)} />,
  },
  {
    key: 'stagger',
    title: 'Stagger in order',
    doText: 'Do: fan one by one, 45 ms apart.',
    dontText: 'Do not: animate everything at once.',
    doStage: (run) =>
      range(10).map((i) => (
        <motion.div key={`${run}-${i}`} className={s.ddBar} initial={run ? { scaleY: 0 } : false} animate={{ scaleY: 1 }} transition={tr(dur.d4, ease.out, i * stagger)} />
      )),
    dontStage: (run) =>
      range(10).map((i) => (
        <motion.div key={`${run}-${i}`} className={s.ddBar} initial={run ? { scaleY: 0 } : false} animate={{ scaleY: 1 }} transition={tr(dur.d4, ease.out)} />
      )),
  },
  {
    key: 'axis',
    title: 'Straight axes',
    doText: 'Do: move on a straight axis.',
    dontText: 'Do not: spin the mark.',
    doStage: (run) => (
      <motion.div key={run} style={{ alignSelf: 'center' }} initial={run ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={tr(tEnter.duration, tEnter.ease)}>
        <Mini id="do" />
      </motion.div>
    ),
    dontStage: (run) => (
      <motion.div key={run} style={{ alignSelf: 'center' }} initial={run ? { rotate: 0 } : false} animate={{ rotate: 360 }} transition={tr(dur.d5, ease.draw)}>
        <Mini id="dont" />
      </motion.div>
    ),
  },
];

function Pair({ p }) {
  const [run, setRun] = useState(0);
  return (
    <motion.div onViewportEnter={() => setRun((r) => r + 1)} viewport={{ once: true, amount: 0.5 }}>
      <div className={s.ddHead}>
        <h3 className="t-caps-lg">{p.title}</h3>
        <Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Play</Button>
      </div>
      <div className={s.dd}>
        <div className={`${s.half} ${s.doHalf}`}>
          <span className={`${s.verdict} hl-ink`}>Do</span>
          <div className={s.ddStage}>{p.doStage(run)}</div>
          <p className="t-small">{p.doText}</p>
        </div>
        <div className={`${s.half} ${s.dontHalf}`}>
          <span className={s.verdict}>Don&apos;t</span>
          <div className={s.ddStage}>{p.dontStage(run)}</div>
          <p className="t-small">{p.dontText}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DoDont() {
  return (
    <div>
      {PAIRS.map((p) => (
        <div key={p.key} className={s.block3}>
          <Pair p={p} />
        </div>
      ))}
    </div>
  );
}
