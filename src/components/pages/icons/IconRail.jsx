'use client';

import { useEffect, useState } from 'react';
import { still } from '@/lib/site';
import { GROUPS, SECTIONS, SPECS } from './data';
import s from './icons.module.css';

const ALL = [...GROUPS, ...SECTIONS];

export default function IconRail() {
  const [active, setActive] = useState(GROUPS[0].id);

  useEffect(() => {
    const els = ALL.map((g) => document.getElementById(g.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
  };

  const btn = (g, n) => (
    <li key={g.id}>
      <button type="button" className={s.railBtn} aria-current={active === g.id ? 'true' : undefined} onClick={() => go(g.id)}>
        <span className={s.railNo}>{n}</span>
        <span>{g.label}</span>
      </button>
    </li>
  );

  return (
    <aside className="split-rail split-rail-green" aria-label="Icon groups">
      <div>
        <p className="t-caps">Icon set</p>
        <p className={`${s.railBig} t-wide`}>32</p>
        <p className="t-label" style={{ color: 'var(--navy)' }}>Icons, one grid, one stroke</p>
      </div>
      <nav aria-label="Icon groups and sections">
        <ul className={s.railList}>
          {GROUPS.map((g, i) => btn(g, `0${i + 1}`))}
        </ul>
        <ul className={`${s.railList} ${s.railMinor}`}>
          {SECTIONS.map((g, i) => btn(g, `0${i + 5}`))}
        </ul>
      </nav>
      <ul className={s.railSpecs}>
        {SPECS.map((t) => (
          <li key={t} className="t-label" style={{ color: 'var(--navy)' }}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}
