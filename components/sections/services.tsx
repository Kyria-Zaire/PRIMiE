import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";

/**
 * Section Services — Server Component.
 * Titres et descriptions depuis content/services.ts.
 */
export function Services() {
  return (
    <Section id="services" tone="cream" aria-labelledby="services-heading">
      <Container className="flex flex-col gap-10 md:gap-12">
        <h2
          id="services-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Nos services
        </h2>

        <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => {
            const orderLabel = String(index + 1).padStart(2, "0");

            return (
              <li key={service.id} id={service.id} className="min-w-0">
                <Card
                  variant="default"
                  padding="lg"
                  className="flex h-full flex-col gap-3 border-bronze/25 bg-background sm:gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-medium tracking-[0.16em] text-bronze"
                  >
                    {orderLabel}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-balance text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
