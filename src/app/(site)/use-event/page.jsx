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
            <Plate caption="Lanyard with speaker badge"><LanyardBadge /></Plate>
            <Plate caption="VIP pass"><VipPass /></Plate>
          </div>
          <div className={s.small}>
            <Plate caption="Staff ID, navy"><StaffIds which="founder" /></Plate>
            <Plate caption="Staff ID, Green Park"><StaffIds which="badge" /></Plate>
            {FABRIC.map((d, i) => (
              <Plate key={d.name} caption={`Fabric wristband ${i + 1}`}><FabricBand index={i} /></Plate>
            ))}
            {SILICONE.map((d, i) => (
              <Plate key={d.name} caption={`Silicone wristband ${i + 1}`}><SiliconeBand index={i} /></Plate>
            ))}
            {TICKETS.map((d, i) => (
              <Plate key={d.name} caption={`Ticket ${i + 1}`}><TicketFan index={i} /></Plate>
            ))}
            {FLAGS.map((d, i) => (
              <Plate key={d.name} caption={`Feather flag ${i + 1}`}><FeatherFlag index={i} /></Plate>
            ))}
            <Plate caption="Hanging banner"><HangingBanner /></Plate>
            <Plate caption="Feather flags" className={s.span}><FlagLineup /></Plate>
          </div>
        </div>
      </div>
    </section>
  );
}
