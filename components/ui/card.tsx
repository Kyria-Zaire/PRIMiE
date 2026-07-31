import type { ComponentPropsWithoutRef } from "react";

const variantClass = {
  default: "border-border bg-background shadow-soft",
  muted: "border-border bg-surface-muted shadow-soft",
} as const;

const paddingClass = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
} as const;

export type CardVariant = keyof typeof variantClass;
export type CardPadding = keyof typeof paddingClass;

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: CardVariant;
  padding?: CardPadding;
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={["rounded-lg border", variantClass[variant], paddingClass[padding], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
