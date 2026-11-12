import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ScaleDotsG } from '@/components/art/KeyArt';
import s from './motion.module.css';

const wide = { fontFamily: 'var(--font-wide)' };

function Cap({ y = 190, text }) {
  return <text x="16" y={y} fontSize="14" fill="#FFFFFF">{text}</text>;
}

// Three brand loaders. CSS keyframes only; with animation off each is a complete frame.
export default function Loaders() {
  return (
    <div className={s.loaders}>
      <Art className={s.art} viewBox="0 0 300 210" title="Loader: ten dots with the green one travelling" exportName="motion-loader-dots">
        <rect width="300" height="210" fill="#162557" />
        <ScaleDotsG x={30} y={92} w={240} r={9} chosen={0} off="#6F78B8" />
        <g transform="translate(30 92)">
          <g className={s.loopTravel}>
            <circle cx="187" cy="0" r="9" fill="#26CF7B" />
          </g>
        </g>
        <text x="16" y="28" fontSize="14" fontWeight="700" fill="#26CF7B" className="wide" style={wide}>DOTS</text>
        <Cap text="ease-lock, 1400 ms, loops" />
      </Art>
      <Art className={s.art} viewBox="0 0 300 210" title="Loader: the arch lifting and settling" exportName="motion-loader-arch">
        <rect width="300" height="210" fill="#162557" />
        <MarkG x={100} y={36} size={100} fill="#26CF7B" archClass={s.loopArch} />
        <text x="16" y="28" fontSize="14" fontWeight="700" fill="#26CF7B" className="wide" style={wide}>ARCH</text>
        <Cap text="ease-lock, 1800 ms, loops" />
      </Art>
      <Art className={s.art} viewBox="0 0 300 210" title="Loader: a thick band sweeping round a ring" exportName="motion-loader-ring">
        <rect width="300" height="210" fill="#162557" />
        <circle cx="150" cy="95" r="44" fill="none" stroke="#6F78B8" strokeWidth="12" opacity="0.5" />
        <g className={s.loopRing}>
          <circle cx="150" cy="95" r="44" fill="none" stroke="#26CF7B" strokeWidth="12" strokeDasharray="92 185" transform="rotate(-90 150 95)" />
        </g>
        <text x="16" y="28" fontSize="14" fontWeight="700" fill="#26CF7B" className="wide" style={wide}>RING</text>
        <Cap text="ease-in-out, 1600 ms, loops" />
      </Art>
    </div>
  );
}
