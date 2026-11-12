'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Field from '@/components/ui/Field';
import { toast } from '@/components/site/Toast';
import { tLock } from '@/lib/motion';
import { clamp, range } from '@/lib/site';
import { tr } from './shared';
import s from './motion.module.css';

function Bcard({ title, spec, children }) {
  return (
    <div className={`card ${s.bcard}`}>
      <div>
        <h3 className="t-caps-lg">{title}</h3>
        <p className={s.tname}>{spec}</p>
      </div>
      {children}
    </div>
  );
}

function Buttons() {
  return (
    <Bcard title="Buttons" spec="Hover lifts 2 px with a thick underline. Press sinks 1 px.">
      <div className={s.btns}>
        <Button>Green</Button>
        <Button variant="navy">Navy</Button>
        <Button variant="mint">Mint</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="ghost">Ghost</Button>
        <span className={s.onNavy}>
          <Button variant="white">White</Button>
        </span>
      </div>
    </Bcard>
  );
}

function Toggles() {
  return (
    <Bcard title="Toggles" spec="The square thumb locks in with a tiny overshoot. dur-2, ease-lock.">
      <Toggle label="Agenda" defaultChecked />
      <Toggle label="CRM" />
    </Bcard>
  );
}

function Inputs() {
  return (
    <Bcard title="Inputs" spec="The bottom rule turns green on focus. dur-2, ease-out.">
      <Field id="motion-field-name" label="Name" placeholder="Click to focus" />
    </Bcard>
  );
}

function Toasts() {
  return (
    <Bcard title="Toasts" spec="Slide in 24 px with tEnter, leave with tMove.">
      <div className={s.btns}>
        <Button size="sm" variant="navy" onClick={() => toast('Locked in place')}>Show toast</Button>
      </div>
    </Bcard>
  );
}

function LockRow() {
  const [n, setN] = useState(3);
  return (
    <Bcard title="Lock into a row" spec="Each block scales from 0.4 to 1 with tLock.">
      <div className={s.slots}>
        {range(6).map((i) => (
          <div key={i} className={s.slot}>
            {i < n && <motion.div className={s.slotFill} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={tr(tLock.duration, tLock.ease)} />}
          </div>
        ))}
      </div>
      <div className={s.btns}>
        <Button size="sm" variant="navy" onClick={() => setN((v) => Math.min(6, v + 1))} disabled={n >= 6}>Lock next</Button>
        <Button size="sm" variant="ghost" onClick={() => setN(0)}>Reset</Button>
      </div>
    </Bcard>
  );
}

function Stepper() {
  const [v, setV] = useState(8);
  const set = (n) => setV(clamp(n, 1, 10));
  const onKey = (e) => {
    const map = { ArrowRight: v + 1, ArrowUp: v + 1, ArrowLeft: v - 1, ArrowDown: v - 1, Home: 1, End: 10 };
    if (e.key in map) {
      e.preventDefault();
      set(map[e.key]);
    }
  };
  return (
    <Bcard title="Range stepper" spec="The green dot moves along the ten-dot scale.">
      <div className={s.steps} role="slider" tabIndex={0} aria-label="Scale position" aria-valuemin={1} aria-valuemax={10} aria-valuenow={v} aria-valuetext={`${v} of 10`} onKeyDown={onKey}>
        {range(10).map((i) => (
          <button key={i} type="button" tabIndex={-1} aria-label={`Step ${i + 1}`} className={`${s.stepDot} ${i + 1 === v ? s.stepOn : ''}`} onClick={() => set(i + 1)} />
        ))}
      </div>
      <div className={s.stepRow}>
        <Button size="sm" variant="navy" icon="chevron-left" label="Previous step" onClick={() => set(v - 1)} disabled={v <= 1} />
        <Button size="sm" variant="navy" icon="chevron-right" label="Next step" onClick={() => set(v + 1)} disabled={v >= 10} />
        <span className="t-small muted">{`${v} of 10`}</span>
      </div>
    </Bcard>
  );
}

export default function Micro() {
  return (
    <div className={s.bench}>
      <Buttons />
      <Toggles />
      <Inputs />
      <Toasts />
      <LockRow />
      <Stepper />
    </div>
  );
}
