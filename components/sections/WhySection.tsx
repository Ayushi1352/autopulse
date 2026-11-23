import Image from "next/image";
import type { WhyData, WhyPoint } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, TitleWords, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpaceTop, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

/** White card: navy icon square, a thin line, then the point's title and text */
const Point = ({ point, index }: { point: WhyPoint; index: number }) => (
  <li
    data-reveal
    data-reveal-delay={index * 80}
    className="group flex items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-4 shadow-[0_0.8rem_1.6rem_-1.1rem_var(--color-shadow-strong)] transition-transform duration-300 hover:-translate-y-1 sm:p-5 lg:h-[9.625rem] lg:rounded-[1.25rem] lg:p-0 lg:pl-[1.69rem]"
  >
    <span className="grid h-[4.5rem] w-20 shrink-0 place-items-center rounded-xl bg-[var(--color-navy-icon)] text-[var(--color-white)] transition-colors duration-300 group-hover:bg-[var(--color-orange)] lg:h-[6.5rem] lg:w-[7.25rem] lg:rounded-[0.75rem]">
      <Icon name={point.icon} className="size-10 lg:size-[3.9rem]" strokeWidth={1.8} />
    </span>
    <span aria-hidden="true" className="ml-4 w-px shrink-0 self-stretch bg-[var(--color-divider)] lg:my-[1.9rem] lg:ml-[1.125rem] lg:w-[0.1rem]" />
    <div className="ml-4 min-w-0 lg:ml-[1.25rem]">
      <h3 className="font-sans text-[1.15rem] font-extrabold leading-tight tracking-[-0.02em] text-[var(--color-ink)] lg:whitespace-nowrap lg:text-[1.78rem] lg:leading-none">{point.title}</h3>
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="mt-1.5 font-sans text-[0.95rem] font-medium leading-[1.5] text-[var(--color-text)] lg:mt-[0.75rem] lg:whitespace-pre lg:text-[1.3rem] lg:leading-[1.94rem] lg:tracking-[-0.015em]">{point.text}</p>
    </div>
  </li>
);

const columnClass = "grid gap-4 sm:gap-5 lg:w-[35.25rem] lg:shrink-0 lg:gap-[2.4rem] lg:pb-[6.5rem]";

/**
 * Centred heading; three points on each side of the mechanic in front of the car (orange arc behind him), the photo
 * standing on the bottom edge of the section. Phones and tablets: three points, the photo, the other three.
 */
export const WhySection = ({ data }: { data?: WhyData }) => {
  if (!data) return null;
  const half = Math.ceil(data.points.length / 2);

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] pb-8 sm:pb-10 lg:pb-0 ${scrollMargin} ${sectionSpaceTop}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center ${labelSize} lg:text-[2.17rem]`}
          lineClassName="h-[0.15rem] w-10 sm:w-12 lg:h-[0.19rem] lg:w-[3.125rem]"
          gapClassName="gap-4 lg:gap-[1.9rem]"
        />
        <h2 className={`mt-3 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.1rem] lg:text-[3.72rem] lg:leading-none`}>
          <TitleWords data={data} />
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans font-medium text-[var(--color-text)] ${introSize} lg:mt-[1.3rem] lg:max-w-none lg:text-[1.6rem] lg:leading-none`}>
          {data.description}
        </p>
      </div>

      <div className={`mx-auto mt-10 flex max-w-[44rem] flex-col gap-4 ${sidePadding} sm:gap-5 lg:mt-[0.95rem] lg:max-w-none lg:flex-row lg:items-end lg:gap-0 lg:pl-[3.44rem] lg:pr-[3.25rem]`}>
        <ul className={columnClass}>
          {data.points.slice(0, half).map((point, index) => (
            <Point key={point.id} point={point} index={index} />
          ))}
        </ul>
        <div data-reveal className="relative mx-auto my-4 aspect-[984/894] w-full max-w-[28rem] lg:mx-0 lg:my-0 lg:w-[42.8rem] lg:max-w-none lg:shrink-0">
          {/* the orange half circle behind the mechanic; its ends disappear behind the car */}
          <span aria-hidden="true" className="absolute left-1/2 top-[9%] aspect-[2/1] w-[87%] -translate-x-1/2 rounded-t-full border-[0.25rem] border-b-0 border-[var(--color-orange)] lg:border-[0.375rem] lg:border-b-0" />
          <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 36vw, 28rem" className="object-contain object-bottom" />
        </div>
        <ul className={columnClass}>
          {data.points.slice(half).map((point, index) => (
            <Point key={point.id} point={point} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};
