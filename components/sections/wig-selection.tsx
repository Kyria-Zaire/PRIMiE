import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WigEditorialHero } from "@/components/wigs/wig-editorial-hero";
import { WigGlobalCta } from "@/components/wigs/wig-global-cta";
import { WigProductGrid } from "@/components/wigs/wig-product-grid";
import { WigTrustStrip } from "@/components/wigs/wig-trust-strip";

/**
 * Sélection de perruques `#perruques` — Server Component orchestrateur.
 * Corrective WIG-SALES-DESIGN-R1-R2 (tablette/desktop, gaps, CTA).
 */
export function WigSelection() {
  return (
    <Section
      id="perruques"
      tone="cream"
      spacing="none"
      className="relative isolate overflow-x-clip pt-3 pb-0 sm:pt-4 lg:pt-1"
      aria-labelledby="wig-selection-heading"
    >
      {/*
        gap-4/5 = 16–20 px entre arguments (bas intro) et cartes.
        pb-0 : Gallery conserve pt-16/md:pt-24 → transition ~64/96 px.
      */}
      <Container className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:gap-5 xl:gap-5">
        <WigEditorialHero />
        <WigProductGrid />
        <WigGlobalCta />
        <WigTrustStrip />
      </Container>
    </Section>
  );
}

/** Alias architecture WIG-SALES-DESIGN-R1. */
export const WigSalesSection = WigSelection;
