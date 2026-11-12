import Reveal from '@/components/site/Reveal';
import ChartFrame from './ChartFrame';
import s from './dataviz.module.css';

// One chart card on a slide-grey square ground: title and kind in caps, the chart, a plain caption.
// size "s" takes one column of the three, "l" takes two. note: "est" marks estimated proportions;
// "shape" marks a drawn shape with no published data.
export default function Chart({ title, kind, size = 's', note, caption, children }) {
  return (
    <Reveal className={size === 'l' ? s.l : s.s}>
      <article className={`card-slide ${s.chart}`}>
        <header className="card-head">
          <h3 className="t-caps-lg">{title}</h3>
          <span className="chip chip-sm">{kind}</span>
        </header>
        <ChartFrame>{children}</ChartFrame>
        <p className="t-small">
          {note === 'shape' && <strong>Shape only: no published data. </strong>}
          {note === 'est' && <strong>Estimated. </strong>}
          {caption}
        </p>
      </article>
    </Reveal>
  );
}
