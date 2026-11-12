'use client';

import { useState } from 'react';
import { MANIFESTO, MODES } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { DayRuleArt } from './AgendaArt';
import s from './lp-agenda.module.css';

// Scrub the day: a green marker moves along a thick rule and the card behind turns from sobrevivência to expansão.
export default function DayTimeline() {
  const [p, setP] = useState(12);
  // The ground flips with the mode (a short cross-fade), so the text colour always sits on its own ground.
  const t = p < 50 ? 0 : 1;
  const hr = 6 + (p / 100) * 14;
  const hh = String(Math.floor(hr)).padStart(2, '0');
  const mode = p < 50 ? MODES[0] : MODES[1];
  return (
    <div>
      <div className={s.modeCard}>
        <div className={s.modeA} aria-hidden="true" />
        <div className={s.modeB} style={{ opacity: t }} aria-hidden="true" />
        <div className={s.modeBody}>
          <p className={`t-label ${p < 50 ? 'on-navy' : ''}`} style={p >= 50 ? { color: 'var(--navy)' } : undefined}>{hh}:00</p>
          <p className={`t-display ${s.modeWord}`} lang="pt-BR" style={{ color: p < 50 ? 'var(--white)' : 'var(--navy)' }} role="status" aria-live="polite">
            {mode}
          </p>
          <p className="t-lead" lang="pt-BR" style={{ color: p < 50 ? 'var(--white)' : 'var(--navy)', maxWidth: '30em' }}>{MANIFESTO[7].split('. ')[1]}</p>
        </div>
      </div>
      <div className={s.scrub}>
        <DayRuleArt />
        <input
          type="range"
          min="0"
          max="100"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className={s.dayRange}
          aria-label="Scrub the day"
          aria-valuetext={`${hh}:00, ${mode}`}
        />
      </div>
    </div>
  );
}
