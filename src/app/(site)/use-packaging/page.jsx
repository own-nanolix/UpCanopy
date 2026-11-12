import { pageMeta } from '@/lib/pages';
import s from '@/components/pages/use-packaging/use-packaging.module.css';
import { RollNavy, RollGreen, TapeStrips } from '@/components/pages/use-packaging/Tape';
import { ShipPlain, ShipNavy } from '@/components/pages/use-packaging/Boxes';
import { DocumentBox, TubeProduct, NavyDocBoxes } from '@/components/pages/use-packaging/ProductBoxes';
import { BagNavy, BagGreen, BagMint } from '@/components/pages/use-packaging/Bags';
import { TissuePaper, SealSticker, ShippingLabel } from '@/components/pages/use-packaging/Paper';

export const metadata = pageMeta('use-packaging');

const COLUMNS = [
  [
    { title: 'Tape', items: [['Navy tape roll', RollNavy], ['Green Park tape roll', RollGreen], ['Tape strips', TapeStrips]] },
    { title: 'Shipping boxes', items: [['Plain board box', ShipPlain], ['Navy printed box', ShipNavy]] },
  ],
  [
    { title: 'Product boxes', items: [['Document box', DocumentBox], ['Tube', TubeProduct], ['Navy document box', NavyDocBoxes]] },
    { title: 'Tissue paper', items: [['Tissue paper', TissuePaper]] },
  ],
  [
    { title: 'Shopping bags', items: [['Navy bag', BagNavy], ['Green Park bag', BagGreen], ['Mint bag', BagMint]] },
    { title: 'Seal and label', items: [['Seal sticker', SealSticker], ['Shipping label', ShippingLabel]] },
  ],
];

export default function Page() {
  return (
    <section className="page" id="p-use-packaging" aria-label="Packaging">
      <div className="wrap">
        <h1 tabIndex={-1} className="t-h1" style={{ paddingTop: 'var(--pad)' }}>Packaging</h1>
        <div className={s.stair}>
          {COLUMNS.map((col, c) => (
            <div key={c} className={s.col}>
              {col.map((g) => (
                <div key={g.title} className={s.group}>
                  <h2 className="t-h3">{g.title}</h2>
                  {g.items.map(([name, Item]) => (
                    <figure key={name} className={s.fig}>
                      <Item />
                      <figcaption className="mock-cap">{name}</figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
