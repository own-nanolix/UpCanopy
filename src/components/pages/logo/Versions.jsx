// Primary lockup, colour versions, the lockup family, misuse examples and the secondary graphic.
import Art from '@/components/art/Art';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import {
  MARK_ARCH, MARK_BAR, MarkG, MarkCropG, LockupG, LockupStackG, WordmarkG, WordmarkVerticalG, AppIconG,
} from '@/components/art/Mark';
import { C, RED, Furniture } from './Parts';

const SQ = 600; // big squares are 600 x 600

// ---------- primary lockup (slide m05, left square) ----------
// The stacked lockup at full size with its three parts named by leader lines. Positions come from LockupStackG
// (box 480 x 240: mark 186..294 x 0..108, word baseline 176, descriptor baseline 226), placed at scale 1.2.
const PK = 1.2, PX = 70, PY = 150;
const PARTS = [
  { label: 'MARK', sub: 'ARCH AND BAR', y: 54, from: 294 + 14 },
  { label: 'WORD-MARK', sub: 'LOGOTYPE VOICE', y: 150, from: 456 + 12 },
  { label: 'DESCRIPTOR', sub: 'WIDE CAPS', y: 218, from: 424 + 12 },
];
export function PrimaryPlate() {
  const lx = 760;
  return (
    <Art viewBox="0 0 1200 600" title="Primary lockup, stacked, with the descriptor, its parts named" exportName="logo-primary">
      <rect width="1200" height="600" fill={C.slide} />
      <LockupStackG x={PX} y={PY} scale={PK} fill={C.navy} />
      {PARTS.map((p) => {
        const y = PY + p.y * PK;
        const x0 = PX + p.from * PK;
        return (
          <g key={p.label}>
            <path d={`M${x0} ${y}H${lx - 16}`} stroke={C.navy} strokeWidth="1.5" fill="none" />
            <circle cx={x0} cy={y} r="4" fill={C.navy} />
            <text x={lx} y={y - 2} fontSize="17" fontWeight="700" letterSpacing="1" fill={C.navy} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{p.label}</text>
            <text x={lx} y={y + 20} fontSize="13" fontWeight="500" letterSpacing="1" fill={C.muted}>{p.sub}</text>
          </g>
        );
      })}
      <Furniture w={1200} h={600} tl="PRIMARY LOCKUP" br="STACKED, ON GRAY" />
    </Art>
  );
}

// ---------- colour versions ----------
// ground: 'flat' colour or 'rise' (the brand gradient). Each version draws its own square.
const VERSIONS = [
  { id: 'green-on-grey', title: 'Green mark, navy word, on light grey', ground: C.slide, mark: C.green, word: C.navy, kind: 'stack', note: 'GREEN PARK + BLUE OCEAN ON GRAY', ink: C.muted },
  { id: 'green-on-navy', title: 'Green mark, white word, on navy', ground: C.navy, mark: C.green, word: C.white, kind: 'stack', note: 'GREEN PARK + WHITE ON BLUE OCEAN', ink: C.navyMuted },
  { id: 'mint-on-navy', title: 'Mint mark on navy', ground: C.navy, mark: C.mint, kind: 'mark', note: 'GREEN LIGTH ON BLUE OCEAN', ink: C.navyMuted },
  { id: 'white-on-navy', title: 'White lockup on navy', ground: C.navy, mark: C.white, word: C.white, kind: 'line', note: 'WHITE ON BLUE OCEAN', ink: C.navyMuted },
  { id: 'dark-on-green', title: 'Dark green lockup on Green Park', ground: C.green, mark: C.greenDark, word: C.greenDark, kind: 'mark', note: 'GREEN DARK ON GREEN PARK', ink: C.greenDark },
  { id: 'pale-on-gradient', title: 'Pale lockup on the brand gradient', ground: 'rise', mark: C.mint, word: C.mint, kind: 'line', note: 'GREEN LIGTH ON THE GRADIENT', ink: C.mint },
];

function VersionArt({ v }) {
  const grad = v.ground === 'rise';
  return (
    <Art viewBox={`0 0 ${SQ} ${SQ}`} title={v.title} exportName={`logo-colour-${v.id}`}>
      {grad && <BrandDefs idp="logo-vers" />}
      <rect width={SQ} height={SQ} fill={grad ? 'url(#logo-vers-rise)' : v.ground} />
      {v.kind === 'stack' && <LockupStackG x={60} y={190} scale={0.98} fill={v.word} markFill={v.mark} />}
      {v.kind === 'mark' && <MarkG x={190} y={190} size={220} fill={v.mark} />}
      {v.kind === 'line' && <LockupG x={80} y={270} scale={1.1} fill={v.word} markFill={v.mark} />}
      <Furniture w={SQ} h={SQ} tl="COLOUR VERSION" bl={v.note} fill={v.ink} size={13} />
    </Art>
  );
}

export function ColourPairs() {
  const pairs = [VERSIONS.slice(0, 2), VERSIONS.slice(2, 4), VERSIONS.slice(4, 6)];
  return pairs.map((p) => (
    <div key={p[0].id} className="grid cols-2">
      {p.map((v) => (
        <VersionArt key={v.id} v={v} />
      ))}
    </div>
  ));
}

// ---------- the family of lockups ----------
const FAMILY = [
  { id: 'horizontal-grey', title: 'Horizontal lockup on light grey', note: 'HORIZONTAL', ground: C.slide, ink: C.muted },
  { id: 'horizontal-navy', title: 'Horizontal lockup on navy', note: 'HORIZONTAL', ground: C.navy, ink: C.navyMuted, dark: true },
  { id: 'mark', title: 'The mark alone', note: 'MARK', ground: C.slide, ink: C.muted },
  { id: 'wordmark', title: 'The word-mark alone', note: 'WORD-MARK', ground: C.navy, ink: C.navyMuted, dark: true },
  { id: 'wordmark-vertical', title: 'The word-mark set vertically', note: 'WORD-MARK, VERTICAL', ground: C.slide, ink: C.muted },
  { id: 'app-icon', title: 'App icon', note: 'APP ICON', ground: C.slide, ink: C.muted },
  { id: 'stacked-plain', title: 'Stacked lockup without the descriptor', note: 'STACKED, NO DESCRIPTOR', ground: C.navy, ink: C.navyMuted, dark: true },
];

function FamilyBody({ id, dark }) {
  const word = dark ? C.white : C.navy;
  if (id.startsWith('horizontal')) return <LockupG x={64} y={270} scale={1.18} fill={word} />;
  if (id === 'mark') return <MarkG x={160} y={160} size={280} fill={C.green} />;
  if (id === 'wordmark') return <WordmarkG x={300} y={322} size={78} anchor="middle" fill={word} />;
  if (id === 'wordmark-vertical') return <WordmarkVerticalG x={250} y={572} size={88} fill={C.navy} />;
  if (id === 'app-icon') return <AppIconG x={150} y={150} size={300} />;
  return <LockupStackG x={60} y={210} scale={0.98} fill={word} descriptor={false} />;
}

export function FamilyPairs() {
  const rows = [[0, 1], [2, 3], [4, 5], [6]];
  return rows.map((r) => (
    <div key={r[0]} className="grid cols-2">
      {r.map((i) => {
        const f = FAMILY[i];
        return (
          <Art key={f.id} viewBox={`0 0 ${SQ} ${SQ}`} title={f.title} exportName={`logo-lockup-${f.id}`}>
            <rect width={SQ} height={SQ} fill={f.ground} />
            <FamilyBody id={f.id} dark={f.dark} />
            <Furniture w={SQ} h={SQ} tl="LOCKUP" bl={f.note} fill={f.ink} size={13} />
          </Art>
        );
      })}
    </div>
  ));
}

// ---------- misuse ----------
const M = 300; // misuse squares
function Cross() {
  return <path d={`M24 24L${M - 24} ${M - 24}`} stroke={RED} strokeWidth="2" strokeLinecap="butt" fill="none" />;
}
const MISUSE = [
  {
    id: 'stretched', label: 'Stretched',
    body: (
      <g transform="translate(150 150) scale(1.3 0.75) translate(-84 -13)">
        <LockupG scale={0.42} fill={C.navy} />
      </g>
    ),
  },
  {
    id: 'rotated', label: 'Rotated',
    body: (
      <g transform="rotate(-24 150 150)">
        <LockupStackG x={50} y={92} scale={0.5} fill={C.navy} />
      </g>
    ),
  },
  {
    id: 'swapped', label: 'Arch and bar swapped',
    body: (
      <g fill={C.green} transform="translate(80 90) scale(1.4)">
        <path d={MARK_BAR} transform="translate(0 -80)" />
        <path d={MARK_ARCH} transform="translate(0 22)" />
      </g>
    ),
  },
  {
    id: 'rounded', label: 'Rounded corners added',
    body: (
      <g transform="translate(70 70) scale(1.6)" fill={C.green} stroke={C.green} strokeWidth="9" strokeLinejoin="round">
        <path d={MARK_ARCH} />
        <path d={MARK_BAR} />
      </g>
    ),
  },
  {
    id: 'outline', label: 'Thin outline instead of solid',
    body: (
      <g transform="translate(70 70) scale(1.6)" fill="none" stroke={C.green} strokeWidth="1.2">
        <path d={MARK_ARCH} />
        <path d={MARK_BAR} />
      </g>
    ),
  },
  {
    id: 'low-contrast', label: 'Green Park on mint',
    ground: C.mint,
    body: <LockupStackG x={30} y={92} scale={0.5} fill={C.green} markFill={C.green} />,
  },
];

export const MISUSE_LABELS = MISUSE.map((m) => m.label);

export function MisuseGrid() {
  return MISUSE.map((m) => (
    <figure key={m.id} className="mis">
      <Art viewBox={`0 0 ${M} ${M}`} title={`Misuse: ${m.label}`} exportName={`logo-misuse-${m.id}`}>
        <rect width={M} height={M} fill={m.ground || C.slide} />
        {m.body}
        <Cross />
      </Art>
      <figcaption className="t-label">{m.label}</figcaption>
    </figure>
  ));
}

// ---------- secondary graphic ----------
export function CoverPlate() {
  return (
    <Art viewBox="0 0 600 840" title="The mark crop on the green gradient, as on the folder cover" exportName="logo-secondary-crop">
      <BrandDefs idp="logo-cover" />
      <rect width="600" height="840" fill="url(#logo-cover-green)" />
      <MarkCropG idp="logo-cropc" w={600} h={840} zoom={1.55} dx={0.2} dy={0.02} fill={C.navy} />
      <WordmarkVerticalG x={34} y={806} size={64} fill={C.navy} />
    </Art>
  );
}

export function FrondPlate() {
  return (
    <Art viewBox="0 0 600 840" title="The frond with the mark, as on the poster" exportName="logo-secondary-frond">
      <rect width="600" height="840" fill={C.greenDark} />
      <FrondG cx={-920} cy={300} r={900} a0={-8} a1={60} count={40} len={460} width={10} lean={0} tone="onDark" />
      <MarkG x={40} y={690} size={86} fill={C.green} />
    </Art>
  );
}
