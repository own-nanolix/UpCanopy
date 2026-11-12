import Art from '@/components/art/Art';
import { LockupG, MarkG } from '@/components/art/Mark';
import { FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { ScreenHomeG } from '@/components/art/Devices';
import { CONTACT, DOCUMENT, LINES, MODES, SCALES } from '@/lib/brand';
import { DAYS } from './data';
import s from './mobile-a.module.css';

// Exportable artwork of the app: each one is a finished 390 x 844 screen drawn as a single SVG.
const NAVY = '#162557', GREEN = '#26CF7B', MINT = '#F2FFE4', DARK = '#052E25';
const Ph = ({ x, y, w, h = 10, fill = NAVY, o = 0.16 }) => <rect x={x} y={y} width={w} height={h} fill={fill} opacity={o} />;
const Caps = ({ x, y, size = 11, fill = NAVY, anchor = 'start', children }) => (
  <text x={x} y={y} fontSize={size} fontWeight="500" letterSpacing={size * 0.08} textAnchor={anchor} fill={fill} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{children}</text>
);

function BrandScreen() {
  const [a, b] = LINES.control.split('. ');
  return (
    <Art viewBox="0 0 390 844" title="Brand screen" exportName="mobile-a-brand-screen">
      <rect width="390" height="844" fill={DARK} />
      <FrondG cx={420} cy={900} r={300} a0={180} a1={275} count={32} len={230} width={8} lean={-62} tone="onDark" opacity={0.42} fan />
      <MarkG x={28} y={84} size={40} fill={GREEN} />
      <text fontSize="32" fontWeight="300" fill={MINT} lang="pt-BR">
        <tspan x="28" y="198">{a}.</tspan>
        <tspan x="28" y="236" fontWeight="700" fill={GREEN}>{b}</tspan>
      </text>
      {SCALES.map((sc, i) => (
        <g key={sc.left} lang="pt-BR">
          <Caps x={24} y={352 + i * 70} size={10} fill={MINT}>{sc.left}</Caps>
          <Caps x={366} y={352 + i * 70} size={10} fill={MINT} anchor="end">{sc.right}</Caps>
          <ScaleDotsG x={33} y={374 + i * 70} w={324} r={7} chosen={sc.chosen} off="#2F5E50" lock />
        </g>
      ))}
      <text x="28" y="790" fontSize="22" fontWeight="300" fill={MINT} lang="pt-BR">Organização que gera crescimento</text>
    </Art>
  );
}

function InvoiceScreen() {
  const [bank, detail, total] = DOCUMENT.invoice;
  return (
    <Art viewBox="0 0 390 844" title="Invoice screen" exportName="mobile-a-invoice-sheet">
      <rect width="390" height="844" fill={MINT} />
      <rect x="26" y="72" width="350" height="710" fill={NAVY} />
      <rect x="20" y="66" width="350" height="710" fill="#FFFFFF" />
      <rect x="20" y="66" width="350" height="6" fill={NAVY} />
      <LockupG x={42} y={100} scale={0.5} fill={NAVY} markFill={GREEN} />
      <Caps x={348} y={124} anchor="end" fill="#4A5568" size={10}>Invoice</Caps>
      <Caps x={42} y={200}>{bank}</Caps>
      <Ph x={42} y={214} w={210} h={16} />
      <Caps x={42} y={282}>{detail}</Caps>
      {[0, 1, 2].map((i) => <Ph key={i} x={42} y={296 + i * 20} w={280 - i * 60} />)}
      <rect x="42" y="384" width="306" height="2" fill={NAVY} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Ph x={42} y={400 + i * 38} w={110 - i * 8} />
          <Ph x={236} y={400 + i * 38} w={34} />
          <Ph x={296} y={400 + i * 38} w={52} />
          <rect x="42" y={426 + i * 38} width="306" height="2" fill={NAVY} opacity="0.14" />
        </g>
      ))}
      <rect x="42" y="570" width="306" height="2" fill={NAVY} />
      <Caps x={42} y={612} size={14}>{total}</Caps>
      <Ph x={228} y={594} w={120} h={30} />
      <rect x="42" y="640" width="306" height="6" fill={NAVY} />
      <rect x="42" y="716" width="214" height="2" fill={NAVY} />
      <Caps x={42} y={738}>{DOCUMENT.labels[3]}</Caps>
      <Caps x={195} y={812} anchor="middle" fill="#4A5568" size={10}>{CONTACT.footer}</Caps>
    </Art>
  );
}

function LedgerScreen() {
  const ticked = 3;
  return (
    <Art viewBox="0 0 390 844" title="Financeiro ledger screen" exportName="mobile-a-ledger-screen">
      <rect width="390" height="844" fill="#FFFFFF" />
      <text x="24" y="100" fontSize="38" fontWeight="500" letterSpacing="-2.6" fill={NAVY} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>Financeiro</text>
      <rect y="120" width="390" height="22" fill={NAVY} />
      <rect y="120" width={(390 * ticked) / 9} height="22" fill={GREEN} className="grow-x" />
      {Array.from({ length: 9 }, (_, i) => (
        // the animation class sits on an inner group: its CSS transform would override the translate attribute
        <g key={i} transform={`translate(24 ${160 + i * 54})`}>
          <g className="slide-up" style={{ '--i': i }}>
          <rect x="1" y="12" width="26" height="26" fill={i < ticked ? GREEN : '#FFFFFF'} stroke={NAVY} strokeWidth="2" />
          {i < ticked && <path d="M7 25l5 5 10-11" fill="none" stroke={NAVY} strokeWidth="2" />}
          <Ph x={42} y={14} w={140 - (i % 4) * 18} h={12} />
          <Ph x={42} y={32} w={70 + (i % 3) * 20} h={7} />
          <Ph x={290 - (i % 2) * 12} y={16} w={52 + (i % 2) * 12} h={14} />
          <rect y="52" width="342" height="2" fill={NAVY} opacity="0.14" />
          </g>
        </g>
      ))}
      <rect y="694" width="390" height="74" fill={NAVY} />
      <Caps x={24} y={737} size={15} fill="#FFFFFF">Total</Caps>
      <Ph x={256} y={720} w={110} h={22} fill="#FFFFFF" o={0.22} />
    </Art>
  );
}

function WeekScreen() {
  const blocks = [[0, 1, 2], [1, 3, 1], [2, 0, 2], [2, 4, 1], [3, 2, 3], [4, 1, 1], [4, 5, 2], [5, 6, 1], [6, 3, 2]];
  return (
    <Art viewBox="0 0 390 844" title="Agenda week screen" exportName="mobile-a-week-screen">
      <rect width="390" height="844" fill={MINT} />
      <text x="24" y="98" fontSize="38" fontWeight="500" letterSpacing="-2.6" fill={NAVY} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>Agenda</text>
      {DAYS.map((d, i) => (
        <g key={d} transform={`translate(${46 + i * 43} 118)`}>
          {i === 2 && <rect width="43" height="62" fill={GREEN} />}
          <rect y={i === 2 ? 56 : 60} width="43" height={i === 2 ? 6 : 2} fill={NAVY} />
          <Caps x={21.5} y={30} size={9} anchor="middle">{d.toUpperCase()}</Caps>
          <Ph x={14} y={40} w={14} h={6} />
        </g>
      ))}
      <rect x="132" y="196" width="43" height="500" fill={GREEN} opacity="0.2" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect x="46" y={196 + i * 50} width="330" height="1" fill={NAVY} opacity="0.14" />
          <Caps x={12} y={199 + i * 50} size={9} fill="#4A5568">{String(8 + i).padStart(2, '0')}</Caps>
        </g>
      ))}
      {blocks.map(([d, st, len], i) => (
        <g key={i} className="rise" style={{ '--i': i }}>
          <rect x={48 + d * 43} y={199 + st * 50} width="39" height={len * 50 - 6} fill={i === 4 ? NAVY : 'rgba(22,37,87,0.18)'} />
          <rect x={48 + d * 43} y={199 + st * 50} width="4" height={len * 50 - 6} fill={i === 4 ? GREEN : NAVY} />
        </g>
      ))}
      <rect y="768" width="390" height="76" fill={NAVY} />
    </Art>
  );
}

function ModesScreen() {
  const tones = [NAVY, '#FFFFFF', MINT, DARK, '#DADADA', '#FFFFFF'];
  return (
    <Art viewBox="0 0 390 844" title="Modes screen" exportName="mobile-a-modes-screen">
      <rect width="390" height="844" fill={GREEN} />
      <text x="24" y="116" fontSize="38" fontWeight="300" fill={NAVY} lang="pt-BR">Nós elevamos o <tspan fontWeight="700">nível.</tspan></text>
      <rect x="25" y="191" width="340" height="82" fill="none" stroke={NAVY} strokeWidth="2" />
      <rect x="196" y="190" width="170" height="84" fill={NAVY} className="slide-up" />
      <g lang="pt-BR">
        <Caps x={110} y={236} size={13} anchor="middle">{MODES[0].toUpperCase()}</Caps>
        <Caps x={281} y={236} size={13} anchor="middle" fill="#FFFFFF">{MODES[1].toUpperCase()}</Caps>
      </g>
      {tones.map((t, i) => {
        const x = 24 + (i % 2) * 182, y = 310 + Math.floor(i / 2) * 120;
        const ink = t === NAVY || t === DARK ? '#FFFFFF' : NAVY;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="slide-up" style={{ '--i': i }}>
              <rect x="4" y="4" width="160" height="100" fill={NAVY} opacity="0.28" />
              <rect width="160" height="100" fill={t} />
              <Ph x={14} y={16} w={70} fill={ink} />
              <Ph x={14} y={44} w={104} h={7} fill={ink} />
              <Ph x={14} y={62} w={48} h={7} fill={ink} />
            </g>
          </g>
        );
      })}
    </Art>
  );
}

export default function Artwork() {
  const plates = [
    { title: 'Home', node: <Art viewBox="0 0 390 844" title="Home screen" exportName="mobile-a-home-screen"><ScreenHomeG idp="mobile-a-art-home" /></Art> },
    { title: 'Week', node: <WeekScreen /> },
    { title: 'Ledger', node: <LedgerScreen /> },
    { title: 'Invoice', node: <InvoiceScreen /> },
    { title: 'Modes', node: <ModesScreen /> },
    { title: 'Brand', node: <BrandScreen /> },
  ];
  return (
    <div className={s.plates}>
      {plates.map((p) => (
        <figure key={p.title} className={s.plate}>
          {p.node}
          <figcaption className="t-label">{p.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
