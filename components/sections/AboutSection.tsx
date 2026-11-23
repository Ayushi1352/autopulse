import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";
import { DotGrid } from "@/components/ui/LineArt";
import { AboutTabs } from "@/components/sections/AboutTabs";

/**
 * On the left the tall technician photo, a smaller photo beside it, the "10+ Years of Experience" card over both
 * and orange dots behind; on the right the label, the two-line title, the text and the Vision / Mission tabs.
 */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-12 ${sidePadding} sm:gap-14 lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:pl-[1.25rem]`}>
        {/*
          Photos: every piece is placed in % of this block (the design's 895 × 734 area) and the card's text is sized
          in % of its width (cqw), so the whole group keeps the design's layout on every screen.
        */}
        <div data-reveal className="relative aspect-[895/734] w-full shrink-0 [container-type:inline-size] order-2 lg:order-1 lg:w-[55.94rem]">
          <div className="absolute left-[11.955%] top-0 h-full w-[54.64%] overflow-hidden rounded-[2.2cqw]">
            <Image src={data.image} alt={data.imageAlt} fill quality={95} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 24rem, 52vw" className="object-cover object-center" />
          </div>
          <div className="absolute left-[68.6%] top-[20.71%] h-[52.32%] w-[31.5%] overflow-hidden rounded-[1.8cqw]">
            <Image src={data.sideImage} alt={data.sideImageAlt} fill quality={95} sizes="(min-width: 1024px) 15vw, (min-width: 640px) 14rem, 30vw" className="object-cover object-center" />
          </div>
          {/* the orange dots sit over the edge of the tall photo, like in the design */}
          <DotGrid className="pointer-events-none absolute inset-0 size-full text-[var(--color-orange)]" />
          <div className="absolute left-[42.23%] top-[62.26%] flex h-[21.8%] w-[48.04%] items-center gap-[2.1cqw] rounded-[1.8cqw] bg-[var(--color-white)] pl-[3.35cqw] shadow-[0_1.2cqw_3cqw_-1.2cqw_var(--color-shadow-strong)]">
            <Icon name={data.experienceIcon} className="w-[13.5cqw] shrink-0 text-[var(--color-orange)]" />
            <p className="flex flex-col">
              <span className="font-heading text-[6.9cqw] font-extrabold leading-none text-[var(--color-ink)]">{data.experienceValue}</span>
              <span className="mt-[1.1cqw] whitespace-nowrap font-sans text-[2.57cqw] font-semibold leading-none text-[var(--color-ink)]">{data.experienceText}</span>
            </p>
          </div>
        </div>

        <div className="min-w-0 order-1 lg:order-2 lg:ml-[3.75rem] lg:w-[55rem]">
          <div data-reveal>
            <Eyebrow
              label={data.label}
              lines="before"
              className={`${labelSize} lg:text-[1.8rem]`}
              lineClassName="h-[0.25rem] w-10 sm:w-12 lg:h-[0.375rem] lg:w-[3.19rem]"
              gapClassName="gap-4 lg:gap-[1.3rem]"
            />
            {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
            <h2 className={`mt-4 font-heading font-extrabold tracking-[-0.01em] text-[var(--color-ink)] sm:whitespace-pre-line ${titleSize} lg:mt-[0.63rem] lg:text-[3.42rem] lg:leading-[4.19rem] lg:tracking-[-0.016em]`}>
              {data.title}
            </h2>
            <p className="mt-5 font-sans text-base font-medium leading-[1.65] text-[var(--color-text)] sm:text-lg lg:mt-[1.08rem] lg:whitespace-pre-line lg:text-[1.5rem] lg:leading-[2.22rem]">
              {data.description}
            </p>
          </div>
          <AboutTabs label={data.tabsLabel} tabs={data.tabs} />
        </div>
      </div>
    </section>
  );
};
