import type { BookingData } from "@/types/templates.types";
import { introSize, TitleWords, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionGapBottom, sectionSpaceTop, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";
import { BookingForm } from "@/components/sections/BookingForm";

type Props = {
  data?: BookingData;
  /** choices of the form's service list (built in app/page.tsx from the Services section) */
  serviceOptions: string[];
};

/** Orange car between two navy lines, the centred title and text, then the booking form; the footer follows after the whole gap between sections */
export const BookingSection = ({ data, serviceOptions }: Props) => {
  if (!data) return null;
  const line = <span aria-hidden="true" className="h-[0.2rem] w-12 shrink-0 bg-[var(--color-navy)] sm:w-16 lg:h-[0.25rem] lg:w-[6.7rem]" />;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpaceTop} ${sectionGapBottom}`}>
      <div className={`${sidePadding} lg:px-[5.94rem]`}>
        <div className="mx-auto max-w-[44rem] px-1 sm:px-6 lg:max-w-none lg:px-0 lg:pl-[4.19rem] lg:pr-[3.56rem]">
          {/* the design centres this heading 20px left of the form's middle */}
          <div data-reveal className="text-center lg:pr-[2.5rem]">
            <div className="flex items-center justify-center gap-4 text-[var(--color-orange)] lg:gap-0">
              {line}
              <Icon name={data.icon} className="h-12 w-28 sm:h-14 sm:w-32 lg:mx-[3.3rem] lg:h-[4.25rem] lg:w-[10.3rem]" />
              {line}
            </div>
            <h2 className={`mt-2 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:-mt-[0.4rem] lg:text-[4.1rem] lg:leading-none`}>
              <TitleWords data={data} />
            </h2>
            <p className={`mx-auto mt-4 max-w-[36rem] font-display text-[var(--color-text-soft)] ${introSize} lg:mt-[1.6rem] lg:max-w-none lg:text-[1.66rem] lg:leading-none`}>
              {data.description}
            </p>
          </div>

          <BookingForm data={data} serviceOptions={serviceOptions} />
        </div>
      </div>
    </section>
  );
};
