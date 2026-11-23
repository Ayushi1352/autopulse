"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ServiceCard, ServicesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

const AUTOPLAY_MS = 6000;

/** Photo with the orange icon tab in its top-left corner, then the centred title and text */
const Card = ({ card, className = "" }: { card: ServiceCard; className?: string }) => (
  <li
    className={`group flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_0.6rem_1.2rem_-0.6rem_var(--color-shadow-strong)] lg:h-[34.125rem] lg:rounded-[1rem] ${className}`}
  >
    <div className="relative aspect-[427/309] shrink-0 overflow-hidden">
      <Image src={card.image} alt={card.imageAlt} fill quality={90} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw" className="object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute left-0 top-0 grid h-[38.2%] w-[26%] place-items-center rounded-br-[1.375rem] bg-[var(--color-orange)] text-[var(--color-white)]">
        <Icon name={card.icon} className="size-[55%]" strokeWidth={1.6} />
      </span>
    </div>
    <div className="flex-1 px-5 pb-7 pt-5 text-center lg:px-[1rem] lg:pb-[1rem] lg:pt-[1.25rem]">
      <h3 className="font-sans text-[1.3rem] font-bold leading-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-orange)] lg:text-[1.62rem] lg:leading-none">
        {card.title}
      </h3>
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="mt-3 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-text-soft)] lg:mt-[1.1rem] lg:whitespace-pre-line lg:text-[1.22rem] lg:leading-[1.94rem]">{card.text}</p>
    </div>
  </li>
);

/**
 * Three service cards side by side from 1024px up (two on tablets, one on phones). The squares under them move the
 * cards round; they also move on by themselves, and stop while the mouse or keyboard focus is on them.
 */
export const ServicesSlider = ({ data }: { data: ServicesData }) => {
  const { cards } = data;
  const count = cards.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  if (count === 0) return null;
  // the cards from the current one on, going round
  const shown = cards.map((_, n) => cards[(index + n) % count]);

  return (
    <div
      data-reveal
      className="min-w-0 flex-1"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[1.69rem]" aria-live="polite">
        {shown.map((card, n) => (
          <Card
            // a new key on every move replays the fade-in
            key={`${index}-${card.id}`}
            card={card}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-4 starting:opacity-0 ${
              n === 0 ? "flex" : n === 1 ? "hidden sm:flex" : "hidden lg:flex"
            }`}
          />
        ))}
      </ul>

      {/* from 1024px up the squares sit where the design has them, a little right of the cards' middle */}
      {count > 1 && (
        <div className="mt-8 flex justify-center gap-3 lg:mt-[2.9rem] lg:justify-start lg:gap-[1.06rem] lg:pl-[34.125rem]">
          {cards.map((card, n) => (
            <button
              key={card.id}
              type="button"
              aria-label={fill(data.pageLabel, { number: n + 1 })}
              aria-current={n === index ? "true" : undefined}
              onClick={() => setIndex(n)}
              className={`grid size-6 place-items-center rounded-[0.3rem] border-2 transition-colors duration-300 lg:size-[1.5rem] lg:rounded-[0.3rem] lg:border-[0.14rem] ${
                n === index ? "border-[var(--color-orange)]" : "border-[var(--color-dot)] hover:border-[var(--color-orange)]"
              }`}
            >
              <span className={`size-3 rounded-[0.15rem] bg-[var(--color-orange)] transition-transform duration-300 lg:size-[0.75rem] ${n === index ? "scale-100" : "scale-0"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
