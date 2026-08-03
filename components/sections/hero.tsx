import { getImageProps } from "next/image";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { galleryCopy } from "@/content/gallery";
import { heroAssetsR2, heroCopy, heroValues } from "@/content/hero";
import type { HeroValueId } from "@/content/types";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Breakpoint art direction — aligné sur Tailwind `lg` (1024px). */
const HERO_DESKTOP_MEDIA = "(min-width: 1024px)";

function ValueIcon({ id }: { id: HeroValueId }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
    className: "h-4 w-4 text-gold sm:h-5 sm:w-5",
  };

  switch (id) {
    case "home":
      return (
        <svg {...common} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11.5 12 5l8 6.5" />
          <path d="M6.5 10.5V19h11V10.5" />
          <path d="M10 19v-5h4v5" />
        </svg>
      );
    case "excellence":
      return (
        <svg {...common} strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3.5 2.1 4.9 5.3.5-4 3.5 1.2 5.2L12 15.4 7.4 17.6l1.2-5.2-4-3.5 5.3-.5L12 3.5Z" />
        </svg>
      );
    case "passion":
      return (
        <svg {...common}>
          <path d="M12 20s-6.5-4.35-6.5-9.1A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 6.5 3.3C18.5 15.65 12 20 12 20Z" />
        </svg>
      );
    case "listening":
      return (
        <svg {...common} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 12a7.5 7.5 0 0 1 15 0" />
          <path d="M8 12a4 4 0 0 1 8 0" />
          <path d="M12 12v4.5a1.75 1.75 0 0 0 3.5 0V15" />
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
    width: heroAssetsR2.desktop.width,
    height: heroAssetsR2.desktop.height,
    quality: 75,
    src: heroAssetsR2.desktop.src,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    width: heroAssetsR2.mobile.width,
    height: heroAssetsR2.mobile.height,
    quality: 75,
    src: heroAssetsR2.mobile.src,
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
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] min-[390px]:object-[66%_center] md:object-[62%_center] lg:object-[78%_center] xl:object-[82%_center]"
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
 * Hero Accueil R2 — Server Component.
 * Art direction : asset mobile &lt;1024px, desktop ≥1024px.
 * Copy et valeurs depuis `content/hero.ts` ; CTA galerie via `galleryCopy`.
 */
export function Hero() {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
  const slogan = siteConfig.brand.slogan;
  const sloganBreak = "commence ";
  const sloganBreakAt = slogan.indexOf(sloganBreak);
  const sloganLine1 = slogan.slice(0, sloganBreakAt + "commence".length);
  const sloganLine2 = slogan.slice(sloganBreakAt + sloganBreak.length);

  return (
    <Section
      id="accueil"
      tone="hero"
      spacing="none"
      className="relative isolate flex min-h-[100svh] flex-col overflow-x-hidden lg:min-h-svh"
      aria-labelledby="hero-heading"
    >
      <HeroBackdrop />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/40 lg:bg-black/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/60 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/45 lg:to-transparent lg:to-[55%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent lg:h-40"
      />

      {/* pt mobile : Header ~85–95 px + gap ≥24 — desktop pt gelé R1C-R1 */}
      <Container className="relative z-10 flex flex-1 flex-col justify-start pb-8 pt-28 sm:pb-10 sm:pt-32 lg:pb-36 lg:pt-36 xl:pt-40">
        <div className="flex w-full max-w-[18.5rem] flex-col items-start gap-3 text-left min-[390px]:max-w-[20rem] sm:max-w-md sm:gap-4 lg:ml-[2%] lg:max-w-[38%] xl:ml-[4%] xl:max-w-[40%] 2xl:ml-[5%]">
          <p
            data-hero-eyebrow
            className="font-sans text-[clamp(0.75rem,3.2vw,0.875rem)] font-medium tracking-[0.22em] text-champagne sm:tracking-[0.28em]"
          >
            {heroCopy.eyebrow}
          </p>

          <span
            aria-hidden="true"
            className="h-px w-14 bg-[linear-gradient(90deg,var(--color-gold),transparent)] sm:w-20"
          />

          <h1
            id="hero-heading"
            data-hero-slogan
            className="max-w-full font-script text-[clamp(1.875rem,9vw,2.125rem)] font-normal leading-[1.12] tracking-normal text-on-dark md:text-[clamp(1.75rem,5.2vw,3.35rem)] md:leading-snug"
          >
            {sloganLine1}
            <br />
            {sloganLine2}
          </h1>

          <div className="flex max-w-[16.5rem] flex-col gap-1 font-sans text-sm leading-relaxed text-on-dark min-[390px]:max-w-prose sm:text-base lg:max-w-prose lg:text-[1.05rem]">
            {heroCopy.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:pt-3">
            <LinkButton
              href={whatsappUrl}
              size="lg"
              className="min-h-14 w-full sm:min-h-12 sm:w-auto"
            >
              {heroCopy.primaryCtaLabel}
            </LinkButton>
            <LinkButton
              href="#galerie"
              variant="secondary"
              size="lg"
              className="min-h-14 w-full border border-gold/50 bg-black/45 text-on-dark hover:bg-black/55 sm:min-h-12 sm:w-auto"
            >
              {galleryCopy.landing.ctaLabel}
            </LinkButton>
          </div>
        </div>
      </Container>

      <ul
        className="relative z-10 mt-auto grid w-full grid-cols-2 gap-3 px-4 pb-6 min-[390px]:grid-cols-4 min-[390px]:gap-0 sm:px-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:border-t lg:border-gold/20 lg:bg-black/50 lg:px-8 lg:pb-0 lg:backdrop-blur-[2px]"
        aria-label="Valeurs PRiMiE"
      >
        {heroValues.map((item, index) => (
          <li
            key={item.id}
            className={[
              "flex flex-col items-center gap-1.5 rounded-md border border-bronze/40 bg-black/70 px-2 py-3 text-center min-[390px]:rounded-none min-[390px]:border-y-0 min-[390px]:border-r-0 min-[390px]:border-l-0 min-[390px]:bg-transparent min-[390px]:px-1.5 min-[390px]:py-3.5 sm:px-2 sm:py-4 lg:flex-row lg:items-center lg:justify-center lg:gap-3 lg:px-4 lg:py-5 xl:gap-3.5",
              index > 0 ? "min-[390px]:border-l min-[390px]:border-gold/20" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/70 min-[390px]:h-11 min-[390px]:w-11"
            >
              <ValueIcon id={item.id} />
            </span>
            <span className="flex min-w-0 flex-col items-center gap-0.5 lg:items-start">
              <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.12em] text-gold min-[390px]:text-[0.7rem] sm:text-xs sm:tracking-[0.14em]">
                {item.title}
              </span>
              <span className="font-sans text-[0.7rem] leading-snug text-on-dark min-[390px]:text-[0.75rem] sm:text-xs lg:text-sm">
                {item.description}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent,var(--color-gold)_20%,var(--color-gold-light)_50%,var(--color-gold)_80%,transparent)] opacity-70"
      />
    </Section>
  );
}
