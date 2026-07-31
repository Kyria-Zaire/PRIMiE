import type { ComponentPropsWithoutRef } from "react";

const toneClass = {
  /** Surface page claire (ivory) — alias historique `paper`. */
  paper: "bg-background text-foreground",
  /** Surface secondaire claire (warm-cream) — alias historique `cream`. */
  cream: "bg-surface text-foreground",
  /** Surface sombre (rich-black) — alias historique `ink`. */
  ink: "bg-surface-dark text-on-dark",
  /** Surface Hero — dégradé canonique `bg-hero`. */
  hero: "bg-hero text-on-dark",
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
