import { Fragment } from "react";
import Image from "next/image";
import type { ProcessData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpaceBottom, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

// From 1024px up each step is as wide as in the design, so the orange arrows land where the design has them
const stepWidths = ["lg:w-[34.375rem]", "lg:w-[35.94rem]", "lg:flex-1"];

/**
 * Navy band with the workshop photo fading in on the right: centred heading and the three steps (white circle
 * icons, orange arrows between them). The slanted orange band with the numbers hangs over its bottom edge.
 */
export const ProcessSection = ({ data }: { data?: ProcessData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpaceBottom}`}>
      <div className="relative overflow-hidden bg-[var(--color-navy-process)] pb-36 pt-16 sm:pb-40 sm:pt-20 lg:pb-[12.75rem] lg:pt-[9.75rem]">
        {/* the workshop photo under a navy layer: darker on the left behind the text, clearer on the right */}
        <div className="absolute inset-y-0 right-0 w-full [mask-image:linear-gradient(to_left,black_45%,transparent)] lg:w-[60%]">
          <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-[center_30%]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[var(--color-process-overlay)] via-[var(--color-process-overlay)] to-[var(--color-process-overlay-soft)]" />

        <div data-reveal className={`relative text-center ${sidePadding} lg:px-0`}>
          <Eyebrow
            label={data.label}
            className={`justify-center ${labelSize} lg:text-[2rem]`}
            lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.25rem] lg:w-[3.44rem]"
            gapClassName="gap-4 lg:gap-[1.25rem]"
          />
          <h2 className={`mt-3 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-white)] ${titleSize} lg:mt-[1.35rem] lg:text-[3.73rem] lg:leading-none`}>{data.title}</h2>
          <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-white)] ${introSize} lg:mt-[0.85rem] lg:max-w-none lg:text-[1.92rem] lg:leading-none`}>{data.description}</p>
        </div>

        <ol className={`relative mx-auto mt-12 grid max-w-[44rem] gap-8 ${sidePadding} sm:gap-10 lg:mt-[2.75rem] lg:flex lg:max-w-none lg:items-center lg:gap-0 lg:pl-[3.44rem] lg:pr-[1.25rem]`}>
          {data.steps.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 && (
                <li aria-hidden="true" className="hidden shrink-0 text-[var(--color-orange)] lg:-ml-[0.3rem] lg:mr-[1.55rem] lg:block">
                  <Icon name="TbChevronRight" className="size-[2.9rem]" strokeWidth={3} />
                </li>
              )}
              <li data-reveal data-reveal-delay={index * 120} className={`group flex items-center ${stepWidths[index] ?? ""} lg:shrink-0`}>
                <span className="grid size-24 shrink-0 place-items-center rounded-full border-2 border-[var(--color-white-50)] bg-[var(--color-navy-deep)] sm:size-28 lg:size-[9.875rem] lg:border-[0.19rem]">
                  <span className="grid size-[5.2rem] place-items-center rounded-full bg-[var(--color-white)] text-[var(--color-orange)] transition-transform duration-300 group-hover:scale-105 sm:size-24 lg:size-[8.375rem]">
                    <Icon name={step.icon} className="size-10 lg:size-[4.4rem]" strokeWidth={1.7} />
                  </span>
                </span>
                <span aria-hidden="true" className="ml-4 h-16 w-px shrink-0 bg-[var(--color-white-80)] lg:ml-[1rem] lg:h-[6.25rem] lg:w-[0.1rem]" />
                <div className="ml-4 min-w-0 lg:ml-[1.75rem]">
                  <h3 className="font-sans text-[1.2rem] font-bold leading-tight tracking-[-0.02em] text-[var(--color-white)] lg:whitespace-nowrap lg:text-[1.875rem] lg:leading-none lg:tracking-[-0.03em]">{step.title}</h3>
                  {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
                  <p className="mt-1.5 font-sans text-[0.95rem] leading-[1.55] text-[var(--color-white-90)] sm:whitespace-pre-line sm:text-base lg:mt-[0.8rem] lg:whitespace-pre lg:text-[1.45rem] lg:leading-[2.2rem] lg:tracking-[-0.02em]">
                    {step.text}
                  </p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>

      {/* the numbers: a slanted orange band (from 1024px up) hanging over the navy's bottom edge */}
      <div className={`relative z-[1] mx-auto -mt-24 max-w-[44rem] ${sidePadding} sm:-mt-28 lg:-mt-[8.125rem] lg:w-[102.2rem] lg:max-w-none lg:px-0`}>
        <ul
          aria-label={data.statsLabel}
          className="relative isolate grid grid-cols-2 gap-y-8 px-4 py-8 before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[var(--color-orange-band)] before:shadow-[0_1.5rem_3rem_-1.5rem_var(--color-shadow-orange)] sm:px-6 sm:py-10 lg:h-[14.875rem] lg:grid-cols-4 lg:gap-0 lg:p-0 lg:pl-[0.25rem] lg:pr-[3rem] lg:before:-skew-x-[15deg] lg:before:rounded-[1.5rem]"
        >
          {data.stats.map((stat, index) => (
            <li
              key={stat.id}
              data-reveal
              data-reveal-delay={index * 90}
              className={`flex flex-col items-center gap-2 text-center text-[var(--color-white)] sm:flex-row sm:justify-center sm:gap-4 sm:text-left lg:gap-[1.4rem] ${
                index > 0 ? "lg:border-l-[0.125rem] lg:border-[var(--color-white-80)] lg:my-[4.75rem]" : "lg:my-[4.75rem]"
              }`}
            >
              <Icon name={stat.icon} className="size-12 shrink-0 sm:size-14 lg:size-[5.6rem]" strokeWidth={1.8} />
              <p className="flex flex-col">
                <span className="font-sans text-[1.75rem] font-extrabold leading-none lg:text-[2.5rem]">{stat.value}</span>
                <span className="mt-1 font-sans text-[0.9rem] font-medium leading-tight sm:text-base lg:mt-[0.5rem] lg:whitespace-nowrap lg:text-[1.6rem] lg:leading-none">{stat.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
