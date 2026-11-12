// The case study's exhibition booth (m30) rebuilt as one SVG: dark hall, floor platform, navy panel with the frond
// (the portrait is not reproduced), Green Park wall with the large frond and the bridge line, navy side wall in
// perspective, counter, two chairs with a round table, two bar stools with a high table.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG, LockupStackG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { ShadowG } from '@/components/art/Mockup';
import { LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { C } from './parts';

const P = 'use-event-booth';
const range = (n) => Array.from({ length: n }, (_, i) => i);
const LIGHTS = [[185, 40, 24], [205, 57, 22], [595, 42, 24], [603, 58, 20], [1000, 45, 26], [1003, 62, 22], [1410, 47, 26], [1393, 62, 22],
  [325, 145, 18], [338, 154, 18], [640, 150, 18], [955, 150, 18], [1270, 150, 18], [1550, 150, 12], [10, 145, 16], [28, 153, 14], [160, 96, 16], [1190, 96, 16]];
const DARK = '#0E0E0F';

function Chair({ x, y, flip = false, k }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1.1 : 1.1} 1.1)`}>
      <ShadowG idp={`${P}-sc${k}`} cx={0} cy={2} rx={40} opacity={0.55} blur={5} />
      {[[-14, -36, -23, 0], [17, -36, 26, 0], [-24, -34, -34, -3], [4, -34, 10, -4]].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={DARK} strokeWidth="3.4" />
          <line x1={x1 - 0.8} y1={y1} x2={x2 - 0.8} y2={y2} stroke="#8A8F92" strokeWidth="0.8" opacity="0.5" />
        </g>
      ))}
      <path d="M-31 -92C-36 -62 -26 -40 -6 -40L28 -40C37 -50 35 -82 25 -97C8 -101 -14 -100 -31 -92Z" fill="#1F2022" />
      <path d="M-31 -92C-36 -62 -26 -40 -6 -40L28 -40C37 -50 35 -82 25 -97C8 -101 -14 -100 -31 -92Z" fill={`url(#${P}-chair)`} />
      <ellipse cx="-2" cy="-43" rx="31" ry="7" fill="#323437" />
      <path d="M-31 -92C-36 -62 -26 -40 -6 -40" fill="none" stroke="#8A8F92" strokeWidth="1.4" opacity="0.7" />
      <path d="M-30 -92C-14 -100 8 -101 25 -97" fill="none" stroke="#B4B8BA" strokeWidth="1" opacity="0.5" />
    </g>
  );
}

function Stool({ x, seat, floor, k }) {
  const h = floor - seat;
  return (
    <g transform={`translate(${x} 0)`}>
      <ShadowG idp={`${P}-ss${k}`} cx={0} cy={floor + 2} rx={32} opacity={0.55} blur={5} />
      {[[-17, seat + 4, -28, floor], [17, seat + 4, 30, floor], [-8, seat + 7, -14, floor - 5], [10, seat + 7, 17, floor - 5]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={DARK} strokeWidth="2.6" />
      ))}
      <ellipse cx="0" cy={seat + h * 0.62} rx={r2(14 + h * 0.07)} ry="3" fill="none" stroke={DARK} strokeWidth="2.2" />
      <ellipse cx="0" cy={seat + 4} rx="23" ry="7" fill="#101011" />
      <ellipse cx="0" cy={seat} rx="23" ry="7" fill="#26272A" />
      <ellipse cx="-4" cy={seat - 1} rx="15" ry="3.4" fill="#4A4C50" opacity="0.7" />
      <path d={`M-23 ${seat}A23 7 0 0 1 -6 ${seat - 6.5}`} fill="none" stroke="#B4B8BA" strokeWidth="1" opacity="0.6" />
    </g>
  );
}

function Table({ x, top, floor, rx, k }) {
  return (
    <g>
      <ShadowG idp={`${P}-st${k}`} cx={x} cy={floor + 2} rx={rx * 0.8} opacity={0.5} blur={5} />
      <rect x={x - 2} y={top} width="4" height={floor - top} fill="#17181A" />
      <rect x={x - 2} y={top} width="1.4" height={floor - top} fill="#8A8F92" opacity="0.5" />
      <ellipse cx={x} cy={floor} rx="22" ry="3.4" fill="#101011" />
      <ellipse cx={x - 3} cy={floor - 1} rx="12" ry="1.6" fill="#4A4C50" opacity="0.5" />
      <ellipse cx={x} cy={top + 2.5} rx={rx} ry="4.6" fill="#0C0C0D" />
      <ellipse cx={x} cy={top} rx={rx} ry="4.6" fill="#303236" />
      <ellipse cx={x - rx * 0.2} cy={top - 0.8} rx={rx * 0.6} ry="2" fill="#5E6165" opacity="0.7" />
      <path d={`M${x - rx} ${top}A${rx} 4.6 0 0 1 ${x - rx * 0.4} ${top - 4.2}`} fill="none" stroke="#C9CDCF" strokeWidth="1" opacity="0.7" />
    </g>
  );
}

export default function Booth() {
  return (
    <Art viewBox="0 0 1600 900" title="Exhibition booth" exportName="use-event-booth">
      <defs>
        <linearGradient id={`${P}-hall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020309" />
          <stop offset="0.6" stopColor="#070A18" />
          <stop offset="1" stopColor="#0C1445" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${P}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6F7473" />
          <stop offset="0.35" stopColor="#A5AAA9" />
          <stop offset="1" stopColor="#8E9392" />
        </linearGradient>
        <radialGradient id={`${P}-pool`} cx="0.5" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${P}-deck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F2022" />
          <stop offset="1" stopColor="#34353A" />
        </linearGradient>
        <linearGradient id={`${P}-walllit`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${P}-skirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${P}-chair`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A5D61" />
          <stop offset="0.5" stopColor="#1F2022" />
          <stop offset="1" stopColor="#0B0B0C" />
        </linearGradient>
        <linearGradient id={`${P}-navy`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B2C68" />
          <stop offset="1" stopColor="#12204D" />
        </linearGradient>
        <filter id={`${P}-glow`} x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id={`${P}-clip-navy`}><rect x="283" y="307" width="357" height="275" /></clipPath>
        <clipPath id={`${P}-clip-green`}><rect x="640" y="318" width="625" height="264" /></clipPath>
        <clipPath id={`${P}-clip-floor`}><rect x="0" y="657" width="1600" height="243" /></clipPath>
      </defs>

      {/* hall: ceiling truss, lights, floor */}
      <rect width="1600" height="900" fill={`url(#${P}-hall)`} />
      <g stroke="#1A2148" strokeWidth="2" fill="none" opacity="0.8">
        {[22, 70, 128, 190].map((y) => (
          <line key={y} x1="0" x2="1600" y1={y} y2={y} />
        ))}
        {range(14).map((i) => (
          <line key={i} x1={i * 125 - 40} y1="0" x2={i * 125 + 40} y2="190" />
        ))}
        {range(14).map((i) => (
          <line key={`b${i}`} x1={i * 125 + 60} y1="0" x2={i * 125 - 20} y2="190" />
        ))}
      </g>
      <g fill="#EAF0FF" filter={`url(#${P}-glow)`} opacity="0.8">
        {LIGHTS.map(([x, y, w]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="4" />)}
      </g>
      <g fill="#FFFFFF">
        {LIGHTS.map(([x, y, w]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="3" />)}
      </g>
      <rect y="657" width="1600" height="243" fill={`url(#${P}-floor)`} />
      <rect y="657" width="1600" height="243" fill={`url(#${P}-pool)`} />
      <g clipPath={`url(#${P}-clip-floor)`} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.1">
        {range(9).map((i) => (
          <line key={i} x1="800" y1="560" x2={-900 + i * 450} y2="900" />
        ))}
        <line x1="0" y1="745" x2="1600" y2="745" />
        <line x1="0" y1="850" x2="1600" y2="850" />
      </g>
      <rect y="657" width="1600" height="34" fill={`url(#${P}-skirt)`} opacity="0.7" />

      {/* platform: top surface and front lip */}
      <path d="M105 648L262 586H1480V648Z" fill={`url(#${P}-deck)`} />
      <path d="M262 586H1480" stroke="#4A4C52" strokeWidth="1.2" opacity="0.6" />
      <rect x="105" y="648" width="1375" height="9" fill="#08090B" />
      <rect x="105" y="648" width="1375" height="1.6" fill="#7A7C82" opacity="0.55" />
      <path d="M105 648L262 586L262 592L110 657Z" fill="#101113" />

      {/* navy panel with the frond (portrait not reproduced) */}
      <rect x="283" y="307" width="357" height="275" fill={`url(#${P}-navy)`} />
      <g clipPath={`url(#${P}-clip-navy)`}>
        <FrondG cx={470} cy={600} r={175} a0={188} a1={352} count={34} len={150} width={7} lean={62} tone="onNavy" opacity={0.95} />
        <WordmarkG x={296} y={331} size={12.5} fill="#FFFFFF" />
        <g fill="#FFFFFF" fontSize="13" fontWeight="300" lang="pt-BR">
          <text x="296" y="557">Deixe de ser {"'faz-tudo'"} e torne-se o <tspan fontWeight="700">CEO</tspan></text>
          <text x="296" y="573">da sua empresa de <tspan fontWeight="700">Hardscape</tspan></text>
        </g>
        <rect x="283" y="307" width="357" height="275" fill={`url(#${P}-walllit)`} />
      </g>
      <rect x="283" y="307" width="357" height="2" fill="#FFFFFF" opacity="0.25" />
      <rect x="636" y="307" width="4" height="275" fill="#000000" opacity="0.35" />

      {/* Green Park wall: dark mark, the large frond, the bridge line, panel seams */}
      <rect x="640" y="318" width="625" height="264" fill={C.green} />
      <g clipPath={`url(#${P}-clip-green)`}>
        <FrondG cx={980} cy={400} r={270} a0={232} a1={96} count={44} len={330} width={11} lean={-150} tone="onGreen" fan />
        <MarkG x={650} y={326} size={36} fill={C.dark} />
        <g fill={C.dark} fontSize="12.5" fontWeight="300" textAnchor="end" lang="pt-BR">
          {LINES.bridge.rows4.map((row, i) => (
            <text key={row} x="1253" y={338 + i * 15} fontWeight={i === 3 ? 700 : 300}>{row}</text>
          ))}
        </g>
        {[848, 950, 1055, 1160].map((x) => (
          <g key={x}>
            <line x1={x} x2={x} y1="318" y2="582" stroke={C.dark} strokeWidth="1.3" opacity="0.28" />
            <line x1={x + 1.6} x2={x + 1.6} y1="318" y2="582" stroke="#FFFFFF" strokeWidth="1" opacity="0.14" />
          </g>
        ))}
        <rect x="640" y="318" width="625" height="264" fill={`url(#${P}-walllit)`} />
      </g>
      <rect x="283" y="580" width="982" height="4" fill="#C9CDCF" opacity="0.8" />
      <rect x="283" y="584" width="982" height="2" fill="#000000" opacity="0.45" />

      {/* navy side wall in perspective with the stacked lockup */}
      <path d="M1263 318L1480 257V650L1263 590Z" fill={C.navy} />
      <path d="M1263 318L1480 257V650L1263 590Z" fill={`url(#${P}-walllit)`} />
      <g transform="matrix(0.82 -0.23 0 1 1263 318)">
        <LockupStackG x={60} y={112} scale={0.2} fill="#FFFFFF" markFill={C.green} />
      </g>
      <path d="M1263 318L1480 257" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
      <path d="M1263 318V590" stroke="#000000" strokeWidth="3" opacity="0.4" />

      {/* furniture: chairs and round table */}
      <Chair x={468} y={618} k="1" />
      <Table x={554} top={537} floor={618} rx={54} k="1" />
      <Chair x={642} y={614} flip k="2" />

      {/* counter */}
      <ShadowG idp={`${P}-sk`} cx={1090} cy={638} rx={100} opacity={0.55} blur={6} />
      <rect x="1008" y="498" width="157" height="139" fill={C.navy} />
      <rect x="1008" y="498" width="157" height="139" fill={`url(#${P}-walllit)`} />
      <rect x="1008" y="494" width="157" height="5" fill="#2A3A78" />
      <rect x="1008" y="494" width="157" height="1.4" fill="#FFFFFF" opacity="0.5" />
      <rect x="1008" y="498" width="1.8" height="139" fill="#FFFFFF" opacity="0.25" />
      <rect x="1008" y="629" width="157" height="8" fill={C.asphalt} />
      <rect x="1008" y="629" width="157" height="1.2" fill="#7A7C82" opacity="0.6" />
      <LockupG x={1038} y={559} scale={0.25} fill="#FFFFFF" markFill={C.green} />

      {/* high table and stools */}
      <Stool x={1228} seat={506} floor={608} k="1" />
      <Table x={1277} top={489} floor={612} rx={44} k="2" />
      <Stool x={1312} seat={515} floor={628} k="2" />
    </Art>
  );
}
