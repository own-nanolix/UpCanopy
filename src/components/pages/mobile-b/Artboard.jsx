'use client';

import { useState } from 'react';

// A fixed 390 x 844 artboard (marked data-screen) scaled with a CSS transform to the width of its box.
// `fill` stretches over a positioned parent (the phone screen); otherwise the box keeps the 390:844 ratio.
export default function Artboard({ name, label, children, fill = false, fallback = 0.8 }) {
  const [k, setK] = useState(fallback);
  const watch = (el) => {
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 390));
    ro.observe(el);
    return () => ro.disconnect();
  };
  const box = fill ? { position: 'absolute', inset: 0 } : { position: 'relative', width: '100%', aspectRatio: '390 / 844' };
  return (
    <div ref={watch} style={{ ...box, overflow: 'hidden' }}>
      <div data-screen={name} role="group" aria-label={label} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, transform: `scale(${k})`, transformOrigin: '0 0' }}>
        {children}
      </div>
    </div>
  );
}
