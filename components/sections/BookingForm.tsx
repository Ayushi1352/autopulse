"use client";

import { useCallback, useState } from "react";
import type { BookingData, FormField } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { useChosenService } from "@/components/ui/chooseService";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonArrow, buttonClass } from "@/components/ui/buttonStyles";

/** Fields are a navy icon and the text on a grey line (no box), like the design */
const base =
  "w-full appearance-none rounded-none border-0 border-b-2 border-[var(--color-border-field)] bg-transparent pl-12 pr-3 font-display text-[1rem] text-[var(--color-ink-soft)] font-medium outline-none transition-colors placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-orange)] lg:border-b-[0.125rem] lg:pl-[4.69rem] lg:pr-[1rem] lg:text-[1.58rem]";
const field = `${base} h-14 lg:h-[3.75rem]`;
const iconClass = "pointer-events-none absolute left-1 size-6 text-[var(--color-navy)] lg:left-[0.8rem] lg:size-[2.6rem]";

const Field = ({ name, type = "text", field: data, autoComplete }: { name: string; type?: string; field: FormField; autoComplete?: string }) => (
  <label className="relative flex items-center">
    <Icon name={data.icon} className={iconClass} strokeWidth={2} />
    <input name={name} type={type} required placeholder={data.placeholder} aria-label={data.placeholder} autoComplete={autoComplete} className={field} />
  </label>
);

/** Shows "Preferred Date *" like the other fields and turns into a date picker when used */
const DateField = ({ name, field: data }: { name: string; field: FormField }) => {
  const [type, setType] = useState("text");

  return (
    <label className="relative flex items-center">
      <Icon name={data.icon} className={iconClass} strokeWidth={2} />
      <input
        name={name}
        type={type}
        required
        placeholder={data.placeholder}
        aria-label={data.placeholder}
        onFocus={(event) => {
          setType("date");
          // open the calendar straight away where the browser supports it
          const input = event.currentTarget;
          requestAnimationFrame(() => {
            try {
              input.showPicker?.();
            } catch {
              // some browsers only open the picker on a direct click
            }
          });
        }}
        onBlur={(event) => {
          if (!event.target.value) setType("text");
        }}
        className={field}
      />
    </label>
  );
};

type SelectProps = {
  name: string;
  field: FormField;
  options: string[];
  /** set both to control the choice from outside (the service picked in the Services list) */
  value?: string;
  onChange?: (value: string) => void;
};

const SelectField = ({ name, field: data, options, value, onChange }: SelectProps) => (
  <label className="relative flex items-center">
    <Icon name={data.icon} className={iconClass} strokeWidth={2} />
    <select
      name={name}
      {...(onChange ? { value, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value) } : { defaultValue: "" })}
      required
      aria-label={data.placeholder}
      className={`${field} cursor-pointer pr-10 lg:pr-[3.5rem]`}
    >
      <option value="" disabled>
        {data.placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <Icon name="TbChevronDown" className="pointer-events-none absolute right-1 size-5 text-[var(--color-ink)] lg:right-[1.3rem] lg:size-[2rem]" strokeWidth={2.4} />
  </label>
);

/** The "Book a Service" form; dummy submit with a thank-you message in place of the button */
export const BookingForm = ({ data, serviceOptions }: { data: BookingData; serviceOptions: string[] }) => {
  const submit = useDummySubmit();
  // the chosen service belongs to one round of the form, so it is cleared with the rest of the form after a send
  const [chosen, setChosen] = useState({ round: 0, service: "" });
  const service = chosen.round === submit.round ? chosen.service : "";
  const setService = useCallback((value: string) => setChosen({ round: submit.round, service: value }), [submit.round]);
  const { fields } = data;

  // a service picked in the Services list is chosen here (the list's link scrolls down to this form)
  useChosenService(setService);

  // remounting the form (via key) after each send clears every field
  return (
    <form
      key={submit.round}
      onSubmit={submit.onSubmit}
      onInput={submit.onInput}
      aria-busy={submit.sending}
      className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:mt-[5.2rem] lg:gap-x-[5.19rem] lg:gap-y-[2.28rem]"
    >
      <Field name="name" field={fields.name} autoComplete="name" />
      <Field name="phone" type="tel" field={fields.phone} autoComplete="tel" />
      <Field name="email" type="email" field={fields.email} autoComplete="email" />
      <DateField name="date" field={fields.date} />
      <SelectField name="service" field={fields.service} options={serviceOptions} value={service} onChange={setService} />
      <SelectField name="time" field={fields.time} options={data.timeOptions} />
      <label className="relative block sm:col-span-2">
        <Icon name={fields.message.icon} className={`${iconClass} top-4 lg:top-[0.85rem]`} strokeWidth={2} />
        <textarea
          name="message"
          rows={3}
          placeholder={fields.message.placeholder}
          aria-label={fields.message.placeholder}
          className={`${base} h-28 resize-none pt-4 lg:h-[7.45rem] lg:pt-[0.95rem]`}
        />
      </label>
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="mx-auto w-full max-w-[36.3rem] sm:col-span-2 lg:-mt-[0.2rem]"
        />
      ) : (
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonClass} mx-auto mt-2 h-14 w-full max-w-[22rem] gap-3 rounded-xl text-[1.15rem] font-bold sm:col-span-2 lg:-mt-[0.2rem] lg:h-[5.875rem] lg:w-[36.3rem] lg:max-w-none lg:gap-[1.6rem] lg:rounded-[0.875rem] lg:text-[2.5rem]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5 lg:size-[2.4rem]" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="TbArrowNarrowRight" className={`${buttonArrow} size-7 lg:size-[3.4rem]`} strokeWidth={2.2} />
            </>
          )}
        </button>
      )}
    </form>
  );
};
