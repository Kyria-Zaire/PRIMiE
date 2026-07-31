import { BrandLogo } from "@/components/shell/brand-logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site-config";
import type { NavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type FooterProps = {
  readonly navigationItems: readonly NavigationItem[];
  readonly year?: number;
};

const linkClassName =
  "inline-flex min-h-11 items-center font-sans text-sm font-medium text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus";

export function Footer({ navigationItems, year }: FooterProps) {
  const copyrightYear = year ?? new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer className="border-t border-bronze bg-black text-on-dark">
      <Container className="flex flex-col gap-10 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col gap-3">
            <a
              href="#accueil"
              className="inline-flex min-h-11 w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              <BrandLogo />
            </a>
            <p className="font-sans text-base font-medium text-on-dark">
              {siteConfig.brand.commercialName}
            </p>
            <p className="font-sans text-sm text-on-dark-muted">{siteConfig.brand.activity}</p>
          </div>

          {navigationItems.length > 0 ? (
            <nav aria-label="Navigation du pied de page" className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <a key={item.id} href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}

          <address className="flex flex-col gap-1 not-italic">
            <a href={`tel:${siteConfig.contact.phoneE164}`} className={linkClassName}>
              {siteConfig.contact.phoneDisplay}
            </a>
            <a href={whatsappUrl} className={linkClassName}>
              WhatsApp
            </a>
          </address>
        </div>

        <p className="font-sans text-sm text-on-dark-muted">
          © {copyrightYear} {siteConfig.brand.commercialName}.
        </p>
      </Container>
    </footer>
  );
}
