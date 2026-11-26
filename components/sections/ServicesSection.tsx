import type { ServicesData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { ServiceList } from "@/components/sections/ServiceList";
import { ServicesSlider } from "@/components/sections/ServicesSlider";

/** Centred heading; the list of services on the left (each one opens the booking form) and the service cards on the right */
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center ${labelSize}`}
        />
        <h2 className={`mt-3 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:mt-[0.9rem]`}>
          {data.title}
        </h2>
        {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-soft)] ${introSize} lg:mt-[0.65rem] lg:max-w-none lg:whitespace-pre-line lg:font-medium`}>
          {data.description}
        </p>
      </div>

      <div className={`mx-auto mt-10 flex max-w-[44rem] flex-col gap-10 ${sidePadding} sm:max-w-none lg:mt-[2.725rem] lg:flex-row lg:items-start lg:gap-[2.375rem] lg:px-[3.56rem]`}>
        <ServiceList data={data} />
        <ServicesSlider data={data} />
      </div>
    </section>
  );
};
