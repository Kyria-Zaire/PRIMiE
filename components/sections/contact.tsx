import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Section Contact — Server Component.
 * Coordonnées canoniques uniquement ; aucun horaire, adresse ni réseau social.
 */
export function Contact() {
  const whatsappUrl = buildWhatsAppUrl();
  const phoneHref = `tel:${siteConfig.contact.phoneE164}`;

  return (
    <Section id="contact" tone="paper" spacing="compact" aria-labelledby="contact-heading">
      <Container className="flex flex-col gap-8">
        <div className="flex max-w-prose flex-col gap-3">
          <h2
            id="contact-heading"
            className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Contact
          </h2>
          <p className="font-sans text-base font-medium text-foreground">
            {siteConfig.brand.commercialName}
          </p>
          <p className="font-sans text-sm text-muted-foreground sm:text-base">
            {siteConfig.brand.activity}
          </p>
        </div>

        <address className="not-italic">
          <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <li className="min-w-0">
              <Card
                variant="default"
                padding="md"
                className="flex h-full flex-col gap-2 border-bronze/25 bg-background"
              >
                <p className="font-sans text-xs font-medium tracking-[0.12em] text-bronze uppercase">
                  Téléphone
                </p>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center font-sans text-base font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </Card>
            </li>
            <li className="min-w-0">
              <Card
                variant="default"
                padding="md"
                className="flex h-full flex-col gap-2 border-bronze/25 bg-background"
              >
                <p className="font-sans text-xs font-medium tracking-[0.12em] text-bronze uppercase">
                  WhatsApp
                </p>
                <a
                  href={whatsappUrl}
                  className="inline-flex min-h-11 items-center font-sans text-base font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                >
                  WhatsApp
                </a>
              </Card>
            </li>
          </ul>
        </address>
      </Container>
    </Section>
  );
}
