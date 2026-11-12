'use client';

import { useEffect, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { SCALES, DIRECTION, HEX } from '@/lib/brand';
import s from './strategy.module.css';

// The attribute scales slide, rebuilt as reference m03: five rows of ten dots, one green dot per row, labels in
// caps left and right, the defined direction below. The dots lock in one by one when the slide comes into view.
const ROW_Y = [264, 357, 450, 543, 636];
const X0 = 410, STEP = 89.3;

export default function ScalesSlide() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setGo(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ink = '#22272B';
  return (
    <div ref={ref} className={`${s.slideSvg} ${go ? '' : s.hold}`}>
      <Art viewBox="0 0 1600 900" title="Attribute scales: five rows of ten dots, one green dot each" exportName="strategy-scales">
        <rect width="1600" height="900" fill={HEX.slide} />
        <g fontSize="13" fontWeight="700" fill={HEX.muted} lang="pt-BR">
          <text x="27" y="52">APRESENTAÇÃO DO</text>
          <text x="27" y="66">PROJETO DE IDENTIDADE VISUAL</text>
        </g>
        <g fontSize="13" fill={HEX.muted} lang="pt-BR">
          <text x="1075" y="52">CLIENTE: EDERSON DEVENS</text>
          <text x="1075" y="66">PROJETO: UPCANOPY</text>
          <text x="1334" y="52">JONAS NICACIO</text>
          <text x="1334" y="66">NICACIOBRANDS©</text>
          <text x="1573" y="52" textAnchor="end">→(26)</text>
        </g>
        {SCALES.map((sc, r) => (
          <g key={sc.left} lang="pt-BR">
            <text x="345" y={ROW_Y[r] + 6} textAnchor="end" fontSize="18" letterSpacing="0.8" fill={ink}>{sc.left}</text>
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} className="lock" style={{ '--i': r * 10 + i }} cx={X0 + i * STEP} cy={ROW_Y[r]} r="21" fill={i + 1 === sc.chosen ? HEX.green : ink} />
            ))}
            <text x="1278" y={ROW_Y[r] + 6} fontSize="18" letterSpacing="0.8" fill={ink}>{sc.right}</text>
          </g>
        ))}
        <g lang="pt-BR" fontWeight="700" fill={ink} fontSize="26">
          <text x="222" y="782">{DIRECTION.label}</text>
          <rect x="711" y="750" width="1.5" height="46" fill="#B7B9BA" />
          <text x="724" y="780">{DIRECTION.words.join(' • ')}</text>
        </g>
      </Art>
    </div>
  );
}
