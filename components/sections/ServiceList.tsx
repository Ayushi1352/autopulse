"use client";

import { useState } from "react";
import type { ServicesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { chooseService } from "@/components/ui/chooseService";

/**
 * The six services as white rows; the current one is orange (the first one to start with, then the one under the
 * mouse or keyboard focus). A row leads to the booking form with that service already chosen.
 */
export const ServiceList = ({ data }: { data: ServicesData }) => {
  const [active, setActive] = useState(data.items[0]?.id ?? "");

  return (
    <nav aria-label={data.listLabel} className="lg:w-[26.8rem] lg:shrink-0">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-[0.56rem]">
        {data.items.map((item, index) => {
          const current = item.id === active;
          return (
            <li key={item.id} data-reveal data-reveal-delay={index * 60}>
              <a
                href={data.listUrl}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                onClick={() => chooseService(item.title)}
                className={`group flex h-16 items-center rounded-md border-[0.1rem] pl-4 pr-4 shadow-[0_0.4rem_1rem_-0.7rem_var(--color-shadow-strong)] transition-colors duration-300 lg:h-[5rem] lg:rounded-[0.4rem] lg:pl-[1.44rem] lg:pr-[1.6rem] ${
                  current
                    ? "border-[var(--color-orange)] bg-[var(--color-orange)] text-[var(--color-white)]"
                    : "border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-ink)]"
                }`}
              >
                <Icon name={item.icon} className="size-9 shrink-0 lg:size-[3.5rem]" strokeWidth={1.6} />
                <span className="ml-4 font-sans text-[1.05rem] font-bold leading-tight lg:ml-[1.6rem] lg:text-[1.4375rem]">{item.title}</span>
                <Icon
                  name="TbArrowRight"
                  className="ml-auto size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.9rem]"
                  strokeWidth={2.2}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
