import { faq } from "@/content/faq";
import { gallery } from "@/content/gallery";
import { navigation } from "@/content/navigation";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { testimonials } from "@/content/testimonials";
import type { NavigationItem, ResolvedNavigationItem } from "@/content/types";

export type NavigationSectionId = (typeof navigation)[number]["id"];

/** Routes publiques V1 pour la résolution des liens de navigation. */
export type PublicRoute = "/" | "/galerie";

/**
 * Contenu « Pourquoi me choisir ? » non validé — section hors navigation.
 * Passer à true uniquement après contenu métier confirmé.
 */
const ABOUT_CONTENT_READY = false;

/**
 * FAQ : seed PO dans `content/faq.ts` + section `#faq` rendue (01C).
 * Les deux conditions (flag + longueur) sont nécessaires.
 */
const FAQ_SECTION_READY = true;

function isContentReady(id: NavigationSectionId): boolean {
  switch (id) {
    case "accueil":
      return true;
    case "services":
      return services.length > 0;
    case "galerie":
      return gallery.length > 0;
    case "a-propos":
      return ABOUT_CONTENT_READY;
    case "avis":
      return testimonials.length > 0;
    case "faq":
      return FAQ_SECTION_READY && faq.length > 0;
    case "reserver":
      return siteConfig.contact.whatsappUrl.length > 0;
    case "contact":
      return siteConfig.contact.phoneE164.length > 0 && siteConfig.contact.whatsappUrl.length > 0;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

/**
 * Retourne les entrées de navigation dont le contenu est prêt
 * et dont l’identifiant figure parmi les sections réellement rendues.
 * Préserve l’ordre canonique. Ne mute pas `navigation`.
 */
export function getVisibleNavigation(
  renderedSectionIds: readonly NavigationSectionId[],
): readonly NavigationItem[] {
  const rendered = new Set<NavigationSectionId>(renderedSectionIds);

  return navigation.filter((item) => rendered.has(item.id) && isContentReady(item.id));
}

/**
 * Résout les href pour la route courante sans muter la source.
 * Sur `/galerie`, les ancres landing deviennent `/#…` ; Galerie pointe vers `/galerie`.
 */
export function resolveNavigationForRoute(
  items: readonly NavigationItem[],
  route: PublicRoute,
): readonly ResolvedNavigationItem[] {
  return items.map((item) => {
    if (route === "/") {
      return {
        id: item.id,
        label: item.label,
        href: item.href,
      };
    }

    if (item.id === "galerie") {
      return {
        id: item.id,
        label: item.label,
        href: "/galerie",
        current: true,
      };
    }

    const anchor = item.href.startsWith("#") ? item.href : `#${item.id}`;
    return {
      id: item.id,
      label: item.label,
      href: `/${anchor}`,
    };
  });
}
