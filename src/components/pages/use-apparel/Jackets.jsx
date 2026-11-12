import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CastG, StepG } from '@/components/art/Mockup';
import { C, Stage, Cloth, Stitch, ZipG, PullG, Mirror, RibG, symPath } from './parts';

// ---------- silhouettes: right half described, mirrored (centre x = 0, top of the garment at y = 0) ----------
const WB = symPath([
  { x: 0, y: 172 },
  { x: 60, y: 138, c: [24, 172, 50, 160] },
  { x: 240, y: 226, c: [136, 148, 200, 176] },
  { x: 306, y: 592, c: [268, 340, 290, 470] },
  { x: 236, y: 602 },
  { x: 184, y: 336, c: [222, 510, 204, 420] },
  { x: 174, y: 590, c: [181, 420, 179, 500] },
  { x: 0, y: 596, c: [120, 600, 60, 598] },
]);
const PF = symPath([
  { x: 0, y: 150 },
  { x: 66, y: 128, c: [26, 150, 52, 140] },
  { x: 230, y: 205, c: [130, 128, 190, 160] },
  { x: 300, y: 560, c: [275, 320, 292, 440] },
  { x: 232, y: 572 },
  { x: 190, y: 330, c: [226, 480, 208, 400] },
  { x: 186, y: 590, c: [194, 430, 192, 520] },
  { x: 0, y: 600, c: [130, 600, 60, 604] },
]);
const HD = symPath([
  { x: 0, y: 150 },
  { x: 62, y: 134, c: [22, 150, 46, 142] },
  { x: 236, y: 214, c: [134, 140, 196, 170] },
  { x: 292, y: 590, c: [270, 330, 284, 470] },
  { x: 232, y: 598 },
  { x: 186, y: 340, c: [220, 510, 204, 420] },
  { x: 180, y: 560, c: [184, 430, 184, 500] },
  { x: 0, y: 566, c: [120, 568, 60, 568] },
]);

export const WB_COLOURWAYS = [
  { id: 'navy', shell: C.navy, trim: C.green, ink: C.white, mark: C.green },
  { id: 'dark', shell: C.dark, trim: C.green, ink: C.white, mark: C.green },
];
export const PF_COLOURWAYS = [
  { id: 'navy', shell: C.navy, lining: C.green, ink: C.white, mark: C.mint },
  { id: 'white', shell: C.white, lining: C.navy, ink: C.navy, mark: C.green },
];
export const HD_COLOURWAYS = [
  { id: 'navy', shell: C.navy, thread: C.white, mark: C.green },
  { id: 'green', shell: C.green, thread: C.navy, mark: C.navy },
];

// ---------- 1. hooded windbreaker (m21) ----------
const HOOD = 'M-98 164C-108 84 -64 8 0 4C64 8 108 84 98 164Z';
const HOOD_OPEN = 'M-58 144C-64 70 -40 30 0 26C40 30 64 70 58 144Q0 170 -58 144Z';
const HOOD_ARCH = 'M-58 144C-64 70 -40 30 0 26C40 30 64 70 58 144';

export function WindbreakerG({ idp, k, cw, lit = false, cast = true }) {
  const p = `${idp}-${k}`;
  const fab = `url(#${idp}-fabric)`;
  return (
    <g>
      <defs>
        <radialGradient id={`${p}-in`} cx="0.62" cy="0.78" r="0.85">
          <stop offset="0" stopColor="#162557" />
          <stop offset="1" stopColor="#0C1445" />
        </radialGradient>
      </defs>
      {cast && <CastG d={WB} depth={26} />}
      <g className={lit ? 'mock-lit' : undefined}>
        <Cloth idp={idp} id={`${k}-hood`} d={HOOD} fill={cw.shell} folds={['M-70 60C-84 100 -86 130 -80 160', 'M70 70C84 104 88 134 84 160']}>
          <path d="M0 4C4 60 4 110 0 160" stroke="#000" strokeOpacity="0.25" strokeWidth="2" fill="none" />
        </Cloth>
        <path d={HOOD_OPEN} fill={`url(#${p}-in)`} />
        <path d="M-40 138C-44 80 -20 50 0 46C20 50 44 80 40 138" fill="#fff" opacity="0.05" />
        <path d={HOOD_OPEN} fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="14" strokeDasharray="0 0" opacity="0" />
        <path d={HOOD_ARCH} fill="none" stroke={cw.trim} strokeWidth="5" />
        <path d={HOOD_ARCH} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="1" transform="translate(-1.5 -1.5)" />
        <Cloth
          idp={idp}
          id={`${k}-body`}
          d={WB}
          fill={cw.shell}
          folds={[
            'M-70 160C-116 210 -150 270 -170 336',
            'M120 232C100 300 70 380 90 470',
            'M-150 420C-90 450 -50 470 -20 540',
            'M240 260C250 330 262 400 270 470',
            'M-244 262C-256 330 -268 400 -276 470',
            'M40 380C70 430 60 500 40 560',
          ]}
        >
          <Mirror>
            <Stitch d="M62 140C110 200 160 270 184 336" o={0.28} dash="4 2.6" />
            <RibG d="M236 602L306 592L303 560L230 570Z" mid="M233 586L304 577" />
            <Stitch d="M232 562L304 552" o={0.35} />
          </Mirror>
          <Stitch d="M-172 574C-60 579 60 579 172 574" o={0.35} />
          <ZipG d="M0 152C-6 300 -8 450 -4 596" tape={cw.trim} teeth={cw.trim} />
          <PullG idp={idp} x={-1} y={166} />
          <ZipG d="M-148 505C-152 530 -150 556 -146 576" tape={cw.trim} teeth={cw.trim} w={3.5} />
          <ZipG d="M148 508C152 534 150 560 154 580" tape={cw.trim} teeth={cw.trim} w={3.5} />
          <g transform="translate(-130 232) rotate(-7)">
            <MarkG size={44} fill={cw.mark} filter={fab} />
          </g>
          <g transform="translate(64 292) rotate(11)">
            <WordmarkG size={25} fill={cw.ink} filter={fab} />
          </g>
        </Cloth>
      </g>
    </g>
  );
}

// ---------- 2. puffer jacket, open (m27) ----------
// Horizontal quilting tubes: a seam, a soft highlight on each tube.
function Quilt({ idp, x0, x1, y0, y1, step, bow = 9, slant = 0, hi = 0.12 }) {
  const rows = [];
  for (let y = y0; y <= y1; y += step) rows.push(y);
  return rows.map((y) => (
    <g key={y}>
      <path d={`M${x0} ${y + step * 0.46}Q${(x0 + x1) / 2} ${y + step * 0.46 + bow} ${x1} ${y + step * 0.46 + slant}`} fill="none" stroke="#fff" strokeOpacity={hi} strokeWidth={step * 0.3} filter={`url(#${idp}-blur)`} />
      <path d={`M${x0} ${y}Q${(x0 + x1) / 2} ${y + bow} ${x1} ${y + slant}`} fill="none" stroke="#000" strokeOpacity="0.38" strokeWidth="2.4" />
      <path d={`M${x0} ${y + 3}Q${(x0 + x1) / 2} ${y + bow + 3} ${x1} ${y + slant + 3}`} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.3" />
    </g>
  ));
}

const WEDGE = 'M-30 138L30 138L80 598C20 606 -80 606 -154 598Z';
const STRIP = 'M-30 138L-46 138L-190 594L-154 598Z';
const PF_TEXT = 'M130 572Q96 392 80 192';

export function PufferG({ idp, k, cw, lit = false, cast = true }) {
  const p = `${idp}-${k}`;
  const blur = `url(#${idp}-blur)`;
  return (
    <g>
      <defs>
        <linearGradient id={`${p}-cav`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <path id={`${p}-text`} d={PF_TEXT} />
      </defs>
      {cast && <CastG d={PF} depth={26} />}
      <g className={lit ? 'mock-lit' : undefined}>
        {/* stand collar: navy outside, lining inside, dark cavity */}
        <Cloth idp={idp} id={`${k}-collar`} d="M-72 138C-70 92 -36 70 0 70C36 70 70 92 72 138L40 160L-40 160Z" fill={cw.shell} />
        <Cloth idp={idp} id={`${k}-liner`} d="M-54 134C-52 102 -28 86 0 86C28 86 52 102 54 134C30 152 -30 152 -54 134Z" fill={cw.lining}>
          <ellipse cx="0" cy="124" rx="40" ry="26" fill="#000" opacity="0.4" filter={blur} />
        </Cloth>
        <Cloth
          idp={idp}
          id={`${k}-body`}
          d={PF}
          fill={cw.shell}
          hi={0.2}
          folds={['M-190 250C-160 300 -150 350 -160 410', 'M180 320C150 380 160 440 190 500', 'M-250 230C-262 300 -276 380 -284 450']}
        >
          <Quilt idp={idp} x0={-190} x1={190} y0={150} y1={560} step={62} />
          <Mirror>
            <Quilt idp={idp} x0={186} x1={306} y0={232} y1={540} step={62} slant={14} bow={5} />
          </Mirror>
          {/* right welt pocket, slanted with the panel */}
          <path d="M112 420L146 414L176 520L142 528Z" fill="#000" opacity="0.18" />
          <Stitch d="M112 420L146 414L176 520L142 528Z" o={0.3} dash="4 2.6" />
          <g transform="translate(-238 236) rotate(-14)">
            <MarkG size={32} fill={cw.mark} />
          </g>
          <Stitch d="M-184 580C-60 590 60 592 184 580" o={0.3} />
        </Cloth>
        {/* the open front: lining, cavity, quilted */}
        <path d={WEDGE} fill={cw.lining} filter={`url(#${idp}-fabric)`} />
        <clipPath id={`${p}-wedge`}>
          <path d={WEDGE} />
        </clipPath>
        <g clipPath={`url(#${p}-wedge)`}>
          <Quilt idp={idp} x0={-160} x1={84} y0={250} y1={590} step={56} bow={10} hi={0.18} />
          <path d={WEDGE} fill={`url(#${p}-cav)`} />
          <path d="M-90 280C-60 360 -20 430 -10 520" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" filter={blur} />
          <path d={WEDGE} fill={`url(#${idp}-shade)`} />
        </g>
        {/* the left front folded back: lining face shows */}
        <path d={STRIP} fill={cw.lining} filter={`url(#${idp}-fabric)`} />
        <path d={STRIP} fill={`url(#${idp}-shade-v)`} />
        <Stitch d="M-38 142L-174 590" o={0.35} />
        <ZipG d="M-30 138L-154 598" tape={cw.shell} teeth="#C9CFCC" w={4} />
        <ZipG d="M30 138L80 598" tape={cw.shell} teeth="#C9CFCC" w={4} />
        <PullG idp={idp} x={66} y={540} rot={8} />
        {/* UpCanopy runs up the front edge, following the puff of the panel */}
        <text fontSize="52" fontWeight="500" fill={cw.ink} letterSpacing={-3.9} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>
          <textPath href={`#${p}-text`}>UpCanopy</textPath>
        </text>
      </g>
    </g>
  );
}

// ---------- 3. pullover hoodie ----------
const COWL = 'M-98 168C-104 96 -60 52 0 50C60 52 104 96 98 168C60 192 -60 192 -98 168Z';
const COWL_IN = 'M-54 150C-56 112 -30 92 0 92C30 92 56 112 54 150C30 178 -30 178 -54 150Z';

export function HoodieG({ idp, k, cw, lit = false, cast = true }) {
  const p = `${idp}-${k}`;
  const fab = `url(#${idp}-fabric)`;
  return (
    <g>
      <defs>
        <radialGradient id={`${p}-in`} cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#000" stopOpacity="0.62" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {cast && <CastG d={HD} depth={26} />}
      <g className={lit ? 'mock-lit' : undefined}>
        <Cloth
          idp={idp}
          id={`${k}-body`}
          d={HD}
          fill={cw.shell}
          folds={[
            'M-70 200C-116 250 -150 300 -170 350',
            'M110 250C96 320 80 380 96 450',
            'M-150 450C-90 480 -50 490 -20 520',
            'M240 270C250 340 260 410 266 480',
            'M-236 270C-248 340 -260 410 -268 480',
          ]}
        >
          <Mirror>
            <Stitch d="M62 140C110 200 160 270 184 336" c={cw.thread} o={0.4} dash="4 2.6" />
            <RibG d="M232 598L292 590L290 556L226 566Z" mid="M229 582L291 573" />
            <Stitch d="M228 556L291 546" c={cw.thread} o={0.4} />
          </Mirror>
          {/* rib hem and kangaroo pocket */}
          <RibG d="M-182 534C-60 538 60 538 182 534L180 566C60 568 -60 568 -180 560Z" mid="M-180 550C-60 553 60 553 180 550" width={30} />
          <Stitch d="M-182 532C-60 536 60 536 182 532" c={cw.thread} o={0.4} />
          <path d="M-118 396L118 396L140 512L-140 512Z" fill="#000" opacity="0.12" />
          <path d="M-118 396L118 396L140 512L-140 512Z" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
          <Stitch d="M-112 404L112 404L132 504L-132 504Z" c={cw.thread} o={0.45} dash="4 2.6" />
          <g transform="translate(-136 250) rotate(-6)">
            <MarkG size={46} fill={cw.mark} filter={fab} />
          </g>
        </Cloth>
        {/* the hood, down, as a cowl around the neck */}
        <Cloth idp={idp} id={`${k}-cowl`} d={COWL} fill={cw.shell} folds={['M-80 150C-60 176 -20 184 0 184', 'M80 148C60 176 30 184 6 184']}>
          <path d={COWL_IN} fill={cw.shell} />
          <path d={COWL_IN} fill={`url(#${p}-in)`} />
          <path d={COWL_IN} fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="4" />
          <Stitch d="M-96 160C-60 186 60 186 96 160" c={cw.thread} o={0.35} />
        </Cloth>
        {/* drawcords with metal eyelets and aglets */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M${s * 24} 178C${s * 30} 214 ${s * 20} 250 ${s * 28} 296`} fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="5" transform="translate(2 3)" />
            <path d={`M${s * 24} 178C${s * 30} 214 ${s * 20} 250 ${s * 28} 296`} fill="none" stroke={C.white} strokeWidth="4" />
            <rect x={s * 28 - 3} y="294" width="6" height="16" fill={`url(#${idp}-metal)`} />
            <circle cx={s * 24} cy="176" r="6.5" fill={`url(#${idp}-metal)`} stroke="#000" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={s * 24} cy="176" r="2.6" fill="#000" opacity="0.7" />
          </g>
        ))}
      </g>
    </g>
  );
}

// ---------- the three mockups: hero garment plus a second colourway stepping up-right, cropped ----------
const ROW = { x: [250, 700], y: [118, -64] };

function JacketSheet({ idp, title, exportName, Garment, ways, tilt = [-3, 4] }) {
  return (
    <Stage idp={idp} w={900} h={780} title={title} exportName={exportName} horizon={0.7}>
      <StepG i={1} x={ROW.x[1]} y={ROW.y[1]} rotate={tilt[1]}>
        <g transform="scale(0.9)">
          <Garment idp={idp} k="b" cw={ways[1]} />
        </g>
      </StepG>
      <StepG i={0} x={ROW.x[0]} y={ROW.y[0]} rotate={tilt[0]}>
        <g transform="scale(0.98)">
          <Garment idp={idp} k="a" cw={ways[0]} lit />
        </g>
      </StepG>
    </Stage>
  );
}

export function WindbreakerSheet() {
  return <JacketSheet idp="use-apparel-windbreaker" title="Hooded windbreaker" exportName="use-apparel-windbreaker" Garment={WindbreakerG} ways={WB_COLOURWAYS} />;
}
export function PufferSheet() {
  return <JacketSheet idp="use-apparel-puffer" title="Puffer jacket, open" exportName="use-apparel-puffer" Garment={PufferG} ways={PF_COLOURWAYS} />;
}
export function HoodieSheet() {
  return <JacketSheet idp="use-apparel-hoodie" title="Pullover hoodie" exportName="use-apparel-hoodie" Garment={HoodieG} ways={HD_COLOURWAYS} />;
}
