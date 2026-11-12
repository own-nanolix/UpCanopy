import Art from '@/components/art/Art';
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { HEX, SCALES, TAGLINE, DESCRIPTOR } from '@/lib/brand';
import s from './overview.module.css';

// The signature moment of the cover: the construction circles draw in, the roof (arch) lowers onto its bar and
// locks, the frond fans out from the edge and the ten-dot scale fills left to right. One exportable SVG whose
// markup is the finished artwork; the motion is CSS that plays towards it.
const IDP = 'overview-sg';

export default function Signature() {
  return (
    <div className={`field-rise ${s.signature}`}>
      <Art viewBox="0 0 1600 640" title="UpCanopy cover: construction circles, the mark set on its bar, the frond fanning in and a ten-dot scale" exportName="overview-signature" preserveAspectRatio="xMidYMid slice" className={s.signatureArt}>
        <BrandDefs idp={IDP} />
        <rect width="1600" height="640" fill={`url(#${IDP}-rise)`} filter={`url(#${IDP}-grain)`} />
        <ConstructionG x={150} y={70} size={500} rings={8} stroke="#FFFFFF" strokeWidth={0.3} draw style={{ opacity: 0.28 }} />
        <MarkG x={190} y={110} size={420} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
        <FrondG cx={1700} cy={720} r={430} a0={-150} a1={-62} count={38} len={560} width={11} lean={70} tone="onNavy" fan opacity={0.9} />
        <WordmarkG x={780} y={300} size={92} fill="#FFFFFF" />
        <DescriptorG x={784} y={352} size={22} fill="#C9CEF0" />
        <text x="784" y="430" fontSize="30" fontWeight="300" fill="#FFFFFF" lang="pt-BR">{TAGLINE}</text>
        <ScaleDotsG x={790} y={520} w={540} r={14} chosen={SCALES[0].chosen} off="#FFFFFF" on={HEX.green} lock style={{ opacity: 1 }} />
        <rect x="780" y="478" width="120" height="6" fill={HEX.green} className="grow-x" />
        <text x="784" y="468" fontSize="13" fontWeight="700" letterSpacing="1.5" fill="#C9CEF0" lang="pt-BR">{SCALES[0].left}</text>
        <text x="1334" y="468" fontSize="13" fontWeight="700" letterSpacing="1.5" fill="#C9CEF0" textAnchor="end" lang="pt-BR">{SCALES[0].right}</text>
        <text x="1560" y="610" fontSize="12" fontWeight="700" letterSpacing="2" fill="#C9CEF0" textAnchor="end">{DESCRIPTOR}</text>
      </Art>
    </div>
  );
}
