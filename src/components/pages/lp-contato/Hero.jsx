'use client';

import { useState } from 'react';
import { CONTACT, PEOPLE } from '@/lib/brand';
import LandingNav from '@/components/ui/LandingNav';
import ContactForm from './Form';
import s from './lp-contato.module.css';

const BACK = [PEOPLE.founder.name, PEOPLE.founder.role, CONTACT.handle, CONTACT.phone, CONTACT.hello, CONTACT.address, CONTACT.webCased];

// The business card of the case study (navy front with the mark, Green Park back with small dark text) that
// flips on click or Enter, beside a simple contact form on mint. Nothing is sent.
export default function Hero() {
  const [flipped, setFlipped] = useState(false);
  return (
    <header className={s.hero}>
      <LandingNav current="lp-contato" tone="light" />
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.cardCol}>
          <h1 className={`t-label ${s.heroKicker}`} tabIndex={-1}>Contact</h1>
          <div className={s.scene}>
            <button
              type="button"
              className={`${s.flip} ${flipped ? s.flipped : ''}`}
              onClick={() => setFlipped((v) => !v)}
              aria-pressed={flipped}
              aria-label={`Business card, showing the ${flipped ? 'back' : 'front'}. Press to flip.`}
            >
              <span className={`${s.face} ${s.front}`} aria-hidden={flipped}>
                <svg viewBox="0 0 100 100" className={s.frontMark} aria-hidden="true"><use href="#site-mark" /></svg>
              </span>
              <span className={`${s.face} ${s.back}`} aria-hidden={!flipped}>
                <span className={s.backBrand}>UpCanopy</span>
                <span className={s.backName}>
                  {BACK.slice(0, 2).map((t) => <span key={t}>{t}</span>)}
                </span>
                <span className={s.backLines}>
                  {BACK.slice(2).map((t) => <span key={t}>{t}</span>)}
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
