'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { listV, itemV } from '@/lib/motion';
import { MarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import { AREAS } from '@/lib/brand';
import { AREA_SCREEN } from './data';
import s from './mobile-a.module.css';

// calm: render the finished state without entrance motion (reduced motion, thumbnails).
// go(n): jump to screen n (1 to 9) in the live phone.
export const ScreenCtx = createContext({ calm: false, go: () => {} });

function make(T, isList) {
  return function Motion(props) {
    const { calm } = useContext(ScreenCtx);
    if (isList) return <T variants={listV} initial={calm ? false : 'hidden'} animate="show" {...props} />;
    return <T variants={itemV} {...props} />;
  };
}
export const Stag = make(motion.div, true);
export const StagUl = make(motion.ul, true);
export const Rise = make(motion.div, false);
export const RiseLi = make(motion.li, false);
export const RiseBtn = make(motion.button, false);

// A quiet placeholder bar for facts the case study does not publish.
export function Bar({ w = 100, h = 10, className = '', style }) {
  return <span className={`ph ${s.bar} ${className}`} style={{ width: w, height: h, ...style }} aria-hidden="true" />;
}

export function StatusBar({ dark = false }) {
  return (
    <div className={`${s.status} ${dark ? s.statusDark : ''}`} aria-hidden="true">
      <b>9:41</b>
      <svg viewBox="0 0 54 14" width="54" height="14">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 6} y={10 - i * 3} width="4" height={4 + i * 3} fill="currentColor" />)}
        <rect x="32" y="2" width="20" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="35" y="5" width="11" height="4" fill="currentColor" />
      </svg>
    </div>
  );
}

// The frond entering from an edge, drawn as an SVG that fills the artboard.
export function Frond({ tone = 'onNavy', opacity = 0.55, cx, cy, r, a0, a1, count = 30, len = 210, width = 8, lean = 64, className = '' }) {
  return (
    <svg className={`${s.frond} ${className}`} viewBox="0 0 390 844" width="390" height="844" aria-hidden="true">
      <FrondG cx={cx} cy={cy} r={r} a0={a0} a1={a1} count={count} len={len} width={width} lean={lean} tone={tone} opacity={opacity} fan />
    </svg>
  );
}

export function Mark({ size = 40, fill = '#26CF7B', className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <MarkG x={0} y={0} size={100} fill={fill} />
    </svg>
  );
}

// The area bar (CRM, Agenda, Financeiro) on the inner screens. `active` is one of AREAS.
export function AreaBar({ active }) {
  const { go } = useContext(ScreenCtx);
  const icons = { CRM: 'users', Agenda: 'calendar', Financeiro: 'chart' };
  return (
    <nav className={s.areabar} aria-label="Areas">
      <button type="button" className={s.areaHome} onClick={() => go(1)} aria-label="Home screen">
        <Icon name="home" size={22} />
      </button>
      {AREAS.map((a) => (
        <button key={a} type="button" className={s.areaBtn} aria-current={a === active ? 'page' : undefined} onClick={() => go(AREA_SCREEN[a])}>
          <Icon name={icons[a]} size={22} />
          <span className="t-caps">{a}</span>
        </button>
      ))}
    </nav>
  );
}

// Fits a 390 x 844 artboard to the phone's screen with a CSS transform. `fixed` is a known scale (thumbnails).
export function Fit({ children, fixed }) {
  const ref = useRef(null);
  const [k, setK] = useState(fixed || 0.64);
  useEffect(() => {
    if (fixed || !ref.current) return undefined;
    const el = ref.current;
    const ro = new ResizeObserver(() => setK(el.clientWidth / 390));
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixed]);
  return (
    <div ref={ref} className={s.fit}>
      <div className={s.stage} style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}
