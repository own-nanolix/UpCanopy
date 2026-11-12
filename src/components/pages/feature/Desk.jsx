'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/site/Icon';
import Typewriter from '@/components/site/Typewriter';
import { Segmented } from '@/components/ui/Toggle';
import { AREAS, DESCRIPTOR, LINES, MANIFESTO, MODES, VALUES } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import s from './feature.module.css';

// The working back-office desk: three linked panels (CRM, Agenda, Financeiro) that react to each other,
// a mode switch that re-lays the cards, and a guided walkthrough along the bottom.
// Every client, block and ledger row is a quiet placeholder: the case study publishes no product data.

const N = 5; // clients
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SLOTS = 6;
const LEDGER_ROWS = 4;
const PITCH = 64; // card pitch in the CRM stage, px
const pad2 = (n) => String(n + 1).padStart(2, '0');

// [day, slot] of the two blocks of each client (b0, b1 belong to client 0, and so on).
const START = [[0, 0], [2, 3], [0, 2], [3, 1], [1, 1], [4, 4], [2, 0], [3, 4], [1, 4], [4, 0]];
const START_BLOCKS = START.map(([day, slot], i) => ({ id: `b${i}`, client: Math.floor(i / 2), day, slot }));

// Seeded scatter for the "sobrevivência" mode: the same on the server and in the browser.
const rand = seeded(21);
const SCATTER = Array.from({ length: N }, (_, i) => ({
  x: Math.round(rand() * 38),
  y: Math.round(i * PITCH + (rand() - 0.5) * 30),
  r: Math.round((rand() - 0.5) * 18),
  // the same disorder, lighter, for agenda blocks and ledger rows
  tilt: Math.round((rand() - 0.5) * 9),
}));

const BASE = { client: 0, block: 'b0', blocks: START_BLOCKS, ticks: {}, mode: MODES[0] };

// Move a block by dSlot / dDay; if the target cell is taken the two blocks swap places.
function moveBlock(blocks, id, dSlot, dDay = 0) {
  const me = blocks.find((b) => b.id === id);
  if (!me) return blocks;
  const slot = me.slot + dSlot;
  const day = me.day + dDay;
  if (slot < 0 || slot >= SLOTS || day < 0 || day >= DAYS.length) return blocks;
  const other = blocks.find((b) => b.id !== id && b.slot === slot && b.day === day);
  return blocks.map((b) => {
    if (b.id === id) return { ...b, slot, day };
    if (other && b.id === other.id) return { ...b, slot: me.slot, day: me.day };
    return b;
  });
}

// The four moments of the walkthrough. Captions are verbatim lines from the brand copy.
const STEPS = [
  { label: 'Pick a client', caption: MANIFESTO[4], apply: (d) => ({ ...d, client: 2, block: 'b4' }) },
  { label: 'Move a block', caption: MANIFESTO[6], apply: (d) => ({ ...d, block: 'b4', blocks: moveBlock(d.blocks, 'b4', 1) }) },
  { label: 'Tick a row', caption: VALUES.points[0].text[0], apply: (d) => ({ ...d, ticks: { ...d.ticks, '2-0': true, '2-1': true } }) },
  { label: 'Switch the mode', caption: MANIFESTO[7], apply: (d) => ({ ...d, mode: MODES[1] }) },
];
const DONE = STEPS.length; // the finished state
const stateAt = (i) => STEPS.slice(0, Math.min(i + 1, STEPS.length)).reduce((d, st) => st.apply(d), BASE);

export default function Desk() {
  const [demo, setDemo] = useState(BASE);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const stepRef = useRef(-1);
  const playingRef = useRef(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const later = (fn, ms) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  };
  const halt = () => {
    playingRef.current = false;
    clearTimeout(timer.current);
    setPlaying(false);
  };
  const go = (i) => {
    stepRef.current = i;
    setStep(i);
    setDemo(stateAt(i));
    if (i >= DONE) {
      playingRef.current = false;
      setPlaying(false);
    }
  };
  const play = () => {
    playingRef.current = true;
    setPlaying(true);
    const cur = stepRef.current;
    if (cur >= 0 && cur < DONE) later(() => go(stepRef.current + 1), 500);
    else {
      go(-1);
      later(() => go(0), 700);
    }
  };
  const replay = () => {
    playingRef.current = true;
    setPlaying(true);
    go(-1);
    later(() => go(0), 700);
  };
  const captionDone = () => {
    if (playingRef.current && stepRef.current >= 0 && stepRef.current < DONE) later(() => go(stepRef.current + 1), 1500);
  };
  const jump = (i) => {
    halt();
    go(i);
  };

  // ---- user actions: any of them interrupts the walkthrough, the demo keeps what the visitor did ----
  const pickClient = (c) => {
    halt();
    setDemo((d) => ({ ...d, client: c, block: d.blocks.find((b) => b.client === c)?.id ?? d.block }));
  };
  const pickBlock = (b) => {
    halt();
    setDemo((d) => ({ ...d, block: b.id, client: b.client }));
  };
  const shift = (id, dSlot, dDay = 0) => {
    halt();
    setDemo((d) => ({ ...d, block: id, blocks: moveBlock(d.blocks, id, dSlot, dDay) }));
  };
  const tick = (key) => {
    halt();
    setDemo((d) => {
      const ticks = { ...d.ticks };
      if (ticks[key]) delete ticks[key];
      else ticks[key] = true;
      return { ...d, ticks };
    });
  };
  const setMode = (m) => {
    halt();
    setDemo((d) => ({ ...d, mode: m }));
  };

  const expand = demo.mode === MODES[1];
  const active = demo.blocks.find((b) => b.id === demo.block);
  const ticked = Array.from({ length: LEDGER_ROWS }, (_, r) => !!demo.ticks[`${demo.client}-${r}`]);
  const count = ticked.filter(Boolean).length;
  const caption = step >= DONE ? LINES.control : step >= 0 ? STEPS[step].caption : null;

  // ---- pointer drag of an agenda block: it follows the pointer, then snaps to the nearest cell ----
  const track = useRef(null);
  const drag = useRef(null);
  const [ghost, setGhost] = useState(null);
  const dragStart = (e, b) => {
    if (e.button !== 0) return;
    drag.current = { id: b.id, x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const dragMove = (e) => {
    const d = drag.current;
    if (d) setGhost({ id: d.id, dx: e.clientX - d.x, dy: e.clientY - d.y });
  };
  const dragEnd = (e) => {
    const d = drag.current;
    drag.current = null;
    setGhost(null);
    if (!d || !track.current) return;
    const r = track.current.getBoundingClientRect();
    const me = demo.blocks.find((b) => b.id === d.id);
    const dSlot = Math.round((e.clientX - d.x) / (r.width / SLOTS));
    const dDay = Math.round((e.clientY - d.y) / (r.height / DAYS.length));
    if (!me || (!dSlot && !dDay)) return;
    const slot = Math.min(SLOTS - 1, Math.max(0, me.slot + dSlot));
    const day = Math.min(DAYS.length - 1, Math.max(0, me.day + dDay));
    shift(d.id, slot - me.slot, day - me.day);
  };
  const dragCancel = () => {
    drag.current = null;
    setGhost(null);
  };

  const onBlockKey = (e, id) => {
    const keys = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const k = keys[e.key];
    if (!k) return;
    e.preventDefault();
    shift(id, k[0], k[1]);
  };

  return (
    <div className={s.desk} data-mode={expand ? 'expand' : 'survive'} id="feature-desk">
      <div className={s.deskBar}>
        <div className={s.deskId}>
          <span className="t-caps">{DESCRIPTOR}</span>
          <span className="t-small">Client {pad2(demo.client)} selected</span>
        </div>
        <div lang="pt-BR">
          <Segmented id="feature-mode" label="Mode" options={MODES} value={demo.mode} onChange={setMode} />
        </div>
      </div>

      <div className={s.panels}>
        {/* ---- CRM ---- */}
        <section className={s.panel} aria-label="CRM">
          <h3 className={`t-caps ${s.panelHead}`}><Icon name="users" size={18} /> {AREAS[0]}</h3>
          <div className={s.stage} style={{ height: N * PITCH }}>
            {SCATTER.map((p, i) => {
              const on = i === demo.client;
              const pos = expand ? { '--x': '0px', '--y': `${i * PITCH}px`, '--r': '0deg' } : { '--x': `${p.x}px`, '--y': `${p.y}px`, '--r': `${p.r}deg` };
              return (
                <button key={i} type="button" className={s.card} data-on={on || undefined} aria-pressed={on} aria-label={`Client ${pad2(i)}`} style={{ ...pos, '--i': i, zIndex: on ? 3 : 1 }} onClick={() => pickClient(i)}>
                  <span className={s.cardInner} data-lock={expand || undefined}>
                    <span className={s.cardNo}>{pad2(i)}</span>
                    <span className={s.cardLines} aria-hidden="true">
                      <span className="ph" style={{ width: `${[78, 64, 84, 58, 72][i]}%` }} />
                      <span className="ph" style={{ width: `${[44, 52, 38, 56, 46][i]}%` }} />
                    </span>
                    <span className={s.cardLock} aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---- Agenda ---- */}
        <section className={s.panel} aria-label="Agenda">
          <div className={s.panelTop}>
            <h3 className={`t-caps ${s.panelHead}`}><Icon name="calendar" size={18} /> {AREAS[1]}</h3>
            <div className={s.nudge}>
              <button type="button" className="btn btn-sm btn-icon btn-ghost" aria-label="Move the selected block one slot earlier" onClick={() => shift(demo.block, -1)} disabled={!active || active.slot === 0}>
                <Icon name="chevron-left" size={18} />
              </button>
              <button type="button" className="btn btn-sm btn-icon btn-ghost" aria-label="Move the selected block one slot later" onClick={() => shift(demo.block, 1)} disabled={!active || active.slot === SLOTS - 1}>
                <Icon name="chevron-right" size={18} />
              </button>
            </div>
          </div>
          <div className={s.week}>
            <ul className={s.days} aria-hidden="true">
              {DAYS.map((d) => <li key={d} className="t-label">{d}</li>)}
            </ul>
            <div className={s.track} ref={track}>
              <div className={s.cells} aria-hidden="true">
                {DAYS.flatMap((d, di) => Array.from({ length: SLOTS }, (_, si) => <span key={`${di}-${si}`} />))}
              </div>
              {demo.blocks.map((b) => {
                const mine = b.client === demo.client;
                const isActive = b.id === demo.block;
                const g = ghost && ghost.id === b.id ? ghost : null;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={s.block}
                    data-mine={mine || undefined}
                    data-active={isActive || undefined}
                    data-drag={g ? '' : undefined}
                    aria-label={`Client ${pad2(b.client)}, ${DAYS[b.day]}, slot ${b.slot + 1}. Drag it, or use the arrow keys.`}
                    style={{ '--d': b.day, '--sl': b.slot, '--tilt': `${SCATTER[b.client].tilt}deg`, '--dx': `${g ? g.dx : 0}px`, '--dy': `${g ? g.dy : 0}px` }}
                    onClick={() => pickBlock(b)}
                    onKeyDown={(e) => onBlockKey(e, b.id)}
                    onPointerDown={(e) => dragStart(e, b)}
                    onPointerMove={dragMove}
                    onPointerUp={dragEnd}
                    onPointerCancel={dragCancel}
                  >
                    <span className={s.blockFace}>
                      <span className="ph" style={{ width: '70%' }} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="t-small" aria-live="polite">
            {active ? `Selected block: ${DAYS[active.day]}, slot ${active.slot + 1} of ${SLOTS}.` : 'No block selected.'}
          </p>
        </section>

        {/* ---- Financeiro ---- */}
        <section className={s.panel} aria-label="Financeiro">
          <h3 className={`t-caps ${s.panelHead}`}><Icon name="chart" size={18} /> {AREAS[2]}</h3>
          <p className="t-label">Client {pad2(demo.client)}</p>
          <ul className={s.ledger}>
            {Array.from({ length: LEDGER_ROWS }, (_, r) => (
              <li key={r} className={s.ledgerRow} data-done={ticked[r] || undefined} style={{ '--tilt': `${SCATTER[(demo.client + r) % N].tilt}deg` }}>
                <label>
                  <input type="checkbox" className={s.check} checked={ticked[r]} onChange={() => tick(`${demo.client}-${r}`)} aria-label={`Row ${r + 1} for client ${pad2(demo.client)}`} />
                  <span className={s.ledgerLines} aria-hidden="true">
                    <span className="ph" style={{ width: `${[70, 56, 80, 62][r]}%` }} />
                  </span>
                  <span className={s.amount} aria-hidden="true"><span className="ph" style={{ minWidth: '3.2em' }} /></span>
                </label>
              </li>
            ))}
          </ul>
          <div className={s.run} role="progressbar" aria-label="Rows ticked" aria-valuemin={0} aria-valuemax={LEDGER_ROWS} aria-valuenow={count}>
            <span className={s.runFill} style={{ transform: `scaleX(${count / LEDGER_ROWS})` }} />
          </div>
          <p className="t-small">{count} of {LEDGER_ROWS} rows ticked</p>
        </section>
      </div>

      {/* ---- Guided walkthrough ---- */}
      <div className={s.strip} role="group" aria-label="Guided walkthrough">
        <div className={s.stripBtns}>
          {playing ? (
            <button type="button" className="btn btn-sm" onClick={halt}><Icon name="pause" size={16} /> Pause</button>
          ) : (
            <button type="button" className="btn btn-sm" onClick={play}><Icon name="play" size={16} /> {step >= 0 && step < DONE ? 'Resume' : 'Play'}</button>
          )}
          <button type="button" className="btn btn-sm btn-ghost" onClick={replay}>Replay</button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => jump(DONE)}>Finish</button>
        </div>
        <ol className={s.steps}>
          {STEPS.map((st, i) => (
            <li key={st.label}>
              <button type="button" className={s.stepBtn} data-on={i === step || undefined} data-past={i < step || undefined} aria-current={i === step ? 'step' : undefined} onClick={() => jump(i)}>
                <span className={s.stepNo}>{i + 1}</span>
                {st.label}
              </button>
            </li>
          ))}
        </ol>
        <div className={s.caption} lang="pt-BR" aria-live="off">
          {caption ? (
            <p key={step} className="t-line on-navy">
              <Typewriter text={caption} speed={step >= DONE ? 26 : 14} onDone={captionDone} />
            </p>
          ) : (
            <p className="t-small on-navy" lang="en">Press Play: four moments, one caption each.</p>
          )}
        </div>
      </div>
    </div>
  );
}
