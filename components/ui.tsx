import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1500px] px-6 md:px-10 lg:px-[54px] ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  className = "",
  children,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section
      className={`overflow-hidden py-20 md:py-[110px] ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Webflow `.title-badge` — uppercase eyebrow inside a blue hairline pill. */
export function TitleBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-[20px] px-[15px] pt-3 pb-2.5 text-xs leading-none font-medium tracking-wide text-blue-plus uppercase shadow-[inset_0_0_0_1.5px_var(--color-blue-plus)]">
      {children}
    </span>
  );
}

/** Small "Próximamente" flag used on not-yet-shipped features. */
export function SoonBadge() {
  return (
    <span className="inline-block rounded-full bg-ai/10 px-2.5 py-1 text-[11px] leading-none font-medium tracking-wide text-ai uppercase shadow-[inset_0_0_0_1px_#c745ff40]">
      Próximamente
    </span>
  );
}

/** Webflow `.display-1` — 74 / 50 / 37px, gradient fill. */
export function Display1({
  as: Tag = "h1",
  className = "",
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`display-gradient pb-[11px] text-[37px] leading-none font-semibold md:text-[50px] lg:text-[74px] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Webflow `.display-2` — 50 / 40 / 30px, gradient fill. */
export function Display2({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`display-gradient py-[5px] text-[30px] leading-none font-semibold md:text-[40px] lg:text-[50px] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Webflow `.display-4` — 22px / 500. */
export function Display4({
  as: Tag = "h3",
  className = "",
  children,
}: {
  as?: "h3" | "h4";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`text-[22px] leading-[1.2] font-medium text-white ${className}`}>
      {children}
    </Tag>
  );
}

const buttonClasses =
  "inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue to-blue-minus px-6 py-4 font-medium text-white shadow-[0_0_24px_-5px_#2d8dff73] transition-[filter] duration-300 hover:brightness-110";

export function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClasses} ${className}`}>
      {children}
    </Link>
  );
}

export function SubmitButton({
  children,
  className = "",
  ...rest
}: ComponentProps<"button">) {
  return (
    <button
      className={`${buttonClasses} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Webflow `.advanced-card-border` + `.advanced-card-flex` — hairline frame around a surface card. */
export function FramedCard({
  className = "",
  innerClassName = "",
  children,
}: {
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`ring-hairline rounded-[19px] p-2.5 ${className}`}>
      <div
        className={`ring-hairline flex h-full flex-col overflow-hidden rounded-[10px] bg-surface ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
