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
  const line = <span aria-hidden="true" className="h-[0.15rem] w-10 shrink-0 bg-[var(--color-navy)] sm:w-14 lg:h-[0.2rem] lg:w-[4.75rem]" />;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpaceTop} ${sectionGapBottom}`}>
      <div className={`${sidePadding} lg:px-[2rem]`}>
        <div className="mx-auto w-full max-w-[44rem] px-1 sm:px-6 lg:max-w-[70rem] lg:px-0">
          <div data-reveal className="text-center">
            <div className="flex items-center justify-center gap-3 text-[var(--color-orange)] lg:gap-0">
              {line}
              <Icon name={data.icon} className="h-9 w-20 sm:h-11 sm:w-24 lg:mx-[1.75rem] lg:h-[2.85rem] lg:w-[6.75rem]" />
              {line}
            </div>
            <h2 className={`mt-2 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:mt-[0.4rem]`}>
              <TitleWords data={data} />
            </h2>
            <p className={`mx-auto mt-3 max-w-[36rem] font-display text-[var(--color-text-soft)] ${introSize} lg:mt-[0.9rem] lg:max-w-none`}>
              {data.description}
            </p>
          </div>

          <BookingForm data={data} serviceOptions={serviceOptions} />
        </div>
      </div>
    </section>
  );
};
