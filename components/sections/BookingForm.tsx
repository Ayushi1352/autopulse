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
  "block w-full min-w-0 appearance-none rounded-none border-0 border-b-[1.5px] border-[var(--color-border-field)] bg-transparent pl-9 font-display text-[0.95rem] text-[var(--color-ink-soft)] font-medium outline-none transition-colors placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-orange)] lg:border-b-[2px] lg:pl-[2.75rem] lg:text-[1.125rem]";
const inputPadding = "pr-3 lg:pr-[0.75rem]";
const field = `${base} ${inputPadding} h-11 lg:h-[2.9rem]`;
const selectField = `${base} h-11 cursor-pointer pr-10 lg:h-[2.9rem] lg:pr-[3.5rem]`;
const iconClass = "pointer-events-none absolute left-1 size-5 text-[var(--color-navy)] lg:left-[0.35rem] lg:size-[1.6rem]";

const Field = ({ name, type = "text", field: data, autoComplete }: { name: string; type?: string; field: FormField; autoComplete?: string }) => (
  <label className="relative block w-full min-w-0">
    <Icon name={data.icon} className={`${iconClass} top-1/2 -translate-y-1/2`} strokeWidth={2} />
    <input name={name} type={type} required placeholder={data.placeholder} aria-label={data.placeholder} autoComplete={autoComplete} className={field} />
  </label>
);

/** Shows "Preferred Date *" like the other fields and turns into a date picker when used */
const DateField = ({ name, field: data }: { name: string; field: FormField }) => {
  const [type, setType] = useState("text");

  return (
    <label className="relative block w-full min-w-0">
      <Icon name={data.icon} className={`${iconClass} top-1/2 -translate-y-1/2`} strokeWidth={2} />
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
  <label className="relative block w-full min-w-0">
    <Icon name={data.icon} className={`${iconClass} top-1/2 -translate-y-1/2`} strokeWidth={2} />
    <select
      name={name}
      {...(onChange ? { value, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value) } : { defaultValue: "" })}
      required
      aria-label={data.placeholder}
      className={selectField}
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
    <Icon name="TbChevronDown" className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-[var(--color-ink)] lg:right-[0.75rem] lg:size-[1.35rem]" strokeWidth={2.4} />
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
      className="mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:mt-[3rem] lg:gap-x-[3.5rem] lg:gap-y-[1.65rem]"
    >
      <Field name="name" field={fields.name} autoComplete="name" />
      <Field name="phone" type="tel" field={fields.phone} autoComplete="tel" />
      <Field name="email" type="email" field={fields.email} autoComplete="email" />
      <DateField name="date" field={fields.date} />
      <SelectField name="service" field={fields.service} options={serviceOptions} value={service} onChange={setService} />
      <SelectField name="time" field={fields.time} options={data.timeOptions} />
      <label className="relative block w-full min-w-0 sm:col-span-2">
        <Icon name={fields.message.icon} className={`${iconClass} top-2.5 lg:top-[0.65rem]`} strokeWidth={2} />
        <textarea
          name="message"
          rows={2}
          placeholder={fields.message.placeholder}
          aria-label={fields.message.placeholder}
          className={`${base} ${inputPadding} h-20 resize-none pt-2.5 lg:h-[5.25rem] lg:pt-[0.65rem]`}
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
          className="mx-auto w-full max-w-[32rem] sm:col-span-2 lg:mt-[0.25rem]"
        />
      ) : (
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonClass} mx-auto mt-2 h-11 w-full max-w-[15rem] gap-2 rounded-lg text-[0.95rem] font-bold sm:col-span-2 lg:mt-[0.5rem] lg:h-[3.6rem] lg:w-[18rem] lg:gap-[0.75rem] lg:rounded-[0.625rem] lg:text-[1.25rem]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-4 lg:size-[1.4rem]" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="TbArrowNarrowRight" className={`${buttonArrow} size-5 lg:size-[1.6rem]`} strokeWidth={2.2} />
            </>
          )}
        </button>
      )}
    </form>
  );
};
