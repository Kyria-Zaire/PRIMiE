import type { ComponentPropsWithoutRef } from "react";

const toneClass = {
  paper: "bg-paper text-text-dark",
  cream: "bg-cream text-text-dark",
  ink: "bg-ink text-text-light",
} as const;

const spacingClass = {
  default: "py-16 md:py-24",
  compact: "py-10 md:py-14",
  none: "py-0",
} as const;

export type SectionTone = keyof typeof toneClass;
export type SectionSpacing = keyof typeof spacingClass;

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
};

export function Section({
  tone = "paper",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={["scroll-mt-24", toneClass[tone], spacingClass[spacing], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}
