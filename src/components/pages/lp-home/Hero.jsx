'use client';

import { motion } from 'framer-motion';
import LandingNav from '@/components/ui/LandingNav';
import Art from '@/components/art/Art';
import { FrondG } from '@/components/art/KeyArt';
import { Line } from '@/components/ui/Card';
import { LINES, DESCRIPTOR, CONTACT, SIGN } from '@/lib/brand';
import { ease } from '@/lib/motion';
import { still } from '@/lib/site';
import { GrainDefs } from './svg-text';
import HeroStack from './HeroStack';
import s from './lp-home.module.css';

// HOME is a button that scrolls to the areas section, as the wall sign (m17) says "HOME →".
function goHome() {
  const el = document.getElementById('lp-home-areas');
  if (el) el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
}

// The hero: the wall sign (m17) and the poster (m06) as one field. Mark in the nav (top left), the brand line
// top right, the frond sweeping in from the left edge, "upcanopy.com" and "HOME →" along the bottom.
export default function Hero() {
  const rows = LINES.bridge.rows4;
  return (
    <header className={`${s.hero} field-deep`}>
      <motion.div
        className={`${s.heroField} field-rise`}
        initial={{ opacity: 0, y: '14%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{ duration: 1.4, ease: ease.out }}
        aria-hidden="true"
      />
      <Art className={s.heroArt} viewBox="0 0 1440 900" preserveAspectRatio="xMinYMid slice" decorative exportName="lp-home-hero-frond">
        <defs><GrainDefs id="lp-home-hero-grain" opacity={0.2} /></defs>
        {/* Measured on the poster (m06), in units of the field height H = 900: leaflets enter from the left
            edge, the first at 0.26 H with its tip at 0.05 H, the longest tip (0.42 H) at 0.74 H, and the rest
            run off the bottom edge; about 3.4% of H between leaflets. */}
        <FrondG cx={2011.5} cy={945} r={2160} a0={199.2} a1={172.1} count={34} len={540} width={8} lean={172.6} tone="onNavy" opacity={0.95} fan />
        <rect width="1440" height="900" fill="#FFFFFF" filter="url(#lp-home-hero-grain)" />
      </Art>

      <LandingNav current="lp-home" />

      <div className={`wrap ${s.heroBody}`}>
        <div className={s.heroLine}>
          <h1 tabIndex={-1} className={`t-line ${s.heroH1}`} lang="pt-BR">
            {rows.map((row, i) => (
              <span key={row}>
                <span className={s.rowMask}>
                  <span className={s.rowIn} style={{ '--i': i }}>
                    {i === rows.length - 1 ? <span className="hl">{row}</span> : <Line text={row} />}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>
          <p className={`t-caps-lg ${s.descriptor}`}>{DESCRIPTOR}</p>
        </div>
        <HeroStack />
      </div>

      <div className={`wrap ${s.heroBase}`}>
        <span className={s.heroUrl}>{CONTACT.web}</span>
        <button type="button" className={s.homeBtn} onClick={goHome}>
          {SIGN.home}
          <svg viewBox="0 0 26 20" width="26" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 10H24M15 2L24 10L15 18" />
          </svg>
          <span className="sr-only"> scroll to the three areas</span>
        </button>
      </div>
    </header>
  );
}
