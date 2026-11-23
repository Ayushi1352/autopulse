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
    <footer className="bg-[var(--color-navy-footer)] px-4 pb-6 pt-12 text-center text-[var(--color-white)] sm:px-6 md:px-8 lg:px-[8.75rem] lg:pb-[2.1rem] lg:pt-[1.69rem]">
      <a href={data.logoUrl} aria-label={data.homeLabel} className="inline-block">
        <Image
          src={data.logo}
          alt={company.logoAlt}
          width={data.logoWidth}
          height={data.logoHeight}
          quality={90}
          sizes="(min-width: 1024px) 23vw, 240px"
          className="h-auto w-[15rem] sm:w-[17rem] lg:w-[27.5rem]"
        />
      </a>
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="mx-auto mt-5 max-w-[34rem] font-footer text-[0.95rem] leading-[1.6] text-[var(--color-white)] sm:text-base lg:-mt-[0.125rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.885rem] lg:leading-[2.5rem]">
        {data.description}
      </p>

      <nav aria-label={data.navLabel} className="mt-7 lg:mt-[2.6rem]">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:gap-x-[2.75rem]">
          {data.links.map((link, index) => (
            <Fragment key={link.id}>
              {index > 0 && <li aria-hidden="true" className="h-5 w-[0.15rem] bg-[var(--color-orange-bright)] max-sm:hidden lg:h-[1.9rem] lg:w-[0.19rem]" />}
              <li>
                <a
                  href={link.url}
                  className="whitespace-nowrap font-footer text-[0.95rem] font-medium text-[var(--color-white)] transition-colors hover:text-[var(--color-orange-bright)] sm:text-base lg:text-[1.75rem] lg:leading-none"
                >
                  {link.label}
                </a>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>

      <ul aria-label={data.socialLabel} className="mt-8 flex justify-center gap-3 lg:mt-[5.14rem] lg:gap-[1.47rem]">
        {company.socialLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="grid size-11 place-items-center rounded-lg border-2 border-[var(--color-white-80)] text-[var(--color-white)] transition-colors duration-300 hover:border-[var(--color-orange)] hover:bg-[var(--color-orange)] lg:size-[4.44rem] lg:rounded-[0.75rem] lg:border-[0.125rem]"
            >
              <Icon name={link.icon} className="size-5 lg:size-[2.65rem]" />
            </a>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-8 flex items-center gap-4 lg:mt-[1.45rem] lg:gap-[1.8rem]">
        <FadeLine />
        <Icon name="FaCar" className="size-9 shrink-0 text-[var(--color-orange-bright)] lg:size-[4.5rem]" />
        <FadeLine toLeft />
      </div>

      <p className="mt-4 font-footer text-[0.9rem] text-[var(--color-white)] sm:text-[0.95rem] lg:mt-[0.65rem] lg:text-[1.93rem] lg:leading-none">{copyright}</p>
    </footer>
  );
};
