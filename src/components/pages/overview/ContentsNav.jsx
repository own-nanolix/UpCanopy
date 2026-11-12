'use client';

import { still } from '@/lib/site';
import s from './overview.module.css';

// The contents list in the rail. Scrolls with JS (never a #anchor link).
export default function ContentsNav({ items }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <nav aria-label="Contents">
      <ol className={s.contents}>
        {items.map((it, i) => (
          <li key={it.id}>
            <button type="button" onClick={() => go(it.id)} className={s.contentsBtn}>
              <span className={s.contentsNo}>{String(i + 1).padStart(2, '0')}</span>
              <span>{it.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
