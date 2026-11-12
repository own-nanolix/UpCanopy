import Art from '@/components/art/Art';
import { LockupG, MarkG } from '@/components/art/Mark';
import { FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { DOCUMENT, HEX, SCALES } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { range } from '@/lib/site';

// ---- The invoice sheet (case study m01, lower centre) ----
// As printed: a white sheet, the horizontal lockup top right, a wide quiet field, then one header row low on the
// sheet: a bold label (illegible, a bar here), "Bank Account n°" over "Bank Detail" in small regular type, and
// "Total" bold at the right. The rows below it are cropped in the photograph: here they are quiet bars, one per
// line of the builder. "Total" is printed in Green Park; it is set in the deeper green ink so it stays legible.
const SEED_LINES = (() => {
  const rnd = seeded(41);
  return range(5, (i) => ({ id: i, a: 40 + Math.round(rnd() * 50), b: 30 + Math.round(rnd() * 60) }));
})();

export function InvoiceArt({ lines = SEED_LINES }) {
  const [acct, detail, total] = DOCUMENT.invoice;
  const rows = lines.slice(0, 8);
  const end = 420 + Math.max(rows.length, 1) * 34;
  return (
    <Art viewBox="0 0 600 760" title={'Invoice sheet with ' + rows.length + ' lines: Bank Account n°, Bank Detail, Total'} exportName="lp-financeiro-invoice">
      <rect x="18" y="18" width="560" height="720" fill={HEX.greenDark} opacity="0.22" />
      <rect x="0" y="0" width="560" height="720" fill={HEX.white} />
      <LockupG x={290} y={44} scale={0.57} fill={HEX.navy} markFill={HEX.green} />
      <rect x="40" y="336" width="64" height="12" fill={HEX.navy} />
      <g fill={HEX.navy} fontSize="13">
        <text x="190" y="332">{acct}</text>
        <text x="190" y="352">{detail}</text>
      </g>
      <text x="520" y="348" fontSize="20" fontWeight="700" textAnchor="end" fill={HEX.greenInk}>{total}</text>
      <rect x="40" y="376" width="480" height="2" fill={HEX.navy} className="grow-x" />
      {rows.map((l, i) => (
        <g key={l.id} className="rise" style={{ '--i': i }}>
          <rect x="40" y={410 + i * 34} width={r2(l.a * 1.3)} height="10" fill={HEX.gray} />
          <rect x="190" y={410 + i * 34} width={r2(l.b * 1.2)} height="10" fill={HEX.gray} opacity="0.7" />
          <rect x={r2(520 - l.b * 0.9)} y={410 + i * 34} width={r2(l.b * 0.9)} height="10" fill={HEX.navy} opacity="0.55" />
        </g>
      ))}
      <rect x="300" y={end} width="220" height="2" fill={HEX.navy} />
      <rect x="400" y={end + 22} width="120" height="16" fill={HEX.green} />
    </Art>
  );
}

// ---- The five attribute scales (slide m03), used here as the tone of the finance voice ----
export function ScalesArt() {
  return (
    <Art viewBox="0 0 900 420" title="Five brand scales of ten dots, one green dot each" exportName="lp-financeiro-scales">
      <rect width="900" height="420" fill={HEX.slide} />
      {SCALES.map((sc, i) => (
        <g key={sc.left} transform={`translate(0 ${54 + i * 80})`}>
          <text x="40" y="0" fontSize="13" fontWeight="700" fill={HEX.navy} className="wide" letterSpacing="1" lang="pt-BR">{sc.left}</text>
          <text x="860" y="0" fontSize="13" fontWeight="700" fill={HEX.navy} className="wide" letterSpacing="1" textAnchor="end" lang="pt-BR">{sc.right}</text>
          <ScaleDotsG x={52} y={30} w={796} r={12} chosen={sc.chosen} lock />
        </g>
      ))}
    </Art>
  );
}

// ---- Hero frond: decorative, enters from the lower right edge ----
export function HeroFrond() {
  return (
    <Art viewBox="0 0 900 640" title="Frond sweeping in from the lower right" exportName="lp-financeiro-frond" decorative>
      <FrondG cx={900} cy={640} r={470} a0={178} a1={272} count={38} len={300} width={11} lean={64} tone="onDark" fan />
    </Art>
  );
}

// ---- CTA: bars stepping upward, the mark on the top step ----
export function StepsArt() {
  const n = 6;
  return (
    <Art viewBox="0 0 400 320" title="Six bars rising in steps with the mark on top" exportName="lp-financeiro-steps" decorative>
      {range(n, (i) => {
        const h = 50 + i * 36;
        return <rect key={i} x={r2(i * 64)} y={r2(320 - h)} width="56" height={h} fill={i === n - 1 ? HEX.navy : HEX.greenDark} opacity={r2(0.35 + i * 0.13)} className="rise" style={{ '--i': i }} />;
      })}
      <MarkG x={330} y={0} size={60} fill={HEX.navy} archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}
