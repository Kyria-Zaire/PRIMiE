import type { ReactNode } from "react";

const alignClass = {
  left: "items-start text-left",
  center: "items-center text-center",
} as const;

const titleSizeClass = {
  h1: "text-3xl font-semibold tracking-tight sm:text-4xl",
  h2: "text-2xl font-semibold tracking-tight sm:text-3xl",
  h3: "text-xl font-semibold tracking-tight sm:text-2xl",
} as const;

export type SectionHeadingLevel = keyof typeof titleSizeClass;
export type SectionHeadingAlign = keyof typeof alignClass;

export type SectionHeadingProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  level?: SectionHeadingLevel;
  align?: SectionHeadingAlign;
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  level = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  const HeadingTag = level;

  return (
    <div
      className={["flex w-full max-w-prose flex-col gap-3", alignClass[align], className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow != null && eyebrow !== "" ? (
        <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-text-muted-dark">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className={["font-display text-foreground", titleSizeClass[level]].join(" ")}>
        {title}
      </HeadingTag>
      {description != null && description !== "" ? (
        <p className="font-sans text-base text-text-muted-dark sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
