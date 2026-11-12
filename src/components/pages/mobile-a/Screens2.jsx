'use client';

import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Art from '@/components/art/Art';
import { LockupG } from '@/components/art/Mark';
import { ScaleDotsG } from '@/components/art/KeyArt';
import { Line } from '@/components/ui/Card';
import { CONTACT, DOCUMENT, LINES, MODES, SCALES, TAGLINE } from '@/lib/brand';
import { tLock } from '@/lib/motion';
import { AreaBar, Bar, Frond, Mark, Rise, RiseLi, ScreenCtx, StatusBar, Stag, StagUl, useScreenName } from './parts';
import s from './mobile-a.module.css';

/* 6. Financeiro ledger: square checkboxes and a thick running bar that grows with the ticked rows. */
const LEDGER = 9;
export function ScreenLedger() {
  const { calm } = useContext(ScreenCtx);
  const [ticked, setTicked] = useState(() => Array.from({ length: LEDGER }, (_, i) => i < 3));
  const n = ticked.filter(Boolean).length;
  const flip = (i) => setTicked((a) => a.map((v, k) => (k === i ? !v : v)));
  return (
    <div className={`${s.board} ${s.s6}`} data-screen={useScreenName(6)}>
      <StatusBar />
      <div className={s.s6Head}>
        <h3 className={`t-wide ${s.s2Title}`}>Financeiro</h3>
        <button type="button" className="btn btn-sm btn-navy" onClick={() => setTicked(Array.from({ length: LEDGER }, () => false))}>Clear</button>
      </div>
      <div className={s.s6Track} role="progressbar" aria-label="Ticked rows" aria-valuemin={0} aria-valuemax={LEDGER} aria-valuenow={n}>
        <motion.span className={s.s6Fill} initial={calm ? false : { scaleX: 0 }} animate={{ scaleX: n / LEDGER }} transition={tLock} />
      </div>
      <StagUl className={s.s6List}>
        {ticked.map((on, i) => (
          <RiseLi key={i} className={s.s6Row}>
            <button type="button" role="checkbox" aria-checked={on} aria-label={`Row ${i + 1}`} className={`${s.s6Box} ${on ? s.s6BoxOn : ''}`} onClick={() => flip(i)}>
              {on && <Icon name="check" size={18} />}
            </button>
            <span className={s.s6Lines}><Bar w={140 - (i % 4) * 18} h={12} /><Bar w={70 + (i % 3) * 20} h={7} /></span>
            <Bar w={52 + (i % 2) * 12} h={14} />
          </RiseLi>
        ))}
      </StagUl>
      <div className={s.s6Total}><span className="t-caps-lg">Total</span><Bar w={110} h={22} /></div>
      <AreaBar active="Financeiro" />
    </div>
  );
}

/* 7. Invoice: the case study's sheet as a screen. */
export function ScreenInvoice() {
  const [bank, invoice, total] = DOCUMENT.invoice;
  return (
    <div className={`${s.board} ${s.s7}`} data-screen={useScreenName(7)}>
      <StatusBar />
      <Stag className={s.s7Sheet}>
        <Rise className={s.s7Top}>
          <svg viewBox="0 0 400 60" width="190" height="29" aria-hidden="true"><LockupG fill="#162557" markFill="#26CF7B" /></svg>
          <span className="t-label">Invoice</span>
        </Rise>
        <Rise className={s.s7Block}>
          <span className="t-caps">{bank}</span>
          <Bar w={210} h={16} />
        </Rise>
        <Rise className={s.s7Block}>
          <span className="t-caps">{invoice}</span>
          <Bar w={280} h={10} /><Bar w={240} h={10} /><Bar w={160} h={10} />
        </Rise>
        <Rise className={s.s7Table}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={s.s7Tr}><Bar w={110 - i * 8} h={10} /><Bar w={34} h={10} /><Bar w={52} h={10} /></div>
          ))}
        </Rise>
        <Rise className={s.s7Total}>
          <span className="t-caps-lg">{total}</span>
          <Bar w={120} h={30} />
        </Rise>
        <Rise className={s.s7Sign}>
          <span className={s.s7SignLine} />
          <span className="t-caps">{DOCUMENT.labels[3]}</span>
        </Rise>
      </Stag>
      <p className={`t-label ${s.s7Foot}`}>{CONTACT.footer}</p>
    </div>
  );
}

/* 8. Modes: a large switch from "sobrevivência" to "expansão" that re-orders a pile of cards into rows. */
const PILE = [[84, 150, -9], [118, 108, 7], [40, 214, -3], [128, 196, 12], [92, 262, -15], [66, 52, 5]];
const TONES = ['cardNavy', 'cardWhite', 'cardMint', 'cardDeep', 'cardGray', 'cardWhite'];
export function ScreenModes() {
  const { calm } = useContext(ScreenCtx);
  const [grow, setGrow] = useState(false);
  return (
    <div className={`${s.board} ${s.s8}`} data-screen={useScreenName(8)}>
      <StatusBar />
      <h3 className={`t-h2 ${s.s8Title}`} lang="pt-BR"><Line text={LINES.level} strong="nível." /></h3>
      <button type="button" role="switch" aria-checked={grow} className={s.s8Switch} onClick={() => setGrow((v) => !v)}>
        <motion.span className={s.s8Thumb} aria-hidden="true" animate={{ x: grow ? 171 : 0 }} transition={calm ? { duration: 0 } : tLock} />
        <span lang="pt-BR" className="t-caps">{MODES[0]}</span>
        <span lang="pt-BR" className="t-caps">{MODES[1]}</span>
      </button>
      <div className={s.s8Field}>
        {PILE.map(([px, py, rot], i) => {
          const gx = (i % 2) * 182, gy = Math.floor(i / 2) * 120;
          return (
            <motion.div key={i} className={`${s.s8Card} ${s[TONES[i]]}`} initial={false}
              animate={grow ? { x: gx, y: gy, rotate: 0 } : { x: px, y: py, rotate: rot }}
              transition={calm ? { duration: 0 } : { ...tLock, delay: i * 0.05 }}>
              <Bar w={70} h={10} /><Bar w={104} h={7} /><Bar w={48} h={7} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* 9. Brand: dark green, the frond, the control line, the five scales as ten-dot rows, the tagline. */
export function ScreenBrand() {
  const parts = LINES.control.split('. ');
  return (
    <div className={`${s.board} ${s.s9}`} data-screen={useScreenName(9)}>
      <Frond tone="onDark" opacity={0.42} cx={420} cy={900} r={300} a0={180} a1={275} count={32} len={230} lean={-62} />
      <StatusBar dark />
      <Mark size={40} className={s.s9Mark} />
      <Stag className={s.s9Line} lang="pt-BR">
        <Rise>{parts[0]}.</Rise>
        <Rise className="hl">{parts[1]}</Rise>
      </Stag>
      <Stag className={s.s9Scales}>
        {SCALES.map((sc) => (
          <Rise key={sc.left} className={s.s9Scale} lang="pt-BR">
            <span className={`t-caps ${s.s9Words}`}><span>{sc.left}</span><span>{sc.right}</span></span>
            <Art viewBox="0 0 342 20" title={`${sc.left} to ${sc.right}: ${sc.chosen} of 10`} className={s.s9Dots}>
              <ScaleDotsG x={9} y={10} w={324} r={7} chosen={sc.chosen} off="#2F5E50" lock />
            </Art>
          </Rise>
        ))}
      </Stag>
      <p className={`t-line ${s.s9Tag}`} lang="pt-BR"><Line text={TAGLINE} strong="crescimento" className="hl" /></p>
    </div>
  );
}
