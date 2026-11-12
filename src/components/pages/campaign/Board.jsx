'use client';
// The campaign board: posts, posters, the framed-poster mockup, stories and the profile grid. Replay re-mounts it.
import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { SweepG, MaterialDefs, CastG, ShadowG, StepG, SheenG, cascade } from '@/components/art/Mockup';
import { listV } from '@/lib/motion';
import { TAGLINE, DESCRIPTOR, CONTACT } from '@/lib/brand';
import Button from '@/components/ui/Button';
import Posts from './Posts';
import Posters, { PosterBridgeG, PosterCitylightG, PosterCeoG } from './Posters';
import Stories from './Stories';
import Grid from './Grid';
import { K, Piece } from './shared';
import s from './campaign.module.css';

// One framed poster of the mockup: metal frame, the artwork clipped to the glass, a sheen.
const FW = 480, FH = 600, FB = 16, SC = FW / 1080;
function Framed({ n, x, y, rotate, G }) {
  const idp = `campaign-mock-${n + 1}`;
  const outline = `M${-FB} ${-FB}H${FW + FB}V${FH + FB}H${-FB}Z`;
  return (
    <StepG i={n} x={x} y={y} rotate={rotate}>
      <CastG d={outline} depth={34} />
      <rect x={-FB} y={-FB} width={FW + FB * 2} height={FH + FB * 2} fill="url(#campaign-mock-metal-dark)" />
      <clipPath id={`${idp}-clip`}><rect width="1080" height="1350" /></clipPath>
      <g transform={`scale(${SC})`}>
        <g clipPath={`url(#${idp}-clip)`}><G idp={idp} /></g>
      </g>
      <path d={`M0 0H${FW}V${FH}H0Z`} fill="url(#campaign-mock-glass)" opacity="0.55" />
      <SheenG idp="campaign-mock" d={`M0 0H${FW}V${FH}H0Z`} opacity={0.25} />
      <path d={`M${-FB} ${-FB}H${FW + FB}V${-FB + 3}H${-FB}Z`} fill="#FFFFFF" opacity="0.25" />
    </StepG>
  );
}

function Mockup() {
  const spots = cascade(3, 120, 56, 1150, 300);
  const G = [PosterBridgeG, PosterCitylightG, PosterCeoG];
  const rot = [-2.2, 1.4, -1.6];
  return (
    <Piece solo kind="Mockup" caption="Posters in frames">
      <div className="mock">
        <Art viewBox="0 0 1600 900" title="Three framed posters leaning in a row that steps down to the right" exportName="campaign-mockup-frames">
          <SweepG idp="campaign-mock-sweep" w={1600} h={900} horizon={0.72} />
          <MaterialDefs idp="campaign-mock" />
          {spots.map((p) => (
            <ShadowG key={`sh${p.i}`} idp={`campaign-mock-sh${p.i}`} cx={p.x + FW / 2 + 20} cy={p.y + FH + FB + 4} rx={FW / 2} blur={12} opacity={0.28} />
          ))}
          {spots.map((p) => <Framed key={p.i} n={p.i} x={p.x} y={p.y} rotate={rot[p.i]} G={G[p.i]} />)}
        </Art>
      </div>
    </Piece>
  );
}

function Avatar() {
  return (
    <div className={s.avatar}>
      <Art viewBox="0 0 200 200" title="Profile picture: green mark on navy" exportName="campaign-avatar">
        <rect width="200" height="200" fill={K.navy} />
        <MarkG x={44} y={44} size={112} fill={K.green} />
      </Art>
    </div>
  );
}

export default function Board() {
  const [run, setRun] = useState(0);
  const group = { variants: listV, initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } };
  return (
    <>
      <div className={`wrap ${s.head}`}>
        <p className="t-lead muted">Posts, posters, stories and the profile grid, built from the brand&apos;s own lines and visuals.</p>
        <Button variant="navy" size="sm" icon="arrow-up" onClick={() => setRun((n) => n + 1)}>Replay</Button>
      </div>
      <div key={run}>
        <div className={`wrap ${s.main}`}>
          <section aria-labelledby="campaign-h-posts">
            <h2 id="campaign-h-posts" className={s.sub}>Posts</h2>
            <div className={s.posts}><Posts /></div>
          </section>
          <div className={s.col}>
            <section aria-labelledby="campaign-h-posters">
              <h2 id="campaign-h-posters" className={s.sub}>Posters</h2>
              <motion.div className={s.posters} {...group}><Posters /></motion.div>
            </section>
            <section aria-labelledby="campaign-h-mock">
              <h2 id="campaign-h-mock" className={s.sub}>In frames</h2>
              <Mockup />
            </section>
            <section aria-labelledby="campaign-h-stories">
              <h2 id="campaign-h-stories" className={s.sub}>Stories</h2>
              <motion.div className={s.stories} {...group}><Stories /></motion.div>
            </section>
          </div>
        </div>
        <section className={s.gridBand} aria-labelledby="campaign-h-grid">
          <div className={`wrap ${s.gridInner}`}>
            <div className={s.gridIntro}>
              <h2 id="campaign-h-grid" className="t-h2">Profile grid</h2>
              <p className="t-lead on-navy" style={{ marginTop: 16 }} lang="pt-BR">{TAGLINE}</p>
            </div>
            <div className={s.phone}>
              <div className={s.profile}>
                <Avatar />
                <div>
                  <b>UpCanopy</b>
                  <i>{DESCRIPTOR}</i>
                  <span>{CONTACT.handle}</span>
                </div>
              </div>
              <Grid />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
