'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { seeded, r2 } from '@/lib/charts';
import s from './lp-crm.module.css';

// Informality to order. The same twelve placeholder cards: scattered at seeded angles on the left of the
// divider, in aligned rows on the right. The range input moves the divider.
const W = 960, H = 440, CW = 150, CH = 84, COLS = 4, ROWS = 3;
const gx = (W - COLS * CW) / (COLS + 1), gy = (H - ROWS * CH) / (ROWS + 1);

const rnd = seeded(1776);
const CARDS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS, r = Math.floor(i / COLS);
  const x = gx + c * (CW + gx), y = gy + r * (CH + gy);
  return {
    i, x: r2(x), y: r2(y),
    sx: r2(x + (rnd() - 0.5) * 110), sy: r2(y + (rnd() - 0.5) * 80),
    rot: r2((rnd() - 0.5) * 46),
    a: r2(52 + rnd() * 50), b: r2(30 + rnd() * 40),
  };
});

function Card({ x, y, rot = 0, a, b, scattered }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} ${CW / 2} ${CH / 2})`}>
      <rect width={CW} height={CH} fill="#FFFFFF" stroke="#162557" strokeWidth="2" />
      <rect x="14" y="14" width="22" height="22" fill={scattered ? '#DADADA' : '#26CF7B'} />
      <rect x="46" y="16" width={a} height="8" fill="#162557" opacity="0.16" />
      <rect x="46" y="30" width={b} height="8" fill="#162557" opacity="0.16" />
      <rect x="14" y="58" width="46" height="12" fill="none" stroke="#162557" strokeWidth="2" />
    </g>
  );
}

export default function OrderSlider() {
  const [v, setV] = useState(50);
  const X = r2((W * v) / 100);
  return (
    <div className={s.slider}>
      <div className={s.sliderFrame}>
        <Art viewBox={`0 0 ${W} ${H}`} title="Informality to order: scattered cards on the left, aligned rows on the right" exportName="lp-crm-order" className={s.sliderSvg}>
          <defs>
            <clipPath id="lp-crm-clip-left"><rect x="0" y="0" width={X} height={H} /></clipPath>
            <clipPath id="lp-crm-clip-right"><rect x={X} y="0" width={W - X} height={H} /></clipPath>
            <pattern id="lp-crm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#162557" strokeWidth="1" opacity="0.1" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="#F0F0F0" />
          <g clipPath="url(#lp-crm-clip-right)">
            <rect width={W} height={H} fill="url(#lp-crm-grid)" />
            {CARDS.map((c) => <Card key={c.i} x={c.x} y={c.y} a={c.a} b={c.b} />)}
          </g>
          <g clipPath="url(#lp-crm-clip-left)">
            {CARDS.map((c) => <Card key={c.i} x={c.sx} y={c.sy} rot={c.rot} a={c.a} b={c.b} scattered />)}
          </g>
          <rect x={X - 2} y="0" width="4" height={H} fill="#26CF7B" />
          <rect x={X - 11} y={H / 2 - 22} width="22" height="44" fill="#26CF7B" />
          <path d={`M${X - 4} ${H / 2 - 7}L${X - 8} ${H / 2}L${X - 4} ${H / 2 + 7}M${X + 4} ${H / 2 - 7}L${X + 8} ${H / 2}L${X + 4} ${H / 2 + 7}`} fill="none" stroke="#162557" strokeWidth="2" />
        </Art>
      </div>
      <div className={s.sliderCtl}>
        <label htmlFor="lp-crm-wipe" className="t-caps">Wipe</label>
        <input
          id="lp-crm-wipe"
          type="range"
          min="0"
          max="100"
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className={s.range}
          aria-label="Wipe between scattered and aligned"
          aria-valuetext={v > 66 ? 'Mostly scattered' : v < 34 ? 'Mostly aligned' : 'Half and half'}
        />
        <button type="button" className="btn btn-sm btn-navy" onClick={() => setV(0)}>Align</button>
        <button type="button" className="btn btn-sm btn-ghost" onClick={() => setV(100)}>Scatter</button>
      </div>
    </div>
  );
}
