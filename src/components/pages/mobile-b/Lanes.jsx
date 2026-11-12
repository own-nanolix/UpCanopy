'use client';

// Seven interaction patterns as numbered lanes. Each demo is operable with the keyboard and always lands on its
// final state (the end of every move is set in the same handler that starts it).
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useDragControls, useMotionValue } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Toggle from '@/components/ui/Toggle';
import { clamp, still } from '@/lib/site';
import { SCALES } from '@/lib/brand';
import { itemV, listV, tEnter, tLock, tMove } from '@/lib/motion';
import { TAB_ICONS } from './Graphics';
import { Bar, ListRow, MCard, TabBar } from './Mobile';
import s from './mobile-b.module.css';

const TABS = TAB_ICONS.map(([icon, label]) => ({ id: label, icon, label }));

function PullLane() {
  const [gen, setGen] = useState(0);
  const [busy, setBusy] = useState(false);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  const refresh = () => {
    if (busy) return;
    setBusy(true);
    t.current = setTimeout(() => { setGen((g) => g + 1); setBusy(false); }, still() ? 0 : 520);
  };
  return (
    <div className={s.demo}>
      <div className={s.pullStage}>
        <div className={s.pullHint} aria-live="polite"><Icon name="arrow-down" size={16} />{busy ? 'Refreshing' : 'Pull down'}</div>
        <motion.div drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.45 }} onDragEnd={(_, i) => { if (i.offset.y > 50) refresh(); }} className={s.pullList}>
          <motion.ul key={gen} variants={listV} initial="hidden" animate="show" className={s.plain}>
            {[0, 1, 2, 3].map((i) => <motion.li key={i} variants={itemV}><ListRow icon={['users', 'calendar', 'chart', 'folder'][i]} line={9 - i} /></motion.li>)}
          </motion.ul>
        </motion.div>
      </div>
      <button type="button" className="btn btn-sm btn-ghost" onClick={refresh} disabled={busy}><Icon name="arrow-down" size={16} />Refresh rows</button>
    </div>
  );
}

const PANES = [['Sign in', 'users'], ['Area switcher', 'layers'], ['Notifications', 'bell']];
function SwipeLane() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const to = (k) => {
    const el = ref.current;
    if (el) el.scrollTo({ left: clamp(k, 0, PANES.length - 1) * el.clientWidth, behavior: still() ? 'auto' : 'smooth' });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); to(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); to(idx - 1); }
  };
  return (
    <div className={s.demo}>
      <div ref={ref} className={s.swipe} tabIndex={0} role="group" aria-label="Swipe between three screens, or use the arrow keys" onKeyDown={onKey} onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {PANES.map(([t, ic], k) => (
          <div key={t} className={`${s.pane} ${k === 1 ? s.paneGreen : k === 2 ? s.paneNavy : ''}`}>
            <Icon name={ic} size={28} />
            <span className="t-caps">{t}</span>
            <Bar w={9} /><Bar w={6} />
          </div>
        ))}
      </div>
      <div className={s.laneBar}>
        <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Previous pane" disabled={idx === 0} onClick={() => to(idx - 1)}><Icon name="chevron-left" size={16} /></button>
        <span className={s.pips} aria-hidden="true">{PANES.map((p, k) => <i key={p[0]} className={k === idx ? s.pipOn : ''} />)}</span>
        <button type="button" className="btn btn-sm btn-icon" aria-label="Next pane" disabled={idx === PANES.length - 1} onClick={() => to(idx + 1)}><Icon name="chevron-right" size={16} /></button>
      </div>
    </div>
  );
}

function ExpandLane() {
  return <div className={`${s.demo} ${s.stack}`}><MCard title="CRM" defaultOpen rows={3} /><MCard title="Agenda" rows={2} /></div>;
}

const Y = { closed: 330, half: 150, full: 24 };
function SheetLane() {
  const y = useMotionValue(Y.half);
  const [lvl, setLvl] = useState('half');
  const dc = useDragControls();
  const moved = useRef(false);
  const land = (l) => { setLvl(l); animate(y, Y[l], still() ? { duration: 0 } : tLock); };
  const cycle = { closed: 'half', half: 'full', full: 'closed' };
  const onEnd = (_, info) => {
    const v = y.get() + info.velocity.y * 0.12;
    const best = Object.keys(Y).reduce((a, b) => (Math.abs(Y[b] - v) < Math.abs(Y[a] - v) ? b : a));
    land(best);
    setTimeout(() => { moved.current = false; }, 0);
  };
  return (
    <div className={s.demo}>
      <div className={s.stage}>
        <div className={s.stageBack}><Bar w={10} /><Bar w={7} /><Bar w={9} /></div>
        <motion.div className={`${s.sheet} ${s.sheetFree}`} style={{ y }} drag="y" dragListener={false} dragControls={dc} dragMomentum={false} dragConstraints={{ top: Y.full, bottom: Y.closed }} dragElastic={0.1} onDragStart={() => { moved.current = true; }} onDragEnd={onEnd}>
          <button
            type="button" className={s.handle} aria-label={`Sheet handle, ${lvl}. Press to move it, or use the arrow keys`}
            onPointerDown={(e) => dc.start(e)} onClick={() => { if (!moved.current) land(cycle[lvl]); }}
            onKeyDown={(e) => { if (e.key === 'ArrowUp') { e.preventDefault(); land(lvl === 'closed' ? 'half' : 'full'); } if (e.key === 'ArrowDown') { e.preventDefault(); land(lvl === 'full' ? 'half' : 'closed'); } }}
          ><span aria-hidden="true" /></button>
          <div className={s.sheetBody}><Bar w={10} /><Bar w={8} /><Bar w={12} /></div>
        </motion.div>
      </div>
      <p className="t-label" aria-live="polite">{lvl === 'full' ? 'Locked open' : lvl === 'half' ? 'Half' : 'Closed'}</p>
    </div>
  );
}

function TabLane() {
  const [tab, setTab] = useState('Agenda');
  const cur = TABS.find((x) => x.id === tab);
  return (
    <div className={`${s.demo} ${s.tabDemo}`}>
      <motion.div key={tab} className={s.tabContent} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={tEnter}>
        <Icon name={cur.icon} size={26} /><span className="t-caps-lg">{cur.label}</span><Bar w={10} /><Bar w={7} />
      </motion.div>
      <TabBar items={TABS} value={tab} onChange={setTab} label="Tab bar demo" />
    </div>
  );
}

function StepLane() {
  const sc = SCALES[0];
  const [v, setV] = useState(sc.chosen);
  const set = (n) => setV(clamp(n, 1, 10));
  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(v + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(v - 1); }
  };
  return (
    <div className={s.demo}>
      <div className={s.stepLabels}><span lang="pt-BR">{sc.left}</span><span lang="pt-BR">{sc.right}</span></div>
      <div className={s.stepTrack} role="group" aria-label="Scale in ten steps, arrow keys move the green dot" onKeyDown={onKey}>
        {Array.from({ length: 10 }, (_, k) => (
          <button key={k} type="button" className={s.stepDot} aria-label={`Step ${k + 1}`} aria-pressed={v === k + 1} onClick={() => set(k + 1)}><span /></button>
        ))}
        <motion.span className={s.stepGreen} aria-hidden="true" initial={false} animate={{ left: `${(v - 0.5) * 10}%` }} transition={tLock} />
      </div>
      <div className={s.laneBar}>
        <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Step back" disabled={v === 1} onClick={() => set(v - 1)}><Icon name="chevron-left" size={16} /></button>
        <span className="t-label" aria-live="polite">Step {v} of 10</span>
        <button type="button" className="btn btn-sm btn-icon" aria-label="Step forward" disabled={v === 10} onClick={() => set(v + 1)}><Icon name="chevron-right" size={16} /></button>
      </div>
    </div>
  );
}

function HoldLane() {
  const [on, setOn] = useState(false);
  const [holding, setHolding] = useState(false);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  const start = () => {
    clearTimeout(t.current);
    setHolding(true);
    t.current = setTimeout(() => { setOn((v) => !v); setHolding(false); }, still() ? 0 : 600);
  };
  const stop = () => { clearTimeout(t.current); setHolding(false); };
  return (
    <div className={s.demo}>
      <button
        type="button" className={`${s.hold} ${on ? s.holdOn : ''}`} aria-pressed={on} aria-label="Hold to switch, 0.6 seconds. Hold Enter on the keyboard"
        onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); start(); } }}
        onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') stop(); }}
      >
        <motion.span className={s.holdFill} aria-hidden="true" initial={false} animate={{ scaleX: holding ? 1 : 0 }} transition={holding ? { duration: 0.6, ease: 'linear' } : tMove} />
        <Icon name={on ? 'check' : 'plus'} size={20} />
        <span>{on ? 'On' : 'Hold'}</span>
      </button>
      <Toggle label="Or tap to switch" checked={on} onChange={setOn} />
    </div>
  );
}

const LANES = [
  ['Pull to refresh', 'Drag the list down and let go; the rows rise back into order, one after another.', <PullLane key="1" />],
  ['Swipe between screens', 'Swipe the panes sideways; they stop on a pane and lock. Arrow keys work too.', <SwipeLane key="2" />],
  ['Tap a card to expand', 'A tap opens the card, a second tap closes it. The height settles on its final size.', <ExpandLane key="3" />],
  ['Bottom sheet', 'The sheet rises and locks. Drag the handle up to lock it open, down to close it.', <SheetLane key="4" />],
  ['Tab bar change', 'The active tile turns green and locks; the content rises to meet it.', <TabLane key="5" />],
  ['Ten-dot stepper', 'One green dot among ten moves to the chosen step and locks in.', <StepLane key="6" />],
  ['Long-press and toggle', 'Hold until the bar is full to switch; a plain toggle does the same with a tap.', <HoldLane key="7" />],
];

export default function Lanes() {
  return (
    <ol className={s.lanes}>
      {LANES.map(([title, text, demo], i) => (
        <li key={title} className={s.lane}>
          <span className={s.laneNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div className={s.laneText}><h3 className="t-caps-lg">{title}</h3><p className="t-small">{text}</p></div>
          {demo}
        </li>
      ))}
    </ol>
  );
}
