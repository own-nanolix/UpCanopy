'use client';

import { useState } from 'react';
import { INTRO, SECTORS } from '@/lib/brand';
import Icon from '@/components/site/Icon';
import { LandscapeArt, BricksArt } from './HardArt';
import s from './lp-hardscape.module.css';

// Verbatim fragments of the page text, one per sector.
const BACK = {
  Landscape: 'Deixar o telefone tocar porque as mãos estavam ocupadas com a terra.',
  Hardscape: 'Tijolo por tijolo, jardim por jardim.',
};
const FRONT = {
  Landscape: { cls: 'card-green', art: <LandscapeArt /> },
  Hardscape: { cls: 'card-navy', art: <BricksArt /> },
};
const BACKCLS = { Landscape: 'card-navy', Hardscape: 'card-green' };

function Flip({ name }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`${s.flip} ${on ? s.flipped : ''}`}>
      <div className={s.flipInner}>
        <div className={`${s.face} ${FRONT[name].cls}`} aria-hidden={on}>
          <span className={s.flipHint}><Icon name="plus" size={16} />Flip</span>
          <div className={s.faceArt}>{FRONT[name].art}</div>
          <p className={s.faceName}>{name}</p>
        </div>
        <div className={`${s.face} ${s.back} ${BACKCLS[name]}`} aria-hidden={!on}>
          <span className={s.flipHint}>{name}</span>
          <p className={s.backLine} lang="pt-BR">{BACK[name]}</p>
          <span className={s.flipHint}><Icon name="arrow-left" size={16} />Back</span>
        </div>
      </div>
      <button type="button" className={s.flipBtn} aria-pressed={on} aria-label={`${name}: flip card`} onClick={() => setOn((v) => !v)} />
    </div>
  );
}

export default function SectorCards() {
  return (
    <>
      <div className={s.flips}>
        {SECTORS.map((n) => <Flip key={n} name={n} />)}
      </div>
      <p className="t-lead" style={{ marginTop: 28, maxWidth: '40em' }} lang="pt-BR">{INTRO.text.split(' O projeto')[0]}</p>
    </>
  );
}
