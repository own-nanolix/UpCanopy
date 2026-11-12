'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Toggle';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { Placeholder } from '@/components/ui/Card';
import { ease, dur, tMove, tLock } from '@/lib/motion';
import { tr } from './shared';
import s from './motion.module.css';

function Shell({ name, spec, children, action }) {
  return (
    <Reveal className={`card ${s.tcard}`}>
      <div>
        <h3 className="t-caps-lg">{name}</h3>
        <p className={s.tname}>{spec}</p>
      </div>
      {children}
      {action}
    </Reveal>
  );
}

function PageEnter() {
  const [run, setRun] = useState(0);
  return (
    <Shell name="Page enter" spec="Fade and rise 24 px, dur-3, ease-out" action={<Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Replay</Button>}>
      <div className={s.stage}>
        <motion.div key={run} className={s.miniPage} initial={run ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={tr(dur.d3, ease.out)}>
          <Placeholder width={6} />
          <Placeholder width={10} />
          <Placeholder width={8} />
        </motion.div>
      </div>
    </Shell>
  );
}

function CardReveal() {
  const [shown, setShown] = useState(true);
  const replay = () => {
    setShown(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };
  return (
    <Shell name="Card reveal on scroll" spec="Shared Reveal: opacity and 28 px, dur-3, ease-out, 90 ms apart" action={<Button size="sm" variant="navy" icon="play" onClick={replay}>Replay</Button>}>
      <div className={s.stage}>
        <div className={s.revealRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={s.revealTile} data-reveal={shown ? 'shown' : 'pending'} style={{ '--reveal-delay': `${i * 90}ms` }} />
          ))}
        </div>
      </div>
    </Shell>
  );
}

function TabChange() {
  const [tab, setTab] = useState('CRM');
  return (
    <Shell name="Tab change" spec="AnimatePresence, tMove: dur-2, ease-in-out">
      <Segmented id="motion-tab" label="Area" options={['CRM', 'Agenda', 'Financeiro']} value={tab} onChange={setTab} />
      <div className={`${s.stage} ${s.stageTop}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} className={s.panel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: tMove }} exit={{ opacity: 0, y: -12, transition: tMove }}>
            <span className="t-caps" lang="pt-BR">{tab}</span>
            <Placeholder width={9} />
            <Placeholder width={6} />
            <Placeholder width={8} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Shell>
  );
}

function Sheet() {
  const [open, setOpen] = useState(false);
  return (
    <Shell name="Sheet rises and locks" spec="tLock: dur-3, ease-lock. Leaves with tMove." action={<Button size="sm" variant="navy" onClick={() => setOpen((o) => !o)}>{open ? 'Close sheet' : 'Open sheet'}</Button>}>
      <div className={s.stage}>
        <div className="t-small muted">Page behind</div>
        <AnimatePresence>
          {open && (
            <motion.div className={s.sheet} initial={{ y: '100%' }} animate={{ y: 0, transition: tLock }} exit={{ y: '100%', transition: tMove }}>
              <span className="t-caps">Sheet</span>
              <Placeholder width={8} />
              <Placeholder width={5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

function Count() {
  const [run, setRun] = useState(0);
  return (
    <Shell name="Number counting up" spec="CountUp, ends on the real value" action={<Button size="sm" variant="navy" icon="play" onClick={() => setRun((r) => r + 1)}>Replay</Button>}>
      <div className={s.stage}>
        <CountUp key={run} className={s.figure} value="10" />
      </div>
    </Shell>
  );
}

export default function Transitions() {
  return (
    <div className={s.cards}>
      <PageEnter />
      <CardReveal />
      <TabChange />
      <Sheet />
      <Count />
    </div>
  );
}

