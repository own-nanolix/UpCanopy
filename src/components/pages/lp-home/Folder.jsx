import Art from '@/components/art/Art';
import { MarkG, MarkCropG, WordmarkVerticalG } from '@/components/art/Mark';
import { BrandDefs } from '@/components/art/KeyArt';
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
          <BrandDefs idp="lp-home-folder" />
          <rect width="480" height="640" fill="url(#lp-home-folder-green)" />
          <MarkCropG idp="lp-home-folder" w={480} h={640} zoom={1.9} dx={-0.42} dy={-0.2} fill={HEX.navy} />
          <WordmarkVerticalG x={412} y={32 + 6.1 * 50} size={50} fill="#FFFFFF" />
        </Art>
      </Reveal>
      <Reveal className={s.folderBtn} delay={200}>
        <Button href="/lp-hardscape/" iconRight="arrow-right">{SECTORS[1]}</Button>
      </Reveal>
    </div>
  );
}
