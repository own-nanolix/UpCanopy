'use client';

import { useState, useRef } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { Placeholder } from '@/components/ui/Card';
import { tLock } from '@/lib/motion';
import { seeded } from '@/lib/charts';
import s from './lp-crm.module.css';

// The live board: neutral column names, placeholder client cards, real controls.
const COLUMNS = ['New', 'In progress', 'Done'];
const SECTOR = ['Landscape', 'Hardscape'];

const rnd = seeded(41);
const START = [0, 0, 0, 0, 1, 1, 1, 2, 2].map((col, i) => ({
  id: i + 1,
  col,
  w: 5 + Math.round(rnd() * 5),
  w2: 3 + Math.round(rnd() * 4),
  sector: i % 2,
}));

export default function CrmBoard() {
  const [cards, setCards] = useState(START);
  const [note, setNote] = useState('');
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(-1);
  const refs = useRef({});

  const place = (id, col) => {
    setCards((cs) => {
      const c = cs.find((x) => x.id === id);
      if (!c || c.col === col) return cs;
      return [...cs.filter((x) => x.id !== id), { ...c, col }];
    });
    setNote(`Card ${id} moved to ${COLUMNS[col]}.`);
    // keep keyboard focus on the moved card
    requestAnimationFrame(() => {
      const b = refs.current[id];
      if (b) b.focus();
    });
  };
  const move = (id, dir) => {
    const c = cards.find((x) => x.id === id);
    const to = c.col + dir;
    if (to < 0 || to > COLUMNS.length - 1) return;
    place(id, to);
  };
  const reset = () => {
    setCards(START);
    setNote('Board reset.');
  };

  const onKey = (e, id) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(id, -1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(id, 1); }
  };

  return (
    <div className={s.board} role="group" aria-label="Client board">
      <div className={s.boardBar}>
        <p className="t-caps">Board</p>
        <button type="button" className={`btn btn-sm btn-navy ${s.reset}`} onClick={reset}>
          <Icon name="clock" size={16} /> Reset
        </button>
      </div>
      <LayoutGroup>
        <div className={s.cols}>
          {COLUMNS.map((name, col) => {
            const list = cards.filter((c) => c.col === col);
            return (
              <section
                key={name}
                className={`${s.col} ${over === col ? s.colOver : ''}`}
                aria-label={`${name}, ${list.length} cards`}
                onDragOver={(e) => { if (drag) { e.preventDefault(); setOver(col); } }}
                onDragLeave={() => setOver(-1)}
                onDrop={(e) => { e.preventDefault(); if (drag) place(drag, col); setDrag(null); setOver(-1); }}
              >
                <header className={s.colHead}>
                  <h3 className="t-caps">{name}</h3>
                  <motion.span key={list.length} className={s.count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={tLock}>
                    {list.length}
                  </motion.span>
                </header>
                <div className={s.colRule} />
                <ul className={s.list}>
                  {list.map((c) => (
                    <motion.li
                      key={c.id}
                      layout
                      layoutId={`lp-crm-card-${c.id}`}
                      transition={tLock}
                      className={s.cardWrap}
                    >
                      <div
                        className={`${s.card} ${drag === c.id ? s.dragging : ''}`}
                        style={{ '--i': c.id }}
                        draggable
                        onDragStart={() => setDrag(c.id)}
                        onDragEnd={() => { setDrag(null); setOver(-1); }}
                      >
                        <button
                          type="button"
                          ref={(el) => { refs.current[c.id] = el; }}
                          className={s.cardBody}
                          aria-label={`Card ${c.id}. Use left and right arrow keys to move between columns.`}
                          onKeyDown={(e) => onKey(e, c.id)}
                        >
                          <span className={s.cardTop}>
                            <span className={s.avatar} aria-hidden="true" />
                            <span className={s.lines}>
                              <Placeholder width={c.w} label="Name placeholder" />
                              <Placeholder width={c.w2} label="Detail placeholder" />
                            </span>
                          </span>
                          <span className={`chip chip-sm ${s.sector}`}>{SECTOR[c.sector]}</span>
                        </button>
                        <span className={s.moves}>
                          <button type="button" className={s.mv} onClick={() => move(c.id, -1)} disabled={col === 0} aria-label={`Move card ${c.id} left`}>
                            <Icon name="arrow-left" size={16} />
                            <span>Move left</span>
                          </button>
                          <button type="button" className={s.mv} onClick={() => move(c.id, 1)} disabled={col === COLUMNS.length - 1} aria-label={`Move card ${c.id} right`}>
                            <span>Move right</span>
                            <Icon name="arrow-right" size={16} />
                          </button>
                        </span>
                      </div>
                    </motion.li>
                  ))}
                  {list.length === 0 && <li className={s.empty}><span className="t-small">Drop a card here</span></li>}
                </ul>
              </section>
            );
          })}
        </div>
      </LayoutGroup>
      <p className="sr-only" role="status" aria-live="polite">{note}</p>
    </div>
  );
}
