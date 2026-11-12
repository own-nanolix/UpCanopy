'use client';

import { useContext, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Tabs from '@/components/ui/Tabs';
import { AREAS, LINES, PILLARS } from '@/lib/brand';
import { tLock, tMove } from '@/lib/motion';
import { clamp } from '@/lib/site';
import { AREA_SCREEN, DAYS, STAGES } from './data';
import { AreaBar, Bar, Frond, Mark, Rise, RiseBtn, RiseLi, ScreenCtx, StatusBar, Stag, StagUl } from './parts';
import s from './mobile-a.module.css';

/* 1. Home: the brand gradient, the line, three area rows, the frond, the word-mark (as ScreenHomeG). */
export function ScreenHome() {
  const { go } = useContext(ScreenCtx);
  const rows = LINES.bridge.rows;
  return (
    <div className={`${s.board} ${s.s1}`} data-screen="mobile-a-01">
      <Frond cx={-40} cy={520} r={330} a0={285} a1={395} />
      <StatusBar dark />
      <Mark size={44} className={s.s1Mark} />
      <Stag className={s.s1Line} lang="pt-BR">
        {rows.map((r, i) => (
          <Rise key={r} className={i === rows.length - 1 ? 'hl' : undefined}>{r}</Rise>
        ))}
      </Stag>
      <StagUl className={s.s1Areas}>
        {AREAS.map((a, i) => (
          <RiseLi key={a}>
            <button type="button" className={`${s.s1Row} ${i === 0 ? s.s1RowOn : ''}`} onClick={() => go(AREA_SCREEN[a])}>
              <span className="t-caps">{a}</span>
              <Icon name="arrow-right" size={24} />
            </button>
          </RiseLi>
        ))}
      </StagUl>
      <span className={`t-wide ${s.s1Word}`}>UpCanopy</span>
    </div>
  );
}

/* 2. CRM list: mint, search, stage chips, rows with a status dot that cycles. */
const STAGE_FILTERS = ['All', ...STAGES];
export function ScreenCrmList() {
  const { go, calm } = useContext(ScreenCtx);
  const [stage, setStage] = useState(() => Array.from({ length: 7 }, (_, i) => i % 3));
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const cycle = (i) => setStage((a) => a.map((v, k) => (k === i ? (v + 1) % 3 : v)));
  const shown = stage.map((v, i) => ({ v, i })).filter((r) => filter === 'All' || STAGES[r.v] === filter);
  return (
    <div className={`${s.board} ${s.s2}`} data-screen="mobile-a-02">
      <StatusBar />
      <div className={s.s2Head}>
        <h3 className={`t-wide ${s.s2Title}`}>CRM</h3>
        <button type="button" className="btn btn-sm" onClick={() => go(3)}><Icon name="plus" size={16} />New</button>
      </div>
      <Rise className={s.s2Search}>
        <Icon name="search" size={20} />
        <input className={s.s2Input} type="search" placeholder="Search" aria-label="Search clients" value={q} onChange={(e) => setQ(e.target.value)} />
        {q && <button type="button" className={s.s2Clear} aria-label="Clear search" onClick={() => setQ('')}><Icon name="close" size={16} /></button>}
      </Rise>
      <Stag className={s.s2Chips} role="group" aria-label="Filter by stage">
        {STAGE_FILTERS.map((f) => (
          <RiseBtn key={f} type="button" className="chip chip-sm" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</RiseBtn>
        ))}
      </Stag>
      <StagUl className={s.s2List}>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(({ v, i }) => (
            <motion.li key={i} layout="position" className={s.s2Row} exit={{ opacity: 0, x: -30 }} transition={calm ? { duration: 0 } : tMove}
              initial={calm ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, x: 0 }}>
              <button type="button" className={s.s2Open} onClick={() => go(3)} aria-label={`Open client ${i + 1}`}>
                <span className={s.s2Tile} aria-hidden="true"><Mark size={22} /></span>
                <span className={s.s2Lines}><Bar w={150 - (i % 3) * 22} h={12} /><Bar w={90 + (i % 2) * 40} h={8} /></span>
              </button>
              <span className="t-label">{STAGES[v]}</span>
              <button type="button" className={`${s.s2Dot} ${s['dot' + v]}`} onClick={() => cycle(i)} aria-label={`Stage of client ${i + 1}: ${STAGES[v]}. Change stage`} />
            </motion.li>
          ))}
        </AnimatePresence>
      </StagUl>
      <AreaBar active="CRM" />
    </div>
  );
}

/* 3. CRM record: navy header, tabs, placeholder fields, the pillars as chips. */
export function ScreenCrmRecord({ idp }) {
  const { go } = useContext(ScreenCtx);
  const [on, setOn] = useState({ 0: true });
  const fields = (n) => Array.from({ length: n }, (_, i) => (
    <Rise key={i} className={s.s3Field}><Bar w={56} h={7} /><Bar w={190 - ((i * 37) % 90)} h={14} /></Rise>
  ));
  const tabs = [
    { id: 'crm', label: 'CRM', content: <Stag className={s.s3Fields}>{fields(4)}</Stag> },
    { id: 'agenda', label: 'Agenda', content: <Stag className={s.s3Fields}>{[0, 1, 2].map((i) => <Rise key={i} className={s.s3Slot}><Bar w={36} h={10} /><Bar w={160 - i * 30} h={14} /></Rise>)}</Stag> },
    { id: 'financeiro', label: 'Financeiro', content: <Stag className={s.s3Fields}>{[0, 1, 2].map((i) => <Rise key={i} className={s.s3Slot}><Bar w={120 - i * 20} h={14} /><Bar w={56} h={14} /></Rise>)}</Stag> },
  ];
  return (
    <div className={`${s.board} ${s.s3}`} data-screen="mobile-a-03">
      <div className={s.s3Head}>
        <StatusBar dark />
        <button type="button" className={s.s3Back} onClick={() => go(2)} aria-label="Back to the CRM list"><Icon name="arrow-left" size={22} /></button>
        <div className={s.s3Who}>
          <span className={s.s3Tile} aria-hidden="true"><Mark size={40} fill="#162557" /></span>
          <span className={s.s3Name}><Bar w={190} h={22} /><Bar w={120} h={10} /></span>
        </div>
      </div>
      <Tabs id={`${idp}-tabs`} label="Client record" tone="green" tabs={tabs} className={s.s3Tabs} />
      <div className={s.s3Pillars} lang="pt-BR" role="group" aria-label="Pillars">
        {PILLARS.map((p, i) => (
          <button key={p} type="button" className="chip chip-sm" aria-pressed={!!on[i]} onClick={() => setOn((o) => ({ ...o, [i]: !o[i] }))}>{p}</button>
        ))}
      </div>
    </div>
  );
}

/* 4. Agenda week: weekday strip, hour axis, selectable blocks. */
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8);
const BLOCKS = [[0, 1, 2], [1, 3, 1], [2, 0, 2], [2, 4, 1], [3, 2, 3], [4, 1, 1], [4, 5, 2], [5, 6, 1], [6, 3, 2]];
const ROW = 50;
export function ScreenAgendaWeek() {
  const { go } = useContext(ScreenCtx);
  const [day, setDay] = useState(2);
  const [pick, setPick] = useState(4);
  return (
    <div className={`${s.board} ${s.s4}`} data-screen="mobile-a-04">
      <StatusBar />
      <div className={s.s4Head}>
        <h3 className={`t-wide ${s.s2Title}`}>Agenda</h3>
        <div className="row" style={{ gap: 6 }}>
          <button type="button" className="btn btn-sm btn-navy" onClick={() => setDay(2)}>Today</button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => go(5)}>Day</button>
        </div>
      </div>
      <Stag className={s.s4Strip} role="group" aria-label="Day of the week">
        {DAYS.map((d, i) => (
          <RiseBtn key={d} type="button" className={`${s.s4Day} ${i === day ? s.s4DayOn : ''}`} aria-pressed={i === day} onClick={() => setDay(i)}>
            <span className="t-caps">{d}</span><Bar w={14} h={6} />
          </RiseBtn>
        ))}
      </Stag>
      <div className={s.s4Grid} style={{ height: HOURS.length * ROW }}>
        {HOURS.map((h, i) => <span key={h} className={s.s4Hour} style={{ top: i * ROW }}>{String(h).padStart(2, '0')}</span>)}
        {HOURS.map((h, i) => <span key={'l' + h} className={s.s4Line} style={{ top: i * ROW }} />)}
        <span className={s.s4Col} style={{ left: 34 + day * 43 }} />
        {BLOCKS.map(([d, start, len], i) => (
          <motion.button key={i} type="button" className={`${s.s4Block} ${pick === i ? s.s4BlockOn : ''}`} aria-pressed={pick === i} aria-label={`Block ${i + 1}`}
            style={{ left: 34 + d * 43 + 2, top: start * ROW + 3, height: len * ROW - 6 }} onClick={() => setPick(pick === i ? null : i)}
            initial={{ opacity: 0, scaleY: 0.2 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ ...tLock, delay: 0.25 + i * 0.045 }} />
        ))}
      </div>
      <AreaBar active="Agenda" />
    </div>
  );
}

/* 5. Agenda day: a timeline with the thick green "now" rule to drag or step. */
const STEP = 16;
const TL = 640;
export function ScreenAgendaDay() {
  const { go } = useContext(ScreenCtx);
  const [y, setY] = useState(240);
  const box = useRef(null);
  const drag = useRef(false);
  const mins = Math.round(((480 + (y / TL) * 600) / 5)) * 5;
  const label = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  const move = (e) => {
    if (!drag.current || !box.current) return;
    const r = box.current.getBoundingClientRect();
    setY(clamp(((e.clientY - r.top) / r.height) * TL, 0, TL));
  };
  const key = (e) => {
    const d = e.key === 'ArrowUp' ? -STEP : e.key === 'ArrowDown' ? STEP : 0;
    if (!d) return;
    e.preventDefault();
    e.stopPropagation();
    setY((v) => clamp(v + d, 0, TL));
  };
  return (
    <div className={`${s.board} ${s.s5}`} data-screen="mobile-a-05">
      <StatusBar dark />
      <div className={s.s5Head}>
        <button type="button" className={s.s5Round} onClick={() => go(4)} aria-label="Back to the week"><Icon name="arrow-left" size={22} /></button>
        <h3 className="t-caps-lg">Agenda</h3>
        <span className="row" style={{ gap: 4 }}>
          <button type="button" className={s.s5Round} onClick={() => setY((v) => clamp(v - STEP, 0, TL))} aria-label="Move the now rule earlier"><Icon name="arrow-up" size={20} /></button>
          <button type="button" className={s.s5Round} onClick={() => setY((v) => clamp(v + STEP, 0, TL))} aria-label="Move the now rule later"><Icon name="arrow-down" size={20} /></button>
        </span>
      </div>
      <div ref={box} className={s.s5Line} style={{ height: TL }}>
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className={s.s5Hour} style={{ top: (i * TL) / 10 }}>{String(8 + i).padStart(2, '0')}</span>
        ))}
        {[[0.6, 1.6, 88], [2.2, 3.6, 150], [4.2, 5, 60], [6.4, 8.2, 120]].map(([a, b, w], i) => (
          <Rise key={i} className={s.s5Block} style={{ top: (a * TL) / 10, height: ((b - a) * TL) / 10, left: 64 + (i % 2) * 70 }}>
            <Bar w={w} h={10} />
          </Rise>
        ))}
        <div className={s.s5Now} style={{ transform: `translateY(${y}px)` }}
          onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e); }}
          onPointerMove={move} onPointerUp={() => { drag.current = false; }} onPointerCancel={() => { drag.current = false; }}>
          <span className={s.s5Rule} />
          <span className={s.s5Handle} role="slider" tabIndex={0} aria-label="Now rule" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={TL} aria-valuenow={Math.round(y)} aria-valuetext={label} onKeyDown={key}>
            NOW {label}
          </span>
        </div>
      </div>
    </div>
  );
}
