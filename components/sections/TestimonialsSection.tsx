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
          className={`justify-center ${labelSize} lg:text-[2.5rem]`}
          lineClassName="h-[0.15rem] w-10 sm:w-14 lg:h-[0.19rem] lg:w-[5.3rem]"
          gapClassName="gap-4 lg:gap-[1.5rem]"
        />
        <h2 className={`mt-3 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.25rem] lg:text-[4rem] lg:leading-none`}>
          <TitleWords data={data} />
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-soft)] ${introSize} lg:mt-[1.4rem] lg:max-w-none lg:text-[1.72rem] lg:leading-none`}>
          {data.description}
        </p>
      </div>

      <TestimonialSlider data={data} />
    </section>
  );
};
