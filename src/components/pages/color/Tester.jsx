'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { tMove } from '@/lib/motion';
import { contrast } from '@/lib/site';
import CopyValue from '@/components/site/CopyValue';
import { TESTER_COLORS, level } from './color-data';
import s from './color.module.css';

// A live pairing tester: pick an ink and a ground from the palette. The ratio is computed from the two hex
// values; small text needs 4.5 : 1 and large text (24 px and up) needs 3 : 1.
function Pick({ id, label, value, onChange }) {
  return (
    <div className={s.pick}>
      <label htmlFor={id} className="t-caps muted">{label}</label>
      <select id={id} className={s.select} value={value} onChange={(e) => onChange(e.target.value)}>
        {TESTER_COLORS.map((c) => <option key={c.hex} value={c.hex}>{c.name} {c.hex}</option>)}
      </select>
    </div>
  );
}

function Mark({ pass, children }) {
  return (
    <div className={`${s.verdict} ${pass ? s.pass : s.fail}`}>
      <span className={s.verdictMark} aria-hidden="true">{pass ? 'Pass' : 'Fail'}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Tester() {
  const [fg, setFg] = useState(TESTER_COLORS[1].hex);
  const [bg, setBg] = useState(TESTER_COLORS[0].hex);
  const ratio = contrast(fg, bg);
  const swap = () => {
    setFg(bg);
    setBg(fg);
  };
  return (
    <div className={s.tester}>
      <div className={s.testerControls}>
        <Pick id="color-tester-ink" label="Ink" value={fg} onChange={setFg} />
        <button type="button" className={s.swap} onClick={swap} aria-label="Swap ink and ground">Swap</button>
        <Pick id="color-tester-ground" label="Ground" value={bg} onChange={setBg} />
      </div>
      <motion.div className={s.testerSample} animate={{ backgroundColor: bg, color: fg }} transition={tMove} aria-label="Sample of the chosen pairing">
        <span className={s.sampleLarge}>Organização</span>
        <span className={s.sampleSmall} lang="pt-BR">Organização que gera crescimento</span>
      </motion.div>
      <div className={s.testerResult} aria-live="polite">
        <div className={s.ratio}>
          <CopyValue value={`${ratio.toFixed(2)} : 1`} label="contrast ratio" className={s.ratioNum} />
          <span className="t-caps muted">{level(ratio)}</span>
        </div>
        <Mark pass={ratio >= 4.5}>Small text, 4.5 : 1</Mark>
        <Mark pass={ratio >= 3}>Large text, 3 : 1</Mark>
      </div>
    </div>
  );
}
