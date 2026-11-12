// Feather flags on curved poles with cross bases, and the hanging banner.
import { MarkG, WordmarkVerticalG, LockupStackG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { ShadowG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { C, Stage, Cast } from './parts';

export const FLAGS = [
  { name: 'flag-navy', title: 'Feather flag, navy', fill: C.navy, ink: '#FFFFFF', mark: C.green, h: 430, tone: 'onNavy' },
  { name: 'flag-green', title: 'Feather flag, Green Park', fill: C.green, ink: C.navy, mark: C.navy, h: 340, tone: 'onGreen' },
  { name: 'flag-dark', title: 'Feather flag, dark green', fill: C.dark, ink: C.mint, mark: C.green, h: 270, tone: 'onDark' },
];

const FW = 150;

// The flag in its own space: base of the cross at (0,0), pole rising along -y, fabric to the right.
function Flag({ idp, id, def, h = def.h }) {
  const top = h, bot = 66, f = top - bot;
  const fabric = `M6 ${-top + 4}C${FW * 0.85} ${-top - 10} ${FW * 1.16} ${r2(-top + f * 0.46)} ${FW * 0.46} ${-bot}L6 ${-bot}Z`;
  const pole = `M0 0V${-h - 8}C0 ${-h - 38} 14 ${-h - 52} 46 ${-h - 48}`;
  const mid = r2(-top + f * 0.4);
  return (
    <g>
      <ShadowG idp={`${id}-s`} cx={14} cy={10} rx={96} opacity={0.3} />
      {/* cross base: two flat bars, rubber feet, collar */}
      <g>
        <path d="M-86 4L88 -9L92 -3L-82 11Z" fill={`url(#${idp}-metal-dark)`} />
        <path d="M-80 -10L82 10L77 16L-85 -4Z" fill={`url(#${idp}-metal-dark)`} />
        <path d="M-86 4L88 -9" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
        {[[-86, 7], [90, -6], [-83, -7], [80, 13]].map(([x, y]) => (
          <ellipse key={x + ':' + y} cx={x} cy={y} rx="5" ry="3" fill="#0E0E0D" />
        ))}
        <rect x="-8" y="-14" width="16" height="22" rx="4" fill={`url(#${idp}-metal-dark)`} />
        <rect x="-8" y="-14" width="16" height="22" rx="4" fill={`url(#${idp}-shade)`} />
      </g>
      <path d={pole} fill="none" stroke={`url(#${idp}-metal-dark)`} strokeWidth="7" strokeLinecap="butt" />
      <path d={pole} fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.4" transform="translate(-1.8 0)" />
      {/* fabric */}
      <Cast d={fabric} depth={12} opacity={0.2} />
      <clipPath id={`${id}-clip`}>
        <path d={fabric} />
      </clipPath>
      <g filter={`url(#${idp}-fabric)`}>
        <path d={fabric} fill={def.fill} />
      </g>
      <g clipPath={`url(#${id}-clip)`}>
        <FrondG cx={FW * 0.9} cy={-bot + 10} r={FW * 0.9} a0={200} a1={290} count={18} len={90} width={5} lean={62} tone={def.tone} opacity={0.5} />
        <MarkG x={FW * 0.34} y={mid - 30} size={54} fill={def.mark} />
        <WordmarkVerticalG x={14} y={-bot - 14} size={r2(f * 0.115)} fill={def.ink} />
        <rect x="6" y={-top} width="12" height={f + 8} fill="#000000" opacity="0.22" />
        <line x1="19" x2="19" y1={-top} y2={-bot} stroke={def.ink} strokeWidth="1.1" strokeDasharray="5 4" opacity="0.5" />
        <path d={`M40 ${-top}C70 ${mid} 66 ${-bot - 60} 52 ${-bot}`} fill="none" stroke="#000000" strokeWidth="14" opacity="0.1" />
        <path d={`M92 ${-top + 30}C122 ${mid} 112 ${-bot - 40} 84 ${-bot}`} fill="none" stroke="#FFFFFF" strokeWidth="10" opacity="0.08" />
        <rect x="0" y={-top - 10} width={FW * 1.2} height={f + 20} fill={`url(#${idp}-shade)`} />
      </g>
      <path d={fabric} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
      {/* two ties where the sleeve meets the pole */}
      {[-top + 40, -bot - 30].map((y) => (
        <rect key={y} x="-3" y={y} width="12" height="5" rx="1.5" fill={`url(#${idp}-metal)`} />
      ))}
    </g>
  );
}

export function FeatherFlag({ index }) {
  const def = FLAGS[index];
  const idp = `use-event-${def.name}`;
  return (
    <Stage name={def.name} title={def.title}>
      <g transform={`translate(${250 + index * 20} 408)`}>
        <g className="mock-step" style={{ '--i': 0 }}>
          <Flag idp={idp} id={`${idp}-f`} def={def} />
        </g>
      </g>
    </Stage>
  );
}

export function FlagLineup() {
  const idp = 'use-event-flags-lineup';
  const spots = [
    { x: 800, y: 412, k: 0 },
    { x: 560, y: 398, k: 1 },
    { x: 350, y: 384, k: 2 },
  ];
  return (
    <Stage name="flags-lineup" title="Three feather flags stepping left" w={1000} h={450} horizon={0.68}>
      {spots.map((s, i) => (
        <g key={s.k} transform={`translate(${s.x} ${s.y})`}>
          <g className="mock-step" style={{ '--i': i }}>
            <Flag idp={idp} id={`${idp}-f${s.k}`} def={FLAGS[s.k]} />
          </g>
        </g>
      ))}
    </Stage>
  );
}

// Hanging banner: rails, eyelets, cables to the top edge.
function Banner({ idp, id, w, h, fill, children, grain = true }) {
  const d = `M0 0H${w}V${h}H0Z`;
  return (
    <g>
      <Cast d={d} depth={16} opacity={0.2} />
      <clipPath id={`${id}-clip`}>
        <rect width={w} height={h} />
      </clipPath>
      <g filter={grain ? `url(#${idp}-b-grain)` : undefined}>
        <rect width={w} height={h} fill={fill} />
      </g>
      <g clipPath={`url(#${id}-clip)`}>
        {children}
        <rect width={w} height={h} fill={`url(#${idp}-shade)`} />
        <path d={`M${w * 0.3} 0C${w * 0.36} ${h * 0.4} ${w * 0.28} ${h * 0.7} ${w * 0.34} ${h}`} fill="none" stroke="#000000" strokeWidth="18" opacity="0.07" />
        <path d={`M${w * 0.72} 0C${w * 0.66} ${h * 0.4} ${w * 0.74} ${h * 0.7} ${w * 0.68} ${h}`} fill="none" stroke="#FFFFFF" strokeWidth="14" opacity="0.07" />
      </g>
      <rect x="-5" y="-9" width={w + 10} height="13" rx="3" fill={`url(#${idp}-metal)`} />
      <rect x="-5" y="-9" width={w + 10} height="13" rx="3" fill={`url(#${idp}-shade-v)`} />
      <rect x="-5" y={h - 4} width={w + 10} height="13" rx="3" fill={`url(#${idp}-metal-dark)`} />
      {[10, w - 10].map((x) => (
        <g key={x}>
          <circle cx={x} cy="12" r="5.5" fill="#0E0E0D" opacity="0.55" />
          <circle cx={x} cy="12" r="5.5" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="2.4" />
          <line x1={x} y1="-6" x2={w / 2} y2={-h * 0.45} stroke="#8D9491" strokeWidth="2" />
          <line x1={x - 0.8} y1="-6" x2={w / 2 - 0.8} y2={-h * 0.45} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
        </g>
      ))}
      <circle cx={w / 2} cy={-h * 0.45 + 2} r="6" fill="none" stroke={`url(#${idp}-metal-dark)`} strokeWidth="3" />
    </g>
  );
}

export function HangingBanner() {
  const idp = 'use-event-banner';
  const back = <FrondG cx={230} cy={470} r={200} a0={205} a1={335} count={26} len={150} width={7} lean={62} tone="onGreen" opacity={0.5} />;
  return (
    <Stage name="banner" title="Hanging banner with the stacked lockup" horizon={0.75}>
      <g transform="translate(420 118)">
        <g className="mock-step" style={{ '--i': 0 }}>
          <Banner idp={idp} id={`${idp}-b2`} w={200} h={300} fill={C.dark} grain={false}>
            <MarkG x={62} y={92} size={80} fill={C.green} />
          </Banner>
        </g>
      </g>
      <g transform="translate(150 100)">
        <g className="mock-step" style={{ '--i': 1 }}>
          <Banner idp={idp} id={`${idp}-b1`} w={240} h={400} fill={`url(#${idp}-b-rise)`}>
            <g transform="translate(-60 -40)">{back}</g>
            <LockupStackG x={42} y={150} scale={0.34} fill="#FFFFFF" markFill="#FFFFFF" />
          </Banner>
        </g>
      </g>
    </Stage>
  );
}
