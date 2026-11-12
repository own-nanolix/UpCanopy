'use client';

// The animated draw-on: the construction circles fade in, the bar rises, the arch lowers onto it like a roof
// being set. CSS keyframes only (shared classes fade-in, roof-arch, roof-bar); the resting state is the finished
// mark. "Replay" re-mounts the SVG through its React key.
import { useState } from 'react';
import Art from '@/components/art/Art';
import { MARK_ARCH, MARK_BAR } from '@/components/art/Mark';
import { C, Furniture, Rings } from './Parts';
import s from './logo.module.css';

export default function DrawOn() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.draw}>
      <Art key={run} viewBox="0 0 600 600" title="Draw-on: the arch lowers onto the bar" exportName="logo-draw-on">
        <rect width="600" height="600" fill={C.gray} />
        <Rings x={150} y={150} size={300} max={9} draw delay={0} />
        <g transform="translate(150 150) scale(3)" fill={C.green}>
          <path d={MARK_BAR} className="roof-bar" style={{ animationDelay: '1500ms' }} />
          <path d={MARK_ARCH} className="roof-arch" style={{ animationDelay: '1800ms' }} />
        </g>
        <Furniture w={600} h={600} tl="DRAW-ON" br="CIRCLES, BAR, ARCH" />
      </Art>
      <button type="button" className="btn btn-navy btn-sm" onClick={() => setRun((n) => n + 1)}>
        Replay
      </button>
    </div>
  );
}
