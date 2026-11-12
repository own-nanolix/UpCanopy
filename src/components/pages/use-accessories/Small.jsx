// Small goods: sticker sheets, the pin card, embroidered patches and the acrylic keychain.
import { FrondG, ScaleDotsG, ArrowG } from '@/components/art/KeyArt';
import { MarkG, LockupG, LockupStackG, DescriptorG } from '@/components/art/Mark';
import { StepG } from '@/components/art/Mockup';
import { C, Scene, Cast, rectD } from './parts';

/* ---------- stickers ---------- */
// One die-cut sticker: a white border, a hairline shadow, then the printed shape. kind decides the shape.
function Sticker({ s, ids, i }) {
  const clip = `${ids.p}-stk-${i}`;
  const { x, y } = s;
  if (s.kind === 'disc') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r={s.r + 7} cy="2.5" fill={C.dark} opacity="0.2" />
        <circle r={s.r + 7} fill="#FFFFFF" />
        <circle r={s.r} fill={s.bg} />
        <MarkG x={-s.r * 0.55} y={-s.r * 0.55} size={s.r * 1.1} fill={s.fg} />
        <circle r={s.r} fill={`url(#${ids.m}-glass)`} opacity="0.6" />
      </g>
    );
  }
  const { w, h } = s;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={clip}><path d={rectD(0, 0, w, h)} /></clipPath>
      <path d={rectD(-6, -6, w + 12, h + 12)} fill={C.dark} opacity="0.2" transform="translate(0 2.5)" />
      <path d={rectD(-6, -6, w + 12, h + 12)} fill="#FFFFFF" />
      <path d={rectD(0, 0, w, h)} fill={s.bg} />
      <g clipPath={`url(#${clip})`}>
        {s.kind === 'lock' && <LockupG x={w * 0.07} y={(h - 60 * (w * 0.86) / 400) / 2} scale={(w * 0.86) / 400} fill={s.fg} markFill={s.mk} />}
        {/* sized to sit inside the sticker with a margin (the descriptor runs about 14.5 x its size) */}
        {s.kind === 'desc' && <DescriptorG x={w / 2} y={h / 2 + w / 50} size={w / 17} fill={s.fg} anchor="middle" />}
        {s.kind === 'home' && (
          <g>
            <text x={w * 0.13} y={h / 2 + 8} fontSize={h * 0.4} fontWeight="700" fill={s.fg} letterSpacing="2" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>HOME</text>
            <ArrowG x={w * 0.74} y={h / 2 - h * 0.14} size={h * 0.28} stroke={s.fg} strokeWidth={4} />
          </g>
        )}
        {s.kind === 'frond' && <FrondG cx={w * 0.2} cy={h * 1.1} r={h * 0.9} a0={250} a1={350} count={22} len={h * 0.7} width={3.4} lean={-8} tone="onGreen" />}
        {s.kind === 'dots' && <ScaleDotsG x={w * 0.09} y={h / 2} w={w * 0.82} r={h * 0.13} chosen={s.chosen} off={s.off} on={s.on} />}
        {s.kind === 'stack' && (() => {
          // fit the 480 x 230 stacked lockup inside the sticker with a margin
          const sc = Math.min(h / 280, (w * 0.7) / 480);
          return <LockupStackG x={w * 0.5 - 240 * sc} y={(h - 230 * sc) / 2} scale={sc} fill={s.fg} markFill={s.mk} />;
        })()}
      </g>
      <path d={rectD(0, 0, w, h)} fill={`url(#${ids.m}-glass)`} opacity="0.5" />
    </g>
  );
}

const SHEETS = [
  [
    { kind: 'disc', x: 70, y: 70, r: 44, bg: C.navy, fg: C.green },
    { kind: 'disc', x: 176, y: 70, r: 44, bg: C.green, fg: C.navy },
    { kind: 'lock', x: 20, y: 134, w: 222, h: 42, bg: C.navy, fg: '#FFFFFF', mk: C.green },
    { kind: 'desc', x: 20, y: 200, w: 112, h: 30, bg: C.green, fg: C.navy },
    { kind: 'home', x: 20, y: 252, w: 112, h: 38, bg: C.navy, fg: C.green },
    { kind: 'dots', x: 20, y: 308, w: 112, h: 30, bg: C.mint, off: C.navy, on: C.green, chosen: 8 },
  ],
  [
    { kind: 'frond', x: 20, y: 20, w: 112, h: 112, bg: C.green },
    { kind: 'disc', x: 190, y: 76, r: 44, bg: C.mint, fg: C.navy },
    { kind: 'stack', x: 20, y: 160, w: 112, h: 90, bg: C.navy, fg: '#FFFFFF', mk: C.green },
    { kind: 'lock', x: 20, y: 280, w: 222, h: 42, bg: C.mint, fg: C.navy, mk: C.navy },
  ],
  [
    { kind: 'disc', x: 70, y: 70, r: 44, bg: C.dark, fg: C.green },
    { kind: 'disc', x: 176, y: 70, r: 44, bg: C.navy, fg: '#FFFFFF' },
    { kind: 'home', x: 20, y: 140, w: 130, h: 44, bg: C.green, fg: C.navy },
    { kind: 'dots', x: 20, y: 206, w: 222, h: 40, bg: C.navy, off: '#6F78B8', on: C.green, chosen: 5 },
    { kind: 'desc', x: 20, y: 270, w: 222, h: 32, bg: C.mint, fg: C.navy },
  ],
];

function Sheet({ ids, n, x, y, rot, bg }) {
  const w = 262, h = 350;
  const d = rectD(0, 0, w, h);
  return (
    <StepG i={n} x={x} y={y} rotate={rot}>
      <g transform="scale(0.9)">
      <Cast d={d} rot={rot} depth={16} />
      <path d={d} fill={bg} filter={`url(#${ids.m}-paper)`} />
      <path d={rectD(8, 8, w - 16, h - 16)} fill="none" stroke={C.navy} strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="5 4" />
      {SHEETS[n].map((s, i) => <Sticker key={i} s={s} ids={ids} i={`${n}-${i}`} />)}
      <path d={d} fill={`url(#${ids.m}-shade)`} opacity="0.55" />
      <path d={rectD(0, 0, w, 1.5)} fill="#fff" opacity="0.8" />
      </g>
    </StepG>
  );
}

export function StickerSheets() {
  return (
    <Scene k="stickers" title="Three sticker sheets fanned along the diagonal, with the mark, lockups and descriptor" size="narrow">
      {(ids) => (
        <>
          <Sheet ids={ids} n={0} x={16} y={40} rot={-9} bg="#FFFFFF" />
          <Sheet ids={ids} n={1} x={150} y={190} rot={-1} bg="#F7FFF0" />
          <Sheet ids={ids} n={2} x={260} y={330} rot={8} bg="#FFFFFF" />
        </>
      )}
    </Scene>
  );
}

/* ---------- pin card ---------- */
function Pin({ ids, x, y, r = 34, shape = 'round', field, fg }) {
  const sq = shape === 'square';
  const d = sq ? rectD(-r, -r, 2 * r, 2 * r) : `M${-r} 0A${r} ${r} 0 1 0 ${r} 0A${r} ${r} 0 1 0 ${-r} 0Z`;
  const inner = sq ? rectD(-r + 5, -r + 5, 2 * r - 10, 2 * r - 10) : `M${-r + 5} 0A${r - 5} ${r - 5} 0 1 0 ${r - 5} 0A${r - 5} ${r - 5} 0 1 0 ${-r + 5} 0Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={d} transform="translate(4 5)" fill={C.dark} opacity="0.3" />
      <path d={d} fill={`url(#${ids.m}-metal)`} />
      <path d={inner} fill={field} />
      <path d={inner} fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="1.3" />
      <MarkG x={-r * 0.5} y={-r * 0.5} size={r} fill={fg} />
      <path d={inner} fill={`url(#${ids.m}-glass)`} />
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.3" />
    </g>
  );
}

function PinCard({ ids, i, x, y, rot, bg, fg, mk, pins }) {
  const w = 300, h = 400, d = rectD(0, 0, w, h);
  return (
    <StepG i={i} x={x} y={y} rotate={rot}>
      <Cast d={d} rot={rot} depth={20} />
      <path d={rectD(0, 0, w, h)} fill={bg} transform="translate(3 4)" opacity="0.5" />
      <path d={d} fill={bg} filter={`url(#${ids.m}-paper)`} />
      <rect x="132" y="18" width="36" height="9" fill="#000" opacity="0.18" />
      <LockupStackG x={w / 2 - 240 * 0.46} y={52} scale={0.46} fill={fg} markFill={mk} />
      {pins.map((pn, k) => <Pin key={k} ids={ids} x={78 + (k % 2) * 144} y={238 + Math.floor(k / 2) * 84} {...pn} />)}
      <path d={d} fill={`url(#${ids.m}-shade)`} opacity="0.5" />
      <path d={rectD(0, 0, w, 1.6)} fill="#fff" opacity="0.7" />
      <path d={`M${w} 0V${h}`} stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
    </StepG>
  );
}

export function PinCards() {
  return (
    <Scene k="pin-card" title="Two pin cards with enamel pins of the mark" size="wide">
      {(ids) => (
        <>
          <PinCard ids={ids} i={0} x={150} y={70} rot={-7} bg={C.navy} fg="#FFFFFF" mk={C.green}
            pins={[{ shape: 'round', field: C.green, fg: C.navy }, { shape: 'square', field: C.navy, fg: C.green }, { shape: 'square', field: C.mint, fg: C.navy }, { shape: 'round', field: C.deep, fg: C.green }]} />
          <PinCard ids={ids} i={1} x={560} y={130} rot={5} bg={C.mint} fg={C.navy} mk={C.navy}
            pins={[{ shape: 'round', field: C.navy, fg: C.green }, { shape: 'round', field: C.green, fg: C.dark }, { shape: 'square', field: C.green, fg: C.navy }, { shape: 'square', field: C.dark, fg: C.green }]} />
          <StepG i={2} x={880} y={470}><Pin ids={ids} x={0} y={0} r={46} field={C.navy} fg={C.green} /></StepG>
        </>
      )}
    </Scene>
  );
}

/* ---------- patches ---------- */
const PATCHES = [
  { w: 150, h: 150, field: C.navy, rim: C.green, art: (w, h) => <MarkG x={w / 2 - 38} y={h / 2 - 38} size={76} fill={C.green} /> },
  { w: 150, h: 150, field: C.green, rim: C.navy, round: true, art: (w, h) => <MarkG x={w / 2 - 38} y={h / 2 - 38} size={76} fill={C.navy} /> },
  // the two text patches are sized to sit inside the embroidered border (inner field = w - 24) with a margin
  { w: 132, h: 172, field: C.mint, rim: C.navy, art: (w, h) => <LockupStackG x={w / 2 - 240 * 0.198} y={h / 2 - 115 * 0.198} scale={0.198} fill={C.navy} markFill={C.navy} /> },
  { w: 178, h: 74, field: C.navy, rim: C.green, art: (w, h) => <DescriptorG x={w / 2} y={h / 2 + 3.5} size={9.1} fill="#FFFFFF" anchor="middle" /> },
];

function Patch({ ids, n, x, y, rot, id }) {
  const { w, h, field, rim, round, art } = PATCHES[n];
  const outer = round ? `M0 ${h / 2}A${w / 2} ${h / 2} 0 1 0 ${w} ${h / 2}A${w / 2} ${h / 2} 0 1 0 0 ${h / 2}Z` : rectD(0, 0, w, h);
  const inset = (k) => (round ? `M${k} ${h / 2}A${w / 2 - k} ${h / 2 - k} 0 1 0 ${w - k} ${h / 2}A${w / 2 - k} ${h / 2 - k} 0 1 0 ${k} ${h / 2}Z` : rectD(k, k, w - 2 * k, h - 2 * k));
  const clip = `${ids.p}-pclip-${id}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1.28) translate(${-w / 2} ${-h / 2})`}>
      <clipPath id={clip}><path d={inset(5)} /></clipPath>
      <Cast d={outer} rot={rot} depth={16} />
      <path d={outer} transform="translate(2 4)" fill={C.ink} opacity="0.55" />
      <g filter={`url(#${ids.m}-fabric)`}>
        <path d={outer} fill={rim} />
        <path d={inset(12)} fill={field} />
        <path d={inset(12)} fill={`url(#${ids.p}-twill)`} />
        <g clipPath={`url(#${clip})`}><g opacity="0.97">{art(w, h)}</g></g>
      </g>
      <path d={inset(6.5)} fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="9" strokeDasharray="1.3 1.7" />
      <path d={inset(6.5)} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="9" strokeDasharray="1 2.6" strokeDashoffset="1" />
      <path d={inset(12)} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d={inset(1.2)} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
      <path d={outer} fill={`url(#${ids.m}-shade)`} />
    </g>
  );
}

export function PatchScene({ n }) {
  const slots = [[-1, 38, 36, -4], [0, 200, 200, 3], [1, 372, 372, -3]];
  return (
    <Scene k={`patch-${n + 1}`} title={['Embroidered patch with the mark on navy', 'Round embroidered patch with the mark on Green Park', 'Embroidered patch with the stacked lockup', 'Embroidered patch with the descriptor'][n]} size="small">
      {(ids) => (
        <>
          <defs>
            <pattern id={`${ids.p}-twill`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="2" height="4" fill="#fff" opacity="0.13" />
            </pattern>
          </defs>
          {slots.slice().reverse().map(([o, x, y, rot], k) => (
            <StepG key={o} i={2 - k} x={0} y={0}><Patch ids={ids} id={String(o)} n={(n + o + 4) % 4} x={x} y={y} rot={rot} /></StepG>
          ))}
        </>
      )}
    </Scene>
  );
}

/* ---------- keychain ---------- */
export function Keychain() {
  const layers = [4.4, 3.3, 2.2, 1.1];
  return (
    <Scene k="keychain" title="Keychain with the mark cut from thick Green Park acrylic on a black metal clip" size="small">
      {(ids) => (
        <StepG i={0} x={210} y={258}>
          <g transform="rotate(16) scale(1.05)">
            <g transform="translate(18 20)" opacity="0.22"><MarkG x={-75} y={-75} size={150} fill={C.dark} /></g>
            {/* chain and ring, through the hole in the arch */}
            <circle cx="0" cy="-66" r="18" fill="none" stroke="#6C716E" strokeWidth="4" />
            <ellipse cx="0" cy="-102" rx="7" ry="22" fill="none" stroke="#9DA3A0" strokeWidth="3.4" />
            {/* black metal clip */}
            <g transform="translate(0 -257)">
              <path d="M-14 0A14 14 0 0 1 14 0V20H-14Z" fill={`url(#${ids.m}-metal-dark)`} />
              <rect x="-16" y="18" width="32" height="62" fill={`url(#${ids.m}-metal-dark)`} />
              <rect x="-6" y="30" width="12" height="38" fill="#0E0E0D" />
              <rect x="-12" y="22" width="3" height="52" fill="#fff" opacity="0.22" />
              <path d="M16 70H32V94A14 14 0 0 1 4 94V80" fill="none" stroke="#2A2C2B" strokeWidth="6" />
              <rect x="-4" y="76" width="8" height="40" fill={`url(#${ids.m}-metal-dark)`} />
              <circle cx="0" cy="122" r="11" fill="none" stroke="#3C4040" strokeWidth="4" />
            </g>
            {/* acrylic body: layered edge, face, bevel and gloss */}
            {layers.map((o) => <MarkG key={o} x={-75 + o} y={-75 + o * 1.3} size={150} fill={C.dark} opacity="0.7" />)}
            <MarkG x={-75} y={-75} size={150} fill={C.green} />
            <MarkG x={-75} y={-75} size={150} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.7" />
            <MarkG x={-75} y={-75} size={150} fill={`url(#${ids.m}-glass)`} opacity="0.9" />
            <circle cx="0" cy="-50" r="5.6" fill="#0E0E0D" opacity="0.8" />
            <path d="M-12 -52A18 18 0 0 0 12 -52" fill="none" stroke="#6C716E" strokeWidth="4" />
          </g>
        </StepG>
      )}
    </Scene>
  );
}
