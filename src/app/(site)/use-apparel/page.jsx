import { pageMeta } from '@/lib/pages';
import Scene from '@/components/pages/use-apparel/Scene';
import Spec from '@/components/pages/use-apparel/Spec';
import { TeeSheet, TeeBackDetail, TEE_COLOURWAYS } from '@/components/pages/use-apparel/Shirts';
import { WindbreakerSheet, PufferSheet, HoodieSheet } from '@/components/pages/use-apparel/Jackets';
import { CapSheet, CapDetail, CAP_COLOURWAYS } from '@/components/pages/use-apparel/Caps';
import s from '@/components/pages/use-apparel/use-apparel.module.css';

export const metadata = pageMeta('use-apparel');

const CAP_ORDERS = [[0, 2], [1, 0], [2, 1]];

function Plate({ name, children }) {
  return (
    <figure className={s.fig}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap">
        <span>{name}</span>
      </figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-apparel" aria-label="Apparel">
      <div className="wrap">
        <header className={s.head}>
          <h1 className="t-h1" tabIndex={-1}>Apparel</h1>
        </header>

        <section className={s.block} aria-labelledby="use-apparel-h-collection">
          <h2 className="t-h3" id="use-apparel-h-collection">Collection</h2>
          <Plate name="Collection on a rail">
            <Scene />
          </Plate>
        </section>

        <section className={s.block} aria-labelledby="use-apparel-h-tees">
          <h2 className="t-h3" id="use-apparel-h-tees">T-shirts</h2>
          <div className={`${s.grid} ${s.row1}`}>
            {TEE_COLOURWAYS.map((cw, n) => (
              <Plate key={cw.id} name={cw.name}>
                <TeeSheet cw={cw} n={n} />
              </Plate>
            ))}
          </div>
        </section>

        <section className={s.block} aria-labelledby="use-apparel-h-jackets">
          <h2 className="t-h3" id="use-apparel-h-jackets">Jackets</h2>
          <div className={`${s.grid} ${s.row2}`}>
            <Plate name="Hooded windbreaker"><WindbreakerSheet /></Plate>
            <Plate name="Puffer jacket"><PufferSheet /></Plate>
            <Plate name="Pullover hoodie"><HoodieSheet /></Plate>
          </div>
        </section>

        <section className={s.block} aria-labelledby="use-apparel-h-caps">
          <h2 className="t-h3" id="use-apparel-h-caps">Caps</h2>
          <div className={`${s.grid} ${s.row3}`}>
            {CAP_ORDERS.map((order) => (
              <Plate key={order[0]} name={CAP_COLOURWAYS[order[0]].name}>
                <CapSheet order={order} />
              </Plate>
            ))}
          </div>
        </section>

        <section className={s.block} aria-labelledby="use-apparel-h-detail">
          <h2 className="t-h3" id="use-apparel-h-detail">Details</h2>
          <div className={s.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
            <Plate name="White t-shirt, back"><TeeBackDetail /></Plate>
            <Plate name="Embroidered mark"><CapDetail /></Plate>
          </div>
        </section>

        <section className={s.block} aria-labelledby="use-apparel-h-spec" style={{ paddingBottom: 'var(--pad)' }}>
          <h2 className="t-h3" id="use-apparel-h-spec">Print specification</h2>
          <figure className={s.fig}>
            <div className={s.slide}>
              <Spec />
            </div>
            <figcaption className="mock-cap">
              <span>T-shirt print areas</span>
            </figcaption>
          </figure>
        </section>
      </div>
    </section>
  );
}
