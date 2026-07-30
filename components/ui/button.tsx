import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variantClass = {
  primary:
    "bg-primary text-primary-foreground hover:bg-gold-light disabled:bg-beige disabled:text-text-muted-dark",
  secondary:
    "bg-ink text-text-light hover:bg-charcoal disabled:bg-espresso disabled:text-text-muted-light",
  ghost:
    "bg-transparent text-foreground underline-offset-4 hover:underline disabled:text-text-muted-dark disabled:no-underline",
} as const;

const sizeClass = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-6 text-base",
} as const;

const sharedClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold transition-[color,background-color,opacity] duration-short ease-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60";

export type ButtonVariant = keyof typeof variantClass;
export type ButtonSize = keyof typeof sizeClass;

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return [sharedClass, variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ");
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function resolveRel(
  target: AnchorHTMLAttributes<HTMLAnchorElement>["target"],
  rel: AnchorHTMLAttributes<HTMLAnchorElement>["rel"],
): string | undefined {
  if (target !== "_blank") {
    return rel;
  }

  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  return Array.from(tokens).join(" ");
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={resolveRel(target, rel)}
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </a>
  );
}
