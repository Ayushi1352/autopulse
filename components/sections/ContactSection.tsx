import Image from "next/image";
import type { CompanyData, ContactData } from "@/types/templates.types";
import { Eyebrow, labelSize, TitleWords } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

/**
 * Compact navy card: the label, two-line title ("Support?" in orange), description and phone, e-mail and address
 * on the left; the support agent framed cleanly behind a vector orange arc on the right (phones and tablets: under the text).
 */
export const ContactSection = ({ data, company }: { data?: ContactData; company: CompanyData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`${sidePadding} lg:mx-auto lg:max-w-[104rem] lg:px-[2rem]`}>
        <div
          data-reveal
          className="relative mx-auto max-w-[44rem] overflow-hidden rounded-[1.5rem] bg-[var(--color-navy-contact)] lg:flex lg:min-h-[37rem] lg:max-w-none lg:items-center lg:rounded-[2rem]"
        >
          {/* Left column: eyebrow, 2-line heading, intro, and compact contact list */}
          <div className="relative z-[2] px-5 pb-6 pt-8 sm:px-8 sm:pt-10 lg:w-[54%] lg:py-[3rem] lg:pl-[4.5rem] lg:pr-[2rem]">
            <Eyebrow label={data.label} className={labelSize} />
            <h2 className="mt-3 font-heading text-[length:min(1.85rem,calc((100vw-4.5rem)/12.2))] font-extrabold leading-[1.18] tracking-[-0.01em] text-[var(--color-white)] sm:text-[2.65rem] lg:mt-[1rem] lg:text-[3.5rem] lg:leading-[1.15]">
              <TitleWords data={data} topClassName="max-sm:whitespace-nowrap" accentClassName="block" />
            </h2>
            {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
            <p className="mt-3 font-display text-[0.95rem] leading-[1.55] text-[var(--color-white-90)] sm:whitespace-pre-line sm:text-base lg:mt-[0.9rem] lg:text-[1.35rem] lg:leading-[1.9rem]">
              {data.description}
            </p>

            <ul className="mt-6 lg:mt-[1.85rem] lg:max-w-[34rem]">
              {company.contactItems.map((item, index) => {
                const external = item.url.startsWith("http");
                return (
                  <li
                    key={item.id}
                    className={index > 0 ? "mt-3 border-t border-[var(--color-white-30)] pt-3 lg:mt-[0.85rem] lg:pt-[0.85rem]" : ""}
                  >
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${item.title}: ${item.lines.join(" ")}`}
                      className="group flex items-center"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[var(--color-white)] text-[var(--color-orange)] transition-[transform,background-color,color] duration-300 group-hover:scale-105 group-hover:bg-[var(--color-orange)] group-hover:text-[var(--color-white)] sm:size-12 lg:size-[4.15rem] lg:rounded-[0.75rem]">
                        <Icon name={item.icon} className="size-5 lg:size-[1.85rem]" />
                      </span>
                      <span aria-hidden="true" className="ml-3.5 h-10 w-px shrink-0 bg-[var(--color-white-80)] lg:ml-[1.4rem] lg:h-[3.85rem]" />
                      <span className="ml-3.5 min-w-0 break-words text-[var(--color-white)] lg:ml-[1.4rem]">
                        <span className="block font-sans text-[1rem] font-bold leading-tight lg:text-[1.4rem] lg:leading-none">{item.title}</span>
                        <span className="mt-0.5 block font-sans text-[0.9rem] leading-[1.45] transition-colors group-hover:text-[var(--color-orange-bright)] sm:text-[0.95rem] lg:mt-[0.35rem] lg:text-[1.3rem] lg:leading-[1.65rem]">
                          {item.lines.map((line) => (
                            <span key={line} className="block lg:whitespace-nowrap">
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* phones and tablets: clean support agent photo under the text with an orange top accent */}
          <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden border-t-[0.35rem] border-[var(--color-orange)] sm:aspect-[16/11] lg:hidden">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 640px) 44rem, 100vw" className="object-cover object-[center_12%]" />
          </div>
          {/* 1024px up: clean photo inside a vector orange-bordered curved frame (no screenshot crop) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
            <div className="absolute right-[-11rem] top-1/2 aspect-square h-[156%] -translate-y-1/2 overflow-hidden rounded-full border-[1rem] border-[var(--color-orange)] bg-[var(--color-navy-contact)]">
              <div className="relative size-full">
                <div className="absolute inset-y-[18%] left-0 right-[11rem]">
                  <Image
                    src={data.image}
                    alt={data.imageAlt}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover object-[center_10%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
