import { LINES } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkCropG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import s from './lp-manifesto.module.css';

// The closing lines full-bleed on Green Park, the mark crop (the folder's cover graphic) behind them.
export default function Closing() {
  const [brand, ...tag] = LINES.close.split('. ');
  return (
    <div className={`field-green ${s.closing}`}>
      <div className={s.closingArt} aria-hidden="true">
        <Art viewBox="0 0 600 700" title="Enlarged crop of the mark in Blue Ocean on Green Park" exportName="lp-manifesto-mark-crop" decorative>
          <rect width="600" height="700" fill="#26CF7B" />
          <MarkCropG idp="lp-manifesto-cl" w={600} h={700} zoom={1.9} dx={-0.42} dy={-0.2} fill="#162557" />
        </Art>
      </div>
      <div className={`wrap ${s.closingBody}`}>
        <Reveal>
          <p lang="pt-BR" className={s.closingLine}>{LINES.control}</p>
        </Reveal>
        <Reveal delay={160}>
          <p lang="pt-BR" className={`t-line ${s.closingSign}`}>
            <span className="strong">{brand}.</span> {tag.join('. ')}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
