import Art from '@/components/art/Art';
import { MarkG, MarkCropG, WordmarkVerticalG } from '@/components/art/Mark';
import { Line } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { LINES, SECTORS, HEX } from '@/lib/brand';
import { GrainDefs } from './svg-text';
import s from './lp-home.module.css';

// The folder (m08): inside left, the navy-to-green page with the small green mark and the CEO line; beside it
// the closed cover, green with the enlarged navy mark crop and "UpCanopy" set vertically.
export default function Folder() {
  return (
    <div className={s.folder}>
      <Reveal className={s.folderLeft}>
        <div className={s.ceoCard}>
          <Art className={s.fill} decorative viewBox="0 0 480 640" exportName="lp-home-folder-inside">
            <defs>
              <linearGradient id="lp-home-folder-inside-sky" x1="0.15" y1="1" x2="0.85" y2="0">
                <stop offset="0" stopColor="#162557" />
                <stop offset="0.5" stopColor="#173B63" />
                <stop offset="1" stopColor="#1E8F6A" />
              </linearGradient>
              <GrainDefs id="lp-home-folder-inside-grain" opacity={0.2} />
            </defs>
            <rect width="480" height="640" fill="url(#lp-home-folder-inside-sky)" />
            <rect width="480" height="640" fill="#FFFFFF" filter="url(#lp-home-folder-inside-grain)" />
            <MarkG x={36} y={34} size={54} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
          </Art>
          <p className={`t-line ${s.ceoText}`} lang="pt-BR">
            {LINES.ceo.rows.map((row) => (
              <span key={row} style={{ display: 'block' }}><Line text={row} strong={LINES.ceo.strong} className="strong" /></span>
            ))}
          </p>
        </div>
      </Reveal>
      <Reveal delay={140} className={s.folderRight}>
        <Art className={s.cover} viewBox="0 0 480 640" title="Folder cover: green with the enlarged mark and the word-mark set vertically" exportName="lp-home-folder-cover">
          {/* Re-measured on m08 after un-warping the closed cover to a flat 480 x 640: the crop is the right leg
              of the arch and the right end of the bar (mark drawn 869 units wide at -453.5, -106.5); the word
              reads bottom to top along the right edge, from y 210 to y 31, about 30 units high. Colours sampled:
              green on the right, a pale blue-grey on the left, darker under the top edge. */}
          <defs>
            <linearGradient id="lp-home-folder-cover-sky" x1="0" y1="0.55" x2="1" y2="0.45">
              <stop offset="0" stopColor="#8FA6AC" />
              <stop offset="0.4" stopColor="#80C3A6" />
              <stop offset="0.85" stopColor="#30CC80" />
              <stop offset="1" stopColor="#2ECF7F" />
            </linearGradient>
            <linearGradient id="lp-home-folder-cover-shade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#162557" stopOpacity="0.45" />
              <stop offset="0.4" stopColor="#162557" stopOpacity="0" />
            </linearGradient>
            <GrainDefs id="lp-home-folder-cover-grain" opacity={0.16} />
          </defs>
          <rect width="480" height="640" fill="url(#lp-home-folder-cover-sky)" />
          <rect width="480" height="640" fill="url(#lp-home-folder-cover-shade)" />
          <MarkCropG idp="lp-home-folder" w={480} h={640} zoom={1.811} dx={-0.945} dy={-0.166} fill={HEX.navy} />
          <rect width="480" height="640" fill="#FFFFFF" filter="url(#lp-home-folder-cover-grain)" />
          <WordmarkVerticalG x={426} y={210} size={30} fill="#FFFFFF" />
        </Art>
      </Reveal>
      <Reveal className={s.folderBtn} delay={200}>
        <Button href="/lp-hardscape/" iconRight="arrow-right">{SECTORS[1]}</Button>
      </Reveal>
    </div>
  );
}
