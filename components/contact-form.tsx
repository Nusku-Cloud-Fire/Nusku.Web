"use client";

import { useState } from "react";
import { SubmitButton } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const fields = [
  { name: "nombre", label: "Nombre", type: "text", autoComplete: "given-name" },
  {
    name: "apellidos",
    label: "Apellidos",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "telefono",
    label: "Número de teléfono",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "empresa",
    label: "Nombre de la empresa",
    type: "text",
    autoComplete: "organization",
  },
] as const;

const perfiles = ["Instalador", "Mantenedor", "Receptora", "Propietario"];

const inputClasses =
  "ring-hairline-blue h-[58px] w-full rounded-lg bg-[#bbbbff05] px-[21px] text-white placeholder:text-g4 transition-[box-shadow,background-color] duration-300 focus:bg-white/[0.06] focus:shadow-[inset_0_0_0_1px_var(--color-blue)] focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

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
        <p className="text-xl font-medium text-white">¡Formulario recibido!</p>
        <p className="mt-2 text-body">
          Contactaremos contigo en un plazo de 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-12">
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
            Perfil
          </label>
          <select
            id="perfil"
            name="perfil"
            required
            defaultValue=""
            className={`${inputClasses} appearance-none bg-[url('/images/chevron-select.svg')] bg-[length:auto] bg-[position:95%] bg-no-repeat`}
          >
            <option value="" disabled>
              Perfil
            </option>
            {perfiles.map((perfil) => (
              <option key={perfil} value={perfil} className="bg-surface">
                {perfil}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — hidden from users, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="empresa-web">No rellenar</label>
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
          {status === "submitting" ? "Enviando..." : "Enviar"}
        </SubmitButton>

        {status === "error" ? (
          <p role="alert" className="text-sm text-[#ff9a9a]">
            Oops! Hay un error al enviar el formulario. Envíanos un correo a{" "}
            <a href="mailto:info@nusku.cloud" className="underline">
              info@nusku.cloud
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
