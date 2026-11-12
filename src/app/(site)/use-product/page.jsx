import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { BoxOpen, BoxFront, BoxSide } from '@/components/pages/use-product/Box';
import { Folder, Tube, CardStacks, PuckPlate } from '@/components/pages/use-product/Kit';
import { AccessCard, WAY_LIST } from '@/components/pages/use-product/Cards';
import { DeviceTrio } from '@/components/pages/use-product/DeviceTrio';
import { IconLadder, IconAt, SIZES } from '@/components/pages/use-product/Icons';
import s from '@/components/pages/use-product/use-product.module.css';

export const metadata = pageMeta('use-product');

function Plate({ cap, children, delay = 0 }) {
  return (
    <figure className={s.plate}>
      <Reveal delay={delay}>
        <div className="mock">{children}</div>
        <figcaption className="mock-cap"><span>{cap}</span></figcaption>
      </Reveal>
    </figure>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-product" aria-label="Product">
      <div className="wrap">
        <h1 tabIndex={-1} className="t-h1" style={{ paddingTop: 'var(--pad)' }}>Product</h1>

        <div className={s.sec}>
          <h2 className="t-h2">Document box</h2>
          <Plate cap="Document box, open"><BoxOpen /></Plate>
          <div className={s.pair} style={{ marginTop: 'clamp(16px, 2vw, 28px)' }}>
            <Plate cap="Front"><BoxFront /></Plate>
            <Plate cap="Side" delay={120}><BoxSide /></Plate>
          </div>
        </div>

        <div className={s.sec}>
          <h2 className="t-h2">Kit contents</h2>
          <div className={s.cascade}>
            <div><Plate cap="Folder"><Folder /></Plate></div>
            <div><Plate cap="Tube" delay={100}><Tube /></Plate></div>
            <div><Plate cap="Business cards" delay={200}><CardStacks /></Plate></div>
            <div><Plate cap="Puck" delay={300}><PuckPlate /></Plate></div>
          </div>
        </div>

        <div className={s.sec}>
          <h2 className="t-h2">Access card</h2>
          <div className={s.row3}>
            {WAY_LIST.map((w, i) => (
              <div key={w.key}><Plate cap={`Access card, ${w.name}, front and back`} delay={i * 100}><AccessCard way={w.key} /></Plate></div>
            ))}
          </div>
        </div>

        <div className={s.sec}>
          <h2 className="t-h2">Devices and app icon</h2>
          <div className={s.final}>
            <Plate cap="Tablet, phone and watch"><DeviceTrio /></Plate>
            <div>
              <Plate cap="App icon" delay={120}><IconLadder /></Plate>
              <div className={s.sizes}>
                {SIZES.map((n) => <span key={n} className={s.size} style={{ width: n }}><IconAt size={n} /></span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
