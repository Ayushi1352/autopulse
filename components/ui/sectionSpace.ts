/**
 * Space above and below every section's content. Each section uses exactly this, so the gap between any two
 * sections is the same (twice this) at every screen size: 64px on phones, 80px on tablets, and from 1024px up
 * 4rem, which scales with the design like everything else (128px between sections on a 1920px screen).
 */
export const sectionSpace = "py-8 sm:py-10 lg:py-[4rem]";

/** Only the space above (a section whose last piece sits on the next section, like the Why photo) */
export const sectionSpaceTop = "pt-8 sm:pt-10 lg:pt-[4rem]";

/** Only the space below (the process band hangs out of its section; this keeps the gap after it the same) */
export const sectionSpaceBottom = "pb-8 sm:pb-10 lg:pb-[4rem]";

/** The fixed header's height, so a menu link scrolls its section to just below the header */
export const scrollMargin = "scroll-mt-[4.5rem] sm:scroll-mt-[5.5rem] lg:scroll-mt-[6rem]";

/** Side space of the content on phones and tablets (from 1024px up each section follows the design) */
export const sidePadding = "px-4 sm:px-6 md:px-8";
