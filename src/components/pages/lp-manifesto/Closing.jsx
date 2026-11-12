import { HEX, LINES } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkCropG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import s from './lp-manifesto.module.css';

// The closing lines full-bleed on Green Park, the mark crop of the closed folder cover (m08) at the right edge,
// with the crop measured there (mark 1.67 x the panel width, offsets -0.74 and -0.08).
export default function Closing() {
  const [brand, ...tag] = LINES.close.split('. ');
  return (
    <div className={`field-green ${s.closing}`}>
      <div className={s.closingArt} aria-hidden="true">
        <Art viewBox="0 0 600 850" title="Enlarged crop of the mark in Blue Ocean on Green Park" exportName="lp-manifesto-mark-crop" decorative preserveAspectRatio="xMinYMid slice">
          <rect width="600" height="850" fill={HEX.green} />
          <MarkCropG idp="lp-manifesto-cl" w={600} h={850} zoom={1.67} dx={-0.74} dy={-0.08} fill={HEX.navy} />
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
