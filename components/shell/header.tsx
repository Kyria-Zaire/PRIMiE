import type { ReactNode } from "react";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";
import type { NavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type HeaderProps = {
  /** Entrées déjà filtrées (contenu prêt ∩ sections rendues). */
  items: readonly NavigationItem[];
  /** Emplacement réservé au menu mobile (Client Component). */
  mobileNavigation?: ReactNode;
};

export function Header({ items, mobileNavigation }: HeaderProps) {
  return (
    <header
      className="relative border-b border-bronze bg-hero text-on-dark"
      style={{ zIndex: "var(--z-header)" }}
    >
      <Container className="flex min-h-14 items-center justify-between gap-4 py-3">
        <a
          href="#accueil"
          className="inline-flex min-h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
        >
          <BrandLogo priority />
        </a>

        {items.length > 0 ? (
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-sans text-sm font-medium text-on-dark hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus xl:px-3"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-3">
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
