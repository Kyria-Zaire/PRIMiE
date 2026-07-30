import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site-config";

export default function Home() {
  return (
    <main>
      <Section tone="paper" spacing="none" className="flex min-h-screen items-center">
        <Container className="flex flex-col items-start justify-center py-16">
          <SectionHeading
            level="h1"
            title={siteConfig.brand.shortName}
            description="Site en préparation."
          />
        </Container>
      </Section>
    </main>
  );
}
