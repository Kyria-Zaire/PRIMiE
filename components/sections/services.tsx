import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";

/**
 * Section Services — Server Component.
 * Cartes photo plein cadre (direction maquette) : titres et descriptions
 * depuis content/services.ts. Aucun lien / CTA par carte.
 */
export function Services() {
  return (
    <Section id="services" tone="cream" aria-labelledby="services-heading">
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            id="services-heading"
            className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Nos services
          </h2>
          <span
            aria-hidden="true"
            className="h-px w-14 bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]"
          />
        </div>

        <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((service) => {
            const isContain = service.illustration.objectFit === "contain";

            return (
              <li key={service.id} id={service.id} className="min-w-0">
                <article className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black shadow-soft">
                  <Image
                    src={service.illustration.src}
                    alt={service.illustration.alt}
                    width={service.illustration.width}
                    height={service.illustration.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={
                      isContain
                        ? "absolute inset-0 h-full w-full scale-[1.22] object-contain object-center"
                        : "absolute inset-0 h-full w-full object-cover object-center"
                    }
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 py-6 text-center sm:px-6">
                    <h3 className="max-w-[16ch] font-display text-xl font-semibold tracking-tight text-balance text-on-dark sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="max-w-[28ch] font-sans text-sm leading-relaxed text-on-dark/90 sm:text-[0.9375rem]">
                      {service.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
