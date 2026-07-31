import { Booking } from "@/components/sections/booking";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { SkipLink } from "@/components/shell/skip-link";
import { getVisibleNavigation, type NavigationSectionId } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const RENDERED_SECTION_IDS = [
  "accueil",
  "services",
  "reserver",
  "contact",
] as const satisfies readonly NavigationSectionId[];

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
        <Hero />
        <Services />
        <Booking />
        <Contact />
      </main>
      <Footer navigationItems={visibleNavigation} />
    </>
  );
}
