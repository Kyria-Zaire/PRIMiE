import { GalleryCard } from "@/components/gallery/gallery-card";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { featuredGallery, galleryCopy } from "@/content/gallery";

/**
 * Aperçu landing `#galerie` — Server Component.
 * Rail horizontal CSS ; CTA `/galerie` activé (route 01D).
 */
export function GalleryPreview() {
  const { title, accent, description, ctaLabel, ctaHref } = galleryCopy.landing;

  return (
    <Section
      id="galerie"
      tone="cream"
      spacing="none"
      className="pt-16 pb-10 md:pt-24 md:pb-12 lg:pb-12"
      aria-labelledby="galerie-heading"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2
            id="galerie-heading"
            className="font-display text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
          >
            {title}
          </h2>
          <p className="font-display text-lg italic text-bronze sm:text-xl">{accent}</p>
          <span
            aria-hidden="true"
            className="h-px w-14 bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]"
          />
          <p className="max-w-prose font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        <div
          role="region"
          aria-label="Aperçu de la galerie d’inspirations"
          tabIndex={0}
          className="gallery-preview-rail focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
        >
          <ul className="m-0 flex list-none justify-start snap-x snap-mandatory gap-3 p-0 sm:gap-4">
            {featuredGallery.map((item) => (
              <li
                key={item.id}
                className="w-[82%] shrink-0 snap-start sm:w-[48%] md:w-[45%] lg:w-[30%] xl:w-[23%]"
              >
                <GalleryCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
          <LinkButton href={ctaHref} size="md" className="w-full justify-center sm:w-auto">
            {ctaLabel}
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
