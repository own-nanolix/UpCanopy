'use client';

import { useState } from 'react';
import { CONTACT, PEOPLE } from '@/lib/brand';
import LandingNav from '@/components/ui/LandingNav';
import { WordmarkG } from '@/components/art/Mark';
import ContactForm from './Form';
import s from './lp-contato.module.css';

// Back of the card as printed (m23): the name with the first name bold, the role under it; then three groups.
const [FIRST, ...LAST] = PEOPLE.founder.name.split(' ');
const [STUDIO, ...CITY] = CONTACT.address.split(', ');
const GROUPS = [[CONTACT.handle, CONTACT.phone, CONTACT.hello], [`${STUDIO},`, CITY.join(', ')]];

// The business card of the case study (navy front with the mark, Green Park back with small dark text) that
// flips on click or Enter, beside a simple contact form on mint. Nothing is sent.
export default function Hero() {
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState(false);
  return (
    <header className={s.hero}>
      <LandingNav current="lp-contato" tone="light" />
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.cardCol}>
          <h1 className={`t-label ${s.heroKicker}`} tabIndex={-1}>Contact</h1>
          <div className={s.scene}>
            <button
              type="button"
              className={`${s.flip} ${flipped ? s.flipped : ''} ${touched ? s.touched : ''}`}
              onClick={() => { setTouched(true); setFlipped((v) => !v); }}
              aria-pressed={flipped}
              aria-label={`Business card, showing the ${flipped ? 'back' : 'front'}. Press to flip.`}
            >
              <span className={`${s.face} ${s.front}`} aria-hidden={flipped}>
                <svg viewBox="0 0 100 100" className={s.frontMark} aria-hidden="true"><use href="#site-mark" /></svg>
              </span>
              <span className={`${s.face} ${s.back}`} aria-hidden={!flipped}>
                {/* the word-mark is a logo: drawn as SVG text in white, as printed */}
                <svg className={s.backBrand} viewBox="0 0 200 40" aria-hidden="true"><WordmarkG x={200} y={31} size={40} fill="currentColor" anchor="end" /></svg>
                <span className={s.backName}>
                  <span><b>{FIRST}</b> {LAST.join(' ')}</span>
                  <span className={s.backRole}>{PEOPLE.founder.role}</span>
                </span>
                <span className={s.backLines}>
                  {GROUPS.map((g) => (
                    <span key={g[0]} className={s.backGroup}>{g.map((t) => <span key={t}>{t}</span>)}</span>
                  ))}
                  <b>{CONTACT.webCased}</b>
                </span>
              </span>
            </button>
          </div>
          <p className="t-small" style={{ marginTop: 16 }}>Click or press Enter to flip the card.</p>
        </div>

        <ContactForm />
      </div>
    </header>
  );
}
