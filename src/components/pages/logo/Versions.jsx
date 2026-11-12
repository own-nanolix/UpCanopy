// Primary lockup, colour versions, the lockup family, misuse examples and the secondary graphic.
import Art from '@/components/art/Art';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import {
  MARK_ARCH, MARK_BAR, MarkG, MarkCropG, LockupG, LockupStackG, WordmarkG, WordmarkVerticalG, AppIconG,
} from '@/components/art/Mark';
import { C, RED, Furniture } from './Parts';

const SQ = 600; // big squares are 600 x 600

// ---------- primary lockup (slide m05, left square) ----------
export function PrimaryPlate() {
  return (
    <Art viewBox={`0 0 ${SQ} ${SQ}`} title="Primary lockup, stacked, with the descriptor" exportName="logo-primary">
      <rect width={SQ} height={SQ} fill={C.slide} />
      <LockupStackG x={60} y={190} scale={0.98} fill={C.navy} />
      <Furniture w={SQ} h={SQ} tl="PRIMARY LOCKUP" br="STACKED" />
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
  if (id === 'wordmark-vertical') return <WordmarkVerticalG x={118} y={560} size={150} fill={C.navy} />;
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
      <g transform="translate(150 150) scale(1.45 0.8) translate(-100 -15)">
        <LockupG scale={0.5} fill={C.navy} />
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
      <g fill={C.green} transform="translate(80 70) scale(1.4)">
        <path d={MARK_BAR} transform="translate(0 -22)" />
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
      <FrondG cx={-170} cy={420} r={330} a0={-72} a1={72} count={38} len={400} width={11} lean={22} tone="onDark" />
      <MarkG x={48} y={668} size={110} fill={C.green} />
    </Art>
  );
}
