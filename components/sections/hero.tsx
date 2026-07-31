import { getImageProps } from "next/image";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { heroHighlights, type HeroHighlight } from "@/content/hero-highlights";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const HERO_DESKTOP = {
  src: "/images/hero/primie-hero-v1.webp",
  width: 1728,
  height: 910,
} as const;

const HERO_MOBILE = {
  src: "/images/hero/primie-hero-mobile-v1.webp",
  width: 1030,
  height: 1527,
} as const;

/** Breakpoint art direction — aligné sur Tailwind `lg` (1024px). */
const HERO_DESKTOP_MEDIA = "(min-width: 1024px)";

function HighlightIcon({ icon }: { icon: HeroHighlight["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
    className: "h-4 w-4 text-gold sm:h-5 sm:w-5",
  };

  switch (icon) {
    case "professionnelle":
      // Ciseaux de coiffure : anneaux, pivot et lames pointues.
      return (
        <svg {...common} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.25" cy="5.25" r="2.55" />
          <circle cx="5.25" cy="18.75" r="2.55" />
          <path d="M7.5 6.9 11 12 20.25 3.75" />
          <path d="M7.5 17.1 11 12 20.25 20.25" />
          <circle cx="11" cy="12" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      );
    case "soignee":
      return (
        <svg {...common}>
          <path d="M12 20s-6.5-4.35-6.5-9.1A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 6.5 3.3C18.5 15.65 12 20 12 20Z" />
        </svg>
      );
    case "tendance":
      return (
        <svg {...common}>
          <path d="m12 3.5 2.1 4.9 5.3.5-4 3.5 1.2 5.2L12 15.4 7.4 17.6l1.2-5.2-4-3.5 5.3-.5L12 3.5Z" />
        </svg>
      );
    case "domicile":
      return (
        <svg {...common} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11.5 12 5l8 6.5" />
          <path d="M6.5 10.5V19h11V10.5" />
          <path d="M10 19v-5h4v5" />
        </svg>
      );
  }
}

function HeroBackdrop() {
  const common = { alt: "", sizes: "100vw" } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    width: HERO_DESKTOP.width,
    height: HERO_DESKTOP.height,
    quality: 75,
    src: HERO_DESKTOP.src,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    width: HERO_MOBILE.width,
    height: HERO_MOBILE.height,
    quality: 75,
    src: HERO_MOBILE.src,
    priority: true,
  });

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <picture className="contents">
        <source media={HERO_DESKTOP_MEDIA} srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileProps}
          alt=""
          srcSet={mobileSrcSet}
          className="absolute inset-0 h-full w-full object-cover object-[78%_center] lg:object-center"
          style={{
            ...mobileProps.style,
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      </picture>
    </div>
  );
}

/**
 * Hero Accueil — Server Component.
 * Art direction responsive : asset vertical sous 1024px, horizontal à partir de 1024px.
 * Textes et CTA restent en HTML indépendants des images.
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
      <HeroBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/30 lg:to-transparent"
      />

      <Container className="relative z-10 flex min-h-[min(100svh,40rem)] items-start justify-center py-10 sm:min-h-[36rem] sm:items-center sm:py-16 lg:min-h-[40rem] lg:justify-start lg:py-24 lg:pl-4 xl:min-h-[44rem] xl:pl-5 2xl:pl-6">
        <div className="flex w-full max-w-[18.75rem] flex-col items-center gap-2.5 text-center sm:max-w-lg sm:gap-4 lg:max-w-md lg:-translate-x-4 lg:items-center xl:max-w-lg xl:-translate-x-8 2xl:-translate-x-12">
          <p className="font-script text-xl text-on-dark sm:text-3xl">Chez</p>

          <h1
            id="hero-heading"
            className="max-w-full bg-[linear-gradient(180deg,var(--color-champagne)_0%,var(--color-gold-light)_42%,var(--color-gold)_100%)] bg-clip-text font-display text-[2.75rem] font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {siteConfig.brand.shortName}
          </h1>

          <div className="flex w-full max-w-[12.5rem] items-center gap-2.5 sm:max-w-xs sm:gap-3">
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--color-gold))]"
            />
            <p className="shrink-0 font-sans text-[0.62rem] font-medium tracking-[0.28em] text-on-dark sm:text-xs sm:tracking-[0.32em]">
              COIFFURE
            </p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[linear-gradient(90deg,var(--color-gold),transparent)]"
            />
          </div>

          <p className="max-w-full text-balance font-script text-lg leading-snug text-on-dark sm:max-w-md sm:text-2xl lg:text-[1.75rem]">
            {siteConfig.brand.slogan}
          </p>

          <div className="flex w-full flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:pt-2">
            <LinkButton href={whatsappUrl} size="lg" className="w-full sm:w-auto">
              Réserver sur WhatsApp
            </LinkButton>
            <LinkButton
              href="#services"
              variant="secondary"
              size="lg"
              className="w-full border border-gold/40 bg-transparent text-on-dark hover:bg-rich-black sm:w-auto"
            >
              Découvrir nos services
            </LinkButton>
          </div>

          <ul className="mt-3 grid w-full max-w-sm grid-cols-2 gap-x-2 gap-y-2.5 sm:mt-4 sm:gap-x-3 sm:gap-y-3 lg:max-w-md lg:grid-cols-4 lg:gap-x-2 lg:gap-y-4">
            {heroHighlights.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-1.5 rounded-md border border-bronze/45 bg-black/75 px-1.5 py-2.5 lg:border-transparent lg:bg-transparent lg:px-0 lg:py-0"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/70"
                >
                  <HighlightIcon icon={item.icon} />
                </span>
                <span className="max-w-full text-center font-sans text-[11px] font-semibold tracking-[0.06em] text-on-dark min-[390px]:text-xs min-[390px]:tracking-[0.08em] lg:text-[0.65rem] lg:font-medium lg:tracking-[0.12em]">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
