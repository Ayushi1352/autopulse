"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialItem, TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { roundArrowClass } from "@/components/ui/buttonStyles";
import { fill } from "@/components/ui/text";
import { sidePadding } from "@/components/ui/sectionSpace";

const AUTOPLAY_MS = 6000;

type CardProps = {
  item: TestimonialItem;
  ratingLabel: string;
  /** the middle card: navy with an orange bottom edge and the round quote badge on its top edge */
  featured: boolean;
  className?: string;
};

/** Quote (in bold the opening words, if any), a thin line, then the round photo, name, place and stars */
const Card = ({ item, ratingLabel, featured, className = "" }: CardProps) => (
  <figure
    className={`relative flex-col rounded-[1.75rem] px-6 pb-7 sm:px-8 lg:rounded-[1.875rem] lg:pb-[2.3rem] lg:pl-[3.31rem] lg:pr-[2rem] ${
      featured
        ? "border-b-[0.6rem] border-[var(--color-orange)] bg-[var(--color-navy-deep)] pt-14 text-[var(--color-white)] shadow-[0_1.5rem_2.5rem_-1.5rem_var(--color-shadow-strong)] lg:min-h-[29.69rem] lg:border-b-[0.75rem] lg:pl-[4.25rem] lg:pt-[5.6rem]"
        : "border border-[var(--color-border)] bg-[var(--color-white)] pt-7 text-[var(--color-text)] shadow-[0_0.6rem_1.8rem_-0.4rem_rgba(3,10,31,0.18)] lg:min-h-[28.625rem] lg:pr-[2.25rem] lg:pt-[2.5rem]"
    } ${className}`}
  >
    {featured ? (
      <span className="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-orange)] text-[var(--color-white)] shadow-[0_0.6rem_1.2rem_-0.6rem_var(--color-shadow-orange)] lg:size-[6.25rem]">
        <Icon name="RiDoubleQuotesL" className="size-9 lg:size-[4rem]" />
      </span>
    ) : (
      <Icon name="RiDoubleQuotesL" className="-ml-1.5 size-12 text-[var(--color-orange)] lg:-ml-[0.55rem] lg:-mt-[0.6rem] lg:size-[4.6rem]" />
    )}
    {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
    <blockquote
      className={`font-quote text-[1.05rem] leading-[1.55] sm:text-[1.15rem] lg:whitespace-pre-line ${featured ? "lg:text-[1.75rem] lg:leading-[2.3rem]" : "mt-1 lg:-mt-[0.2rem] lg:text-[1.68rem] lg:leading-[2.2rem]"}`}
    >
      {item.highlight && <strong className="font-normal">{item.highlight} </strong>}
      {item.quote}
    </blockquote>
    <span aria-hidden="true" className={`mt-6 block h-px lg:mt-[1.85rem] ${featured ? "bg-[var(--color-white-50)]" : "bg-[var(--color-divider-light)]"}`} />
    <figcaption className="mt-5 flex items-center gap-5 lg:mt-[1.3rem] lg:gap-[2rem]">
      <span className="relative size-20 shrink-0 overflow-hidden rounded-full border-[0.19rem] border-[var(--color-orange)] bg-[var(--color-white)] p-[0.2rem] lg:size-[7.25rem] lg:border-[0.25rem]">
        <span className="relative block size-full overflow-hidden rounded-full">
          <Image src={item.image} alt={item.name} fill quality={90} sizes="(min-width: 1024px) 7vw, 80px" className="object-cover object-[center_30%]" />
        </span>
      </span>
      <span className="min-w-0">
        <span className={`block font-heading text-[1.15rem] font-extrabold leading-tight lg:text-[1.45rem] lg:leading-none ${featured ? "" : "text-[var(--color-ink)]"}`}>
          {item.name}
        </span>
        <span className={`mt-1 block font-quote text-[1rem] lg:mt-[0.65rem] lg:text-[1.4rem] lg:leading-none ${featured ? "text-[var(--color-white-90)]" : "text-[var(--color-text-muted)]"}`}>
          {item.location}
        </span>
        <span className="mt-2 flex gap-1 text-[var(--color-star)] lg:mt-[0.85rem] lg:gap-[0.35rem]" role="img" aria-label={fill(ratingLabel, { stars: item.stars })}>
          {Array.from({ length: item.stars }, (_, n) => (
            <Icon key={n} name="FaStar" className="size-[1.05rem] lg:size-[1.5rem]" />
          ))}
        </span>
      </span>
    </figcaption>
  </figure>
);

/**
 * Three testimonials from 1024px up, the current one in the middle and featured (phones and tablets: only the
 * current one). The arrows and dots move one testimonial at a time and loop; it also moves on by itself, and stops
 * while the mouse or keyboard focus is on it.
 */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const count = items.length;
  const [index, setIndex] = useState(count > 2 ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  if (count === 0) return null;
  // the one before the current testimonial, the current one (featured) and the one after it
  const shown = count > 2 ? [-1, 0, 1].map((step) => ({ item: items[(index + step + count) % count], featured: step === 0 })) : [{ item: items[index], featured: true }];
  // like the design, the dots mark the first of the three cards shown (the featured one is the next), so with three
  // or more testimonials the first dot is lit while the second testimonial is featured
  const offset = count > 2 ? 1 : 0;
  const start = (index - offset + count) % count;
  const arrow = `${roundArrowClass} size-12 lg:absolute lg:top-[13.875rem] lg:size-[3.875rem] lg:-translate-y-1/2`;

  return (
    <div
      data-reveal
      className={`relative mx-auto mt-14 max-w-[40rem] ${sidePadding} lg:mt-[5rem] lg:max-w-none lg:px-[7.25rem]`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.038fr)_minmax(0,1fr)] lg:gap-[2.5rem]" aria-live="polite">
        {shown.map(({ item, featured }) => (
          <Card
            // a new key on every move replays the fade-in
            key={`${index}-${item.id}`}
            item={item}
            ratingLabel={data.ratingLabel}
            featured={featured}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-4 starting:opacity-0 ${featured ? "flex" : "hidden lg:flex"}`}
          />
        ))}
      </div>

      {count > 1 && (
        <div className="mt-10 flex items-center justify-center gap-5 lg:mt-[3rem] lg:gap-0">
          <button type="button" aria-label={data.previousLabel} onClick={() => go(-1)} className={`${arrow} lg:left-[1.6875rem]`}>
            <Icon name="TbChevronLeft" className="size-5 lg:size-[2rem]" strokeWidth={3} />
          </button>
          <div className="flex gap-3 lg:gap-[1rem]">
            {items.map((item, n) => (
              <button
                key={item.id}
                type="button"
                aria-label={fill(data.dotLabel, { number: n + 1 })}
                aria-current={n === start ? "true" : undefined}
                onClick={() => setIndex((n + offset) % count)}
                className={`size-3.5 rounded-full transition-colors duration-300 lg:size-[1.5rem] ${n === start ? "bg-[var(--color-orange)]" : "bg-[var(--color-dot)] hover:bg-[var(--color-orange)]"}`}
              />
            ))}
          </div>
          <button type="button" aria-label={data.nextLabel} onClick={() => go(1)} className={`${arrow} lg:right-[1.6875rem]`}>
            <Icon name="TbChevronRight" className="size-5 lg:size-[2rem]" strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};
