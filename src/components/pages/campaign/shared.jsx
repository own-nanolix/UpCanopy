'use client';
// Shared pieces of the campaign board: palette, text helpers for artwork, and the animated wrapper.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { itemV, tMove } from '@/lib/motion';
import { MarkG } from '@/components/art/Mark';
import s from './campaign.module.css';

export const K = {
  green: '#26CF7B', navy: '#162557', dark: '#052E25', mint: '#F2FFE4', white: '#FFFFFF', deep: '#0C1445',
  pale: '#DFF7E6', muted: '#A9B1D1', frond: '#8FC9B5', ink: '#086338',
};

// A run of brand-line rows in the light text voice; the strong part(s) are set bold in strongFill.
function renderRow(row, list, strongFill) {
  for (const t of list) {
    const k = row.indexOf(t);
    if (k >= 0) {
      return [row.slice(0, k), <tspan key="b" fontWeight="700" fill={strongFill}>{t}</tspan>, row.slice(k + t.length)];
    }
  }
  return row;
}
export function Rows({ rows, x, y, size, lh = 1.2, anchor = 'start', fill, strong, strongFill, weight = 300, ...rest }) {
  const list = Array.isArray(strong) ? strong : strong ? [strong] : [];
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill} {...rest}>
      {rows.map((row, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : r1(size * lh)}>{renderRow(row, list, strongFill)}</tspan>
      ))}
    </text>
  );
}
const r1 = (n) => Math.round(n * 100) / 100;

// Wide logotype voice for word-marks and caps labels.
export function Wide({ x, y, size, fill, anchor = 'start', weight = 500, spacing = 0, children, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill} letterSpacing={spacing} className="wide" style={{ fontFamily: 'var(--font-wide)' }} {...rest}>
      {children}
    </text>
  );
}

// Phone and web address, small, two rows (text voice).
export function Contacts({ x, y, size = 28, fill, anchor = 'end', ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="400" textAnchor={anchor} fill={fill} {...rest}>
      <tspan x={x}>+1 (774) 360-7800</tspan>
      <tspan x={x} dy={r1(size * 1.35)}>upcanopy.com</tspan>
    </text>
  );
}

// The mark with its two pieces assembling (arch lowers onto the bar).
export function Mk({ x, y, size, fill }) {
  return <MarkG x={x} y={y} size={size} fill={fill} archClass="roof-arch" barClass="roof-bar" />;
}

// Grain-covered field.
export function Field({ idp, w, h, fill }) {
  return <rect width={w} height={h} fill={fill} filter={`url(#${idp}-grain)`} />;
}

// Animated wrapper around one exportable SVG. `solo` pieces enter on their own as they scroll into view; the
// rest inherit the list variants of their group. Artwork animations inside the SVG wait until it is seen.
export function Piece({ children, caption, kind, solo = false, shift = false, step = 0, className = '' }) {
  const [seen, setSeen] = useState(false);
  const own = solo ? { initial: 'hidden', whileInView: 'show' } : {};
  return (
    <motion.figure
      className={`${s.piece} ${seen ? '' : s.pending} ${shift ? s.shift : ''} ${className}`}
      style={{ '--n': step }}
      variants={itemV}
      {...own}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      onViewportEnter={() => requestAnimationFrame(() => setSeen(true))}
      whileHover={{ y: -8, transition: tMove }}
    >
      <div className={s.art}>{children}</div>
      <figcaption className={s.cap}><span>{kind}</span><span>{caption}</span></figcaption>
    </motion.figure>
  );
}
