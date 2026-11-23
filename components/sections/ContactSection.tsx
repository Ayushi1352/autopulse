import Image from "next/image";
import type { ContactData } from "@/types/templates.types";
import { Eyebrow, labelSize, TitleWords } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

/**
 * One big navy card: the label, the two-line title ("Support?" in orange), the text and the phone, e-mail and address
 * on the left; the support agent behind an orange arc on the right (phones and tablets: under the text).
 */
export const ContactSection = ({ data }: { data?: ContactData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`${sidePadding} lg:px-0 lg:pl-[4.125rem] lg:pr-[4.19rem]`}>
        <div data-reveal className="relative mx-auto max-w-[44rem] overflow-hidden rounded-[1.75rem] bg-[var(--color-navy-deep)] lg:h-[56.125rem] lg:max-w-none lg:rounded-[2.5rem]">
          <div className="relative px-6 pb-4 pt-10 sm:px-10 sm:pt-12 lg:p-0 lg:pl-[5.69rem] lg:pt-[3.9rem]">
            <Eyebrow
              label={data.label}
              className={`${labelSize} lg:text-[2.6rem]`}
              lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.25rem] lg:w-[5.2rem]"
              gapClassName="gap-4 lg:gap-[1.375rem]"
            />
            <h2 className="mt-4 font-heading text-[length:min(2.3rem,calc((100vw-2rem)/10.5))] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-white)] sm:text-[3.1rem] lg:-ml-[0.1rem] lg:mt-[1.6rem] lg:text-[5.2rem] lg:leading-[5.125rem]">
              <TitleWords data={data} accentClassName="block" />
            </h2>
            {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
            <p className="mt-4 font-display text-base leading-[1.6] text-[var(--color-white)] sm:whitespace-pre-line sm:text-lg lg:ml-[0.3rem] lg:mt-[1.35rem] lg:text-[2.07rem] lg:leading-[2.56rem] lg:tracking-[-0.01em]">
              {data.description}
            </p>

            <ul className="mt-8 lg:ml-[0.56rem] lg:mt-[2.85rem] lg:w-[41.9rem]">
              {data.items.map((item, index) => {
                const external = item.url.startsWith("http");
                return (
                  <li
                    key={item.id}
                    className={index > 0 ? "mt-4 border-t border-[var(--color-white-30)] pt-4 lg:mt-[1.15rem] lg:pt-[1.15rem]" : ""}
                  >
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${item.title}: ${item.lines.join(" ")}`}
                      className="group flex items-center"
                    >
                      <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-[var(--color-white)] text-[var(--color-orange)] transition-[transform,background-color,color] duration-300 group-hover:scale-105 group-hover:bg-[var(--color-orange)] group-hover:text-[var(--color-white)] sm:size-16 lg:size-[6.56rem] lg:rounded-[1rem]">
                        <Icon name={item.icon} className="size-6 lg:size-[2.9rem]" />
                      </span>
                      <span aria-hidden="true" className="ml-4 h-12 w-px shrink-0 bg-[var(--color-white-80)] lg:ml-[2.25rem] lg:h-[6.25rem] lg:w-[0.1rem]" />
                      <span className="ml-4 min-w-0 break-words text-[var(--color-white)] lg:ml-[2.1rem]">
                        <span className="block font-sans text-[1.1rem] font-extrabold leading-tight tracking-[-0.02em] lg:text-[2.1rem] lg:leading-none">{item.title}</span>
                        <span className="mt-1 block font-sans text-[0.95rem] leading-[1.45] transition-colors group-hover:text-[var(--color-orange-bright)] sm:text-base lg:mt-[0.7rem] lg:text-[2.125rem] lg:leading-[2.65rem] lg:tracking-[-0.01em]">
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

          {/*
            From 1024px up the photo sits inside a big circle whose left edge is the design's orange arc: an orange circle
            and, 1.875rem inside it, the photo cut to the same circle. Phones and tablets: the photo under the text.
          */}
          <div className="relative mt-4 aspect-[1269/1240] w-full lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[54.875rem]">
            <span aria-hidden="true" className="absolute inset-0 hidden bg-[var(--color-orange-bright)] [clip-path:circle(38.625rem_at_38.625rem_34rem)] lg:block" />
            <div className="absolute inset-0 lg:[clip-path:circle(36.75rem_at_38.625rem_34rem)]">
              <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 46vw, (min-width: 640px) 44rem, 100vw" className="object-cover object-[center_30%] lg:object-[30%_center]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
