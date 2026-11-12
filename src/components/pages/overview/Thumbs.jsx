import Link from 'next/link';
import Art from '@/components/art/Art';
import { MarkG, MarkCropG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { groups, href } from '@/lib/pages';
import { HEX } from '@/lib/brand';
import s from './overview.module.css';

// One drawn tile per chapter group, built only from the mark, the frond, the gradient and the ten-dot scale.
// Each tile is its own exportable SVG; the caption underneath is the link (an exportable graphic never sits
// inside an anchor).
const VB = '0 0 400 300';

function Foundations() {
  const idp = 'overview-th0';
  return (
    <Art viewBox={VB} title="Brand foundations tile: the mark over a ten-dot scale" exportName="overview-thumb-foundations" className={s.thumbArt}>
      <rect width="400" height="300" fill={HEX.slide} />
      <MarkG x={110} y={26} size={180} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
      <ScaleDotsG x={40} y={252} w={320} r={9} chosen={8} off={HEX.asphalt} on={HEX.green} lock id={`${idp}-dots`} />
    </Art>
  );
}

function Web() {
  const idp = 'overview-th1';
  return (
    <Art viewBox={VB} title="Web tile: the rising gradient with the mark in a corner" exportName="overview-thumb-web" className={s.thumbArt}>
      <BrandDefs idp={idp} />
      <rect width="400" height="300" fill={`url(#${idp}-rise)`} filter={`url(#${idp}-grain)`} />
      <MarkG x={24} y={22} size={56} fill={HEX.green} />
      <rect x="24" y="214" width="190" height="14" fill="#FFFFFF" className="grow-x" />
      <rect x="24" y="242" width="120" height="14" fill="#FFFFFF" opacity="0.5" className="grow-x" style={{ '--i': 3 }} />
    </Art>
  );
}

function Product() {
  const idp = 'overview-th2';
  return (
    <Art viewBox={VB} title="Product tile: big squares and rows in navy and green" exportName="overview-thumb-product" className={s.thumbArt}>
      <rect width="400" height="300" fill={HEX.navy} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} className="lock" style={{ '--i': i }} x={34 + (i % 3) * 112} y={34 + Math.floor(i / 3) * 112} width="100" height="100" fill={i === 4 ? HEX.green : '#2E418A'} id={`${idp}-sq${i}`} />
      ))}
    </Art>
  );
}

function Campaign() {
  const idp = 'overview-th3';
  return (
    <Art viewBox={VB} title="Campaign tile: the frond sweeping over dark green with the mark crop" exportName="overview-thumb-campaign" className={s.thumbArt}>
      <rect width="400" height="300" fill={HEX.greenDark} />
      <FrondG cx={-20} cy={330} r={190} a0={-100} a1={-10} count={26} len={240} width={8} lean={66} tone="onDark" fan />
      <MarkCropG idp={idp} x={270} y={0} w={130} h={300} zoom={2.2} dx={-0.5} dy={-0.1} fill={HEX.green} />
    </Art>
  );
}

const TILES = [Foundations, Web, Product, Campaign];

export default function Thumbs() {
  return (
    <ul className={s.thumbs}>
      {groups.map((g, i) => {
        const Tile = TILES[i];
        const first = g.pages[0];
        return (
          <li key={g.name}>
            <Reveal delay={i * 80} className={s.thumb}>
              {Tile && <Tile />}
              <Link href={href(first.id)} className={s.thumbCap}>
                <span className="t-caps">{g.name}</span>
                <span className={`t-small ${s.thumbCount}`}>{g.pages.length} pages, from {first.title}</span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
