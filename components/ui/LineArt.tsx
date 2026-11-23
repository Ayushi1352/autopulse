/**
 * Drawings used as decoration (the dots behind the About photos). They are SVG shapes, so they stay sharp at every
 * size, and draw in `currentColor`, so each place sets the colour and size with classes.
 */
type ArtProps = { className?: string };

// Dot centres measured on the 1920px design, in px of the About photo block (895 × 734): 8 columns × 5 rows
const dotColumns = [1.4, 26.8, 52.5, 76.5, 94.5, 119.5, 145.2, 169.4];
const dotRows = [342.4, 368.5, 396.2, 423.7, 450.5];

/** The grid of small orange dots by the About photos; it covers the whole photo block, so it scales with it */
export const DotGrid = ({ className }: ArtProps) => (
  <svg viewBox="0 0 895 734" aria-hidden="true" className={`overflow-visible ${className ?? ""}`}>
    <g fill="currentColor">
      {dotRows.flatMap((cy) => dotColumns.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" />))}
    </g>
  </svg>
);
