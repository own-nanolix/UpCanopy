// Three event tickets fanned from the bottom-left corner. The barcode is plain bars that encode nothing; the pale
// bars stand where a date, seat or code would be (no facts are invented).
import { LockupG } from '@/components/art/Mark';
import { LINES, TAGLINE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { C, Stage, Cast, PlainBars } from './parts';

const TW = 460, TH = 190, SX = 330, N = 15;
const ticketD = `M0 0H${SX - N}A${N} ${N} 0 0 0 ${SX + N} 0H${TW}V${TH}H${SX + N}A${N} ${N} 0 0 0 ${SX - N} ${TH}H0Z`;

export const TICKETS = [
  { name: 'ticket-control', title: 'Event ticket, navy', fill: C.navy, ink: '#FFFFFF', mark: C.green, line: LINES.control, bar: '#FFFFFF' },
  { name: 'ticket-level', title: 'Event ticket, Green Park', fill: C.green, ink: C.navy, mark: C.navy, line: LINES.level, bar: C.navy },
  { name: 'ticket-tagline', title: 'Event ticket, mint paper', fill: C.paper, ink: C.navy, mark: C.navy, line: TAGLINE, bar: C.navy },
];

function Ticket({ idp, id, t }) {
  const holes = Array.from({ length: 12 }, (_, i) => 28 + i * 13);
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={ticketD} />
      </clipPath>
      <path d={ticketD} transform="translate(0 4)" fill="#000000" opacity="0.3" />
      <path d={ticketD} fill={t.fill} filter={`url(#${idp}-paper)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <LockupG x={28} y={26} scale={0.36} fill={t.ink} markFill={t.mark} />
        <text x="28" y="108" fontSize="14" fontWeight="300" fill={t.ink} lang="pt-BR">{t.line}</text>
        <rect x="28" y="140" width="96" height="6" fill={t.bar} opacity="0.28" />
        <rect x="136" y="140" width="62" height="6" fill={t.bar} opacity="0.28" />
        <rect x="28" y="156" width="150" height="6" fill={t.bar} opacity="0.16" />
        <PlainBars x={SX + 24} y={34} h={TH - 68} fill={t.ink} opacity={0.75} unit={2.6} />
        <rect width={TW} height={TH} fill={`url(#${idp}-glass)`} opacity="0.7" />
      </g>
      {holes.map((y) => (
        <circle key={y} cx={SX} cy={y + 8} r="1.7" fill="#E3F5D3" />
      ))}
      <path d={ticketD} fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.3" />
    </g>
  );
}

export function TicketFan({ index }) {
  const def = TICKETS[index];
  const idp = `use-event-${def.name}`;
  const angles = [6, 21, 36];
  const order = [0, 1, 2].filter((k) => k !== index).concat(index);
  return (
    <Stage name={def.name} title={def.title}>
      {order.map((k, z) => {
        const a = angles[k];
        const rad = (a * Math.PI) / 180;
        return (
          <g key={k} className="mock-step" style={{ '--i': z }}>
            <Cast d={ticketD} x={r2(46 - TH * Math.sin(rad))} y={r2(420 - TH * Math.cos(rad))} rot={-a} depth={13} opacity={0.2} />
            <g transform={`translate(46 420) rotate(${-a}) translate(0 ${-TH})`}>
              <Ticket idp={idp} id={`${idp}-t${k}`} t={TICKETS[k]} />
            </g>
          </g>
        );
      })}
    </Stage>
  );
}
