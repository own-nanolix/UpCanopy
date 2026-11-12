'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tEnter, tMove } from '@/lib/motion';
import { initialBoard } from './data';
import Overview from './Overview';
import { ScreenA, ScreenB } from './ScreensAB';
import { ScreenC, ScreenD, ScreenE } from './ScreensCDE';
import { ScreenRecord, ScreenInvoice } from './Inner';
import s from './dashboard.module.css';

const TABS = [
  ['overview', 'Options'], ['a', 'A Editorial'], ['b', 'B Command'], ['c', 'C Calendar'],
  ['d', 'D Ledger'], ['e', 'E Kanban'], ['record', 'Client record'], ['invoice', 'Invoice'],
];
const SCREENS = { a: ScreenA, b: ScreenB, c: ScreenC, d: ScreenD, e: ScreenE, record: ScreenRecord, invoice: ScreenInvoice };

// A fixed 1600 x 1000 artboard scaled to its container width.
function Stage({ children }) {
  const host = useRef(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 1600));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={s.frame}>
      <div ref={host} className={s.stage}>
        <div className={s.scaler} style={{ transform: `scale(${k || 0.5})`, visibility: k ? 'visible' : 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}

export default function Shell() {
  const [tab, setTab] = useState('overview');
  const [b, setB] = useState(initialBoard);
  const refs = useRef({});
  const up = (patch) => setB((p) => ({ ...p, ...patch }));
  const onKey = (e) => {
    const i = TABS.findIndex(([id]) => id === tab);
    let n = -1;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = TABS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    setTab(TABS[n][0]);
    refs.current[TABS[n][0]]?.focus();
  };
  const Screen = SCREENS[tab];
  return (
    <div className={s.shell}>
      <div className={s.tabbar} role="tablist" aria-label="Dashboard screens" onKeyDown={onKey}>
        {TABS.map(([id, label]) => (
          <button key={id} ref={(el) => { refs.current[id] = el; }} type="button" role="tab" id={`dashboard-tab-${id}`} className={s.tabBtn}
            aria-selected={tab === id} aria-controls="dashboard-panel" tabIndex={tab === id ? 0 : -1} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="dashboard-panel" aria-labelledby={`dashboard-tab-${tab}`} tabIndex={0} className={s.panel}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0, transition: tEnter }} exit={{ opacity: 0, y: -12, transition: tMove }}>
            {Screen ? <Stage><Screen b={b} up={up} /></Stage> : <Overview open={setTab} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
