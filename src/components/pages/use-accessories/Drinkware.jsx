// Mugs, bottles (m29), the cup with its sleeve, and the coaster row with the puck (m11).
import { MarkG, LockupG, WordmarkG } from '@/components/art/Mark';
import { CastG, ShadowG, StepG } from '@/components/art/Mockup';
import { C, Scene, Cast, cylPath } from './parts';

/* ---------- mugs ---------- */
function Mug({ ids, id, r = 96, h = 170, body, art }) {
  const p = `${ids.p}-mug${id}`;
  const ry = r * 0.36, rc = r * 1.3, rcy = rc * 0.36;
  const bodyD = cylPath(-r, -h, 2 * r, h, ry);
  const coasterD = cylPath(-rc, 0, 2 * rc, 9, rcy);
  const handle = `M${r - 4} ${-h + 36}C${r + 70} ${-h + 30} ${r + 66} ${-h * 0.3} ${r - 6} ${-h * 0.3 - 4}`;
  return (
    <g>
      <linearGradient id={`${p}-in`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7C8A86" /><stop offset="0.5" stopColor="#DDE6DA" /><stop offset="1" stopColor="#F8FFF0" />
      </linearGradient>
      <clipPath id={`${p}-clip`}><path d={bodyD} /></clipPath>
      <ShadowG idp={p} cx={0} cy={12} rx={rc * 1.15} blur={10} />
      <CastG d={coasterD} depth={12} />
      <path d={coasterD} fill={C.ink} />
      <path d={coasterD} fill={`url(#${ids.m}-shade)`} />
      <ellipse cx="0" cy="0" rx={rc} ry={rcy} fill={`url(#${ids.m}-rubber)`} />
      <ellipse cx="0" cy="0" rx={rc - 4} ry={rcy - 1.5} fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.5" />
      <path d={handle} fill="none" stroke={body} strokeWidth="17" />
      <path d={handle} fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="17" strokeDasharray="0 0" transform="translate(3 3)" />
      <path d={handle} fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="3.5" transform="translate(-2 -3)" />
      <path d={bodyD} fill={body} />
      <g clipPath={`url(#${p}-clip)`}>
        <g transform={`translate(-4 ${-h * 0.46}) scale(0.9 1)`}>{art}</g>
        <rect x={-r} y={-h - ry} width={2 * r} height={h + 2 * ry + 6} fill={`url(#${ids.m}-shade)`} />
        <rect x={-r + r * 0.24} y={-h + 10} width={r * 0.13} height={h - 20} rx={r * 0.06} fill="#fff" opacity="0.26" />
        <rect x={r * 0.62} y={-h + 14} width="3" height={h - 30} fill="#fff" opacity="0.1" />
      </g>
      <ellipse cx="0" cy={-h} rx={r} ry={ry} fill={body} />
      <ellipse cx="0" cy={-h} rx={r} ry={ry} fill="#fff" opacity="0.16" />
      <ellipse cx="0" cy={-h} rx={r - 7} ry={ry - 3} fill={`url(#${p}-in)`} />
      <path d={`M${-r + 7} ${-h}A${r - 7} ${ry - 3} 0 0 1 ${r - 7} ${-h}`} fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
      <ellipse cx="0" cy={-h} rx={r} ry={ry} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.3" />
    </g>
  );
}

const navyArt = <MarkG x={-28} y={-28} size={56} fill={C.green} />;
const mintArt = <LockupG x={-62} y={-9} scale={0.31} fill={C.navy} markFill={C.navy} />;

export function MugNavy() {
  return (
    <Scene k="mug-navy" title="Navy mug on a coaster with the Green Park mark" size="narrow">
      {(ids) => (
        <>
          <StepG i={1} x={440} y={330}><Mug ids={ids} id="b" body={C.mint} art={mintArt} /></StepG>
          <StepG i={0} x={190} y={520}><Mug ids={ids} id="a" body={C.navy} art={navyArt} /></StepG>
        </>
      )}
    </Scene>
  );
}

export function MugMint() {
  return (
    <Scene k="mug-mint" title="Mint mug on a coaster with the navy lockup" size="wide">
      {(ids) => (
        <>
          <StepG i={1} x={560} y={400}><Mug ids={ids} id="b" r={112} h={196} body={C.mint} art={mintArt} /></StepG>
          <StepG i={0} x={140} y={600}><Mug ids={ids} id="a" r={112} h={196} body={C.navy} art={navyArt} /></StepG>
        </>
      )}
    </Scene>
  );
}

/* ---------- bottles ---------- */
const BODY = 'M-28 60L28 60L28 96C28 130 48 128 48 160L48 386Q48 400 34 400L-34 400Q-48 400 -48 386L-48 160C-48 128 -28 130 -28 96Z';

function Bottle({ ids, id, body, ring, cap, ink }) {
  const clip = `${ids.p}-bclip-${id}`;
  return (
    <g>
      <clipPath id={clip}><path d={BODY} /></clipPath>
      <path d="M20 8C92 -34 100 52 34 36" fill="none" stroke={cap} strokeWidth="6" />
      <path d="M20 8C92 -34 100 52 34 36" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" transform="translate(-1 -1)" />
      <path d={BODY} fill={body} />
      <g clipPath={`url(#${clip})`}>
        <g transform="translate(0 392) rotate(-90)">
          <MarkG x={0} y={-14} size={28} fill={C.green} />
          <WordmarkG x={40} y={10} size={29} fill={ink} />
        </g>
        <rect x="-50" y="56" width="100" height="350" fill={`url(#${ids.m}-shade)`} />
        <rect x="-50" y="56" width="100" height="350" fill={`url(#${ids.m}-shade)`} opacity="0.7" />
        <rect x="-38" y="170" width="7" height="210" rx="3.5" fill="#fff" opacity="0.3" />
        <rect x="-26" y="170" width="2.5" height="200" fill="#fff" opacity="0.12" />
        <rect x="38" y="170" width="3" height="205" fill="#fff" opacity="0.14" />
        <rect x="-50" y="386" width="100" height="14" fill="#000" opacity="0.3" />
        <path d="M-28 96C-28 128 -48 128 -48 160" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" />
      </g>
      <rect x="-31" y="0" width="62" height="49" rx="5" fill={cap} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-27 + i * 6.6} y="3" width="1.6" height="43" fill="#000" opacity="0.16" />)}
      <rect x="-31" y="0" width="62" height="49" rx="5" fill={`url(#${ids.m}-shade)`} />
      <rect x="-24" y="3" width="5" height="43" fill="#fff" opacity="0.2" />
      <rect x="-31" y="48" width="62" height="14" fill={ring} />
      <rect x="-31" y="48" width="62" height="14" fill={`url(#${ids.m}-shade)`} />
      <rect x="-26" y="49.5" width="52" height="2.4" fill="#fff" opacity="0.5" />
    </g>
  );
}

function Lying({ ids, id, i, x, y, rot = 35, s = 1, ...bottle }) {
  return (
    <StepG i={i} x={x} y={y}>
      <g transform={`scale(${s})`}>
        <g transform={`rotate(${rot})`}>
          <ShadowG idp={`${ids.p}-bsh${id}`} cx={14} cy={236} rx={34} ry={176} opacity={0.34} blur={10} />
        </g>
        <g transform={`translate(24 28) rotate(${rot})`} fill={C.dark} opacity="0.22">
          <path d={BODY} /><rect x="-31" y="0" width="62" height="62" />
        </g>
        <g transform={`rotate(${rot})`}><Bottle ids={ids} id={id} {...bottle} /></g>
      </g>
    </StepG>
  );
}

const NAVY_B = { body: C.navy, ring: C.green, cap: C.deep, ink: '#FFFFFF' };
const GREEN_B = { body: C.green, ring: C.navy, cap: C.navy, ink: C.navy };

export function BottleNavy() {
  return (
    <Scene k="bottle-navy" title="Navy steel bottle with the white word-mark and a Green Park ring" size="wide">
      {(ids) => (
        <>
          <Lying ids={ids} id="b" i={1} x={930} y={-40} s={1.2} {...GREEN_B} />
          <Lying ids={ids} id="a" i={0} x={560} y={50} s={1.4} {...NAVY_B} />
        </>
      )}
    </Scene>
  );
}

export function BottleGreen() {
  return (
    <Scene k="bottle-green" title="Green Park steel bottle with navy type and a navy ring" size="narrow">
      {(ids) => (
        <>
          <Lying ids={ids} id="b" i={1} x={560} y={-90} s={1.05} {...NAVY_B} />
          <Lying ids={ids} id="a" i={0} x={330} y={70} s={1.05} {...GREEN_B} />
        </>
      )}
    </Scene>
  );
}

/* ---------- cup with sleeve ---------- */
function Cup({ ids, id, sleeve, markFill, word }) {
  const p = `${ids.p}-cup${id}`;
  const rAt = (y) => 88 - (26 * y) / 250;
  const body = `M-88 0L-62 250A62 18 0 0 0 62 250L88 0Z`;
  const [y0, y1] = [92, 192];
  const [ra, rb] = [rAt(y0), rAt(y1)];
  const sl = `M${-ra} ${y0}L${-rb} ${y1}A${rb} ${rb * 0.29} 0 0 0 ${rb} ${y1}L${ra} ${y0}A${ra} ${ra * 0.29} 0 0 1 ${-ra} ${y0}Z`;
  return (
    <g>
      <clipPath id={`${p}-sl`}><path d={sl} /></clipPath>
      <ShadowG idp={p} cx={6} cy={254} rx={96} blur={10} />
      <Cast d="M-62 246L62 246L150 270L-20 280Z" depth={4} opacity={0.2} />
      <path d={body} fill="#FFFFFF" filter={`url(#${ids.m}-paper)`} />
      <path d={body} fill={`url(#${ids.m}-shade)`} />
      <path d={sl} fill={sleeve} />
      <g clipPath={`url(#${p}-sl)`}>
        <g transform={`translate(0 ${y0 + 16}) scale(0.9 1)`}>
          <MarkG x={-15} y={0} size={30} fill={markFill} />
          {word && <WordmarkG x={0} y={58} size={14} fill="#FFFFFF" anchor="middle" />}
        </g>
        <path d={sl} fill={`url(#${ids.m}-shade)`} />
        <path d={sl} fill={`url(#${ids.m}-shade-v)`} opacity="0.6" />
      </g>
      <path d={`M${-ra} ${y0}A${ra} ${ra * 0.29} 0 0 1 ${ra} ${y0}`} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" transform="translate(0 -1)" />
      <rect x="-60" y="30" width="7" height="200" fill="#fff" opacity="0.2" transform="skewX(6)" />
      <path d={cylPath(-94, -22, 188, 22, 26)} fill={`url(#${ids.m}-plastic)`} />
      <path d={cylPath(-94, -22, 188, 22, 26)} fill={`url(#${ids.m}-shade)`} />
      <ellipse cx="0" cy="-22" rx="94" ry="26" fill={`url(#${ids.m}-plastic)`} />
      <ellipse cx="0" cy="-24" rx="76" ry="19" fill="none" stroke="#9DA3A0" strokeOpacity="0.5" strokeWidth="2" />
      <ellipse cx="0" cy="-24" rx="76" ry="19" fill={`url(#${ids.m}-shade)`} />
      <ellipse cx="26" cy="-30" rx="16" ry="5" fill="#1D1D1B" opacity="0.8" />
      <ellipse cx="24" cy="-31" rx="14" ry="3.4" fill="#000" opacity="0.5" />
      <ellipse cx="0" cy="-22" rx="94" ry="26" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
    </g>
  );
}

export function CupSleeve() {
  return (
    <Scene k="cup-sleeve" title="Paper cup with a navy sleeve and a lid" size="narrow">
      {(ids) => (
        <>
          <StepG i={1} x={430} y={150}><Cup ids={ids} id="b" sleeve={C.green} markFill={C.navy} /></StepG>
          <StepG i={0} x={200} y={250}><g transform="scale(1.3)"><Cup ids={ids} id="a" sleeve={C.navy} markFill={C.green} word /></g></StepG>
        </>
      )}
    </Scene>
  );
}

/* ---------- coasters and the puck ---------- */
function Disc({ ids, id, r = 100, t = 12, side, top, mark, glow = false }) {
  const p = `${ids.p}-disc${id}`;
  const ry = r * 0.36;
  const d = cylPath(-r, 0, 2 * r, t, ry);
  const s = r * 0.9;
  return (
    <g>
      <filter id={`${p}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
      <ShadowG idp={p} cx={4} cy={t + 4} rx={r * 1.15} blur={9} />
      <CastG d={d} depth={t > 20 ? 26 : 14} />
      <path d={d} fill={side} />
      <path d={d} fill={`url(#${ids.m}-shade)`} />
      <ellipse cx="0" cy="0" rx={r} ry={ry} fill={glow ? `url(#${ids.m}-plastic)` : top} />
      {glow && <ellipse cx="0" cy="0" rx={r * 0.8} ry={ry * 0.8} fill={top} />}
      <g transform="scale(1 0.36)">
        {glow && <MarkG x={-s / 2} y={-s / 2} size={s} fill={C.green} filter={`url(#${p}-glow)`} opacity="0.9" />}
        <MarkG x={-s / 2} y={-s / 2} size={s} fill={mark} />
      </g>
      <ellipse cx="0" cy="0" rx={r} ry={ry} fill={`url(#${ids.m}-glass)`} opacity="0.7" />
      <path d={`M${-r} 0A${r} ${ry} 0 0 0 ${r} 0`} fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
      <path d={`M${-r} 0A${r} ${ry} 0 0 1 ${r} 0`} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
    </g>
  );
}

export function CoasterRow() {
  return (
    <Scene k="coasters-puck" title="The glowing puck and a row of round coasters stepping right" size="wide">
      {(ids) => (
        <>
          <StepG i={3} x={910} y={260}><Disc ids={ids} id="d" side={C.green} top={C.green} mark={C.dark} /></StepG>
          <StepG i={2} x={650} y={340}><Disc ids={ids} id="c" side={C.paper} top={C.mint} mark={C.navy} /></StepG>
          <StepG i={1} x={390} y={420}><Disc ids={ids} id="b" side={C.deep} top={C.navy} mark={C.green} /></StepG>
          <StepG i={0} x={140} y={480}><Disc ids={ids} id="a" r={110} t={46} side="#FFFFFF" top={C.navy} mark={C.green} glow /></StepG>
        </>
      )}
    </Scene>
  );
}
