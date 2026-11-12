'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MANIFESTO } from '@/lib/brand';
import { ease, dur } from '@/lib/motion';
import { still } from '@/lib/site';
import Button from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Toggle';
import s from './lp-manifesto.module.css';

const LAST = MANIFESTO.length - 1;
const VIEWS = ['One by one', 'All ten'];
const widthOf = (k) => Math.round(44 + (56 * k) / LAST);

// The ten manifesto paragraphs as cards of growing width. Previous / Next, Left / Right keys and a ten-dot row
// built like the brand's scale (the current dot is green). Each card rises into place and locks.
export default function Steps() {
  const [i, setI] = useState(0);
  const [moved, setMoved] = useState(false);
  const [view, setView] = useState(VIEWS[0]);
  const all = view === VIEWS[1];
  const card = useRef(null);

  const go = (n) => {
    const next = Math.max(0, Math.min(LAST, n));
    if (next === i) return;
    setMoved(!still());
    setI(next);
    // the button that was pressed becomes disabled at either end: keep the focus on the card instead
    if ((next === 0 || next === LAST) && card.current && document.activeElement && document.activeElement.tagName === 'BUTTON' && !document.activeElement.closest('[aria-label="Progress"]')) card.current.focus();
  };
  const onKey = (e) => {
    if (all) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };

  const navy = i === 3;
  const long = MANIFESTO[i].length > 150;

  const viewSwitch = (
    <div className={s.viewRow}>
      <Segmented id="lp-manifesto-view" label="Reader view" options={VIEWS} value={view} onChange={setView} />
    </div>
  );

  if (all) {
    return (
      <div className={s.steps}>
        {viewSwitch}
        <ol className={s.allList}>
          {MANIFESTO.map((para, k) => (
            <li key={para} className={`${s.allCard} ${k === 3 ? s.stepNavy : ''}`} style={{ '--w': `${widthOf(k)}%` }}>
              <p className={`t-label ${s.stepNo}`}>{String(k + 1).padStart(2, '0')} / {MANIFESTO.length}</p>
              <p lang="pt-BR" className="t-lead">{para}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className={s.steps} role="group" aria-roledescription="carousel" aria-label="Manifesto, ten cards" onKeyDown={onKey}>
      {viewSwitch}
      <div className={s.stripStack} aria-hidden="true">
        {MANIFESTO.slice(0, i).map((_, k) => (
          <span key={k} className={s.strip} style={{ '--w': `${widthOf(k)}%` }} />
        ))}
      </div>

      {/* the card stays mounted (so it keeps the focus); only its content is keyed and rises into place */}
      <article
        ref={card}
        className={`${s.stepCard} ${navy ? s.stepNavy : ''}`}
        style={{ '--w': `${widthOf(i)}%` }}
        tabIndex={0}
        aria-live="polite"
        aria-label={`Card ${i + 1} of ${MANIFESTO.length}`}
      >
        <motion.div
          key={i}
          className={s.stepInner}
          initial={moved ? { opacity: 0, y: 56 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.d4, ease: ease.lock }}
        >
          <p className={`t-label ${s.stepNo}`}>
            {String(i + 1).padStart(2, '0')} / {String(MANIFESTO.length).padStart(2, '0')}
          </p>
          <p lang="pt-BR" className={long ? 't-lead' : 't-h2'}>{MANIFESTO[i]}</p>
        </motion.div>
      </article>

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
