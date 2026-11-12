import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import LandingFooter from '@/components/ui/LandingFooter';
import LandingNav from '@/components/ui/LandingNav';
import { DESCRIPTOR, TAGLINE } from '@/lib/brand';
import Bay from '@/components/pages/web-system/Bay';
import { ButtonSet, IconButtons } from '@/components/pages/web-system/Buttons';
import Links from '@/components/pages/web-system/Links';
import { Tags, ScaleStatus } from '@/components/pages/web-system/Tags';
import AppRail from '@/components/pages/web-system/AppRail';
import { AreaCards, BrandLineCard, CeoCard, PillarCards, PersonCard } from '@/components/pages/web-system/Cards';
import { PullQuote, TokenBlock } from '@/components/pages/web-system/Blocks';
import { SheetRows, ContactList, DocumentRow, Accordion } from '@/components/pages/web-system/Lists';
import MegaMenu from '@/components/pages/web-system/MegaMenu';
import { SHEETS, Sheet } from '@/components/pages/web-system/Arts';
import s from '@/components/pages/web-system/web-system.module.css';

export const metadata = pageMeta('web-system');

export default function Page() {
  const sheet = (id) => SHEETS.find((x) => x.id === id);
  return (
    <section className="page" id="p-web-system" aria-label="Web system">
      <header className={`wrap ${s.head}`}>
        <div className={s.headRow}>
          <div>
            <h1 tabIndex={-1} className="t-h1">Web <span className="strong">system</span></h1>
            <p className="t-lead muted" style={{ marginTop: 16, maxWidth: '34em' }}>
              Components built from the print language: square corners, 2 px lines, wide caps, navy and green fields.
            </p>
          </div>
          <div className={s.headMeta}>
            <Chip>{DESCRIPTOR}</Chip>
            <p lang="pt-BR" className="t-line">{TAGLINE}</p>
          </div>
        </div>
        <hr className="rule" style={{ marginTop: 'clamp(24px, 3vw, 44px)' }} />
      </header>

      <div className="wrap">
        <div className={s.bays}>
          <Bay id="buttons" label="Button set" note="52 px, radius 0, padding 24, caps 12 px" span={7}><ButtonSet /></Bay>
          <Bay id="icon-buttons" label="Icon buttons" note="52 px square" span={5}><IconButtons /></Bay>

          <Bay id="links" label="Links" note="2 px underline" span={5}><Links /></Bay>
          <Bay id="nav" label="Navigation bar" note="navy and light tones" span={7}>
            <div className={`${s.navBox} field-rise`}><LandingNav current="lp-crm" /></div>
            <div className={`${s.navBox} ${s.gWhite}`}><LandingNav current="lp-agenda" tone="light" /></div>
          </Bay>

          <Bay id="tags" label="Tags and chips" note="stroke 2, radius 0" span={7}><Tags /></Bay>
          <Bay id="status" label="Status scale" note="ten steps, one green" span={5}><ScaleStatus /></Bay>

          <Bay id="rail" label="App rail" note="72 px rail, 52 px buttons" span={5}><AppRail /></Bay>
          <Bay id="area-cards" label="Area cards" span={7}><AreaCards /></Bay>

          <Bay id="line-card" label="Brand line card" note="gradient field" span={7}><BrandLineCard /></Bay>
          <Bay id="ceo-card" label="Navy card with mark crop" span={5}><CeoCard /></Bay>

          <Bay id="pillar-cards" label="Pillar cards and person card" span={5}>
            <PillarCards />
            <div style={{ marginTop: 12 }}><PersonCard /></div>
          </Bay>
          <Bay id="quote" label="Content block" note="pull quote" span={7}><PullQuote /></Bay>

          <Bay id="tokens" label="Token block" note="values from globals.css" span={7}><TokenBlock /></Bay>
          <Bay id="sheet" label="Project sheet rows" note="2 px rules" span={5}><SheetRows /></Bay>

          <Bay id="contact" label="Contact list and document row" span={5}>
            <ContactList />
            <div style={{ marginTop: 22 }}><DocumentRow /></div>
          </Bay>
          <Bay id="accordion" label="Accordion" note="aria-expanded" span={7}><Accordion /></Bay>
        </div>
      </div>

      <div className={s.megaBay} id="web-system-mega">
        <div className="wrap">
          <div className={`${s.bayHead} ${s.megaHead}`}>
            <h2 className="t-caps-lg">Mega menu</h2>
            <p className="t-label">full width, open on navy</p>
          </div>
        </div>
        <Reveal><MegaMenu /></Reveal>
      </div>

      <div className="wrap">
        <div className={s.bays} style={{ paddingTop: 'clamp(48px, 6vw, 96px)' }}>
          <Bay id="sheet-button" label="Button anatomy" span={7}><Sheet {...sheet('button')} /></Bay>
          <Bay id="sheet-tile" label="Mega menu tile" span={5}><Sheet {...sheet('tile')} /></Bay>
          <Bay id="sheet-chips" label="Chip sheet" span={5}><Sheet {...sheet('chips')} /></Bay>
          <Bay id="sheet-nav" label="Navigation anatomy" span={7}><Sheet {...sheet('nav')} /></Bay>
          <Bay id="sheet-slide" label="Slide corner furniture" span={7}><Sheet {...sheet('slide')} /></Bay>
          <Bay id="sheet-rail" label="Rail anatomy" span={5}><Sheet {...sheet('rail')} /></Bay>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 'var(--pad)' }}>
        <div className={s.bayHead}><h2 className="t-caps-lg">Footer</h2><p className="t-label">shared component</p></div>
      </div>
      <LandingFooter />
    </section>
  );
}
