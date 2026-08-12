import type { ReactNode } from "react";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { ResponsiveNavigationMenu } from "@/components/shell/responsive-navigation-menu";
import { SkipLink } from "@/components/shell/skip-link";
import { Container } from "@/components/ui/container";
import { galleryCopy } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";
import { getPublicShellNavigation, type PublicRoute } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type LegalPageShellProps = {
  readonly route: Exclude<PublicRoute, "/" | "/galerie">;
  readonly title: string;
  readonly lastUpdatedLabel: string;
  readonly children: ReactNode;
};

/**
 * Shell public partagé pour les pages légales partielles (Server Component).
 */
export function LegalPageShell({ route, title, lastUpdatedLabel, children }: LegalPageShellProps) {
  const routeNavigation = getPublicShellNavigation(route);
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
  const galleryItem = routeNavigation.find((item) => item.id === "galerie");

  return (
    <>
      <SkipLink />
      <Header
        homeHref="/"
        navigationMenu={
          <ResponsiveNavigationMenu
            items={routeNavigation}
            whatsappUrl={bookingWhatsAppUrl}
            whatsappLabel="Réserver sur WhatsApp"
            logo={
              <BrandLogo className="h-11 w-auto sm:h-12 lg:h-auto lg:w-[10.5rem] xl:w-[12rem]" />
            }
            editorial={{
              commercialName: siteConfig.brand.commercialName,
              activity: siteConfig.brand.activity,
              slogan: siteConfig.brand.slogan,
            }}
            galleryLink={
              galleryItem
                ? { href: galleryItem.href, label: galleryCopy.landing.ctaLabel }
                : undefined
            }
          />
        }
      />
      <main id="contenu-principal" tabIndex={-1} className="bg-ivory">
        <Container size="narrow" className="relative py-12 sm:py-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-4 h-16 w-28 text-gold/15 sm:right-8"
          >
            <svg viewBox="0 0 32 18" className="h-full w-full" fill="none" focusable="false">
              <path
                fill="currentColor"
                d="M16 1.2c.9 2.8 3.2 4.8 6.1 5.4-2.9.6-5.2 2.6-6.1 5.4-.9-2.8-3.2-4.8-6.1-5.4 2.9-.6 5.2-2.6 6.1-5.4Z"
              />
            </svg>
          </div>
          <header className="mb-8 max-w-prose sm:mb-10">
            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
              Informations légales
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 font-sans text-sm text-muted-foreground">
              Mise à jour : {lastUpdatedLabel}
            </p>
          </header>
          <div className="flex max-w-prose flex-col gap-8 font-sans text-base leading-relaxed text-foreground">
            {children}
          </div>
        </Container>
      </main>
      <Footer navigationItems={routeNavigation} homeHref="/" />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-muted-foreground [&_a]:text-bronze [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
