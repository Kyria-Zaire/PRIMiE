import { AdvicePreview } from "@/components/sections/advice-preview";
import { ContactBooking } from "@/components/sections/contact-booking";
import { Faq } from "@/components/sections/faq";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WigSelection } from "@/components/sections/wig-selection";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { ResponsiveNavigationMenu } from "@/components/shell/responsive-navigation-menu";
import { SkipLink } from "@/components/shell/skip-link";
import { galleryCopy } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";
import {
  getVisibleNavigation,
  resolveNavigationForRoute,
  type NavigationSectionId,
} from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const RENDERED_SECTION_IDS = [
  "accueil",
  "services",
  "galerie",
  "faq",
  "reserver",
  "contact",
] as const satisfies readonly NavigationSectionId[];

export default function Home() {
  const visibleNavigation = getVisibleNavigation(RENDERED_SECTION_IDS);
  const routeNavigation = resolveNavigationForRoute(visibleNavigation, "/");
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
  const galleryItem = routeNavigation.find((item) => item.id === "galerie");

  return (
    <>
      <SkipLink />
      <Header
        variant="heroOverlay"
        homeHref="#accueil"
        navigationMenu={
          <ResponsiveNavigationMenu
            items={routeNavigation}
            whatsappUrl={bookingWhatsAppUrl}
            whatsappLabel="Réserver sur WhatsApp"
            logo={
              <BrandLogo className="h-11 w-auto sm:h-12 lg:h-auto lg:w-[10.5rem] xl:w-[12rem]" />
            }
            editorial={{
              commercialName: siteConfig.brand.commercialName,
              activity: siteConfig.brand.activity,
              slogan: siteConfig.brand.slogan,
            }}
            galleryLink={
              galleryItem
                ? { href: galleryItem.href, label: galleryCopy.landing.ctaLabel }
                : undefined
            }
            homeActiveFallback
          />
        }
      />
      <main id="contenu-principal" tabIndex={-1}>
        <Hero />
        <Services />
        <WigSelection />
        <GalleryPreview />
        <AdvicePreview />
        <Faq />
        <ContactBooking />
      </main>
      <Footer navigationItems={routeNavigation} homeHref="#accueil" />
    </>
  );
}
