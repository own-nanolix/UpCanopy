'use client';

// The page body: live phone on the right (Green Park field), component sets, the nine as a 3 x 3 contact sheet,
// exportable graphics and the seven interaction lanes. The selected screen is shared by phone, list and sheet.
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import Art from '@/components/art/Art';
import { Phone } from '@/components/ui/Devices';
import { LockupG } from '@/components/art/Mark';
import { DESCRIPTOR } from '@/lib/brand';
import { tEnter } from '@/lib/motion';
import Artboard from './Artboard';
import Sets from './Sets';
import Lanes from './Lanes';
import { SCREEN_LIST } from './Screens';
import { SignInArtG, BadgeScreenG, BusinessCardG, TabIconsG, StepperG, SheetG, PlanG, AppIconSpecG } from './Graphics';
import s from './mobile-b.module.css';

const GRAPHICS = [
  { name: 'sign-in-backdrop', title: 'Sign in backdrop: navy field, rising gradient, frond, stacked lockup', vb: '0 0 390 844', tall: true, node: <SignInArtG idp="mobile-b-gx-signin" /> },
  { name: 'badge-screen', title: 'Profile badge screen: navy card on Green Park', vb: '0 0 390 560', tall: true, node: <BadgeScreenG idp="mobile-b-gx-badge" /> },
  { name: 'business-card', title: 'Business card, back, as a small card', vb: '0 0 340 200', node: <BusinessCardG /> },
  { name: 'tab-icons', title: 'Tab bar tiles, the first one active', vb: '0 0 328 76', node: <TabIconsG /> },
  { name: 'scale-stepper', title: 'Ten-dot stepper', vb: '0 0 400 110', node: <StepperG /> },
  { name: 'sheet', title: 'Bottom sheet with drag handle', vb: '0 0 390 360', node: <SheetG /> },
  { name: 'screen-plan', title: 'The nine screens as a wireframe plan', vb: '0 0 362 742', tall: true, node: <PlanG /> },
  { name: 'app-icon', title: 'App icon', vb: '0 0 120 120', node: <AppIconSpecG /> },
  { name: 'lockup', title: 'Horizontal lockup for the nav bar', vb: '0 0 400 60', node: <LockupG fill="#162557" /> },
];

function Section({ title, note, children, id }) {
  return (
    <Reveal as="section" className={s.section} aria-labelledby={id}>
      <h2 id={id} className="t-caps-lg">{title}</h2>
      <hr className="rule" />
      {note && <p className="t-small" style={{ maxWidth: '60ch' }}>{note}</p>}
      {children}
    </Reveal>
  );
}

export default function Studio() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const pick = (k) => {
    const c = Math.min(SCREEN_LIST.length - 1, Math.max(0, k));
    setDir(c >= i ? 1 : -1);
    setI(c);
  };
  const go = (n) => pick(n - 10);
  const cur = SCREEN_LIST[i];
  const Live = cur.C;
  const onKey = (e) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); pick(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); pick(i - 1); }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={s.layout}>
        <div className={s.main}>
          <header className={s.head}>
            <p className="t-label">{DESCRIPTOR}</p>
            <h1 tabIndex={-1} className="t-h1">Mobile app, <span className="hl-ink">screens 10 to 18</span></h1>
            <p className="t-lead" style={{ maxWidth: '52ch' }}>Nine more screens of the remote back-office, drawn in the print language of the brand: square corners, thick rules, wide caps, navy, Green Park and mint. Structure that works, with quiet bars where the case study publishes nothing.</p>
          </header>

          <Section id="mobile-b-h-sets" title="Component sets" note="Ten small parts, each with its states. Every control is live.">
            <Sets />
          </Section>

          <Section id="mobile-b-h-sheet" title="The nine screens" note="Select a screen to send it to the phone.">
            <ol className={s.contact}>
              {SCREEN_LIST.map((sc, k) => (
                <li key={sc.n}>
                  <div className={`${s.thumb} ${k === i ? s.thumbOn : ''}`}>
                    <Artboard name={`mobile-b-${sc.n}`} label={`Screen ${sc.n}, ${sc.title}`} fallback={0.28}>
                      <div inert style={{ width: '100%', height: '100%' }}><sc.C p="mobile-b-sheet" /></div>
                    </Artboard>
                    <button type="button" className={s.thumbBtn} aria-pressed={k === i} aria-label={`Show screen ${sc.n}, ${sc.title}, on the phone`} onClick={() => pick(k)} />
                  </div>
                  <p className={s.thumbCap}><b>{sc.n}</b> {sc.title}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="mobile-b-h-gfx" title="Graphics" note="Standalone artwork of the app. Each one exports as its own SVG, as does the phone frame.">
            <div className={s.gfx}>
              {GRAPHICS.map((g) => (
                <figure key={g.name} className={`${s.gfxItem} ${g.tall ? s.gfxTall : ''}`}>
                  <div className={s.gfxPlate}><Art viewBox={g.vb} title={g.title} exportName={`mobile-b-${g.name}`}>{g.node}</Art></div>
                  <figcaption className="t-label">{g.title}</figcaption>
                </figure>
              ))}
            </div>
          </Section>

          <Section id="mobile-b-h-lanes" title="Interaction patterns" note="Seven patterns as numbered lanes. Try each one with the pointer and with the keyboard.">
            <Lanes />
          </Section>
        </div>

        <aside className={`${s.rail} field-green`} aria-label="Live phone">
          <motion.div className={s.phoneBox} initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={tEnter}>
            <div onKeyDown={onKey} tabIndex={0} role="group" aria-label={`Live phone, screen ${cur.n}, ${cur.title}. Left and Right arrow keys change the screen`} className={s.phoneFocus}>
              <Phone exportName="mobile-b-phone-frame">
                <Artboard name={`mobile-b-${cur.n}`} label={`Screen ${cur.n}, ${cur.title}`} fill fallback={0.9}>
                  <motion.div key={cur.n} style={{ position: 'absolute', inset: 0 }} initial={{ x: dir * 56, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={tEnter}>
                    <Live p="mobile-b-live" go={go} />
                  </motion.div>
                </Artboard>
              </Phone>
            </div>
          </motion.div>
          <div className={s.railBar}>
            <button type="button" className="btn btn-navy btn-icon btn-sm" aria-label="Previous screen" disabled={i === 0} onClick={() => pick(i - 1)}><Icon name="arrow-left" size={18} /></button>
            <p className="t-caps" aria-live="polite"><b>{cur.n}</b> {cur.title}</p>
            <button type="button" className="btn btn-navy btn-icon btn-sm" aria-label="Next screen" disabled={i === SCREEN_LIST.length - 1} onClick={() => pick(i + 1)}><Icon name="arrow-right" size={18} /></button>
          </div>
          <nav className={s.railList} aria-label="Screens 10 to 18">
            {SCREEN_LIST.map((sc, k) => (
              <button key={sc.n} type="button" className={`${s.railNo} ${k === i ? s.railNoOn : ''}`} aria-label={`Screen ${sc.n}, ${sc.title}`} aria-current={k === i ? 'page' : undefined} onClick={() => pick(k)}>{sc.n}</button>
            ))}
          </nav>
        </aside>
      </div>
    </MotionConfig>
  );
}
