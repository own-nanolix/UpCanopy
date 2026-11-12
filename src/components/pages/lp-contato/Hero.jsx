'use client';

import { useState } from 'react';
import { CONTACT, PEOPLE } from '@/lib/brand';
import Field from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import LandingNav from '@/components/ui/LandingNav';
import { toast } from '@/components/site/Toast';
import s from './lp-contato.module.css';

const BACK = [PEOPLE.founder.name, PEOPLE.founder.role, CONTACT.handle, CONTACT.phone, CONTACT.hello, CONTACT.address, CONTACT.webCased];

// The business card of the case study (navy front with the mark, Green Park back with small dark text) that
// flips on click or Enter, beside a simple contact form on mint. Nothing is sent.
export default function Hero() {
  const [flipped, setFlipped] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    toast('Demo only: nothing is sent');
  };
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

        <form className={s.form} onSubmit={submit} aria-label="Contact form">
          <div className={`slide-up ${s.formRow}`} style={{ '--i': 2 }}>
            <Field id="lp-contato-name" label="Name" name="name" autoComplete="name" />
            <Field id="lp-contato-email" label="Email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="slide-up" style={{ '--i': 4 }}>
            <Field id="lp-contato-tel" label="Telephone" name="tel" type="tel" autoComplete="tel" />
          </div>
          <div className="slide-up" style={{ '--i': 6 }}>
            <Field id="lp-contato-message" label="Message" name="message" as="textarea" rows={5} style={{ padding: 14, resize: 'vertical' }} />
          </div>
          <div className={`slide-up ${s.formFoot}`} style={{ '--i': 8 }}>
            <Button type="submit" variant="navy" iconRight="arrow-right">Send</Button>
            <p className="t-small">Demo only: nothing is sent</p>
          </div>
        </form>
      </div>
    </header>
  );
}
