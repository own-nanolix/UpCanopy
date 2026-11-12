import { pageMeta } from '@/lib/pages';
import Booth from '@/components/pages/use-event/Booth';
import { LanyardBadge, VipPass } from '@/components/pages/use-event/Lanyard';
import { StaffIds } from '@/components/pages/use-event/Ids';
import { FabricBand, SiliconeBand, FABRIC, SILICONE } from '@/components/pages/use-event/Wristbands';
import { TicketFan, TICKETS } from '@/components/pages/use-event/Tickets';
import { FeatherFlag, FlagLineup, HangingBanner, FLAGS } from '@/components/pages/use-event/Flags';
import s from '@/components/pages/use-event/use-event.module.css';

export const metadata = pageMeta('use-event');

function Plate({ caption, className, children }) {
  return (
    <figure className={`${s.plate} ${className || ''}`}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap"><span>{caption}</span></figcaption>
    </figure>
  );
}

function Cell({ title, children }) {
  return (
    <div className={s.cell}>
      <h2 className="t-h3">{title}</h2>
      <div className={s.cellPlates}>{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-event" aria-label="Event">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Event</h1>
        </header>

        <Plate caption="Exhibition booth" className={s.wide}>
          <Booth />
        </Plate>

        <div className={`${s.sec} ${s.split}`}>
          <div className={s.tall}>
            <h2 className="t-h3">Badges</h2>
            <Plate caption="Lanyard with speaker badge"><LanyardBadge /></Plate>
            <Plate caption="VIP pass"><VipPass /></Plate>
          </div>
          {/* 2 x 3 of small plates: each cell leads with one plate, its other colourways below it */}
          <div className={s.small}>
            <Cell title="Staff IDs">
              <Plate caption="Staff ID, navy"><StaffIds which="founder" /></Plate>
              <Plate caption="Staff ID, Green Park"><StaffIds which="badge" /></Plate>
            </Cell>
            <Cell title="Fabric wristbands">
              {FABRIC.map((d, i) => (
                <Plate key={d.name} caption={`Fabric ${i + 1}`}><FabricBand index={i} /></Plate>
              ))}
            </Cell>
            <Cell title="Silicone wristbands">
              {SILICONE.map((d, i) => (
                <Plate key={d.name} caption={`Silicone ${i + 1}`}><SiliconeBand index={i} /></Plate>
              ))}
            </Cell>
            <Cell title="Tickets">
              {TICKETS.map((d, i) => (
                <Plate key={d.name} caption={`Ticket ${i + 1}`}><TicketFan index={i} /></Plate>
              ))}
            </Cell>
            <Cell title="Feather flags">
              <Plate caption="Three flags"><FlagLineup /></Plate>
              {FLAGS.map((d, i) => (
                <Plate key={d.name} caption={`Flag ${i + 1}`}><FeatherFlag index={i} /></Plate>
              ))}
            </Cell>
            <Cell title="Hanging banner">
              <Plate caption="Hanging banner"><HangingBanner /></Plate>
            </Cell>
          </div>
        </div>
      </div>
    </section>
  );
}
