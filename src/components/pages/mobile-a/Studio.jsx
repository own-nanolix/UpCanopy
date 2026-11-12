'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { Phone } from '@/components/ui/Devices';
import { tLock } from '@/lib/motion';
import { SCREENS, pad2 } from './data';
import { Fit, ScreenCtx } from './parts';
import { ScreenAgendaDay, ScreenAgendaWeek, ScreenCrmList, ScreenCrmRecord, ScreenHome } from './Screens1';
import { ScreenBrand, ScreenInvoice, ScreenLedger, ScreenModes } from './Screens2';
import s from './mobile-a.module.css';

// One component per screen, in order. `idp` makes every id in the instance unique (live phone or thumbnail).
const BOARDS = [ScreenHome, ScreenCrmList, ScreenCrmRecord, ScreenAgendaWeek, ScreenAgendaDay, ScreenLedger, ScreenInvoice, ScreenModes, ScreenBrand];
const MINI_SCALE = 133.56 / 390;

function isTyping(el) {
  if (!el) return false;
  const t = el.tagName;
  return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || el.getAttribute('role') === 'slider' || el.getAttribute('role') === 'tab';
}

export default function Studio({ plates }) {
  const [idx, setIdx] = useState(0);
  const calm = useReducedMotion();
  const go = (n) => setIdx(((n % 9) + 9) % 9);
  const Board = BOARDS[idx];
  const cur = SCREENS[idx];

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); setIdx((i) => (i + 8) % 9); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setIdx((i) => (i + 1) % 9); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="split">
      <aside className={`split-rail ${s.rail}`} aria-label="Live phone">
        <div className={s.railTop}>
          <span className="t-caps">Mobile app</span>
          <span className="t-label">Left / Right keys</span>
        </div>
        <div className={s.phoneWrap}>
          <Phone exportName="mobile-a-phone-frame" className={s.livePhone}>
            <Fit>
              <ScreenCtx.Provider value={{ calm: !!calm, go: (n) => go(n - 1) }}>
                <motion.div key={idx} className={s.stageIn} initial={calm ? false : { opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={tLock}>
                  <Board idp={`mobile-a-live-${cur.n}`} />
                </motion.div>
              </ScreenCtx.Provider>
            </Fit>
          </Phone>
        </div>
        <div className={s.capCard} aria-live="polite">
          <span className={s.num}>{pad2(cur.n)}</span>
          <div>
            <span className="t-label" style={{ color: 'var(--navy-muted)' }}>Screen {cur.n} of 9</span>
            <h2 className="t-caps-lg">{cur.name}</h2>
          </div>
        </div>
        <div className={s.ctrls}>
          <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Previous screen" onClick={() => go(idx - 1)}><Icon name="arrow-left" size={18} /></button>
          <span className={`t-label ${s.grow}`} style={{ color: 'var(--navy-muted)', textAlign: 'center' }}>{pad2(cur.n)} / 09</span>
          <button type="button" className="btn btn-sm btn-icon" aria-label="Next screen" onClick={() => go(idx + 1)}><Icon name="arrow-right" size={18} /></button>
        </div>
      </aside>

      <div className="split-main">
        <section className={s.intro} aria-labelledby="mobile-a-h">
          <h1 id="mobile-a-h" tabIndex={-1} className="t-h1">Mobile app, <span className="strong">screens 1 to 9</span></h1>
          <p className="t-lead">The remote back-office in the print language: square corners, thick rules, wide-caps labels, navy, Green Park and mint. Step through the screens with the buttons, the list or the Left and Right arrow keys.</p>
        </section>

        <section aria-labelledby="mobile-a-list-h">
          <h2 id="mobile-a-list-h" className="sr-only">Screens</h2>
          <ol className={s.caps}>
            {SCREENS.map((sc, i) => (
              <li key={sc.n}>
                <article className={`${s.cap} ${i === idx ? s.capOn : ''}`}>
                  <div className="corners t-caps"><span>UpCanopy</span><span>{pad2(sc.n)} / 09</span></div>
                  <p className={s.big} aria-hidden="true">{pad2(sc.n)}</p>
                  <div className={s.capFoot}>
                    <h3 className="t-h2">{sc.name}</h3>
                    <button type="button" className={`btn btn-sm ${i === idx ? '' : 'btn-navy'}`} aria-pressed={i === idx} onClick={() => go(i)}>
                      {i === idx ? 'In the phone' : 'Show in phone'}
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="mobile-a-strip-h">
          <h2 id="mobile-a-strip-h" className="t-h2">All nine</h2>
          <p className="t-small" style={{ margin: '8px 0 28px' }}>Select a phone to open that screen in the live phone.</p>
          <div className={s.stripBox}>
            <ol className={s.stripList}>
              {SCREENS.map((sc, i) => {
                const B = BOARDS[i];
                return (
                  <li key={sc.n} className={s.mini} style={{ marginTop: i * 30 }}>
                    <div inert aria-hidden="true">
                      <Phone className={s.miniPhone}>
                        <Fit fixed={MINI_SCALE}>
                          <ScreenCtx.Provider value={{ calm: true, go: () => {} }}>
                            <B idp={`mobile-a-thumb-${sc.n}`} />
                          </ScreenCtx.Provider>
                        </Fit>
                      </Phone>
                    </div>
                    <button type="button" className={s.pick} aria-pressed={i === idx} aria-label={`Show screen ${sc.n}, ${sc.name}, in the phone`} onClick={() => go(i)} />
                    <span className={`t-caps ${s.miniNo}`}>{pad2(sc.n)} {sc.name}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section aria-labelledby="mobile-a-art-h" style={{ paddingBottom: 'var(--band)' }}>
          <h2 id="mobile-a-art-h" className="t-h2" style={{ marginBottom: 28 }}>Screen artwork</h2>
          {plates}
        </section>
      </div>
    </div>
  );
}
