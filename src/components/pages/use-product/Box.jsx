// The welcome kit's document box: open and flat (rebuild of reference m28), closed from the front, and from the side.
import Art from '@/components/art/Art';
import { SweepG, CastG, ShadowG, MaterialDefs } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { Letter, Pen, mapPt, poly, shadowOffset, NAVY, GREEN } from './parts';

const BOARD = '#162557';
const EDGE = '#0A1233';

// Box board with fine grain, a light-to-shade overlay and a thin lit edge on the upper-left sides.
function Board({ id, mat, x, y, w, h, grain, tone = BOARD, lit = true }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone} filter={`url(#${grain}-grain)`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-lighten)`} />
      {lit && <path d={`M${x} ${y + h}V${y}H${x + w}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.6" />}
      <rect x={x} y={y} width={w} height={h} fill={`url(#${mat}-shade)`} opacity="0.5" />
    </g>
  );
}

function BoardDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-lighten`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.09" />
        <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0A1233" stopOpacity="0.1" />
        <stop offset="0.5" stopColor="#0A1233" stopOpacity="0.7" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0F1944" />
        <stop offset="1" stopColor="#16235A" />
      </linearGradient>
    </defs>
  );
}

// ---- Open box, flat (hero) ----
// Local space: lid x -300..560, tray 560..1120 (walls 26 wide, floor inset 48), flap 1120..1330; 800 tall.
const T = { tx: 880, ty: 450, deg: 20, ox: 840, oy: 400 };

export function BoxOpen() {
  const id = 'use-product-open';
  const mat = `${id}-m`, br = `${id}-b`;
  const outline = poly([[-300, 0], [1330, 0], [1330, 812], [-300, 812]].map(([x, y]) => mapPt(T.tx, T.ty, T.deg, T.ox, T.oy, x, y)));
  const [sx, sy] = shadowOffset(T.deg, 14);
  return (
    <Art viewBox="0 0 1600 900" title="Document box, open" exportName="use-product-box-open">
      <MaterialDefs idp={mat} />
      <BrandDefs idp={br} />
      <BoardDefs id={id} />
      <SweepG idp={`${id}-s`} w={1600} h={900} horizon={0.7} tint="#F2F5F4" />
      <g className="mock-lit">
        <CastG d={outline} depth={40} opacity={0.2} fill="#0C1445" />
        <g transform={`translate(${T.tx} ${T.ty}) rotate(${T.deg}) translate(${-T.ox} ${-T.oy})`}>
          {/* thickness of the three board panels */}
          <rect x="-300" y="800" width="1630" height="12" fill={EDGE} />
          <rect x="1330" y="14" width="10" height="798" fill={EDGE} />
          {/* lid panel */}
          <Board id={id} mat={mat} grain={br} x={-300} y={0} w={860} h={800} />
          <rect x="520" y="0" width="40" height="800" fill={`url(#${id}-fold)`} />
          <path d="M522 0V800" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.4" />
          {/* tray */}
          <Board id={id} mat={mat} grain={br} x={560} y={0} w={560} h={800} tone="#1A2C66" />
          <path d="M586 26H1094V774H586Z" fill="#0A1233" />
          <path d="M586 26H1094L1072 48H608Z" fill="#0A1138" />
          <path d="M586 26L608 48V752L586 774Z" fill="#0B1540" />
          <path d="M1094 26V774L1072 752V48Z" fill="#2B4590" />
          <path d="M586 774H1094L1072 752H608Z" fill="#33509F" />
          <rect x="608" y="48" width="464" height="704" fill={`url(#${id}-floor)`} />
          <path d="M608 48H1072V92H608Z" fill="#000000" opacity="0.22" />
          <path d="M608 48H650V752H608Z" fill="#000000" opacity="0.16" />
          {/* flap */}
          <rect x="1120" y="0" width="22" height="800" fill={`url(#${id}-fold)`} opacity="0.9" />
          <Board id={id} mat={mat} grain={br} x={1142} y={30} w={188} h={740} />
          <path d="M1142 30V770" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.4" />
          {/* second sheet peeking out beneath the letter */}
          <g transform="translate(623 106)">
            <rect x="26" y="20" width="430" height="640" fill="#F1F3EE" filter={`url(#${mat}-paper)`} />
            <path d="M456 20V660" stroke="#BFC8BC" strokeWidth="2" />
            <path d="M26 660H456" stroke="#BFC8BC" strokeWidth="2" />
          </g>
          {/* the letter, its shadow and the pen */}
          <g transform="translate(626 98) rotate(-1.5 215 320)">
            <g transform={`translate(${sx} ${sy})`} opacity="0.35" filter={`url(#${mat}-soft)`}>
              <rect width="430" height="640" fill="#000814" />
            </g>
            <g transform="translate(0 0) scale(1 1.03)">
              <Letter idp={`${id}-l`} mat={mat} w={430} h={620} />
            </g>
            <g transform="translate(168 96) rotate(10)">
              <Pen idp={`${id}-pen`} mat={mat} L={520} sdeg={T.deg + 8.5} />
            </g>
          </g>
        </g>
      </g>
    </Art>
  );
}

// ---- Closed box from the front ----
export function BoxFront() {
  const id = 'use-product-front';
  const mat = `${id}-m`, br = `${id}-b`;
  const top = [[300, 214], [900, 214], [1010, 500], [190, 500]];
  const lidFront = [[190, 500], [1010, 500], [1010, 578], [190, 578]];
  const tray = [[200, 578], [1000, 578], [1000, 680], [200, 680]];
  const outline = poly([[300, 214], [900, 214], [1010, 500], [1010, 690], [190, 690], [190, 500]]);
  return (
    <Art viewBox="0 0 1200 900" title="Document box, closed, front" exportName="use-product-box-front">
      <MaterialDefs idp={mat} />
      <BrandDefs idp={br} />
      <BoardDefs id={id} />
      <defs>
        <clipPath id={`${id}-top`}><path d={poly(top)} /></clipPath>
      </defs>
      <SweepG idp={`${id}-s`} w={1200} h={900} horizon={0.72} tint="#F2F5F4" />
      <ShadowG idp={`${id}-sh`} cx={620} cy={700} rx={470} opacity={0.34} blur={14} />
      <CastG d={outline} depth={30} opacity={0.18} fill="#0C1445" />
      <g className="mock-lit">
        {/* tray (recessed under the lid) */}
        <path d={poly(tray)} fill={BOARD} filter={`url(#${br}-grain)`} />
        <path d={poly(tray)} fill={`url(#${mat}-shade)`} />
        <path d={poly(tray)} fill="#000000" opacity="0.22" />
        <path d="M200 578H1000" stroke="#000000" strokeOpacity="0.55" strokeWidth="6" />
        {/* lid thickness (front face) */}
        <path d={poly(lidFront)} fill="#1A2C66" filter={`url(#${br}-grain)`} />
        <path d={poly(lidFront)} fill={`url(#${mat}-shade)`} />
        <path d="M190 500H1010" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M190 578H1010" stroke="#0A1233" strokeOpacity="0.7" strokeWidth="3" />
        {/* lid top, a shallow trapezoid in perspective */}
        <path d={poly(top)} fill={BOARD} filter={`url(#${br}-grain)`} />
        <path d={poly(top)} fill={`url(#${id}-lighten)`} />
        <g clipPath={`url(#${id}-top)`}>
          <path d="M290 240H910L1000 480H200Z" fill="none" stroke="#0A1233" strokeOpacity="0.55" strokeWidth="3" />
          <path d="M296 244H904" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
          <g transform="translate(600 364) scale(1 0.66)">
            <MarkG x={-92} y={-92} size={184} fill={GREEN} />
          </g>
        </g>
        <path d={poly(top)} fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
        {/* ribbon pull */}
        <g>
          <path d="M556 584H636V768L596 742L556 768Z" fill="#000000" opacity="0.3" transform="translate(10 8)" />
          <path d="M556 578H636V768L596 742L556 768Z" fill={GREEN} />
          <path d="M556 578H636V768L596 742L556 768Z" fill={`url(#${mat}-shade)`} />
          <path d="M556 578H564V762L556 768Z" fill="#FFFFFF" opacity="0.3" />
          <rect x="548" y="570" width="96" height="14" fill="#0FA05C" />
        </g>
      </g>
    </Art>
  );
}

// ---- Closed box from the side ----
export function BoxSide() {
  const id = 'use-product-side';
  const mat = `${id}-m`, br = `${id}-b`;
  const seams = [205, 207];
  return (
    <Art viewBox="0 0 1200 900" title="Document box, closed, side" exportName="use-product-box-side">
      <MaterialDefs idp={mat} />
      <BrandDefs idp={br} />
      <BoardDefs id={id} />
      <SweepG idp={`${id}-s`} w={1200} h={900} horizon={0.72} tint="#F2F5F4" />
      <ShadowG idp={`${id}-sh`} cx={560} cy={690} rx={560} opacity={0.34} blur={13} />
      <g className="mock-lit">
        <g transform="translate(70 360)">
          <CastG d="M-20 0H1000V330H-20Z" depth={26} opacity={0.2} fill="#0C1445" />
          {/* top of the lid, lit */}
          <path d="M-14 0L40 -26H1060L1010 0Z" fill="#26408F" filter={`url(#${br}-grain)`} />
          <path d="M-14 0L40 -26H1060L1010 0Z" fill="#FFFFFF" opacity="0.1" />
          {/* lid side (overhangs the tray by 14) */}
          <rect x="-14" y="0" width="1024" height="96" fill="#1A2C66" filter={`url(#${br}-grain)`} />
          <rect x="-14" y="0" width="1024" height="96" fill={`url(#${id}-lighten)`} />
          <path d="M1010 0L1060 -26V70L1010 96Z" fill="#0E1A4A" />
          {/* tray side, recessed */}
          <rect x="0" y="96" width="996" height="234" fill={BOARD} filter={`url(#${br}-grain)`} />
          <rect x="0" y="96" width="996" height="234" fill={`url(#${id}-lighten)`} />
          <rect x="0" y="96" width="996" height="22" fill="#000000" opacity="0.38" />
          {seams.map((y, i) => (
            <path key={y} d={`M0 ${y}H996`} stroke={i % 2 ? '#000000' : '#FFFFFF'} strokeOpacity={i % 2 ? 0.3 : 0.12} strokeWidth="1.5" />
          ))}
          <path d="M996 96L1046 70V304L996 330Z" fill="#0A1233" />
          {/* board layers at the lid's end: three thin sheets */}
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M1010 ${20 + k * 24}L1060 ${-6 + k * 24}`} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.4" />
          ))}
          {/* the mark on the lid's side, small */}
          <MarkG x={24} y={14} size={68} fill={GREEN} />
          <rect x="0" y="94" width="996" height="3" fill="#0A1233" />
          {/* ribbon pull hanging at the front edge */}
          <path d="M300 96H372V330L336 306L300 330Z" fill={GREEN} />
          <path d="M300 96H372V330L336 306L300 330Z" fill={`url(#${mat}-shade)`} />
          <rect x="292" y="88" width="88" height="12" fill="#0FA05C" />
        </g>
      </g>
    </Art>
  );
}

export { NAVY };
