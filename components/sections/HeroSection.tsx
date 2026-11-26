import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { sectionMarginBottom, sidePadding } from "@/components/ui/sectionSpace";

/**
 * Under the header: the navy shape on the left (`z-[1]`) with its diagonal edge passing behind the center of the
 * red tool chest, and the cutout mechanic/car image layered on top (`z-[2]`) on the right.
 * Phones and tablets: the navy block with the text, its bottom slanted, and the cutout below overlapping it.
 */
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative mt-[4.5rem] overflow-hidden bg-[var(--color-bg-main)] sm:mt-[5.5rem] lg:mt-[9.375rem] lg:h-[47.06rem] ${sectionMarginBottom}`}>
      {/* 1024px up: navy shape behind the red tool chest and mechanic (`z-[1]`) */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] hidden bg-[var(--color-navy)] [clip-path:polygon(0_0,26.98%_0,52.8%_100%,0_100%)] lg:block" />

      <div
        data-reveal
        className={`relative z-[3] bg-[var(--color-navy)] pb-24 pt-14 [clip-path:polygon(0_0,100%_0,100%_calc(100%-4.5rem),0_100%)] sm:pb-28 sm:pt-20 lg:bg-transparent lg:p-0 lg:pl-[5rem] lg:pt-[13rem] lg:[clip-path:none] ${sidePadding}`}
      >
        <Eyebrow
          label={data.label}
          lines="before"
          className="text-[0.95rem] sm:text-[1.1rem] lg:text-[1.375rem]"
          toneClassName="font-semibold text-[var(--color-white)]"
          lineClassName="h-[0.25rem] w-10 sm:w-12 lg:h-[0.3125rem] lg:w-[3.06rem]"
          gapClassName="gap-4 lg:gap-[1.3rem]"
        />
        {/* phones and tablets: the title shrinks with the screen width so each line of the design stays one line */}
        <h1 className="mt-5 font-heading text-[length:min(2.4rem,calc((100vw-2rem)/12.6))] font-bold leading-[1.2] tracking-[-0.01em] text-[var(--color-white)] sm:text-[3.1rem] lg:mt-[1.25rem] lg:text-[3.15rem] lg:leading-[3.9rem]">
          {/* the design sets the first line a little larger than the second */}
          {data.titleTop.split("\n").map((line, index) => (
            <span key={line} className={`block ${index === 0 ? "lg:text-[3.43rem]" : ""}`}>
              {line}
            </span>
          ))}
          <span className="block text-[1.36em] leading-[1.15] text-[var(--color-orange)] lg:text-[4.45rem] lg:leading-[4.6rem]">{data.titleAccent}</span>
        </h1>
        {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
        <p className="mt-5 max-w-[34rem] font-heading text-base leading-[1.6] text-[var(--color-text-light)] sm:whitespace-pre-line sm:text-lg lg:ml-[0.3rem] lg:mt-[1.4rem] lg:max-w-none lg:text-[1.43rem] lg:leading-[1.75rem]">
          {data.description}
        </p>
      </div>

      {/* phones and tablets: cutout layered cleanly above the slanted navy edge */}
      <div className="relative z-[2] mx-auto -mt-8 aspect-[16/9] w-[calc(100%-1.5rem)] max-w-[44rem] pb-4 lg:hidden">
        <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 640px) 44rem, 92vw" className="object-contain object-bottom" />
      </div>

      {/* 1024px up: hero image layered ON TOP of (`z-[2]`) the navy shape so the red box stands above the blue diagonal */}
      <div className="pointer-events-none absolute bottom-[0.5rem] left-[42%] right-[0.5%] z-[2] hidden aspect-[16/9] lg:block">
        <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="58vw" className="object-contain object-bottom" />
      </div>
    </section>
  );
};
