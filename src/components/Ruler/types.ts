/** Props for the decorative Ruler component */
export type RulerProps = {
  /** CSS class applied to the component */
  className?: string;
  /** Number of major (larger) segments of the ruler */
  majorSegments?: number;
  /** Number of minor (smaller) segments between each pair of major segments of the ruler */
  minorSegments?: number;
};
