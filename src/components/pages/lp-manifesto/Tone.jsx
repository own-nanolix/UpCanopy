'use client';

import { useState } from 'react';
import { TONE } from '@/lib/brand';
import Icon from '@/components/site/Icon';
import s from './lp-manifesto.module.css';

// The three tone-of-voice points as an accordion: one open at a time, all three text blocks verbatim.
// Up and Down keys move between the headers; Home and End jump to the first and last.
export default function Tone() {
  const [open, setOpen] = useState(0);
  const last = TONE.points.length - 1;

  const onKey = (e, k) => {
    const to = { ArrowDown: k + 1, ArrowUp: k - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const el = document.getElementById(`lp-manifesto-tone-b${Math.max(0, Math.min(last, to))}`);
    if (el) el.focus();
  };

  return (
    <div className={s.toneGrid}>
      <div className={s.toneIntro} lang="pt-BR">
        {TONE.intro.map((p) => (
          <p key={p} className="t-lead">{p}</p>
        ))}
      </div>
      <div className={s.accordion}>
        {TONE.points.map((pt, k) => {
          const on = open === k;
          return (
            <div key={pt.title} className={`${s.acItem} ${on ? s.acOn : ''}`}>
              <h3 lang="pt-BR" className={s.acHead}>
                <button
                  type="button"
                  id={`lp-manifesto-tone-b${k}`}
                  className={s.acBtn}
                  aria-expanded={on}
                  aria-controls={`lp-manifesto-tone-p${k}`}
                  onClick={() => setOpen(on ? -1 : k)}
                  onKeyDown={(e) => onKey(e, k)}
                >
                  <span>{pt.title}</span>
                  <span className={s.acIcon} aria-hidden="true">
                    <Icon name="arrow-right" size={20} />
                  </span>
                </button>
              </h3>
              <div id={`lp-manifesto-tone-p${k}`} role="region" aria-labelledby={`lp-manifesto-tone-b${k}`} className={s.acPanel} hidden={!on}>
                <div lang="pt-BR" className={s.acBody}>
                  {pt.text.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
