// Standalone graphics of the mobile app. Each *G function returns SVG groups so the same artwork sits inside a
// screen (plain decorative <svg>) and, wrapped in <Art>, is exported as its own file. Geometry is in attributes.
import { MarkG, WordmarkG, LockupStackG, WordmarkVerticalG, AppIconG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { IconUse } from '@/components/site/Icon';
import { PEOPLE, CONTACT, SCALES } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const NAVY = '#162557';
const GREEN = '#26CF7B';

// Screen 10: navy field, the gradient rising from below, the frond from the right edge, the stacked lockup.
export function SignInArtG({ idp }) {
  return (
    <g clipPath={`url(#${idp}-box)`}>
      <clipPath id={`${idp}-box`}><rect width="390" height="844" /></clipPath>
      <BrandDefs idp={idp} />
      <linearGradient id={`${idp}-veil`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.25" stopColor={NAVY} stopOpacity="1" />
        <stop offset="1" stopColor={NAVY} stopOpacity="0" />
      </linearGradient>
      <rect width="390" height="844" fill={`url(#${idp}-rise)`} />
      <rect width="390" height="620" fill={`url(#${idp}-veil)`} />
      <FrondG cx={430} cy={860} r={300} a0={182} a1={292} count={32} len={230} width={7} lean={58} tone="onNavy" opacity={0.85} fan />
      <LockupStackG x={46} y={104} scale={0.62} fill="#FFFFFF" />
    </g>
  );
}

// Screen 18 and the badge: green card behind with the word set vertically, the navy card in front.
export function BadgeScreenG({ idp }) {
  // Card proportions, mark, word-mark and the name / role (same size, light) measured from m09.
  const cx = 86, cy = 48, cw = 280, ch = 422;
  return (
    <g clipPath={`url(#${idp}-box)`}>
      <clipPath id={`${idp}-box`}><rect width="390" height="560" /></clipPath>
      <rect width="390" height="560" fill={GREEN} />
      <WordmarkVerticalG x={-6} y={556} size={150} fill="#FFFFFF" opacity="0.92" />
      <rect x={cx + 10} y={cy + 12} width={cw} height={ch} fill="#052E25" opacity="0.28" />
      <rect x={cx} y={cy} width={cw} height={ch} rx="8" fill={NAVY} />
      <clipPath id={`${idp}-card`}>
        <rect x={cx} y={cy} width={cw} height={ch} rx="8" />
      </clipPath>
      <g clipPath={`url(#${idp}-card)`}>
        <FrondG cx={cx + cw / 2} cy={cy + 400} r={150} a0={196} a1={344} count={34} len={190} width={7} lean={58} tone="onNavy" fan />
      </g>
      <MarkG x={cx + 16} y={cy + 14} size={30} fill={GREEN} />
      <WordmarkG x={cx + cw - 16} y={cy + 34} size={12} fill="#FFFFFF" anchor="end" />
      <text x={cx + 18} y={cy + 368} fontSize="24" fontWeight="300" fill="#FFFFFF">{PEOPLE.badge.name}</text>
      <text x={cx + 18} y={cy + 400} fontSize="24" fontWeight="300" fill="#FFFFFF">{PEOPLE.badge.role}</text>
    </g>
  );
}

// Screen 17 and the specimen: the back of the business card, small and flat.
// As in m23: no mark on the back; name (first name bold) and role top left, the word-mark top right in white,
// then three groups of small dark lines: handle, phone and email; the address on two lines; the web address bold.
export function BusinessCardG() {
  const [first, ...rest] = PEOPLE.founder.name.split(' ');
  const groups = [[CONTACT.handle, CONTACT.phone, CONTACT.hello]];
  const ink = '#052E25';
  return (
    <g>
      <rect width="340" height="200" fill={GREEN} />
      <WordmarkG x={318} y={34} size={10} fill="#FFFFFF" anchor="end" />
      <text x="22" y="34" fontSize="10" fill={ink} letterSpacing="0.5">
        <tspan fontWeight="700">{first}</tspan>
        <tspan fontWeight="400"> {rest.join(' ')}</tspan>
      </text>
      <text x="22" y="47" fontSize="7.5" fontWeight="400" fill={ink} letterSpacing="0.5">{PEOPLE.founder.role}</text>
      {groups.map((g, k) => g.map((t, i) => (
        <text key={`${k}-${i}`} x="22" y={r2(80 + k * 46 + i * 11)} fontSize="8" fill={ink}>{t}</text>
      )))}
      <rect x="22" y="126" width="104" height="8" rx="1.5" fill={ink} opacity="0.16" />
      <rect x="22" y="137" width="76" height="8" rx="1.5" fill={ink} opacity="0.16" />
      <text x="22" y="170" fontSize="9" fontWeight="700" fill={ink}>{CONTACT.webCased}</text>
    </g>
  );
}

// The tab bar icons on four square tiles; the first tile is the active one (green, locked).
export const TAB_ICONS = [['users', 'CRM'], ['calendar', 'Agenda'], ['chart', 'Financeiro'], ['folder', 'Files']];
export function TabIconsG() {
  return (
    <g>
      {TAB_ICONS.map(([name], i) => (
        <g key={name} transform={`translate(${i * 84} 0)`}>
          <rect width="76" height="76" fill={i === 0 ? GREEN : NAVY} className={i === 0 ? 'lock' : undefined} />
          <IconUse name={name} x={22} y={22} size={32} color={i === 0 ? NAVY : '#FFFFFF'} style={{ color: i === 0 ? NAVY : '#FFFFFF' }} />
        </g>
      ))}
    </g>
  );
}

// The ten-dot stepper: the labels of the first printed scale, ten dots, the green one locked at the printed step.
export function StepperG() {
  const sc = SCALES[0];
  return (
    <g>
      <rect width="400" height="110" fill="#F0F0F0" />
      <text x="24" y="34" fontSize="11" fontWeight="700" fill={NAVY} letterSpacing="1.2" lang="pt-BR">{sc.left}</text>
      <text x="376" y="34" fontSize="11" fontWeight="700" fill={NAVY} letterSpacing="1.2" textAnchor="end" lang="pt-BR">{sc.right}</text>
      <ScaleDotsG x={34} y={72} w={332} r={12} chosen={sc.chosen} off="#1D1D1B" on={GREEN} lock />
    </g>
  );
}

// A bottom sheet: scrim, the sheet with its drag handle and three rows of quiet bars.
export function SheetG() {
  return (
    <g>
      <rect width="390" height="360" fill={NAVY} />
      <rect y="0" width="390" height="70" fill="#FFFFFF" opacity="0.12" />
      <rect y="86" width="390" height="274" fill="#FFFFFF" />
      <rect x="171" y="98" width="48" height="6" fill={NAVY} className="lock" />
      <rect x="24" y="124" width="120" height="10" fill={NAVY} opacity="0.9" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(24 ${150 + i * 64})`}>
          <rect width="44" height="44" fill={i === 0 ? GREEN : '#DFF7E6'} />
          <rect x="62" y="10" width={r2(150 - i * 16)} height="9" fill={NAVY} opacity="0.2" />
          <rect x="62" y="28" width={r2(96 - i * 8)} height="7" fill={NAVY} opacity="0.12" />
          <rect x="318" y="14" width="24" height="16" fill={i === 0 ? GREEN : NAVY} opacity={i === 0 ? 1 : 0.18} />
        </g>
      ))}
    </g>
  );
}

// The nine screens as nine small wireframes, to see the rhythm of the set at a glance.
const PLAN = [
  { head: NAVY, body: 'form' }, { head: '#DFF7E6', body: 'sheet' }, { head: '#F2FFE4', body: 'rows3' },
  { head: '#052E25', body: 'text' }, { head: '#F2FFE4', body: 'acc' }, { head: '#F0F0F0', body: 'rows4' },
  { head: '#F2FFE4', body: 'rows6' }, { head: '#F2FFE4', body: 'card' }, { head: GREEN, body: 'badge' },
];
export function PlanG() {
  const W = 110, H = 238, G = 14;
  return (
    <g>
      {PLAN.map((p, i) => {
        const x = (i % 3) * (W + G), y = Math.floor(i / 3) * (H + G);
        const dark = p.head === NAVY || p.head === '#052E25';
        const fill = dark && (p.body === 'form' || p.body === 'text') ? p.head : p.head === GREEN ? GREEN : '#FFFFFF';
        const rows = { rows3: 3, rows4: 4, rows6: 6, acc: 3 }[p.body] || 0;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width={W} height={H} fill={fill} stroke={NAVY} strokeWidth="2" />
            <rect width={W} height="30" fill={p.head} stroke={NAVY} strokeWidth="2" />
            <text x="8" y="21" fontSize="10" fontWeight="700" fill={dark ? '#FFFFFF' : NAVY} className="wide">{10 + i}</text>
            {Array.from({ length: rows }, (_, k) => (
              <g key={k} transform={`translate(8 ${44 + k * (p.body === 'acc' ? 44 : 30)})`}>
                <rect width={p.body === 'acc' ? 94 : 22} height={p.body === 'acc' ? 34 : 22} fill={k === 0 ? GREEN : NAVY} opacity={k === 0 ? 1 : 0.16} />
                {p.body !== 'acc' && <rect x="30" y="4" width={r2(60 - k * 4)} height="6" fill={NAVY} opacity="0.2" />}
              </g>
            ))}
            {p.body === 'sheet' && <rect x="0" y="108" width={W} height="130" fill={NAVY} opacity="0.9" />}
            {p.body === 'sheet' && <rect x="42" y="116" width="26" height="4" fill={GREEN} />}
            {p.body === 'form' && [0, 1].map((k) => <rect key={k} x="10" y={110 + k * 34} width="90" height="24" fill="#FFFFFF" />)}
            {p.body === 'form' && <rect x="10" y="190" width="90" height="26" fill={GREEN} />}
            {p.body === 'text' && [0, 1, 2, 3, 4].map((k) => <rect key={k} x="10" y={70 + k * 14} width={r2(90 - (k % 3) * 18)} height="6" fill="#DFF7E6" opacity="0.7" />)}
            {p.body === 'text' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => <circle key={k} cx={r2(11 + k * 9.8)} cy="212" r="3" fill={k === 3 ? GREEN : '#DFF7E6'} opacity={k === 3 ? 1 : 0.5} />)}
            {p.body === 'card' && <rect x="10" y="44" width="90" height="54" fill={GREEN} />}
            {p.body === 'badge' && <rect x="22" y="44" width="66" height="160" fill={NAVY} />}
          </g>
        );
      })}
    </g>
  );
}

export function AppIconSpecG() {
  return <AppIconG x={0} y={0} size={120} radius={0} />;
}
