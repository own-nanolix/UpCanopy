import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { C } from './parts';
import { TEE_FRONT, TEE_BACK } from './Shirts';

const S = 1.6; // drawing scale
const FRONT = { tx: 100, ty: 130 };
const BACK = { tx: 700, ty: 130 };
const X = (o, x) => o.tx + x * S;
const Y = (o, y) => o.ty + y * S;
const INK = C.navy;

const caps = { fontSize: 11, fontWeight: 700, letterSpacing: 1.6, fill: INK };

function DimH({ x1, x2, y, label }) {
  const mid = (x1 + x2) / 2;
  return (
    <g stroke={INK} strokeWidth="1" fill="none">
      <path d={`M${x1} ${y}H${x2}M${x1 - 4} ${y + 4}L${x1 + 4} ${y - 4}M${x2 - 4} ${y + 4}L${x2 + 4} ${y - 4}`} />
      <text x={mid} y={y - 7} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} stroke="none">
        {label}
      </text>
    </g>
  );
}

function DimV({ x, y1, y2, label }) {
  const mid = (y1 + y2) / 2;
  return (
    <g stroke={INK} strokeWidth="1" fill="none">
      <path d={`M${x} ${y1}V${y2}M${x - 4} ${y1 + 4}L${x + 4} ${y1 - 4}M${x - 4} ${y2 + 4}L${x + 4} ${y2 - 4}`} />
      <text transform={`translate(${x - 7} ${mid}) rotate(-90)`} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} stroke="none">
        {label}
      </text>
    </g>
  );
}

const Ext = ({ d }) => <path d={d} fill="none" stroke={INK} strokeOpacity="0.4" strokeWidth="0.8" />;

function TeeLine({ o, d, back }) {
  const neck = back ? 'M112 18Q150 42 188 18' : 'M112 18Q150 74 188 18';
  return (
    <g transform={`translate(${o.tx} ${o.ty}) scale(${S})`} fill="none" stroke={INK} strokeLinejoin="miter">
      <path d={d} fill="#fff" strokeWidth={1.4 / S} />
      <path d={neck} strokeWidth={1 / S} transform="translate(0 7)" strokeDasharray="4 3" />
      <path d="M42 42Q58 78 62 108M258 42Q242 78 238 108M6 116L46 140M294 116L254 140M66 250L234 250" strokeWidth={1 / S} strokeDasharray="4 3" />
      <path d="M150 6V272" strokeWidth={0.8 / S} strokeOpacity="0.45" strokeDasharray="10 4 2 4" />
    </g>
  );
}

function Area({ o, x, y, w, h, children }) {
  return (
    <g>
      <rect x={X(o, x)} y={Y(o, y)} width={w * S} height={h * S} fill={C.green} fillOpacity="0.18" stroke={C.green} strokeWidth="1.5" strokeDasharray="6 3" />
      {children}
    </g>
  );
}

export default function Spec() {
  return (
    <Art viewBox="0 0 1280 720" title="T-shirt print specification, front and back" exportName="use-apparel-spec-sheet">
      <rect width="1280" height="720" fill="#F0F0F0" />
      {/* slide furniture: tiny bold caps in the corners */}
      <MarkG x={36} y={28} size={26} fill={C.green} />
      <text x="74" y="46" {...caps}>PRINT SPECIFICATION</text>
      <text x="1244" y="46" textAnchor="end" {...caps}>T-SHIRT</text>
      <text x="36" y="696" {...caps}>ALL VALUES IN MM</text>
      <text x="1244" y="696" textAnchor="end" {...caps}>FRONT / BACK</text>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={640 - 99 + i * 22} cy="690" r="4.5" fill={i === 4 ? C.green : INK} opacity={i === 4 ? 1 : 0.85} />
      ))}
      <text x={X(FRONT, 150)} y="112" textAnchor="middle" {...caps}>FRONT</text>
      <text x={X(BACK, 150)} y="112" textAnchor="middle" {...caps}>BACK</text>

      {/* ---------- front ---------- */}
      <TeeLine o={FRONT} d={TEE_FRONT} />
      <Area o={FRONT} x={177} y={58} w={26} h={26}>
        <MarkG x={X(FRONT, 177)} y={Y(FRONT, 58)} size={26 * S} fill={C.green} />
      </Area>
      <DimH x1={X(FRONT, 177)} x2={X(FRONT, 203)} y={Y(FRONT, 58) - 14} label="80" />
      <DimV x={X(FRONT, 214)} y1={Y(FRONT, 58)} y2={Y(FRONT, 84)} label="80" />
      <Ext d={`M${X(FRONT, 150)} ${Y(FRONT, 96)}V${Y(FRONT, 104)}M${X(FRONT, 190)} ${Y(FRONT, 84)}V${Y(FRONT, 104)}`} />
      <DimH x1={X(FRONT, 150)} x2={X(FRONT, 190)} y={Y(FRONT, 104)} label="115" />
      <Ext d={`M${X(FRONT, 64)} ${Y(FRONT, 262)}V${Y(FRONT, 262) + 40}M${X(FRONT, 236)} ${Y(FRONT, 262)}V${Y(FRONT, 262) + 40}`} />
      <DimH x1={X(FRONT, 64)} x2={X(FRONT, 236)} y={Y(FRONT, 262) + 32} label="520" />
      <Ext d={`M${X(FRONT, 2) - 8} ${Y(FRONT, 18)}H${X(FRONT, 112)}M${X(FRONT, 2) - 8} ${Y(FRONT, 262)}H${X(FRONT, 64)}`} />
      <DimV x={X(FRONT, 2) - 22} y1={Y(FRONT, 18)} y2={Y(FRONT, 262)} label="740" />
      <text x={X(FRONT, 178)} y={Y(FRONT, 58) + 26 * S + 46} fontSize="11" fontWeight="700" fill={INK}>LEFT CHEST</text>

      {/* ---------- back ---------- */}
      <TeeLine o={BACK} d={TEE_BACK} back />
      <Area o={BACK} x={126} y={56} w={48} h={23}>
        <g transform={`translate(${X(BACK, 126)} ${Y(BACK, 56)}) scale(${S * 0.1})`}>
          <MarkG x={186} y={0} size={108} fill={C.green} />
          <rect x="62" y="150" width="356" height="34" fill={INK} opacity="0.16" />
          <rect x="108" y="200" width="264" height="22" fill={INK} opacity="0.16" />
        </g>
      </Area>
      <DimH x1={X(BACK, 126)} x2={X(BACK, 174)} y={Y(BACK, 56) - 14} label="145" />
      <DimV x={X(BACK, 182)} y1={Y(BACK, 56)} y2={Y(BACK, 79)} label="70" />
      <Ext d={`M${X(BACK, 100)} ${Y(BACK, 30)}H${X(BACK, 126)}M${X(BACK, 100)} ${Y(BACK, 56)}H${X(BACK, 126)}`} />
      <DimV x={X(BACK, 112)} y1={Y(BACK, 30)} y2={Y(BACK, 56)} label="105" />
      <text x={X(BACK, 120)} y={Y(BACK, 79) + 40} fontSize="11" fontWeight="700" fill={INK}>CENTRE BACK</text>
    </Art>
  );
}
