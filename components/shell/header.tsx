import type { ReactNode } from "react";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";
import type { ResolvedNavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type HeaderProps = {
  /** Entrées déjà filtrées et résolues pour la route courante. */
  items: readonly ResolvedNavigationItem[];
  /** Cible du logo — `/` hors landing, `#accueil` sur `/`. */
  homeHref?: string;
  /** Emplacement réservé au menu mobile (Client Component). */
  mobileNavigation?: ReactNode;
};

export function Header({ items, homeHref = "#accueil", mobileNavigation }: HeaderProps) {
  return (
    <header
      className="relative border-b border-bronze bg-hero text-on-dark"
      style={{ zIndex: "var(--z-header)" }}
    >
      <Container className="flex min-h-14 items-center justify-between gap-3 py-3 lg:gap-4">
        <a
          href={homeHref}
          className="inline-flex min-h-11 shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
        >
          <BrandLogo priority />
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
