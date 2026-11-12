'use client';

import { useEffect, useState } from 'react';
import { still } from '@/lib/site';
import s from './strategy.module.css';

// The mint-paper rail: a chapter index that lights the chapter in view.
export default function ChapterRail({ chapters }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = chapters.findIndex((c) => c.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <aside className={`split-rail ${s.rail}`} aria-label="Chapters">
      <div>
        <h1 className="t-caps-lg">Strategy</h1>
        <p className="t-small" style={{ marginTop: 8 }}>Chapter in view: <b>{String(active + 1).padStart(2, '0')}</b> / {String(chapters.length).padStart(2, '0')}</p>
      </div>
      <nav aria-label="Strategy chapters">
        <ol className={s.railList}>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button type="button" onClick={() => go(c.id)} className={s.railBtn} aria-current={i === active ? 'true' : undefined} lang={c.lang}>
                <span className={s.railNo}>{String(i + 1).padStart(2, '0')}</span>
                <span>{c.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className={s.railBar} aria-hidden="true">
        <span style={{ transform: `scaleX(${(active + 1) / chapters.length})` }} />
      </div>
    </aside>
  );
}
