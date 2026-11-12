'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MANIFESTO } from '@/lib/brand';
import { ease, dur } from '@/lib/motion';
import { still } from '@/lib/site';
import Button from '@/components/ui/Button';
import s from './lp-manifesto.module.css';

const LAST = MANIFESTO.length - 1;
const widthOf = (k) => Math.round(44 + (56 * k) / LAST);

// The ten manifesto paragraphs as cards of growing width. Previous / Next, Left / Right keys and a ten-dot row
// built like the brand's scale (the current dot is green). Each card rises into place and locks.
export default function Steps() {
  const [i, setI] = useState(0);
  const [moved, setMoved] = useState(false);

  const go = (n) => {
    const next = Math.max(0, Math.min(LAST, n));
    if (next === i) return;
    setMoved(!still());
    setI(next);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };

  const navy = i === 3;
  const long = MANIFESTO[i].length > 150;

  return (
    <div className={s.steps} role="group" aria-roledescription="carousel" aria-label="Manifesto, ten cards" onKeyDown={onKey}>
      <div className={s.stripStack} aria-hidden="true">
        {MANIFESTO.slice(0, i).map((_, k) => (
          <span key={k} className={s.strip} style={{ '--w': `${widthOf(k)}%` }} />
        ))}
      </div>

      <motion.article
        key={i}
        className={`${s.stepCard} ${navy ? s.stepNavy : ''}`}
        style={{ '--w': `${widthOf(i)}%` }}
        tabIndex={0}
        aria-live="polite"
        aria-label={`Card ${i + 1} of ${MANIFESTO.length}`}
        initial={moved ? { opacity: 0, y: 56 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.d4, ease: ease.lock }}
      >
        <p className={`t-label ${s.stepNo}`}>
          {String(i + 1).padStart(2, '0')} / {String(MANIFESTO.length).padStart(2, '0')}
        </p>
        <p lang="pt-BR" className={long ? 't-lead' : 't-h2'}>{MANIFESTO[i]}</p>
      </motion.article>

      <div className={s.controls}>
        <Button variant="ghost" size="sm" icon="arrow-left" onClick={() => go(i - 1)} disabled={i === 0}>
          Previous
        </Button>
        <div className={s.dots} role="group" aria-label="Progress">
          {MANIFESTO.map((_, k) => (
            <button
              key={k}
              type="button"
              className={s.dotBtn}
              aria-label={`Go to card ${k + 1}`}
              aria-current={k === i ? 'step' : undefined}
              onClick={() => go(k)}
            >
              <span className={`dot ${k === i ? `dot-on ${s.dotLock}` : ''}`} />
            </button>
          ))}
        </div>
        <Button size="sm" iconRight="arrow-right" onClick={() => go(i + 1)} disabled={i === LAST}>
          Next
        </Button>
      </div>
      <p className={`t-small ${s.hint}`}>Left and Right keys also step through the cards.</p>
    </div>
  );
}
