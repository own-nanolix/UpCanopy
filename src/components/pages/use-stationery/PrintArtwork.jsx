// Flat print artwork, one SVG each: the letterhead, the envelope, the three business cards and the two notebook
// covers. They are the same artwork that sits on the mockups.
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { ID, C } from './parts';
import { LetterG, EnvelopeG, CardFrontMarkG, CardFrontLockupG, CardBackG, LETTER, ENVELOPE, CARD } from './Artwork';
import { NotebookCoverG, NB } from './Notebooks';

const M = 24; // margin around each piece

function Sheet({ w, h, name, title, children }) {
  return (
    <Art viewBox={`0 0 ${w + M * 2} ${h + M * 2}`} title={title} exportName={`${ID}-art-${name}`}>
      <rect width={w + M * 2} height={h + M * 2} fill={C.slide} />
      <g transform={`translate(${M} ${M})`}>{children}</g>
    </Art>
  );
}

export const ARTWORK = {
  letterhead: () => (
    <Sheet w={LETTER.w} h={LETTER.h} name="letterhead" title="Letterhead: giant vertical word-mark, heading, quiet body lines and footer">
      <LetterG idp={`${ID}-art-let`} />
    </Sheet>
  ),
  envelope: () => (
    <Sheet w={ENVELOPE.w} h={ENVELOPE.h} name="envelope" title="Envelope with the flap, the mark and the contacts">
      <EnvelopeG idp={`${ID}-art-env`} />
    </Sheet>
  ),
  notebookNavy: () => (
    <Sheet w={NB.w} h={NB.h} name="notebook-navy" title="Notebook cover, navy with the mint mark">
      <BrandDefs idp={`${ID}-art-nbn`} />
      <NotebookCoverG kind="navy" idp={`${ID}-art-nbn`} clip={`${ID}-art-nbn-crop`} />
    </Sheet>
  ),
  notebookGreen: () => (
    <Sheet w={NB.w} h={NB.h} name="notebook-green" title="Notebook cover, green with the navy mark crop and the vertical word-mark">
      <BrandDefs idp={`${ID}-art-nbg`} />
      <NotebookCoverG kind="green" idp={`${ID}-art-nbg`} clip={`${ID}-art-nbg-crop`} />
    </Sheet>
  ),
  cardMark: () => (
    <Sheet w={CARD.w} h={CARD.h} name="card-front-mark" title="Business card front, navy with the Green Park mark">
      <CardFrontMarkG />
    </Sheet>
  ),
  cardLockup: () => (
    <Sheet w={CARD.w} h={CARD.h} name="card-front-lockup" title="Business card front, navy with the horizontal lockup">
      <CardFrontLockupG />
    </Sheet>
  ),
  cardBack: () => (
    <Sheet w={CARD.w} h={CARD.h} name="card-back" title="Business card back, Green Park with the printed details">
      <CardBackG />
    </Sheet>
  ),
};
