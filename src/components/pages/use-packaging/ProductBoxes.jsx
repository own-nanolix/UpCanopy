// The case study's own pieces (m01, m28): the document box and the tube, rebuilt faithfully.
import { StepG, CastG, ShadowG, SheenG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { LINES } from '@/lib/brand';
import { Plate, IsoBox, ContactG, BridgeG, C, K, darken } from './parts';

const PAPER_LINES = Array.from({ length: 11 }, (_, i) => i);

// The document box (m01): gradient lid, small green mark top left, brand line, contacts, the white word-mark
// along the bottom edge of the lid and the paper stack visible beneath it. a runs down-right, b up-right.
// Hard shadow of a low box: its footprint swept to the lower right by len (a short shadow, not a slab).
function footShadow(a, w, len) {
  const L = [-K * a, -0.5 * a], R = [K * w, -0.5 * w];
  const s = [len * 0.64, len * 0.77];
  // footprint (front, left, back, right) and the same shifted; the outline of the swept shape
  const F = [[0, 0], L, [L[0] + R[0], L[1] + R[1]], R];
  const S = F.map(([x, y]) => [x + s[0], y + s[1]]);
  return `M${[F[1], F[2], F[3], S[3], S[0], S[1]].map((p) => p.map((v) => Math.round(v * 10) / 10).join(' ')).join('L')}Z`;
}

export function DocBox({ id, m, b, lid = 'rise', a = 250, w = 300, scale = 1, ground = true }) {
  const lidH = 38, h = 78;
  const fill = lid === 'rise' ? `url(#${b}-rise)` : C.navy;
  const stack = (len, hh, shade) => (
    <g>
      <rect x="0" y={lidH} width={len} height={h - lidH} fill="#C8CCCB" />
      {PAPER_LINES.map((i) => <rect key={i} x="0" y={lidH + 3 + i * 3.2} width={len} height="0.9" fill="#fff" opacity="0.8" />)}
      <rect x="0" y={lidH} width={len} height="5" fill="#000" opacity="0.22" />
      <rect x="0" y={lidH} width={len} height={h - lidH} fill={shade} opacity="0.2" />
      <rect x="0" y={h - 9} width={len} height="9" fill={C.navy} />
    </g>
  );
  return (
    <g transform={`scale(${scale})`}>
      {ground ? (
        <>
          <path d={footShadow(a, w, h * 0.7)} fill="#052E25" opacity="0.24" />
          <path d={footShadow(a, w, 6)} fill="#052E25" opacity="0.3" />
        </>
      ) : (
        <path d={footShadow(a, w, 5)} fill="#000000" opacity="0.35" />
      )}
      <IsoBox id={id} m={m} a={a} b={w} h={h} swap base={C.navy}
        fills={{ top: fill, left: lid === 'rise' ? '#1A3D68' : C.navy, right: lid === 'rise' ? '#142B5D' : darken(C.navy, 0.2) }}
        grain={`url(#${b}-grain)`}
        top={(tw, th) => (
          <g>
            <MarkG x={22} y={20} size={36} fill={C.green} />
            <BridgeG x={tw * 0.08} y={th * 0.52} size={9.5} fill="#fff" strong="#fff" rows={LINES.bridge.rows4} />
            <ContactG x={tw - 22} y={th - 78} size={9} fill="#fff" />
            <WordmarkG x={16} y={th - 20} size={tw / 6.8} fill="#fff" />
            <rect width={tw} height={th} fill={`url(#${m}-shade-v)`} opacity="0.5" />
          </g>
        )}
        left={(lw) => (
          <g>
            <rect width={lw} height={lidH} fill={C.navy} opacity="0.35" />
            {stack(lw, h, '#000')}
          </g>
        )}
        right={(rw) => (
          <g>
            <rect width={rw} height={lidH} fill="#10224F" opacity="0.45" />
            {stack(rw, h, '#000')}
          </g>
        )}
      />
      <path d={`M${-K * a} ${-0.5 * a - h + lidH}L0 ${-h + lidH}L${K * w} ${-0.5 * w - h + lidH}`} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.6" />
      <path d={`M${-K * a} ${-0.5 * a - h + lidH + 1.6}L0 ${-h + lidH + 1.6}L${K * w} ${-0.5 * w - h + lidH + 1.6}`} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
      <SheenG idp={m} d={`M${-K * a} ${-0.5 * a - h}L0 ${-h}L${K * w} ${-0.5 * w - h}L${K * w - K * a} ${-0.5 * w - 0.5 * a - h}Z`} opacity={0.25} />
    </g>
  );
}

// The dark tube lying along the up-right axis, open end towards us, pale label with the line (m01).
export function Tube({ id, m, scale = 1, len = 360, r = 64 }) {
  const rows = [["Deixe de ser 'faz-tudo'"], ['e torne-se o ', 'CEO'], ['da sua empresa'], ['de ', 'Hardscape']];
  const rx = r * 0.4;
  const l0 = 70, l1 = len - 20, fs = 13.5;
  return (
    <g transform={`scale(${scale})`}>
      <ShadowG idp={`${id}-sh`} cx={len * 0.45} cy={r * 1.0} rx={len * 0.55} ry={10} opacity={0.3} />
      <g transform="rotate(-30)">
        <CastG d={`M0 ${-r}H${len}V${r}H0Z`} depth={26} opacity={0.26} />
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C6B5C" />
          <stop offset="0.28" stopColor={C.dark} />
          <stop offset="1" stopColor="#021510" />
        </linearGradient>
        <linearGradient id={`${id}-lab`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor={C.mint} />
          <stop offset="1" stopColor="#B7C9BC" />
        </linearGradient>
        <rect x="0" y={-r} width={len} height={r * 2} fill={`url(#${id}-body)`} filter={`url(#${m}-paper)`} />
        <ellipse cx={len} cy="0" rx={rx} ry={r} fill="#021510" />
        {/* label wrapping the body */}
        <rect x={l0} y={-r} width={l1 - l0} height={r * 2} fill={`url(#${id}-lab)`} filter={`url(#${m}-paper)`} />
        <rect x={l0} y={-r} width={l1 - l0} height={r * 2} fill={`url(#${m}-shade-v)`} />
        <rect x={l0} y={-r} width="3" height={r * 2} fill="#000" opacity="0.25" />
        <MarkG x={l0 + 18} y={-r + 14} size={26} fill={C.asphalt} />
        <text x={l0 + 78} y={-r + 36} fontSize={fs} fill={C.asphalt} fontWeight="300" lang="pt-BR">
          {rows.map((p, i) => (
            <tspan key={i} x={l0 + 78} dy={i ? fs * 1.32 : 0}>
              {p[0]}{p[1] && <tspan fontWeight="700">{p[1]}</tspan>}
            </tspan>
          ))}
        </text>
        <rect x="0" y={-r} width={len} height={r * 2} fill={`url(#${m}-shade-v)`} opacity="0.5" />
        {/* open end: rim, dark inside, lit inner wall */}
        <ellipse cx="0" cy="0" rx={rx} ry={r} fill="#2D5446" />
        <ellipse cx="0" cy="0" rx={rx} ry={r} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
        <clipPath id={`${id}-in`}><ellipse cx="0" cy="0" rx={rx * 0.84} ry={r * 0.9} /></clipPath>
        <ellipse cx="0" cy="0" rx={rx * 0.84} ry={r * 0.9} fill="#9DB3A8" />
        <g clipPath={`url(#${id}-in)`}>
          <ellipse cx={rx * 0.5} cy="2" rx={rx * 0.84} ry={r * 0.9} fill="#0B1F19" />
        </g>
        <SheenG idp={m} d={`M0 ${-r}H${len}V${-r * 0.2}H0Z`} opacity={0.3} />
      </g>
    </g>
  );
}

function ProductPlate({ id, title, hero }) {
  const tubeHero = hero === 'tube';
  // box hero: box upper left, tube stepping down-right. Tube hero: the tube cropped by the left edge rising
  // up-right, the small box stepping up-right behind it.
  const pos = tubeHero ? { box: [790, 300, 0.78], tube: [-30, 650, 1.5] } : { box: [210, 450, 1.4], tube: [380, 705, 1.1] };
  return (
    <Plate id={id} title={title}>
      {({ idp, m, b }) => (
        <g>
          <StepG i={1} x={pos.tube[0]} y={pos.tube[1]}>
            <Tube id={`${idp}-tube`} m={m} scale={pos.tube[2]} />
          </StepG>
          <StepG i={0} x={pos.box[0]} y={pos.box[1]}>
            <g className="mock-lit">
              <DocBox id={`${idp}-box`} m={m} b={b} scale={pos.box[2]} />
            </g>
          </StepG>
        </g>
      )}
    </Plate>
  );
}
export const DocumentBox = () => <ProductPlate id="box-document" title="Document box with gradient lid" hero="box" />;
export const TubeProduct = () => <ProductPlate id="box-tube" title="Tube with pale label" hero="tube" />;

// Extra: the navy document box (m28) stacked three high, each box stepping a little to the right, the pile
// cropped by the bottom edge.
export function NavyDocBoxes() {
  const sc = 1.25;
  const steps = [0, 1, 2].map((i) => ({ i, x: 470 + i * 34, y: 800 - i * 78 * sc }));
  return (
    <Plate id="box-navy" title="Navy document boxes stacked">
      {({ idp, m, b }) => (
        steps.map((p) => (
          <StepG key={p.i} i={p.i} x={p.x} y={p.y}>
            <DocBox id={`${idp}-box${p.i}`} m={m} b={b} lid="navy" scale={sc} ground={p.i === 0} />
          </StepG>
        ))
      )}
    </Plate>
  );
}
