import Art from '@/components/art/Art';
import { LockupG, MarkG, WordmarkVerticalG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { DOCUMENT, CONTACT, HEX, SCALES } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { range } from '@/lib/site';

// ---- The invoice sheet (case study m01, lower centre): white sheet, horizontal lockup top right ----
// Legible in the case study: "Bank Account n°", "Bank Detail", "Total". Everything else is a quiet bar.
export function InvoiceArt() {
  const rnd = seeded(41);
  const rows = range(8, (i) => ({ y: 352 + i * 30, a: 70 + Math.round(rnd() * 150), b: 60 + Math.round(rnd() * 110) }));
  const [acct, detail, total] = DOCUMENT.invoice;
  return (
    <Art viewBox="0 0 600 760" title="Invoice sheet: Bank Account n°, Bank Detail, Total" exportName="lp-financeiro-invoice">
      <rect x="18" y="18" width="560" height="720" fill="#8FC9B5" opacity="0.45" />
      <rect x="0" y="0" width="560" height="720" fill="#FFFFFF" />
      <LockupG x={290} y={38} scale={0.57} fill={HEX.navy} markFill={HEX.green} />
      <rect x="40" y="118" width="480" height="4" fill={HEX.navy} className="grow-x" />
      <g fill={HEX.navy}>
        <text x="40" y="168" fontSize="13" fontWeight="700">{acct}</text>
        <text x="40" y="262" fontSize="13" fontWeight="700">{detail}</text>
      </g>
      <rect x="40" y="184" width="250" height="16" fill={HEX.gray} className="grow-x" style={{ '--i': 2 }} />
      {range(3, (i) => (
        <rect key={i} x="40" y={278 + i * 20} width={[330, 280, 200][i]} height="8" fill={HEX.gray} className="grow-x" style={{ '--i': 4 + i }} />
      ))}
      <rect x="40" y="338" width="480" height="2" fill={HEX.navy} />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="40" y={r.y} width={r.a} height="10" fill={HEX.gray} className="grow-x" style={{ '--i': 8 + i }} />
          <rect x={520 - r.b} y={r.y} width={r.b} height="10" fill={HEX.navy} opacity="0.55" className="grow-x" style={{ '--i': 8 + i }} />
        </g>
      ))}
      <rect x="40" y="604" width="480" height="4" fill={HEX.navy} />
      <text x="40" y="660" fontSize="22" fontWeight="700" fill={HEX.navy}>{total}</text>
      <rect x="300" y="640" width="220" height="24" fill={HEX.green} className="grow-x" style={{ '--i': 18 }} />
      <rect x="40" y="690" width="140" height="2" fill={HEX.gray} />
    </Art>
  );
}

// ---- The compliance letter (m12, m28): mint gradient sheet, giant navy word set vertically ----
export function LetterArt() {
  const rnd = seeded(77);
  const lines = range(15, (i) => ({ y: 178 + i * 28, w: i % 5 === 4 ? 150 + Math.round(rnd() * 60) : 320 + Math.round(rnd() * 30) }));
  return (
    <Art viewBox="0 0 580 780" title="Compliance letter: Termo de Compliance e Conduta Ética" exportName="lp-financeiro-letter">
      <BrandDefs idp="lp-financeiro-letter" />
      <rect x="20" y="20" width="540" height="740" fill="#8FC9B5" opacity="0.5" />
      <rect x="0" y="0" width="540" height="740" fill="url(#lp-financeiro-letter-paper)" filter="url(#lp-financeiro-letter-grain)" />
      <WordmarkVerticalG x={22} y={718} size={104} fill={HEX.navy} />
      <MarkG x={474} y={30} size={38} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
      <g fill={HEX.navy}>
        <text x="170" y="72" fontSize="15" fontWeight="500" lang="pt-BR">{DOCUMENT.title}</text>
        <text x="170" y="98" fontSize="11" fill={HEX.muted}>{DOCUMENT.address}</text>
      </g>
      <rect x="170" y="116" width="350" height="1.5" fill={HEX.navy} />
      {lines.map((l, i) => (
        <rect key={i} x="170" y={l.y} width={l.w} height="6" fill={HEX.navy} opacity="0.2" className="grow-x" style={{ '--i': i }} />
      ))}
      <rect x="170" y="612" width="350" height="1.5" fill={HEX.navy} />
      <g fill={HEX.navy} textAnchor="end">
        <text x="520" y="642" fontSize="13" fontWeight="700">{DOCUMENT.labels[0]}</text>
        <text x="520" y="668" fontSize="11">{DOCUMENT.labels[1]}</text>
        <text x="520" y="688" fontSize="11">{DOCUMENT.labels[2]}</text>
        <text x="436" y="668" fontSize="11">{CONTACT.phone}</text>
        <text x="436" y="688" fontSize="11">{CONTACT.sac}</text>
      </g>
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
