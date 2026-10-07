"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/ui";

type Status = "idle" | "submitting" | "sent" | "invalid_email" | "not_configured" | "error";

export function LoginForm({ next }: { next: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const email = new FormData(event.currentTarget).get("email");

    try {
      const response = await fetch("/api/docs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next }),
      });
      if (response.ok) setStatus("sent");
      else if (response.status === 400) setStatus("invalid_email");
      else if (response.status === 503) setStatus("not_configured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="ring-hairline max-w-2xl rounded-xl bg-surface p-8">
        <p className="text-xl font-medium text-white">Revisa tu correo</p>
        <p className="mt-2 text-body">
          Si tu email tiene acceso, recibirás un enlace en unos minutos. Caduca en 15 minutos.
        </p>
      </div>
    );
  }

  const message =
    status === "invalid_email"
      ? "Introduce un email válido."
      : status === "not_configured"
        ? "El acceso a la documentación no está disponible en este momento."
        : status === "error"
          ? "No se ha podido enviar la solicitud. Inténtalo de nuevo."
          : null;

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          maxLength={256}
          required
          className="ring-hairline-blue h-[58px] w-full rounded-lg bg-[#bbbbff05] px-[21px] text-white placeholder:text-g4 transition-[box-shadow,background-color] duration-300 focus:bg-white/[0.06] focus:shadow-[inset_0_0_0_1px_var(--color-blue)] focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-start gap-4">
        <SubmitButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando…" : "Enviar enlace"}
        </SubmitButton>
        {message ? (
          <p role="alert" className="text-sm text-[#ff9a9a]">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
