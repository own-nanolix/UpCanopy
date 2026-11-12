import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import Reveal from '@/components/site/Reveal';
import Hero from '@/components/pages/lp-home/Hero';
import AreaCards from '@/components/pages/lp-home/AreaCards';
import { WindowA, WindowB, WindowC } from '@/components/pages/lp-home/WindowPanels';
import Folder from '@/components/pages/lp-home/Folder';
import Brochure from '@/components/pages/lp-home/Brochure';
import Pillars from '@/components/pages/lp-home/Pillars';
import ManifestoCard from '@/components/pages/lp-home/ManifestoCard';
import ContactCards from '@/components/pages/lp-home/ContactCards';
import s from '@/components/pages/lp-home/lp-home.module.css';

export const metadata = pageMeta('lp-home');

// A section head: a thick rule and a small wide-caps label that names the print piece (site words, English).
function Head({ children }) {
  return (
    <Reveal className={s.head}>
      <hr className="rule" />
      <h2 className="t-caps-lg">{children}</h2>
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-lp-home" aria-label="Landing: Home" style={{ paddingBottom: 0 }}>
      <Hero />

      <div className={`wrap ${s.section}`} id="lp-home-areas">
        <Head>Three areas</Head>
        <AreaCards />
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-window">
        <Head>The window</Head>
        <div className={`grid cols-3 ${s.windows}`}>
          <Reveal><WindowA /></Reveal>
          <Reveal delay={110}><WindowB /></Reveal>
          <Reveal delay={220}><WindowC /></Reveal>
        </div>
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-folder">
        <Head>The folder</Head>
        <Folder />
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-brochure">
        <Head>The brochure</Head>
        <Brochure />
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-pillars">
        <Head>Pillars</Head>
        <Pillars />
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-manifesto">
        <Head>Manifesto</Head>
        <ManifestoCard />
      </div>

      <div className={`wrap ${s.section}`} id="lp-home-contact">
        <Head>Contact</Head>
        <ContactCards />
      </div>

      <LandingFooter />
    </section>
  );
}
