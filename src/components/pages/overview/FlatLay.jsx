import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG } from '@/components/art/Mark';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { SweepG, CastG, MaterialDefs, StepG } from '@/components/art/Mockup';
import { LINES, CONTACT, DOCUMENT, PEOPLE, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// The designer's stationery flat lay (reference m01), rebuilt as one isometric SVG.
// Every object is a flat sheet drawn in "plane" coordinates (u to the upper right, v to the lower right) and
// mapped onto the table with one matrix. Shadows fall to the lower right, steps slide in along the diagonal.
const A = 0.93, B = -0.37, C = 0.62, D = 0.78;
const PLANE = `matrix(${A} ${B} ${C} ${D} 0 0)`;
const quad = (w, h) => `M0 0L${r2(A * w)} ${r2(B * w)}L${r2(A * w + C * h)} ${r2(B * w + D * h)}L${r2(C * h)} ${r2(D * h)}Z`;
const rect = (w, h) => `M0 0H${w}V${h}H0Z`;
const IDP = 'overview-fl';
const NAVY = HEX.navy, GREEN = HEX.green;

// A sheet with thickness: cast shadow, painted edges, the face, then its artwork in plane space (clipped to the sheet).
function Slab({ id, w, h, top, edges = [], cast = 26, grain = true, shade = 0.5, children }) {
  return (
    <g>
      <CastG d={quad(w, h)} depth={cast} opacity={0.24} />
      {edges.map((e, k) => (
        <g key={k}>
          {Array.from({ length: 4 }, (_, j) => (
            <path key={j} d={quad(w, h)} transform={`translate(0 ${r2(e.t * (1 - j / 4))})`} fill={e.fill} />
          ))}
        </g>
      ))}
      <path d={quad(w, h)} fill={top} filter={grain ? `url(#${IDP}-grain)` : undefined} />
      <g transform={PLANE}>
        <clipPath id={`${IDP}-${id}-clip`}><path d={rect(w, h)} /></clipPath>
        <g clipPath={`url(#${IDP}-${id}-clip)`}>{children}</g>
      </g>
      <path d={quad(w, h)} fill={`url(#overview-fm-shade-v)`} opacity={shade} />
    </g>
  );
}

const Rows = ({ rows, x, y, size, lh = 1.22, anchor = 'start', fill, strongFill, strongLast = true, weight = 300 }) => (
  <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} lang="pt-BR">
    {rows.map((t, i) => (
      <tspan key={i} x={x} dy={i ? size * lh : 0} fontWeight={strongLast && i === rows.length - 1 ? 700 : weight} fill={strongLast && i === rows.length - 1 ? strongFill || fill : fill}>{t}</tspan>
    ))}
  </text>
);

export default function FlatLay() {
  return (
    <Art viewBox="0 0 1600 900" title="Stationery flat lay: envelope, letterhead, document box, folders, cards, tube and invoice on pale mint" exportName="overview-flatlay" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <BrandDefs idp={IDP} />
      <MaterialDefs idp="overview-fm" />
      <defs>
        <linearGradient id={`${IDP}-mintsheet`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#D5F8E3" />
          <stop offset="1" stopColor="#8CE8B8" />
        </linearGradient>
        <linearGradient id={`${IDP}-mintfolder`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F2FFF6" />
          <stop offset="1" stopColor="#A5EBC6" />
        </linearGradient>
        <linearGradient id={`${IDP}-label`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#EEF2E9" />
          <stop offset="1" stopColor="#B9C2B7" />
        </linearGradient>
      </defs>
      <SweepG idp={IDP} w={1600} h={900} horizon={0.7} />

      {/* envelope */}
      <StepG i={0} x={-160} y={190}>
        <Slab id="env" w={520} h={300} top={NAVY} edges={[{ t: 10, fill: '#0C1445' }]}>
          <rect width="520" height="46" fill="#0E1A4A" />
          <rect y="46" width="520" height="3" fill="#0C1445" />
          <MarkG x={330} y={8} size={30} fill={GREEN} />
          <WordmarkG x={366} y={32} size={22} fill="#FFFFFF" />
          <text x="490" y="258" fontSize="25" fill="#FFFFFF" textAnchor="end" fontWeight="300">{CONTACT.phone}</text>
          <text x="490" y="286" fontSize="25" fill="#FFFFFF" textAnchor="end" fontWeight="300">{CONTACT.web}</text>
        </Slab>
      </StepG>

      {/* mint letterhead */}
      <StepG i={1} x={440} y={170}>
        <Slab id="letter" w={500} h={200} top={`url(#${IDP}-mintsheet)`} edges={[{ t: 8, fill: '#3FCB86' }]} cast={20}>
          <rect y="22" width="140" height="3" fill={NAVY} />
          <text x="26" y="18" fontSize="13" fontWeight="700" fill={NAVY}>{DOCUMENT.labels[3]}</text>
          <text x="26" y="150" fontSize="15" fontWeight="700" fill={NAVY}>{DOCUMENT.labels[0]}</text>
          <text x="26" y="172" fontSize="12" fill={NAVY}>{DOCUMENT.labels[1]}</text>
          <text x="26" y="190" fontSize="12" fill={NAVY}>{DOCUMENT.labels[2]}</text>
          <text x="112" y="172" fontSize="12" fill={NAVY}>{CONTACT.phone}</text>
          <text x="112" y="190" fontSize="12" fill={NAVY}>{CONTACT.sac}</text>
        </Slab>
      </StepG>

      {/* navy card with the horizontal lockup */}
      <StepG i={2} x={1130} y={290}>
        <Slab id="card" w={300} h={140} top={NAVY} edges={[{ t: 6, fill: '#0C1445' }]} cast={24}>
          <g transform="translate(0 0)"><LockupG x={54} y={50} scale={0.48} fill="#FFFFFF" /></g>
        </Slab>
      </StepG>

      {/* the tube, lying on the table */}
      <StepG i={3} x={0} y={0}>
        <g transform="translate(1055 118) rotate(-24)">
          <rect x="22" y="-52" width="760" height="170" fill={HEX.greenDark} opacity="0.26" />
          <ellipse cx="46" cy="38" rx="40" ry="84" fill={HEX.greenDark} opacity="0.26" />
          <rect x="0" y="-85" width="780" height="170" fill="url(#overview-fl-label)" />
          <rect x="0" y="-85" width="40" height="170" fill="#0B3A30" />
          <rect x="0" y="-85" width="780" height="170" fill="url(#overview-fm-shade-v)" />
          <MarkG x={92} y={-72} size={30} fill={HEX.greenDark} />
          <text x="92" y="-6" fontSize="30" fill="#1D1D1B" fontWeight="300" lang="pt-BR">
            <tspan x="92" dy="0">{LINES.ceo.rows[0]}</tspan>
            <tspan x="92" dy="34">e torne-se o <tspan fontWeight="700">CEO</tspan></tspan>
            <tspan x="92" dy="34">{LINES.ceo.rows[2]}</tspan>
            <tspan x="92" dy="34">de <tspan fontWeight="700">Hardscape</tspan></tspan>
          </text>
          <ellipse cx="0" cy="0" rx="40" ry="85" fill="#08241E" />
          <ellipse cx="4" cy="0" rx="32" ry="75" fill="#020E0B" />
          <ellipse cx="-4" cy="-8" rx="14" ry="40" fill="#FFFFFF" opacity="0.1" />
        </g>
      </StepG>

      {/* the document box: gradient lid, white word-mark along its edge */}
      <StepG i={4} x={600} y={185}>
        <Slab id="box" w={300} h={340} top={`url(#${IDP}-rise)`} edges={[{ t: 46, fill: '#C8CCC6' }, { t: 14, fill: '#14214F' }]} cast={34} shade={0.35}>
          <MarkG x={22} y={22} size={30} fill={GREEN} />
          <Rows rows={LINES.bridge.rows4} x={282} y={340 - 118} size={11} anchor="end" fill="#E8F4EE" strongFill="#FFFFFF" />
          <text x="282" y={340 - 62} fontSize="10" fill="#E8F4EE" textAnchor="end">{CONTACT.phone}</text>
          <text x="282" y={340 - 48} fontSize="10" fill="#E8F4EE" textAnchor="end">{CONTACT.web}</text>
          <WordmarkG x={14} y={340 - 20} size={41} fill="#FFFFFF" />
        </Slab>
      </StepG>

      {/* dark green folder with the frond */}
      <StepG i={5} x={-70} y={470}>
        <Slab id="folder" w={640} h={600} top="#0B3B31" edges={[{ t: 16, fill: '#031812' }]} cast={34}>
          <Rows rows={LINES.bridge.rows4} x={600} y={86} size={37} anchor="end" fill="#DFF7E6" strongFill={GREEN} />
          <FrondG cx={-40} cy={300} r={240} a0={-30} a1={100} count={34} len={380} width={9} lean={78} tone="onDark" fan />
          <text x="600" y="545" fontSize="21" fill="#DFF7E6" textAnchor="end" fontWeight="300">{CONTACT.phone}</text>
          <text x="600" y="571" fontSize="21" fill="#DFF7E6" textAnchor="end" fontWeight="300">{CONTACT.web}</text>
        </Slab>
      </StepG>

      {/* stack of green business cards */}
      <StepG i={6} x={850} y={560}>
        <Slab id="cards" w={205} h={160} top={GREEN} edges={[{ t: 24, fill: '#18A862' }]} cast={22}>
          <text x="14" y="22" fontSize="8" fontWeight="700" fill={NAVY}>{PEOPLE.founder.name}</text>
          <text x="14" y="32" fontSize="6.5" fill={NAVY}>{PEOPLE.founder.role}</text>
          {[CONTACT.handle, CONTACT.phone, CONTACT.hello].map((t, i) => (
            <text key={t} x="14" y={52 + i * 10} fontSize="7" fill={NAVY}>{t}</text>
          ))}
          <rect x="14" y="96" width="92" height="6" rx="1" fill={NAVY} opacity="0.16" />
          <text x="14" y="140" fontSize="7" fontWeight="700" fill={NAVY}>{CONTACT.webCased}</text>
          <WordmarkG x={190} y={30} size={11} fill={NAVY} anchor="end" />
        </Slab>
      </StepG>

      {/* invoice sheet */}
      <StepG i={7} x={675} y={868}>
        <Slab id="invoice" w={550} h={330} top="#F7F9F5" edges={[{ t: 4, fill: '#D5DAD2' }]} cast={22} grain={false}>
          <LockupG x={300} y={30} scale={0.36} fill={NAVY} />
          <text x="230" y="205" fontSize="14" fill={NAVY}>{DOCUMENT.invoice[0]}</text>
          <text x="230" y="224" fontSize="14" fill={NAVY}>{DOCUMENT.invoice[1]}</text>
          <text x="470" y="182" fontSize="15" fontWeight="700" fill="#086338">{DOCUMENT.invoice[2]}</text>
          <rect x="230" y="240" width="170" height="6" fill={NAVY} opacity="0.12" />
          <rect x="470" y="196" width="90" height="6" fill={NAVY} opacity="0.12" />
        </Slab>
      </StepG>

      {/* mint folder with the dot texture */}
      <StepG i={8} x={1112} y={490}>
        <Slab id="mint" w={620} h={400} top={`url(#${IDP}-mintfolder)`} edges={[{ t: 14, fill: '#A9D9C0' }]} cast={30}>
          <rect width="620" height="400" fill={`url(#${IDP}-dots)`} />
          <MarkG x={44} y={42} size={68} fill={NAVY} />
          <Rows rows={LINES.bridge.rows4.slice(0, 3)} x={400} y={70} size={38} fill={NAVY} strongLast={false} />
          <text x="290" y="372" fontSize="17" fill={NAVY}>{CONTACT.footer}</text>
        </Slab>
      </StepG>

      {/* a green card peeking in at the lower edge */}
      <StepG i={9} x={512} y={900}>
        <Slab id="peek" w={150} h={110} top={GREEN} edges={[{ t: 12, fill: '#18A862' }]} cast={16} />
      </StepG>
    </Art>
  );
}

