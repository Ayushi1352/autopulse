/** Orange button (header "Book a Service", form "Book Now"): turns navy on hover (a fading layer, so the colour changes smoothly) */
export const buttonClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden bg-[var(--color-orange)] font-display font-semibold text-[var(--color-white)] shadow-[0_0.6rem_1.4rem_-0.8rem_var(--color-shadow-orange)] transition-transform duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[var(--color-navy)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:before:opacity-100 disabled:cursor-wait disabled:opacity-80";

/** arrow inside a button that turns up-right on hover */
export const buttonArrow = "shrink-0 transition-transform duration-300 group-hover:-rotate-45";

/** round white slider arrows (Testimonials) that turn orange on hover */
export const roundArrowClass =
  "grid place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-ink)] shadow-[0_0.4rem_1rem_-0.4rem_var(--color-shadow-strong)] transition-colors duration-300 hover:border-[var(--color-orange)] hover:bg-[var(--color-orange)] hover:text-[var(--color-white)]";
