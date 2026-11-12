import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { Plate } from '@/components/pages/use-accessories/parts';
import { ToteGreen, ToteNavy } from '@/components/pages/use-accessories/Bags';
import { MugNavy, MugMint, BottleNavy, BottleGreen, CupSleeve, CoasterRow } from '@/components/pages/use-accessories/Drinkware';
import { StickerSheets, PinCards, PatchScene, Keychain } from '@/components/pages/use-accessories/Small';
import { DeskMat, MousePad } from '@/components/pages/use-accessories/Desk';
import { UmbrellaOpen, SocksPair } from '@/components/pages/use-accessories/Outdoor';
import { GiftFront, GiftBack, GiftCarrier } from '@/components/pages/use-accessories/Gift';
import s from '@/components/pages/use-accessories/use-accessories.module.css';

export const metadata = pageMeta('use-accessories');

function R({ children, delay, from }) {
  return <Reveal delay={delay} from={from}>{children}</Reveal>;
}

export default function Page() {
  return (
    <section className="page" id="p-use-accessories" aria-label="Accessories">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Accessories</h1>
        </header>

        <div className={s.group}>
          <h2 className="t-h3">Bags and drinkware</h2>
          <div className={s.zig}>
            <R><Plate name="Tote bag, Green Park"><ToteGreen /></Plate></R>
            <R delay={120}><Plate name="Tote bag, navy"><ToteNavy /></Plate></R>
          </div>
          <div className={`${s.zig} ${s.zag}`}>
            <R><Plate name="Mug, navy"><MugNavy /></Plate></R>
            <R delay={120}><Plate name="Mug, mint"><MugMint /></Plate></R>
          </div>
          <div className={s.zig}>
            <R><Plate name="Bottle, navy"><BottleNavy /></Plate></R>
            <R delay={120}><Plate name="Bottle, Green Park"><BottleGreen /></Plate></R>
          </div>
        </div>

        <div className={s.group}>
          <h2 className="t-h3">Stickers, pins and patches</h2>
          <div className={`${s.zig} ${s.zag}`}>
            <R><Plate name="Sticker sheets"><StickerSheets /></Plate></R>
            <R delay={120}><Plate name="Pin cards"><PinCards /></Plate></R>
          </div>
          <div className={`${s.steps} ${s.down}`}>
            {[0, 1, 2, 3].map((n) => (
              <R key={n} delay={n * 90}><Plate name={['Patch, mark on navy', 'Patch, mark on Green Park', 'Patch, stacked lockup', 'Patch, descriptor'][n]}><PatchScene n={n} /></Plate></R>
            ))}
            <R delay={360}><Plate name="Keychain"><Keychain /></Plate></R>
          </div>
        </div>

        <div className={s.group}>
          <h2 className="t-h3">Desk and outdoors</h2>
          <div className={s.zig}>
            <R><Plate name="Coasters and puck"><CoasterRow /></Plate></R>
            <R delay={120}><Plate name="Cup with sleeve"><CupSleeve /></Plate></R>
          </div>
          <div className={`${s.zig} ${s.zag}`}>
            <R><Plate name="Mouse pad"><MousePad /></Plate></R>
            <R delay={120}><Plate name="Desk mat"><DeskMat /></Plate></R>
          </div>
          <div className={s.zig}>
            <R><Plate name="Umbrella"><UmbrellaOpen /></Plate></R>
            <R delay={120}><Plate name="Socks"><SocksPair /></Plate></R>
          </div>
        </div>

        <div className={s.group}>
          <h2 className="t-h3">Gift cards</h2>
          <div className={`${s.steps} ${s.steps3} ${s.up}`}>
            <R><Plate name="Gift card, front"><GiftFront /></Plate></R>
            <R delay={100}><Plate name="Gift card, back"><GiftBack /></Plate></R>
            <R delay={200}><Plate name="Gift card carrier"><GiftCarrier /></Plate></R>
          </div>
        </div>
      </div>
    </section>
  );
}
