"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { SubmitButton } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

/** Type-only import, so the dictionaries never reach the client bundle. */
export type ContactFormCopy = SiteContent["contact"]["form"];

export function ContactForm({
  lang,
  copy,
}: {
  lang: Lang;
  copy: ContactFormCopy;
}) {
  const [status, setStatus] = useState<Status>("idle");

  // Field names are unchanged from the Spanish-only version: the API contract
  // and the notification Nusku receives stay exactly the same.
  const fields = [
    { name: "nombre", label: copy.nombre, type: "text", autoComplete: "given-name" },
    {
      name: "apellidos",
      label: copy.apellidos,
      type: "text",
      autoComplete: "family-name",
    },
    { name: "email", label: copy.email, type: "email", autoComplete: "email" },
    { name: "telefono", label: copy.telefono, type: "tel", autoComplete: "tel" },
    {
      name: "empresa",
      label: copy.empresa,
      type: "text",
      autoComplete: "organization",
    },
  ] as const;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(formData.entries()), lang };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="ring-hairline rounded-xl bg-surface p-8 text-center"
      >
        <p className="text-xl font-medium text-white">{copy.successTitle}</p>
        <p className="mt-2 text-body">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="flex flex-col gap-12"
    >
      <div className="grid gap-9 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="sr-only">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.label}
              maxLength={256}
              required
              className={inputClasses}
            />
          </div>
        ))}

        <div>
          <label htmlFor="perfil" className="sr-only">
            {copy.perfil}
          </label>
          <select
            id="perfil"
            name="perfil"
            required
            defaultValue=""
            className={`${inputClasses} appearance-none bg-[url('/images/chevron-select.svg')] bg-[length:auto] bg-[position:95%] bg-no-repeat`}
          >
            <option value="" disabled>
              {copy.perfil}
            </option>
            {/* Labels are translated; the posted value stays Spanish. */}
            {copy.perfiles.map((perfil) => (
              <option
                key={perfil.value}
                value={perfil.value}
                className="bg-surface"
              >
                {perfil.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — hidden from users, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="empresa-web">{copy.honeypot}</label>
        <input
          id="empresa-web"
          name="empresa_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <SubmitButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? copy.submitting : copy.submit}
        </SubmitButton>

        {status === "error" ? (
          <p role="alert" className="text-sm text-[#ff9a9a]">
            {copy.errorPrefix}{" "}
            <a href="mailto:info@nusku.cloud" className="underline">
              info@nusku.cloud
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}

const inputClasses =
  "ring-hairline-blue h-[58px] w-full rounded-lg bg-[#bbbbff05] px-[21px] text-white placeholder:text-g4 transition-[box-shadow,background-color] duration-300 focus:bg-white/[0.06] focus:shadow-[inset_0_0_0_1px_var(--color-blue)] focus:outline-none";
