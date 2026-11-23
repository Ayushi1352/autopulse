import Image from "next/image";
import type { FaqData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

// The orange question marks around the man's head: centre (in % of the drawing), size (cqw) and tilt
const questionMarks = [
  { id: "top", x: "49.2%", y: "14.6%", size: "21cqw", rotate: "0deg" },
  { id: "left", x: "31.7%", y: "19.5%", size: "17cqw", rotate: "-15deg" },
  { id: "right", x: "63.3%", y: "20.7%", size: "18cqw", rotate: "15deg" },
  { id: "left-low", x: "22.2%", y: "34.7%", size: "16cqw", rotate: "-10deg" },
  { id: "right-low", x: "67.8%", y: "35.3%", size: "11cqw", rotate: "15deg" },
];

/** Label, two-line title and the questions on the left; the thinking man with question marks and cars on the right */
export const FaqSection = ({ data }: { data?: FaqData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-12 ${sidePadding} lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:pl-[4.5rem] lg:pr-[2.19rem]`}>
        <div className="min-w-0 lg:mt-[2.4rem] lg:w-[55.31rem] lg:shrink-0">
          <div data-reveal>
            <Eyebrow
              label={data.label}
              className={`${labelSize} lg:text-[1.41rem]`}
              toneClassName="font-semibold text-[var(--color-orange)]"
              lineClassName="h-[0.15rem] w-8 sm:w-10 lg:h-[0.19rem] lg:w-[3.19rem]"
              gapClassName="gap-3 lg:gap-[0.95rem]"
            />
            {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
            <h2 className={`mt-4 font-sans font-extrabold tracking-[-0.02em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.4rem] lg:text-[3.75rem] lg:leading-[4.06rem] lg:tracking-[-0.035em]`}>
              <span className="sm:whitespace-pre-line">{data.titleTop}</span> <span className="text-[var(--color-orange)]">{data.titleAccent}</span>
            </h2>
          </div>
          <div className="mt-8 lg:mt-[2.6rem]">
            <FaqAccordion items={data.items} />
          </div>
        </div>

        {/*
          The thinking man in front of the cars, on a peach circle with thin orange arcs and orange question marks around
          his head. Every piece is placed in % of this block (the design's 900 × 870 area) and the marks are sized in cqw,
          so the drawing keeps its layout on every screen.
        */}
        <div data-reveal className="relative mx-auto aspect-[900/870] w-full max-w-[32rem] [container-type:inline-size] lg:mx-0 lg:ml-auto lg:w-[56.25rem] lg:max-w-none lg:shrink-0">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <span className="absolute left-[10%] top-[32.8%] aspect-square w-[75.6%] rounded-full bg-gradient-to-b from-[var(--color-bg-peach-icon)] to-[var(--color-bg-peach)]" />
            <span className="absolute left-[7.8%] top-[30.5%] aspect-square w-[80%] rounded-full border-[0.35cqw] border-y-transparent border-x-[var(--color-orange)]" />
            <span className="absolute left-[18.3%] top-[87.4%] h-[10.9%] w-[60%] rounded-[50%] border-b-[0.5cqw] border-[var(--color-orange)]" />
          </div>
          {questionMarks.map((mark) => (
            <span
              key={mark.id}
              aria-hidden="true"
              className="absolute -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold leading-none text-[var(--color-orange)]"
              style={{ left: mark.x, top: mark.y, fontSize: mark.size, rotate: mark.rotate }}
            >
              ?
            </span>
          ))}
          <div className="absolute bottom-[3.5%] left-[1.7%] aspect-[1300/942] w-[96.7%]">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 46vw, 31rem" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};
