"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/buttonStyles";
import { sectionId, useActiveSection } from "@/components/ui/useActiveSection";

/** Desktop link with the orange underline of the current section */
const linkClass = (current: boolean) =>
  `relative whitespace-nowrap font-display text-[1.09rem] font-semibold leading-none transition-colors after:absolute after:inset-x-0 after:top-[calc(100%+0.85rem)] after:h-[0.1875rem] after:bg-[var(--color-orange)] after:transition-transform after:duration-300 ${
    current ? "text-[var(--color-orange)] after:scale-x-100" : "text-[var(--color-ink-soft)] after:scale-x-0 hover:text-[var(--color-orange)]"
  }`;

/**
 * White bar with the logo on the left; from 1024px up a navy strip with a slanted left edge sits on top
 * (phone, e-mail, location), and the section links and the orange "Book a Service" button sit under it.
 * At the top of the page it is the design's tall bar; once the page scrolls the strip slides away and the
 * bar gets compact with a shadow. Phones and tablets get a menu button that opens the links in a card.
 */
export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const active = useActiveSection(data?.navLinks.map((link) => link.url) ?? []);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!data) return null;

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  const compact = scrolled || open;
  // from 1024px up the links and the button sit under the navy strip; in the compact bar they are centred
  const rowTop = compact ? "lg:mt-[1.345rem]" : "lg:mt-[4.44rem]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mx-auto max-w-[120rem] bg-[var(--color-bg-header)] transition-shadow duration-300 ${
        compact ? "shadow-[0_0.5rem_1.75rem_-1rem_var(--color-shadow-strong)]" : ""
      }`}
    >
      <div
        className={`relative flex items-center gap-4 overflow-hidden px-4 transition-[height] duration-300 sm:px-6 md:px-8 lg:items-start lg:gap-0 lg:pl-[4.625rem] lg:pr-[5.625rem] ${
          compact ? "h-[4.5rem] lg:h-[6rem]" : "h-[4.5rem] sm:h-[5.5rem] lg:h-[9.375rem]"
        }`}
      >
        <Link
          href={data.logoUrl}
          onClick={goHome}
          aria-label={data.homeLabel}
          className={`shrink-0 transition-[opacity,margin] duration-300 hover:opacity-80 ${compact ? "lg:mt-[0.375rem]" : "lg:mt-[0.8125rem]"}`}
        >
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            preload
            quality={90}
            sizes="(min-width: 1024px) 17vw, 150px"
            className={`h-auto transition-[width] duration-300 ${compact ? "w-[8.5rem] lg:w-[13rem]" : "w-[8.5rem] sm:w-[10.5rem] lg:w-[19.56rem]"}`}
          />
        </Link>

        {/* navy strip with the contact details (from 1024px up); its left edge is slanted like the hero's navy shape */}
        <ul
          aria-label={data.topbarLabel}
          className={`absolute right-0 top-0 hidden h-[3.25rem] items-center justify-end bg-[var(--color-navy)] pr-[5.69rem] transition-[transform,opacity] duration-300 [clip-path:polygon(0_0,100%_0,100%_100%,2.06rem_100%)] lg:left-[25.75rem] lg:flex ${
            compact ? "-translate-y-full opacity-0" : ""
          }`}
        >
          {company.contactItems.map((item, index) => {
            const external = item.url.startsWith("http");
            return (
              <Fragment key={item.id}>
                {index > 0 && <li aria-hidden="true" className="mx-[1.6rem] h-[1.75rem] w-px bg-[var(--color-white-30)]" />}
                <li>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${item.title}: ${item.lines.join(" ")}`}
                    tabIndex={compact ? -1 : undefined}
                    className="flex items-center gap-[0.6rem] whitespace-nowrap font-display text-[1.08rem] font-normal leading-none text-[var(--color-white)] transition-colors hover:text-[var(--color-orange-bright)]"
                  >
                    <Icon name={item.icon} className="size-[1.4rem]" />
                    {item.topbarText ?? item.lines.join(" ")}
                  </a>
                </li>
              </Fragment>
            );
          })}
        </ul>

        <nav
          aria-label={data.mainNavLabel}
          className={`hidden h-[3.31rem] items-center gap-[2.36rem] transition-[margin] duration-300 lg:ml-auto lg:flex ${rowTop}`}
        >
          {data.navLinks.map((link) => {
            const current = sectionId(link.url) === active;
            return (
              <a key={link.id} href={link.url} aria-current={current ? "location" : undefined} className={linkClass(current)}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className={`ml-auto flex items-center gap-3 transition-[margin] duration-300 lg:ml-[2.44rem] ${rowTop}`}>
          <a
            href={data.buttonUrl}
            className={`${buttonClass} h-11 gap-2 rounded-lg px-5 text-[0.95rem] max-sm:hidden lg:h-[3.31rem] lg:w-[14.31rem] lg:gap-[0.75rem] lg:rounded-[0.5rem] lg:px-0 lg:text-[1.125rem]`}
          >
            <Icon name="TbCalendarMonth" className="size-5 shrink-0 lg:size-[1.65rem]" strokeWidth={1.8} />
            {data.buttonText}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            className="grid size-11 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] lg:hidden"
          >
            <Icon name={open ? "TbX" : "TbMenu2"} className="size-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* the page behind the open menu is dimmed, a tap on it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[4.5rem] -z-10 bg-[var(--color-overlay-menu)] transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* phones and tablets: a card under the bar, only as tall as its links */}
      <nav
        id="mobile-menu"
        aria-label={data.mobileNavLabel}
        className={`absolute inset-x-4 top-full mt-2 grid max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-3xl bg-[var(--color-white)] shadow-[0_1.25rem_3.125rem_-1.25rem_var(--color-shadow-strong)] transition-[grid-template-rows,opacity] duration-500 sm:inset-x-6 md:left-auto md:right-8 md:w-[22rem] lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-4 sm:px-6">
            {data.navLinks.map((link) => {
              const current = sectionId(link.url) === active;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`group flex items-center justify-between border-b border-[var(--color-border)] py-3.5 font-display text-[1.05rem] font-semibold transition-colors hover:text-[var(--color-orange)] ${
                      current ? "text-[var(--color-orange)]" : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {link.label}
                    <Icon name="TbChevronRight" className="size-4 text-[var(--color-orange)] transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                  </a>
                </li>
              );
            })}
            <li className="pt-5 sm:hidden">
              <a href={data.buttonUrl} onClick={() => setOpen(false)} className={`${buttonClass} h-12 w-full gap-2 rounded-lg text-base`}>
                <Icon name="TbCalendarEvent" className="size-5 shrink-0" strokeWidth={1.8} />
                {data.buttonText}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
