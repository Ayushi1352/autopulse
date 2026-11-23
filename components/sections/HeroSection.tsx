import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { sidePadding } from "@/components/ui/sectionSpace";

/**
 * Under the header: the navy shape on the left with a slanted right edge (the label with an orange line, the
 * three-line title with "Smoother Drive" in orange, three lines of text) and the mechanic at the open car on white.
 * Phones and tablets: the navy block with the text, its bottom slanted, and the photo under it reaching into the navy.
 */
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative mt-[4.5rem] overflow-hidden bg-[var(--color-bg-main)] sm:mt-[5.5rem] lg:mt-[9.375rem] lg:h-[47.06rem]">
      {/* 1024px up: the navy shape, from 518px at the top to 1045px at the bottom of the 1920px design */}
      <div aria-hidden="true" className="absolute inset-0 hidden bg-[var(--color-navy)] [clip-path:polygon(0_0,26.98%_0,54.43%_100%,0_100%)] lg:block" />

      <div
        data-reveal
        className={`relative bg-[var(--color-navy)] pb-24 pt-14 [clip-path:polygon(0_0,100%_0,100%_calc(100%-4.5rem),0_100%)] sm:pb-28 sm:pt-20 lg:bg-transparent lg:p-0 lg:pl-[5rem] lg:pt-[13rem] lg:[clip-path:none] ${sidePadding}`}
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

      {/* phones and tablets: the photo with a see-through background under the navy block */}
      <div className="relative mx-auto mb-6 mt-6 aspect-[1456/791] w-[calc(100%-2rem)] max-w-[44rem] sm:mb-8 lg:hidden">
        <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 640px) 44rem, 92vw" className="object-contain" />
      </div>
      {/*
        1024px up: the design's own photo (the hero's right part, 1120 × 753 of the 1920px design, with the navy
        shape's corner in it), placed exactly where the design has it so the tool chest stands on the navy shape
      */}
      <div className="absolute inset-y-0 left-[47.5rem] hidden w-[70rem] lg:block">
        <Image src={data.imageDesktop} alt={data.imageAlt} fill preload quality={90} sizes="59vw" className="object-cover" />
      </div>
    </section>
  );
};
