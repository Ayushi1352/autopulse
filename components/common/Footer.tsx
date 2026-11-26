import { Fragment } from "react";
import Image from "next/image";
import type { CompanyData, FooterData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** thin line that fades out towards its outer end */
const FadeLine = ({ toLeft = false }: { toLeft?: boolean }) => (
  <span
    aria-hidden="true"
    className={`h-px flex-1 from-transparent to-[var(--color-white-80)] lg:h-[0.125rem] ${toLeft ? "bg-gradient-to-l" : "bg-gradient-to-r"}`}
  />
);

// Everything centred on navy: the white logo, two lines of text, the links with orange bars between them,
// the social squares, a line with the orange car in its middle, and the copyright.
export const Footer = async ({ data, company }: { data?: FooterData; company: CompanyData }) => {
  if (!data) return null;
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="bg-[var(--color-navy-footer)] px-4 pb-6 pt-10 text-center text-[var(--color-white)] sm:px-6 md:px-8 lg:px-[6rem] lg:pb-[1.75rem] lg:pt-[2.25rem]">
      <a href={data.logoUrl} aria-label={data.homeLabel} className="inline-block">
        <Image
          src={data.logo}
          alt={company.logoAlt}
          width={data.logoWidth}
          height={data.logoHeight}
          quality={90}
          sizes="(min-width: 1024px) 18vw, 220px"
          className="h-auto w-[13rem] sm:w-[15rem] lg:w-[20rem]"
        />
      </a>
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="mx-auto mt-4 max-w-[34rem] font-footer text-[0.9rem] leading-[1.6] text-[var(--color-white)] sm:text-[0.95rem] lg:mt-[0.5rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.2rem] lg:leading-[1.75rem]">
        {data.description}
      </p>

      <nav aria-label={data.navLabel} className="mt-6 lg:mt-[1.85rem]">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-6 lg:gap-x-[2rem]">
          {data.links.map((link, index) => (
            <Fragment key={link.id}>
              {index > 0 && <li aria-hidden="true" className="h-4 w-[0.125rem] bg-[var(--color-orange-bright)] max-sm:hidden lg:h-[1.2rem] lg:w-[0.15rem]" />}
              <li>
                <a
                  href={link.url}
                  className="whitespace-nowrap font-footer text-[0.9rem] font-medium text-[var(--color-white)] transition-colors hover:text-[var(--color-orange-bright)] sm:text-[0.95rem] lg:text-[1.15rem] lg:leading-none"
                >
                  {link.label}
                </a>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>

      <ul aria-label={data.socialLabel} className="mt-6 flex justify-center gap-3 lg:mt-[2.5rem] lg:gap-[0.95rem]">
        {company.socialLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="grid size-9 place-items-center rounded-lg border-[1.5px] border-[var(--color-white-80)] text-[var(--color-white)] transition-colors duration-300 hover:border-[var(--color-orange)] hover:bg-[var(--color-orange)] lg:size-[2.65rem] lg:rounded-[0.5rem]"
            >
              <Icon name={link.icon} className="size-4 lg:size-[1.2rem]" />
            </a>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-6 flex items-center gap-4 lg:mt-[1.5rem] lg:gap-[1.4rem]">
        <FadeLine />
        <Icon name="FaCar" className="size-7 shrink-0 text-[var(--color-orange-bright)] lg:size-[2.25rem]" />
        <FadeLine toLeft />
      </div>

      <p className="mt-4 font-footer text-[0.875rem] text-[var(--color-white)] sm:text-[0.95rem] lg:mt-[0.9rem] lg:text-[1.1rem] lg:leading-none">
        {copyright}
      </p>
    </footer>
  );
};
