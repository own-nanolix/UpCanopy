// Device frames and product screens as SVG groups, for mockups and showcase scenes (one SVG per scene).
// For live, interactive screens use the HTML frames in components/ui/Devices (Phone, Tablet, Laptop, Monitor,
// Watch). Each frame takes `w` (its width in the parent SVG) and `idp`, and draws `children` on its screen in
// the screen's own coordinate space:
//   PhoneG   screen 390 x 844      MonitorG screen 1600 x 1000     LaptopG screen 1440 x 900
//   TabletG  screen 1180 x 820     WatchG   screen 184 x 224
//
// The case study shows no product screens. The screens below are our design for the remote back-office in the
// brand's language, using only its words: CRM, Agenda, Financeiro, the pillars, the brand lines, the five scales.
import { MarkG, WordmarkG, DescriptorG, LockupG } from './Mark';
import { FrondG } from './KeyArt';

export const SCREEN = { phone: [390, 844], monitor: [1600, 1000], laptop: [1440, 900], tablet: [1180, 820], watch: [184, 224] };

export function PhoneG({ idp, x = 0, y = 0, w = 300, children, screenFill = '#F2FFE4', ...rest }) {
  const k = w / 430; // frame is 430 x 884 around a 390 x 844 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-ph`}>
        <rect x="20" y="20" width="390" height="844" rx="48" />
      </clipPath>
      <rect x="-3" y="150" width="6" height="34" rx="2" fill="#1B2240" />
      <rect x="-3" y="210" width="6" height="62" rx="2" fill="#1B2240" />
      <rect x="427" y="230" width="6" height="96" rx="2" fill="#1B2240" />
      <rect width="430" height="884" rx="66" fill="#2A3350" />
      <rect x="4" y="4" width="422" height="876" rx="62" fill="#111111" />
      <rect x="20" y="20" width="390" height="844" rx="48" fill={screenFill} />
      <g clipPath={`url(#${idp}-ph)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <rect x="153" y="34" width="124" height="34" rx="17" fill="#000000" />
      <circle cx="254" cy="51" r="6" fill="#16161E" />
      <path d="M66 6h298a60 60 0 0 1 60 60v60" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
    </g>
  );
}

export function MonitorG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#F2FFE4', stand = true, ...rest }) {
  const k = w / 1640; // frame 1640 x 1040 around a 1600 x 1000 screen; stand adds 300 below
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-mo`}>
        <rect x="20" y="20" width="1600" height="1000" rx="4" />
      </clipPath>
      {stand && (
        <g>
          <path d="M700 1040h240v230H700z" fill="#3A3A3A" />
          <path d="M700 1040h240v60H700z" fill="#000000" opacity="0.35" />
          <path d="M540 1270h560l40 30H500z" fill="#2B2B2B" />
          <path d="M700 1040h70v230h-70z" fill="#FFFFFF" opacity="0.08" />
        </g>
      )}
      <rect width="1640" height="1040" rx="18" fill="#0C0C0C" />
      <rect x="20" y="20" width="1600" height="1000" rx="4" fill={screenFill} />
      <g clipPath={`url(#${idp}-mo)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <path d="M18 2h1604a16 16 0 0 1 16 16v300" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
    </g>
  );
}

export function LaptopG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#F2FFE4', ...rest }) {
  const k = w / 1840; // lid 1500 x 960 centred on a 1840-wide base
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-la`}>
        <rect x="200" y="30" width="1440" height="900" rx="6" />
      </clipPath>
      <rect x="170" y="0" width="1500" height="960" rx="30" fill="#1B1B1F" />
      <rect x="200" y="30" width="1440" height="900" rx="6" fill={screenFill} />
      <g clipPath={`url(#${idp}-la)`}>
        <g transform="translate(200 30)">{children}</g>
      </g>
      <path d="M830 30h180v16a12 12 0 0 1-12 12H842a12 12 0 0 1-12-12z" fill="#1B1B1F" />
      <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill="#2A2A2F" />
      <path d="M0 960h1840v8H0z" fill="#4A4A50" />
      <path d="M780 960h280v10a10 10 0 0 1-10 10H790a10 10 0 0 1-10-10z" fill="#17171A" />
      <path d="M200 4h1440" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="2" />
    </g>
  );
}

export function TabletG({ idp, x = 0, y = 0, w = 600, children, screenFill = '#F2FFE4', rugged = false, ...rest }) {
  const k = w / 1260; // frame 1260 x 900 around a 1180 x 820 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-ta`}>
        <rect x="40" y="40" width="1180" height="820" rx="14" />
      </clipPath>
      {rugged && (
        <g fill="#2F2F2F">
          <rect x="-26" y="-26" width="1312" height="952" rx="70" />
          <path d="M-26 60h30v120h-30zM1256 60h30v120h-30zM-26 720h30v120h-30zM1256 720h30v120h-30z" fill="#26CF7B" />
        </g>
      )}
      <rect width="1260" height="900" rx="46" fill="#101012" />
      <rect x="40" y="40" width="1180" height="820" rx="14" fill={screenFill} />
      <g clipPath={`url(#${idp}-ta)`}>
        <g transform="translate(40 40)">{children}</g>
      </g>
      <circle cx="630" cy="20" r="5" fill="#26262B" />
    </g>
  );
}

export function WatchG({ idp, x = 0, y = 0, w = 120, children, band = '#162557', ...rest }) {
  const k = w / 240; // case 240 x 290 around a 184 x 224 screen; band above and below
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-wa`}>
        <rect x="28" y="133" width="184" height="224" rx="44" />
      </clipPath>
      <path d="M50 0h140l10 110H40z" fill={band} />
      <path d="M40 380h160l-10 110H50z" fill={band} />
      <path d="M50 0h140l10 110H40z" fill="#000000" opacity="0.12" />
      <rect x="236" y="190" width="12" height="46" rx="5" fill="#8F8F8F" />
      <rect y="100" width="240" height="290" rx="70" fill="#C9C9C9" />
      <rect x="8" y="108" width="224" height="274" rx="62" fill="#0E0E10" />
      <rect x="28" y="133" width="184" height="224" rx="44" fill="#1A1A1D" />
      <g clipPath={`url(#${idp}-wa)`}>
        <g transform="translate(28 133)">{children}</g>
      </g>
    </g>
  );
}

// ---------- Screens (artwork versions of the product, for use inside the frames above) ----------

const ROWS = ['CRM', 'Agenda', 'Financeiro'];

// Phone home: the gradient field, the mark, the brand line, three area rows. 390 x 844.
export function ScreenHomeG({ idp }) {
  return (
    <g>
      <linearGradient id={`${idp}-sh-bg`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.15" stopColor="#162557" />
        <stop offset="0.7" stopColor="#1C5C66" />
        <stop offset="1" stopColor="#26CF7B" />
      </linearGradient>
      <rect width="390" height="844" fill={`url(#${idp}-sh-bg)`} />
      <FrondG cx={-40} cy={520} r={330} a0={285} a1={395} count={30} len={210} width={8} lean={64} tone="onNavy" opacity={0.55} />
      <rect x="34" y="35" width="38" height="12" rx="2" fill="#FFFFFF" opacity="0.2" />
      <MarkG x={28} y={84} size={44} fill="#26CF7B" />
      <text fontSize="30" fontWeight="300" fill="#FFFFFF">
        <tspan x="28" y="208">A ponte entre</tspan>
        <tspan x="28" y="244">o trabalho manual</tspan>
        <tspan x="28" y="280">e a maturidade</tspan>
        <tspan x="28" y="316">empresarial chama-se</tspan>
        <tspan x="28" y="352" fontWeight="700" fill="#26CF7B">UpCanopy</tspan>
      </text>
      {ROWS.map((r, i) => (
        <g key={r} transform={`translate(28 ${470 + i * 86})`}>
          <rect width="334" height="74" fill="#FFFFFF" fillOpacity={i === 0 ? 1 : 0.14} />
          <text x="20" y="45" fontSize="15" fontWeight="500" letterSpacing="0.6" className="wide" style={{ fontFamily: 'var(--font-wide)' }} fill={i === 0 ? '#162557' : '#FFFFFF'}>{r.toUpperCase()}</text>
          <path d="M290 37h22m-9-9 9 9-9 9" fill="none" stroke={i === 0 ? '#162557' : '#26CF7B'} strokeWidth="2" />
        </g>
      ))}
      <WordmarkG x={28} y={794} size={22} fill="#FFFFFF" />
    </g>
  );
}

// Desktop back-office: left rail, a header with the brand line, three area columns and the scale dots. 1600 x 1000.
export function ScreenAppG({ idp }) {
  const rail = ['home', 'users', 'calendar', 'chart', 'folder', 'gear'];
  return (
    <g>
      <rect width="1600" height="1000" fill="#F2FFE4" />
      <rect width="96" height="1000" fill="#162557" />
      <MarkG x={26} y={28} size={44} fill="#26CF7B" />
      {rail.map((n, i) => (
        <g key={n} transform={`translate(24 ${150 + i * 72})`}>
          <rect width="48" height="48" fill={i === 1 ? '#26CF7B' : 'none'} />
          <use href={`#site-icon-${n}`} x="12" y="12" width="24" height="24" color={i === 1 ? '#162557' : '#FFFFFF'} />
        </g>
      ))}
      <linearGradient id={`${idp}-sa-bg`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.1" stopColor="#162557" />
        <stop offset="0.65" stopColor="#1C5C66" />
        <stop offset="1" stopColor="#26CF7B" />
      </linearGradient>
      <clipPath id={`${idp}-sa-hero`}>
        <rect x="136" y="40" width="1424" height="330" />
      </clipPath>
      <rect x="136" y="40" width="1424" height="330" fill={`url(#${idp}-sa-bg)`} />
      <g clipPath={`url(#${idp}-sa-hero)`}>
        <FrondG cx={1500} cy={520} r={420} a0={180} a1={280} count={34} len={280} width={10} lean={-64} tone="onNavy" opacity={0.5} />
      </g>
      <text fontSize="40" fontWeight="300" fill="#FFFFFF">
        <tspan x="176" y="150">A ponte entre o trabalho manual</tspan>
        <tspan x="176" y="200">e a maturidade empresarial chama-se</tspan>
        <tspan x="176" y="252" fontWeight="700" fill="#26CF7B">UpCanopy</tspan>
      </text>
      <DescriptorG x={176} y={326} size={15} fill="#FFFFFF" />
      {ROWS.map((r, i) => (
        <g key={r} transform={`translate(${136 + i * 480} 404)`}>
          <rect width="464" height="360" fill="#FFFFFF" />
          <rect width="464" height="6" fill={i === 0 ? '#26CF7B' : '#162557'} />
          <text x="28" y="62" fontSize="20" fontWeight="500" letterSpacing="0.8" className="wide" style={{ fontFamily: 'var(--font-wide)' }} fill="#162557">{r.toUpperCase()}</text>
          {[0, 1, 2, 3].map((k) => (
            <g key={k} transform={`translate(28 ${104 + k * 58})`}>
              <rect width="34" height="34" fill={k === 0 && i === 0 ? '#26CF7B' : '#F0F0F0'} />
              <rect x="50" y="6" width={[250, 190, 280, 160][(k + i) % 4]} height="8" fill="#162557" opacity="0.16" />
              <rect x="50" y="22" width={[120, 150, 90, 130][(k + i) % 4]} height="6" fill="#162557" opacity="0.1" />
              <path d="M0 46h408" stroke="#162557" strokeOpacity="0.12" />
            </g>
          ))}
        </g>
      ))}
      <g transform="translate(136 800)">
        <rect width="1424" height="160" fill="#162557" />
        <text x="32" y="56" fontSize="13" fontWeight="500" letterSpacing="1" className="wide" style={{ fontFamily: 'var(--font-wide)' }} fill="#26CF7B">ORGANIZAÇÃO · DISCIPLINA · CONFIANÇA</text>
        {Array.from({ length: 10 }, (_, k) => (
          <circle key={k} cx={52 + k * 62} cy="108" r="18" fill={k === 7 ? '#26CF7B' : '#2A3A78'} />
        ))}
        <LockupG x={1090} y={56} scale={0.7} fill="#FFFFFF" />
      </g>
    </g>
  );
}

// A small glanceable screen for the watch: 184 x 224.
export function ScreenWatchG() {
  return (
    <g>
      <rect width="184" height="224" fill="#162557" />
      <MarkG x={62} y={30} size={60} fill="#26CF7B" />
      <text x="92" y="142" fontSize="15" fontWeight="500" textAnchor="middle" className="wide" style={{ fontFamily: 'var(--font-wide)' }} fill="#FFFFFF" letterSpacing="-0.6">UpCanopy</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={36 + i * 40} y="170" width="32" height="8" fill={i === 0 ? '#26CF7B' : '#2A3A78'} />
      ))}
    </g>
  );
}
