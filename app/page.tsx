import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { SkipLink } from "@/components/shell/skip-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site-config";
import { getVisibleNavigation, type NavigationSectionId } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const RENDERED_SECTION_IDS = ["accueil"] as const satisfies readonly NavigationSectionId[];

export default function Home() {
  const visibleNavigation = getVisibleNavigation(RENDERED_SECTION_IDS);

  return (
    <>
      <SkipLink />
      <Header
        items={visibleNavigation}
        mobileNavigation={
          <MobileNavigation
            items={visibleNavigation}
            whatsappUrl={buildWhatsAppUrl()}
            whatsappLabel="Réserver sur WhatsApp"
          />
        }
      />
      <main id="contenu-principal" tabIndex={-1}>
        <Section
          id="accueil"
          tone="paper"
          spacing="none"
          className="flex min-h-screen items-center"
        >
          <Container className="flex flex-col items-start justify-center py-16">
            <SectionHeading
              level="h1"
              title={siteConfig.brand.shortName}
              description="Site en préparation."
            />
          </Container>
        </Section>
      </main>
      <Footer navigationItems={visibleNavigation} />
    </>
  );
}
