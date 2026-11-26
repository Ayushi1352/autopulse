"use client";

import { useState, type KeyboardEvent } from "react";
import type { AboutTab } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/**
 * "Our Vision" / "Our Mission": the open tab is orange and its card (round icon, thin line, title and text) sits
 * right under the tabs. Arrow keys move between the tabs.
 */
export const AboutTabs = ({ label, tabs }: { label: string; tabs: AboutTab[] }) => {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  if (!current) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    setActive(next.id);
    document.getElementById(`about-tab-${next.id}`)?.focus();
  };

  return (
    <div data-reveal className="mt-8 lg:-ml-[0.25rem] lg:mt-[2.3rem]">
      <div role="tablist" aria-label={label} className="flex gap-2 lg:gap-[0.69rem]">
        {tabs.map((tab, index) => {
          const selected = tab.id === current.id;
          return (
            <button
              key={tab.id}
              id={`about-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="about-tab-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex h-14 flex-1 items-center justify-center gap-2.5 rounded-t-xl border-[0.1rem] border-b-0 font-heading text-[1.05rem] font-bold transition-colors duration-300 sm:flex-none sm:px-8 lg:h-[4.5rem] lg:w-[20.625rem] lg:gap-[1rem] lg:rounded-t-[0.75rem] lg:px-0 lg:text-[1.45rem] lg:font-extrabold ${
                selected
                  ? "border-[var(--color-orange)] bg-[var(--color-orange)] text-[var(--color-white)]"
                  : "border-[var(--color-border-tab)] bg-[var(--color-white)] text-[var(--color-ink)] hover:text-[var(--color-orange)]"
              }`}
            >
              <Icon name={tab.icon} className="size-6 lg:size-[2.75rem]" strokeWidth={1.8} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="about-tab-panel"
        role="tabpanel"
        aria-labelledby={`about-tab-${current.id}`}
        className="flex items-center gap-4 rounded-b-2xl rounded-tr-2xl border border-[var(--color-border)] bg-[var(--color-bg-peach)] p-5 shadow-[0_1rem_2rem_-1.4rem_var(--color-shadow-strong)] sm:gap-6 sm:p-7 lg:h-[13.06rem] lg:w-[55rem] lg:gap-0 lg:rounded-b-[1rem] lg:rounded-tr-[1rem] lg:p-0 lg:pl-[2.31rem]"
      >
        {/* a new key on every switch replays the fade-in */}
        <div key={current.id} className="contents">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[var(--color-bg-peach-icon)] text-[var(--color-orange)] transition-[opacity,transform] duration-500 starting:scale-90 starting:opacity-0 sm:size-20 lg:size-[8rem]">
            <Icon name={current.contentIcon} className="size-9 sm:size-11 lg:size-[4.9rem]" strokeWidth={1.6} />
          </span>
          <span aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-[var(--color-divider)] sm:block lg:mx-[1.94rem] lg:my-[3.3rem]" />
          <div className="min-w-0 transition-[opacity,transform] duration-500 starting:translate-y-2 starting:opacity-0 lg:mt-[0.625rem]">
            <h3 className="font-heading text-[1.3rem] font-extrabold leading-tight text-[var(--color-ink)] lg:text-[1.75rem] lg:leading-none">{current.title}</h3>
            {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
            <p className="mt-2 font-sans text-[0.95rem] font-medium leading-[1.55] text-[var(--color-text-soft)] sm:text-base lg:mt-[0.9rem] lg:whitespace-pre-line lg:text-[1.25rem] lg:leading-[1.85rem]">
              {current.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
