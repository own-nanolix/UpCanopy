import { CONTACT, DOCUMENT, HEX, PEOPLE, SIGN } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG, LockupStackG, WordmarkG, WordmarkVerticalG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ArrowG } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';
import { range } from '@/lib/site';
import s from './lp-contato.module.css';

// m12: the compliance letter, measured on the sheet (fractions of width W and height H). Near-white at the top to
// Green Park at the lower left; the giant navy word-mark reads top to bottom along the left edge (0.15 H to
// 0.93 H); the small green mark top right; the heading on one line at 0.24 H between two rules; the body as
// quiet lines (illegible in the photograph); the footer: "Contact" bold, "Telephone" and "Email" right-aligned,
// the phone and e-mail beside them, between two rules.
const LW = 520;
const LH = 736;
const COL = 172;
const COL_R = 484;
const BODY = range(30, (i) => ({ y: r2(232 + i * 12.6 + Math.floor(i / 6) * 8), w: i % 6 === 5 ? 150 + ((i * 37) % 90) : 290 + ((i * 23) % 22) }));

export function Letter() {
  return (
    <Art viewBox={`0 0 ${LW} ${LH}`} title="Compliance letter: Termo de Compliance e Conduta Ética" exportName="lp-contato-letter">
      <defs>
        <linearGradient id="lp-contato-lt-sheet" x1="0.75" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor={HEX.white} />
          <stop offset="0.5" stopColor={HEX.mintPaper} />
          <stop offset="1" stopColor={HEX.green} stopOpacity="0.85" />
        </linearGradient>
        <clipPath id="lp-contato-lt-clip"><rect width={LW} height={LH} /></clipPath>
      </defs>
      <rect width={LW} height={LH} fill={HEX.white} />
      <rect width={LW} height={LH} fill="url(#lp-contato-lt-sheet)" />
      <g clipPath="url(#lp-contato-lt-clip)">
        <g transform="translate(34 106) rotate(90)">
          <WordmarkG x={0} y={0} size={102} fill={HEX.navy} />
        </g>
      </g>
      <MarkG x={450} y={34} size={34} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
      <rect x={COL} y="150" width={COL_R - COL} height="1.5" fill={HEX.navy} />
      <g fill={HEX.navy}>
        <text x={COL} y="178" fontSize="12.5" fontWeight="500" lang="pt-BR">{DOCUMENT.title}</text>
        <text x={COL} y="196" fontSize="9.5">{DOCUMENT.address}</text>
      </g>
      <rect x={COL} y="212" width={COL_R - COL} height="1.5" fill={HEX.navy} />
      {BODY.map((l, i) => (
        <rect key={i} x={COL} y={l.y} width={l.w} height="4" fill={HEX.navy} opacity="0.22" className="grow-x" style={{ '--i': i }} />
      ))}
      <rect x={COL} y="614" width={COL_R - COL} height="1.5" fill={HEX.navy} />
      <g fill={HEX.navy} textAnchor="end">
        <text x={COL_R} y="636" fontSize="12.5" fontWeight="700">{DOCUMENT.labels[0]}</text>
        <text x={COL_R} y="652" fontSize="9.5">{DOCUMENT.labels[1]}</text>
        <text x={COL_R} y="665" fontSize="9.5">{DOCUMENT.labels[2]}</text>
        <text x="410" y="658" fontSize="9.5">{CONTACT.phone}</text>
        <text x="410" y="671" fontSize="9.5">{CONTACT.sac}</text>
      </g>
      <rect x={COL} y="686" width={COL_R - COL} height="1.5" fill={HEX.navy} />
    </Art>
  );
}

// m09: the badge on its lanyard, measured on the front card (W 250, H 360 here): mark top left (0.1 W), the
// word-mark small top right, the punched hole at the top centre, the name and role in white light type at the
// lower left (0.88 H and 0.95 H). The green card behind it hangs turned clockwise, the word-mark set vertically.
// The portrait is not reproduced: the frond on navy stands in, kept clear of the name.
export function Badge() {
  return (
    <Art viewBox="0 0 560 760" title="Lanyard badge with the mark and word-mark" exportName="lp-contato-badge">
      <rect width="560" height="760" fill={HEX.navyDeep} />
      <clipPath id="lp-contato-bd-green"><rect x="0" y="0" width="250" height="360" rx="9" /></clipPath>
      <clipPath id="lp-contato-bd-front"><rect x="0" y="0" width="250" height="360" rx="9" /></clipPath>
      <g transform="translate(280 0)">
        <g className={s.swing}>
          <rect x="-30" y="0" width="60" height="220" fill={HEX.navy} />
          <WordmarkVerticalG x={-13} y={170} size={26} fill={HEX.white} />
          <MarkG x={-15} y={178} size={30} fill={HEX.white} />
          <circle cx="0" cy="240" r="16" fill="none" stroke={HEX.muted} strokeWidth="4" />
          <path d="M-14 250H14L10 306H-10Z" fill={HEX.asphalt} />
          <g transform="translate(-125 292)">
            <g transform="translate(-78 -40) rotate(12)">
              <g clipPath="url(#lp-contato-bd-green)">
                <rect width="250" height="360" fill={HEX.green} />
                <g transform="translate(70 330) rotate(-90)">
                  <WordmarkG x={0} y={0} size={56} fill={HEX.white} />
                </g>
              </g>
            </g>
            <g clipPath="url(#lp-contato-bd-front)">
              <rect width="250" height="360" fill={HEX.navy} />
              <g opacity="0.9">
                <FrondG cx={262} cy={250} r={120} a0={190} a1={262} count={26} len={130} width={7} lean={58} tone="onNavy" />
              </g>
              <MarkG x={13} y={13} size={25} fill={HEX.green} />
              <WordmarkG x={237} y={28} size={12} fill={HEX.white} anchor="end" />
              <circle cx="125" cy="15" r="6" fill={HEX.navyDeep} />
              <text x="13" y="316" fontSize="22" fontWeight="300" fill={HEX.white}>{PEOPLE.badge.name}</text>
              <text x="13" y="342" fontSize="22" fontWeight="300" fill={HEX.white}>{PEOPLE.badge.role}</text>
            </g>
          </g>
        </g>
      </g>
    </Art>
  );
}

// m17: the wall sign, measured on the plate (1.63 : 1): stacked lockup centred, "upcanopy.com" small in green at
// the lower left (0.045 W, 0.935 H), "HOME →" at the lower right (0.058 W from the edge, 0.92 H). Leaf shadows
// fall across the upper right: the frond, dark, at low opacity.
export function WallSign() {
  return (
    <Art viewBox="0 0 800 480" title={`Wall sign: ${SIGN.home} arrow`} exportName="lp-contato-sign">
      <BrandDefs idp="lp-contato-sg" />
      <clipPath id="lp-contato-sg-clip"><rect width="800" height="480" /></clipPath>
      <rect width="800" height="480" fill="url(#lp-contato-sg-rise)" filter="url(#lp-contato-sg-grain)" />
      <g clipPath="url(#lp-contato-sg-clip)">
        <FrondG cx={840} cy={-40} r={340} a0={100} a1={190} count={34} len={260} width={12} lean={50} tone="onGreen" opacity={0.3} />
      </g>
      <LockupStackG x={160} y={120} fill={HEX.white} markFill={HEX.green} />
      <text x="36" y="449" fontSize="14" fill={HEX.green} fontWeight="500">{CONTACT.web}</text>
      <text x="712" y="444" fontSize="24" fontWeight="400" textAnchor="end" letterSpacing="4" fill={HEX.white} className="wide">{SIGN.home}</text>
      <ArrowG x={724} y={422} size={26} stroke={HEX.white} strokeWidth={2.5} />
    </Art>
  );
}
