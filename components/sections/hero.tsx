import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Hero Accueil — Server Component.
 * Contenu strictement canonique ; décorations CSS non informatives (aria-hidden).
 */
export function Hero() {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

  return (
    <Section
      id="accueil"
      tone="hero"
      spacing="none"
      className="relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--color-champagne)_18%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_40%,color-mix(in_srgb,var(--color-gold)_14%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_1px_1px,var(--color-champagne)_1px,transparent_0)] [background-size:18px_18px]"
      />

      <Container className="relative z-10 grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28 xl:py-32">
        <div className="flex max-w-xl flex-col items-start gap-5 sm:gap-6 lg:col-span-7 lg:gap-7">
          <p className="font-display text-lg font-medium tracking-[0.08em] text-soft-gold sm:text-xl">
            Chez
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold tracking-tight text-on-dark sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {siteConfig.brand.shortName}
          </h1>
          <p className="max-w-prose font-sans text-base text-on-dark-muted sm:text-lg">
            {siteConfig.brand.activity}
          </p>
          <p className="max-w-prose font-display text-lg font-medium tracking-tight text-soft-gold sm:text-xl">
            {siteConfig.brand.slogan}
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href={whatsappUrl} size="lg">
              Réserver sur WhatsApp
            </LinkButton>
            <LinkButton
              href="#services"
              variant="secondary"
              size="lg"
              className="border border-gold/40 bg-transparent text-on-dark hover:bg-rich-black"
            >
              Découvrir nos services
            </LinkButton>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none"
        >
          <div className="absolute inset-[8%] rounded-full border border-gold/25" />
          <div className="absolute inset-[18%] rounded-full border border-champagne/20" />
          <div className="absolute inset-[28%] rounded-full border border-gold-light/30" />
          <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-gold)_22%,transparent),transparent_70%)]" />
          <div className="absolute -right-2 top-[12%] h-24 w-24 rounded-full border border-soft-gold/25 sm:h-28 sm:w-28" />
          <div className="absolute bottom-[10%] -left-1 h-16 w-16 rounded-full border border-champagne/20" />
        </div>
      </Container>
    </Section>
  );
}
