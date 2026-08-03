import type { ReactNode } from "react";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";
import type { ResolvedNavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type HeaderVariant = "default" | "heroOverlay";

export type HeaderProps = {
  /** Entrées déjà filtrées et résolues pour la route courante. */
  items: readonly ResolvedNavigationItem[];
  /** Cible du logo — `/` hors landing, `#accueil` sur `/`. */
  homeHref?: string;
  /** Emplacement réservé au menu mobile (Client Component). */
  mobileNavigation?: ReactNode;
  /**
   * `heroOverlay` : Header intégré au Hero (accueil uniquement).
   * `default` : surface solide (ex. `/galerie`).
   */
  variant?: HeaderVariant;
};

const variantShellClass: Record<HeaderVariant, string> = {
  default: "relative border-b border-bronze bg-hero text-on-dark",
  heroOverlay:
    "absolute inset-x-0 top-0 border-b border-gold/25 bg-black/55 text-on-dark backdrop-blur-[2px]",
};

const logoClassByVariant: Record<HeaderVariant, string> = {
  default: "h-11 w-auto sm:h-12 lg:h-14",
  /** Overlay : densité verticale réduite — largeurs desktop ~180–200 px (ratio intact). */
  heroOverlay: "h-auto w-[7.5rem] sm:w-[8.75rem] lg:w-[11.25rem] xl:w-[12.5rem]",
};

export function Header({
  items,
  homeHref = "#accueil",
  mobileNavigation,
  variant = "default",
}: HeaderProps) {
  return (
    <header className={variantShellClass[variant]} style={{ zIndex: "var(--z-header)" }}>
      <Container
        className={
          variant === "heroOverlay"
            ? "flex min-h-14 items-center justify-between gap-3 py-3 lg:min-h-0 lg:gap-4 lg:py-2.5"
            : "flex min-h-14 items-center justify-between gap-3 py-3 lg:min-h-16 lg:gap-4 lg:py-3.5"
        }
      >
        <a
          href={homeHref}
          className="inline-flex min-h-11 shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
        >
          <BrandLogo priority className={logoClassByVariant[variant]} />
        </a>

        {items.length > 0 ? (
          <nav
            aria-label="Navigation principale"
            className="hidden min-w-0 items-center gap-0 lg:flex"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className="inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 font-sans text-xs font-medium text-on-dark hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus xl:px-2.5 xl:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <LinkButton
              href={buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage)}
              size="md"
            >
              Réserver sur WhatsApp
            </LinkButton>
          </div>
          {mobileNavigation}
        </div>
      </Container>
    </header>
  );
}
