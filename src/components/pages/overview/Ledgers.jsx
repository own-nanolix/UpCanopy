import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import { groups, pages, pageById, href } from '@/lib/pages';
import s from './overview.module.css';

// Two ledgers in wide caps: every chapter of the site, and every mockup and product with what it holds.
// What each holds is taken from the mockup table in the project's layout notes.
const PRODUCTS = [
  ['showcase', ['Phone with data cards', 'Line-up of 8 phones', 'Laptop on a plinth', 'Event stage']],
  ['campaign', ['Poster in frame', 'Posts', 'Posters', 'Stories', 'Profile grid']],
  ['use-apparel', ['Collection', 'T-shirts', 'Jackets', 'Caps', 'Print-spec sheet']],
  ['use-accessories', ['Tote bags', 'Mugs', 'Bottles', 'Sticker sheet, pin card', 'Patches and keychain', 'Cup, sleeve, coasters; the puck', 'Desk mat and mouse pad', 'Umbrella and socks', 'Gift card and carrier']],
  ['use-stationery', ['Flat lay', 'Letterhead and envelope', 'Business cards', 'Pen and notebooks', 'Tri-fold brochure and folder', 'Report cover and slides']],
  ['use-packaging', ['Tape', 'Shipping boxes', 'Product boxes', 'Shopping bags', 'Tissue, seal, label']],
  ['use-event', ['Booth', 'Lanyard and badge', 'Staff IDs', 'Wristbands', 'Tickets and pass', 'Flags and banner']],
  ['use-world', ['Truck', 'Citylight and roll-ups', 'Reception and window', 'Wall sign and wayfinding', 'Poster on timber wall']],
  ['use-product', ['Document box', 'Kit contents', 'Access card colourways', 'Tablet, phone and watch', 'App icon sizes']],
];

const no = (id) => String(pages.findIndex((p) => p.id === id) + 1).padStart(2, '0');

export function ChapterLedger() {
  return (
    <div className={s.ledgerGrid}>
      {groups.map((g, gi) => (
        <Reveal key={g.name} delay={gi * 70}>
          <h3 className={`t-caps ${s.ledgerHead}`}>{g.name}</h3>
          <ol className={s.ledger}>
            {g.pages.map((p) => (
              <li key={p.id}>
                <Link href={href(p.id)} className={s.row}>
                  <span className={s.rowNo}>{no(p.id)}</span>
                  <span className={`t-caps-lg ${s.rowTitle}`}>{p.title}</span>
                  <span className={s.rowArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}

export function ProductLedger() {
  return (
    <ol className={`${s.ledger} ${s.ledgerWide}`}>
      {PRODUCTS.map(([id, holds], i) => (
        <li key={id}>
          <Reveal delay={Math.min(i, 5) * 50}>
            <Link href={href(id)} className={`${s.row} ${s.rowProduct}`}>
              <span className={s.rowNo}>{no(id)}</span>
              <span className={`t-caps-lg ${s.rowTitle}`}>{pageById(id).title}</span>
              <span className={s.rowHolds}>{holds.join(' / ')}</span>
              <span className={`t-figure ${s.rowCount}`} aria-label={`${holds.length} items`}>{String(holds.length).padStart(2, '0')}</span>
              <span className={s.rowArrow} aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
