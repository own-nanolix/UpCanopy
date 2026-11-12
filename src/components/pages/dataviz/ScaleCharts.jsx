// Charts drawn from the five attribute scales of slide m03 (ten steps each, one green dot per scale).
import Art from '@/components/art/Art';
import { ScaleDotsG } from '@/components/art/KeyArt';
import { SCALES, DIRECTION, HEX } from '@/lib/brand';
import { arcPath, bandPath, polar, r2, segments } from '@/lib/charts';
import { INK, QUIET, Lbl, Hit, tip } from './kit';

const name = (sc) => `${sc.left}–${sc.right}`;
const say = (sc) => `${name(sc)}: ${sc.chosen} of 10`;

// Chart 1: slide m03, rebuilt. Five rows of ten dots, one green each; labels left and right, direction below.
export function ScaleDots() {
  const x = 18, w = 404, rowH = 56;
  return (
    <Art viewBox="0 0 440 390" title="The five attribute scales: ten dots each, one green dot per scale" exportName="dataviz-scale-dots">
      {SCALES.map((sc, i) => {
        const cy = 42 + rowH * i;
        return (
          <g key={sc.left}>
            <Lbl x={x - 10} y={cy - 18} size={15} ls={0.05} lang="pt-BR">{sc.left}</Lbl>
            <Lbl x={x + w + 10} y={cy - 18} size={15} ls={0.05} anchor="end" lang="pt-BR">{sc.right}</Lbl>
            <ScaleDotsG x={x} y={cy} w={w} r={10.5} chosen={sc.chosen} lock />
            <Hit cx={x + ((sc.chosen - 1) * w) / 9} cy={cy} r={14} text={say(sc)} />
          </g>
        );
      })}
      <rect x="0" y="304" width="440" height="2" fill={INK} opacity="0.9" />
      <Lbl x="0" y="332" size={15} weight={700} ls={0.02} lang="pt-BR">{DIRECTION.label}</Lbl>
      <Lbl x="0" y="358" size={15} weight={700} ls={0.02} lang="pt-BR">{`${DIRECTION.words[0]} • ${DIRECTION.words[1]}`}</Lbl>
      <Lbl x="0" y="380" size={15} weight={700} ls={0.02} lang="pt-BR">{`${DIRECTION.words[2]} • ${DIRECTION.words[3]}`}</Lbl>
    </Art>
  );
}

// Chart 2: radar drawn with thick bands cut with straight ends. Radius = chosen step of ten.
export function ScaleRadar() {
  const cx = 210, cy = 172, rIn = 20, R = 112;
  const rad = (v) => r2(rIn + (v / 10) * (R - rIn));
  return (
    <Art viewBox="24 20 396 280" title="Radar of the five scales as thick bands, one band per scale" exportName="dataviz-scale-radar">
      {[5, 10].map((v) => (
        <circle key={v} cx={cx} cy={cy} r={rad(v)} fill="none" stroke={HEX.muted} strokeWidth="1" strokeDasharray="2 4" />
      ))}
      {SCALES.map((sc, k) => {
        const a = k * 72;
        const [lx, ly] = polar(cx, cy, R + 18, a);
        const [vx, vy] = polar(cx, cy, rad(sc.chosen) + 14, a);
        return (
          <g key={sc.left}>
            <path d={bandPath(cx, cy, rIn, R, a - 22, a + 22)} fill={QUIET} />
            <path d={bandPath(cx, cy, rIn, rad(sc.chosen), a - 22, a + 22)} fill={k === 2 ? HEX.green : HEX.navy} className="lock" style={{ '--i': k }} {...tip(say(sc))} />
            <Lbl x={vx} y={vy + 5} anchor="middle" size={15} weight={700}>{sc.chosen}</Lbl>
            <Lbl x={lx} y={k === 0 ? ly - 2 : ly + (k === 1 || k === 4 ? 2 : 12)} size={15} ls={0.03} anchor={k === 0 ? 'middle' : k < 3 ? 'start' : 'end'} lang="pt-BR">{sc.right}</Lbl>
          </g>
        );
      })}
    </Art>
  );
}

// Chart 3: the five scales ranked, as rows of ten square blocks (the last filled block is green).
export function ScaleRanked() {
  const rows = [...SCALES].sort((a, b) => b.chosen - a.chosen);
  return (
    <Art viewBox="0 0 320 262" title="The five scales ranked by chosen step, as rows of ten square blocks" exportName="dataviz-scale-ranked">
      {rows.map((sc, i) => (
        <g key={sc.left} {...tip(say(sc))}>
          <Lbl x="0" y={16 + 52 * i} size={13} lang="pt-BR">{name(sc)}</Lbl>
          <Lbl x="320" y={16 + 52 * i} size={15} weight={700} anchor="end">{sc.chosen}</Lbl>
          {segments(10, 320, sc.chosen, 4).map((b, j) => (
            <rect key={j} x={b.x} y={24 + 52 * i} width={b.w} height="22" fill={!b.on ? QUIET : j === sc.chosen - 1 ? HEX.green : HEX.navy} className="rise" style={{ '--i': j + i }} />
          ))}
        </g>
      ))}
    </Art>
  );
}

// Chart 4: pole to pole. A thick band from the left pole to the chosen step; one green block on the track.
export function ScalePoles() {
  const W = 440;
  return (
    <Art viewBox="0 0 440 300" title="Pole to pole: each scale as a track with the chosen step marked" exportName="dataviz-scale-poles">
      {SCALES.map((sc, i) => {
        const ty = 34 + 56 * i;
        const p = ((sc.chosen - 0.5) / 10) * W;
        return (
          <g key={sc.left}>
            <Lbl x="0" y={ty - 12} size={15} ls={0.05} lang="pt-BR">{sc.left}</Lbl>
            <Lbl x={W} y={ty - 12} size={15} ls={0.05} anchor="end" lang="pt-BR">{sc.right}</Lbl>
            <rect x="0" y={ty} width={W} height="4" fill={QUIET} />
            {Array.from({ length: 10 }, (_, k) => (
              <rect key={k} x={((k + 0.5) / 10) * W - 1} y={ty - 5} width="2" height="14" fill={INK} opacity="0.3" />
            ))}
            <rect x="0" y={ty} width={p} height="4" fill={HEX.navy} className="grow-x" style={{ '--i': i }} />
            <rect x={p - 10} y={ty - 8} width="20" height="20" fill={HEX.green} className="rise" style={{ '--i': i + 2 }} {...tip(say(sc))} />
          </g>
        );
      })}
    </Art>
  );
}

// Chart 5: dot matrix, five scales by ten steps. Filled up to the chosen step, the chosen one green.
export function ScaleMatrix() {
  return (
    <Art viewBox="0 0 320 200" title="Dot matrix of the five scales by ten steps" exportName="dataviz-scale-matrix">
      {Array.from({ length: 10 }, (_, c) => (
        <Lbl key={c} x={16 + c * 32.4} y="14" size={13} anchor="middle" fill={HEX.muted}>{c + 1}</Lbl>
      ))}
      {SCALES.map((sc, i) => {
        const cy = 42 + 34 * i;
        return (
          <g key={sc.left}>
            {Array.from({ length: 10 }, (_, c) => {
              const cx = r2(16 + c * 32.4);
              const on = c + 1 <= sc.chosen;
              return <circle key={c} cx={cx} cy={cy} r="10" fill={c + 1 === sc.chosen ? HEX.green : on ? HEX.navy : 'none'} stroke={on ? 'none' : HEX.muted} strokeWidth="1.5" className="lock" style={{ '--i': c + i * 2 }} />;
            })}
            <Hit cx={16 + (sc.chosen - 1) * 32.4} cy={cy} r={12} text={say(sc)} />
          </g>
        );
      })}
    </Art>
  );
}

// Chart 18: a half-ring gauge of ten bands for one scale (NATURAL–URBANA, 9 of 10).
export function ScaleGauge() {
  const sc = SCALES[2];
  return (
    <Art viewBox="0 0 320 200" title="Gauge of ten bands: NATURAL–URBANA, 9 of 10" exportName="dataviz-scale-gauge">
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={bandPath(160, 160, 78, 128, -90 + 18 * i + 1, -90 + 18 * (i + 1) - 1)} fill={i < sc.chosen - 1 ? HEX.navy : i === sc.chosen - 1 ? HEX.green : QUIET} className="lock" style={{ '--i': i }} {...(i === sc.chosen - 1 ? tip(say(sc)) : {})} />
      ))}
      <Lbl x="160" y="148" size={48} weight={500} anchor="middle" wide ls={-0.04}>{sc.chosen}</Lbl>
      <Lbl x="160" y="184" size={13} anchor="middle" ls={0.12}>OF 10</Lbl>
      <Lbl x="53" y="184" size={13} anchor="middle" lang="pt-BR">{sc.left}</Lbl>
      <Lbl x="267" y="184" size={13} anchor="middle" lang="pt-BR">{sc.right}</Lbl>
    </Art>
  );
}

// Chart 19: radial bars on dashed construction rings. Each ring sweeps ten steps of 27 degrees, from 12 o'clock.
export function ScaleRings() {
  const mids = [130, 108, 86, 64, 42];
  return (
    <Art viewBox="0 0 320 320" title="Radial bars on concentric dashed rings, one ring per scale" exportName="dataviz-scale-rings">
      {SCALES.map((sc, i) => {
        const m = mids[i];
        return (
          <g key={sc.left}>
            <path d={arcPath(160, 160, m, 0, 270)} fill="none" stroke={HEX.muted} strokeWidth="1" strokeDasharray="2 4" />
            <path d={bandPath(160, 160, m - 7, m + 7, 0, sc.chosen * 27)} fill={i === 2 ? HEX.green : HEX.navy} className="lock" style={{ '--i': i * 2 }} {...tip(say(sc))} />
            <Lbl x="152" y={160 - m + 5} anchor="end" size={13} ls={0.03} lang="pt-BR">{`${sc.right} ${sc.chosen}`}</Lbl>
          </g>
        );
      })}
    </Art>
  );
}
