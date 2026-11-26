import type { SplitTitle } from "@/types/templates.types";

/*
  Sizes from 1024px up are taken from the 1920px design: 1 design pixel = 0.0625rem
  (the root font is 100vw / 120 there, at most 16px, so a 1920px screen shows the design 1:1).
*/

/**
 * Size of every section title on phones and tablets, so all titles match (desktop sizes follow the design per section).
 * Phones: shrinks with the screen width so the longest title line still fits; tablets: 2.75rem.
 */
export const titleSize = "text-[length:min(2.1rem,calc((100vw-2rem)/12))] leading-[1.18] sm:text-[2.75rem] lg:text-[3.5rem] lg:leading-[1.18]";

/** Size of every section label ("About Us", "Our Services"…) across breakpoints */
export const labelSize = "text-[1.05rem] sm:text-[1.25rem] lg:text-[1.65rem]";

/** Size of the text under a title across breakpoints */
export const introSize = "text-base leading-[1.6] sm:text-lg lg:text-[1.45rem] lg:leading-[1.6]";

type EyebrowProps = {
  label: string;
  /** "before": one line before the label (left headings); "both": a line on each side */
  lines?: "before" | "both";
  /** size of this section's label (and anything else it needs) */
  className?: string;
  /** weight and colour of the label (bold orange unless a section differs) */
  toneClassName?: string;
  /** length, thickness and colour of the lines */
  lineClassName?: string;
  /** space between the label and its lines */
  gapClassName?: string;
};

/** Orange label with short orange lines beside it: "—— About Us" or "—— Our Services ——" */
export const Eyebrow = ({
  label,
  lines = "both",
  className = "",
  toneClassName = "font-bold text-[var(--color-orange)]",
  lineClassName = "h-[0.15rem] w-10 sm:w-12 lg:h-[0.2rem] lg:w-[3.25rem]",
  gapClassName = "gap-3 sm:gap-4 lg:gap-[1.25rem]",
}: EyebrowProps) => {
  const line = <span aria-hidden="true" className={`shrink-0 bg-[var(--color-orange)] ${lineClassName}`} />;
  return (
    <p className={`flex items-center font-heading leading-none ${toneClassName} ${gapClassName} ${className}`}>
      {line}
      <span>{label}</span>
      {lines === "both" && line}
    </p>
  );
};

/** The title's words in ink with the highlighted words in orange ("The AutoPulse Advantage") */
export const TitleWords = ({
  data,
  topClassName = "",
  accentClassName = "",
}: {
  data: SplitTitle;
  topClassName?: string;
  accentClassName?: string;
}) => (
  <>
    <span className={topClassName}>{data.titleTop}</span> <span className={`text-[var(--color-orange)] ${accentClassName}`}>{data.titleAccent}</span>
    {data.titleEnd ? ` ${data.titleEnd}` : null}
  </>
);
