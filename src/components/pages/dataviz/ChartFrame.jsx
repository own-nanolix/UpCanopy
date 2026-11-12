'use client';

import { useEffect, useRef, useState } from 'react';
import s from './dataviz.module.css';

// Wraps one chart. It holds the tooltip (shown on hover and on keyboard focus of any element with data-tip,
// placed over the chart wrapper, not inside the SVG) and starts the chart's CSS animation when it scrolls in.
export default function ChartFrame({ children, className = '' }) {
  const ref = useRef(null);
  const [tipState, setTip] = useState(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (e) => {
    const t = e.target.closest ? e.target.closest('[data-tip]') : null;
    const box = ref.current;
    if (!t || !box) return;
    const b = box.getBoundingClientRect();
    const r = t.getBoundingClientRect();
    const x = Math.min(Math.max(r.left - b.left + r.width / 2, 70), Math.max(70, b.width - 70));
    setTip({ text: t.getAttribute('data-tip'), x, y: Math.max(r.top - b.top, 24) });
  };
  const hide = () => setTip(null);

  return (
    <div
      ref={ref}
      className={`${s.frame} ${className}`}
      data-play={seen ? '1' : '0'}
      onMouseOver={show}
      onFocus={show}
      onMouseOut={hide}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === 'Escape') hide();
      }}
    >
      {children}
      {tipState && (
        <span role="tooltip" className={s.tip} style={{ left: tipState.x, top: tipState.y }}>
          {tipState.text}
        </span>
      )}
    </div>
  );
}
