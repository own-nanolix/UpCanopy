// The designer's flat lay (reference m01) rebuilt as one isometric SVG on pale mint: one projection for the
// whole plate, hard shadows to the lower right, every piece cropped by the frame.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import { MaterialDefs, StepG } from '@/components/art/Mockup';
import { LINES, CONTACT, DOCUMENT, PALETTE } from '@/lib/brand';
import { ID, C, IsoG, Block, CastBlock, Rich, Lines } from './parts';
import { CardBackG } from './Artwork';

const P = `${ID}-fl`;
const B = `${P}b`;
const PAPER = `url(#${P}-paper)`;
const GRAIN = `url(#${B}-grain)`;
const PAL = Object.fromEntries(PALETTE.map((p) => [p.token, p.hex]));

function Envelope() {
  const x = -760, y = -440, w = 779, d = 389;
  return (
    <StepG i={0}>
      <CastBlock x={x} y={y} w={w} d={d} len={7} />
      <Block x={x} y={y} w={w} d={d} h={5} leftFill="#0F1B45" bottomFill="#101C4A" lines={2} lineColor="rgba(255,255,255,0.18)">
        <rect width={w} height={d} fill="#1C2C78" filter={GRAIN} />
        <rect width={w} height={d} fill={`url(#${P}-env-shade)`} />
        <path d={`M0 52L${w} 8V30L0 78Z`} fill="#0B1540" opacity="0.8" />
        <path d={`M0 52L${w} 8`} stroke="#4A5CB0" strokeWidth="1.4" opacity="0.8" />
        <MarkG x={618} y={92} size={30} fill={C.green} />
        <WordmarkG x={660} y={120} size={27} fill={C.white} weight={400} />
        <Lines rows={[CONTACT.phone, CONTACT.web]} x={w - 36} y={d - 66} size={20} lh={1.3} fill={C.white} anchor="end" />
      </Block>
    </StepG>
  );
}

function MintLetter() {
  const x = 90, y = -440, w = 670, d = 391;
  return (
    <StepG i={1}>
      <CastBlock x={x} y={y} w={w} d={d} len={18} />
      <Block x={x} y={y} w={w} d={d} h={13} leftFill="#27C97F" bottomFill="#31D088" lines={6} lineColor="rgba(5,46,37,0.3)">
        <rect width={w} height={d} fill={`url(#${P}-mintsheet)`} filter={PAPER} />
        <path d={`M30 ${d - 196}H250`} stroke={C.navy} strokeWidth="1" opacity="0.7" />
        <text x="36" y={d - 178} fontSize="11" fontWeight="700" fill={C.navy}>{DOCUMENT.labels[3]}</text>
        <text x="30" y={d - 66} fontSize="14" fontWeight="700" fill={C.navy}>{DOCUMENT.labels[0]}</text>
        <Lines rows={[DOCUMENT.labels[1], DOCUMENT.labels[2]]} x={30} y={d - 46} size={10} lh={1.5} fill={C.navy} />
        <Lines rows={[CONTACT.phone, CONTACT.sac]} x={104} y={d - 62} size={9.5} lh={1.5} fill={C.navy} />
      </Block>
    </StepG>
  );
}

function NavyCard() {
  const x = 488, y = 234, w = 306, d = 169;
  return (
    <StepG i={3}>
      <CastBlock x={x} y={y} w={w} d={d} len={9} />
      <Block x={x} y={y} w={w} d={d} h={5} leftFill="#101C4A" bottomFill="#1A2A70" lines={3} lineColor="rgba(255,255,255,0.14)">
        <rect width={w} height={d} fill={C.navy} filter={GRAIN} />
        <LockupG x={72} y={71} scale={0.45} fill={C.white} />
      </Block>
    </StepG>
  );
}

function DarkFolder() {
  const x = -700, y = 0, w = 700, d = 590;
  return (
    <StepG i={1}>
      <CastBlock x={x} y={y} w={w} d={d} len={14} />
      <Block x={x} y={y} w={w} d={d} h={12} leftFill="#0A2A22" bottomFill="#0C3128" lines={4} lineColor="rgba(160,210,190,0.22)">
        <rect width={w} height={d} fill={C.folder} filter={GRAIN} />
        <rect width={w} height={d} fill={`url(#${P}-folder-shade)`} />
        <FrondG cx={742} cy={22} r={606} a0={120} a1={178} count={36} len={190} width={11} lean={186} tone="onDark" />
        <Rich rows={LINES.bridge.rows4} strong="UpCanopy" x={664} y={66} size={31} lh={1.2} fill="#D3EADF" strongFill={C.green} anchor="end" />
        <Lines rows={[CONTACT.phone, CONTACT.web]} x={662} y={548} size={17} lh={1.35} fill="#D3EADF" anchor="end" />
      </Block>
    </StepG>
  );
}

function MintFolder() {
  const x = 343, y = 458, w = 700, d = 440;
  return (
    <StepG i={5}>
      <CastBlock x={x} y={y} w={w} d={d} len={14} />
      <Block x={x} y={y} w={w} d={d} h={12} leftFill="#8FD9B2" bottomFill="#B9E9CF" lines={3} lineColor="rgba(5,46,37,0.2)">
        <rect width={w} height={d} fill={`url(#${P}-mintfolder)`} filter={PAPER} />
        <rect width={w} height={d} fill={`url(#${B}-dots)`} />
        <MarkG x={34} y={32} size={52} fill="#22C878" />
        <Rich rows={LINES.bridge.rows4} strong="UpCanopy" x={398} y={34} size={28} lh={1.2} fill={C.navy} />
        <text x="40" y={d - 44} fontSize="11.5" fontWeight="400" fill={C.navy}>{CONTACT.footer}</text>
      </Block>
    </StepG>
  );
}

function Invoice() {
  const x = -247, y = 655, w = 700, d = 300;
  return (
    <StepG i={4}>
      <CastBlock x={x} y={y} w={w} d={d} len={8} />
      <Block x={x} y={y} w={w} d={d} h={3} leftFill="#D8DCD8" bottomFill="#E4E8E4" lines={2} lineColor="rgba(0,0,0,0.12)">
        <rect width={w} height={d} fill={`url(#${P}-invoice)`} filter={PAPER} />
        <LockupG x={404} y={14} scale={0.3} fill={C.navy} />
        <text x="176" y="104" fontSize="9" fill={C.navy}>{DOCUMENT.invoice[0]}</text>
        <text x="176" y="118" fontSize="9" fill={C.navy}>{DOCUMENT.invoice[1]}</text>
        <text x="456" y="226" fontSize="10" fontWeight="700" fill="#086338">{DOCUMENT.invoice[2]}</text>
        {[0, 1, 2].map((k) => <rect key={k} x="176" y={134 + k * 14} width={150 - k * 30} height="4" fill={C.navy} opacity="0.12" />)}
      </Block>
    </StepG>
  );
}

function GreenStack({ x, y, w, d, h, i, text = true }) {
  const s = w / 350;
  return (
    <StepG i={i}>
      <CastBlock x={x} y={y} w={w} d={d} len={h * 1.3} />
      <Block x={x} y={y} w={w} d={d} h={h} leftFill="#1CAD68" bottomFill="#22C277" lines={Math.round(h / 2.4)} lineColor="rgba(255,255,255,0.32)">
        <rect width={w} height={d} fill={C.green} filter={GRAIN} />
        {text && <g transform={`scale(${s})`}><CardBackG /></g>}
      </Block>
    </StepG>
  );
}

function DocumentBox() {
  const x = 68, y = 43, w = 305, d = 340;
  return (
    <StepG i={2}>
      <CastBlock x={x} y={y} w={w} d={d} len={88} opacity={0.26} />
      <g className="mock-lit">
        <Block x={x} y={y} w={w} d={d} h={62} leftFill="#111E52"
          bands={[{ to: 0.42, fill: '#16265E' }, { to: 0.9, fill: '#CBD2CC' }, { to: 1, fill: '#0F1B45' }]} lines={9} lineColor="rgba(5,20,40,0.16)">
          <rect width={w} height={d} fill={`url(#${B}-rise)`} filter={GRAIN} />
          <MarkG x={20} y={16} size={24} fill={C.green} />
          <Rich rows={LINES.bridge.rows4} strong="UpCanopy" x={20} y={172} size={9} lh={1.25} fill="#D6E2EE" strongFill={C.white} />
          <Lines rows={[CONTACT.phone, CONTACT.web]} x={w - 20} y={246} size={9} lh={1.3} fill="#D6E2EE" anchor="end" />
          <WordmarkG x={18} y={322} size={48} fill={C.white} />
        </Block>
      </g>
    </StepG>
  );
}

function Tube() {
  const L = 760, R = 88;
  const body = `M0 ${-R}H${L}V${R}H0Z`;
  return (
    <>
      <StepG i={4}>
        <g transform="translate(1062 158) rotate(-20)" fill="#052E25" opacity="0.26">
          <path d={body} />
          <ellipse cx="0" cy="0" rx="40" ry={R} />
        </g>
        <g transform="translate(1030 118) rotate(-20)">
          <path d={body} fill="#0E3A30" />
          <rect x="92" y={-R} width={L - 92} height={2 * R} fill="#EDEFE4" filter={PAPER} />
          <rect x="92" y={-R} width="14" height={2 * R} fill="#000000" opacity="0.12" />
          <MarkG x={116} y={-70} size={24} fill={C.asphalt} />
          <Rich rows={LINES.ceo.rows} strong={LINES.ceo.strong} x={150} y={-8} size={21} lh={1.25} fill="#2B2F2E" />
          <rect x="0" y={-R} width={L} height={2 * R} fill={`url(#${P}-shade-v)`} />
          <ellipse cx="0" cy="0" rx="40" ry={R} fill="#0B2D25" />
          <ellipse cx="2" cy="0" rx="32" ry="78" fill={`url(#${P}-bore)`} />
          <path d="M-36 -40A40 88 0 0 1 -10 -84" fill="none" stroke="#9FC8B8" strokeWidth="2.5" opacity="0.5" />
        </g>
      </StepG>
    </>
  );
}

export default function FlatLay() {
  return (
    <Art viewBox="0 0 1600 900" title="Stationery flat lay: envelope, letterhead, document box, tube, cards, folders and invoice" exportName={`${ID}-flat-lay`}>
      <MaterialDefs idp={P} />
      <BrandDefs idp={B} />
      <defs>
        <linearGradient id={`${P}-ground`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6FCEF" />
          <stop offset="1" stopColor={C.ground} />
        </linearGradient>
        <linearGradient id={`${P}-env-shade`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`${P}-mintsheet`} x1="0.2" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#E3FAEC" />
          <stop offset="0.55" stopColor="#B9EFD2" />
          <stop offset="1" stopColor="#5FDCA2" />
        </linearGradient>
        <linearGradient id={`${P}-mintfolder`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#DBF5E6" />
          <stop offset="0.5" stopColor="#B4ECCD" />
          <stop offset="1" stopColor="#72DDA8" />
        </linearGradient>
        <linearGradient id={`${P}-invoice`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBFCFB" />
          <stop offset="1" stopColor="#E9EEEA" />
        </linearGradient>
        <linearGradient id={`${P}-folder-shade`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id={`${P}-bore`} cx="0.6" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#1B2724" />
          <stop offset="1" stopColor="#050A09" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${P}-ground)`} />
      <IsoG ox={510} oy={240}>
        <Envelope />
        <MintLetter />
        <NavyCard />
      </IsoG>
      <Tube />
      <IsoG ox={510} oy={240}>
        <DarkFolder />
        <MintFolder />
        <Invoice />
        <GreenStack x={-420} y={640} w={140} d={80} h={26} i={5} text={false} />
        <GreenStack x={61} y={471} w={200} d={114} h={36} i={3} />
        <DocumentBox />
      </IsoG>
      <rect width="1600" height="900" fill="#FFFFFF" opacity="0.06" />
    </Art>
  );
}

export { PAL };
