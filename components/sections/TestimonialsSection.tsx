import type { TestimonialsData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, TitleWords, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Centred heading, then three testimonial cards (the middle one navy) with round arrows and dots */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center ${labelSize}`}
        />
        <h2 className={`mt-3 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:mt-[1rem]`}>
          <TitleWords data={data} />
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-soft)] ${introSize} lg:mt-[1rem] lg:max-w-none lg:font-medium`}>
          {data.description}
        </p>
      </div>

      <TestimonialSlider data={data} />
    </section>
  );
};
