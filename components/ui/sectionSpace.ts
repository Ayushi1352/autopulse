/**
 * Space between sections. Every section keeps exactly the same empty space between its content and the next
 * section's content, on every screen:
 *   phones 64px · tablets 80px · from 1024px up 8rem (scales with the design: 128px on a 1920px screen,
 *   96px at 1440px) but never less than the tablet's 80px.
 * Two white sections each add half of it (`sectionSpace`). Where a section meets a coloured edge (the hero's navy
 * shape, the "How It Works" navy band, the footer) the white side carries the whole gap on its own (`sectionGap…`),
 * so the empty space is the same there too.
 */
export const sectionSpace = "py-8 sm:py-10 lg:py-[max(40px,4rem)]";

/** Only the half gap above (a section whose bottom is handled on its own) */
export const sectionSpaceTop = "pt-8 sm:pt-10 lg:pt-[max(40px,4rem)]";

/** Only the half gap below (a section whose top is handled on its own) */
export const sectionSpaceBottom = "pb-8 sm:pb-10 lg:pb-[max(40px,4rem)]";

/** Half gap as an outer margin below (the hero: its navy shape must end at its own bottom edge) */
export const sectionMarginBottom = "mb-8 sm:mb-10 lg:mb-[max(40px,4rem)]";

/** The whole gap below, for a section followed by a coloured edge (the footer) */
export const sectionGapBottom = "pb-16 sm:pb-20 lg:pb-[max(80px,8rem)]";

/** The fixed header's height, so a menu link scrolls its section to just below the header */
export const scrollMargin = "scroll-mt-[4.5rem] sm:scroll-mt-[5.5rem] lg:scroll-mt-[6rem]";

/** Side space of the content on phones and tablets (from 1024px up each section follows the design) */
export const sidePadding = "px-4 sm:px-6 md:px-8";
