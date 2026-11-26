"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** One answer open at a time (the first one to start with); the open question gets the navy bar */
export const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [open, setOpen] = useState(items[0]?.id ?? "");

  return (
    <ul className="grid gap-4 lg:gap-[1.5rem]">
      {items.map((item, index) => {
        const isOpen = open === item.id;
        return (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={index * 80}
            className="overflow-hidden rounded-xl bg-[var(--color-white)] shadow-[0_0.35rem_1.1rem_-0.15rem_rgba(3,10,31,0.2)] lg:rounded-[0.75rem]"
          >
            <h3>
              <button
                type="button"
                id={`faq-question-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => setOpen(isOpen ? "" : item.id)}
                className={`group flex min-h-[3.75rem] w-full items-center justify-between gap-4 px-4 py-3 text-left font-sans text-[1rem] font-bold leading-snug transition-colors duration-300 sm:px-5 sm:text-[1.1rem] lg:min-h-[4.5rem] lg:py-[0.5rem] lg:pl-[2.125rem] lg:pr-[1.875rem] lg:text-[1.45rem] ${
                  isOpen ? "rounded-xl bg-[var(--color-navy-deep)] text-[var(--color-white)] lg:rounded-[0.75rem]" : "text-[var(--color-ink)] hover:text-[var(--color-orange)]"
                }`}
              >
                {item.question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-orange)] text-[var(--color-white)] transition-transform duration-300 group-hover:scale-105 lg:size-[3.125rem]">
                  <Icon name="TbChevronDown" className={`size-5 transition-transform duration-300 lg:size-[2rem] ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.6} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
                <p className="bg-[var(--color-bg-faq-answer)] px-4 pb-5 pt-4 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-text-soft)] sm:px-5 lg:whitespace-pre-line lg:px-[2.25rem] lg:pb-[1.31rem] lg:pt-[1.4rem] lg:text-[1.13rem] lg:font-medium lg:leading-[1.94rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
