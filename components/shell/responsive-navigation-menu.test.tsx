import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ResponsiveNavigationMenu,
  resolveActiveNavStateFromLocation,
} from "./responsive-navigation-menu";
import type { ResolvedNavigationItem } from "@/content/types";
import { galleryCopy } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const sixItems: readonly ResolvedNavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "services", label: "Services", href: "#services" },
  { id: "galerie", label: "Galerie", href: "#galerie" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "reserver", label: "Réserver", href: "#reserver" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const available = new Set(sixItems.map((item) => item.id));

const editorial = {
  commercialName: siteConfig.brand.commercialName,
  activity: siteConfig.brand.activity,
  slogan: siteConfig.brand.slogan,
} as const;

const whatsappUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

function renderMenu(
  items: readonly ResolvedNavigationItem[] = sixItems,
  options?: { galleryLink?: { href: string; label: string }; homeActiveFallback?: boolean },
) {
  return renderToStaticMarkup(
    <ResponsiveNavigationMenu
      items={items}
      whatsappUrl={whatsappUrl}
      whatsappLabel="Réserver sur WhatsApp"
      logo={<span data-logo="true">Logo</span>}
      editorial={editorial}
      galleryLink={options?.galleryLink}
      homeActiveFallback={options?.homeActiveFallback ?? true}
    />,
  );
}

describe("ResponsiveNavigationMenu", () => {
  it("rend le déclencheur Menu fermé avec aria-expanded et aria-controls", () => {
    const html = renderMenu();

    expect(html).toContain(">Menu<");
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("aria-controls=");
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain("min-h-11");
    expect(html).not.toContain('role="dialog"');
  });

  it("n’expose jamais Avis / À propos / réseaux / email dans le composant", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );
    const icons = readFileSync(
      join(process.cwd(), "components/shell/navigation-icons.tsx"),
      "utf8",
    );

    expect(icons).toContain("accueil:");
    expect(icons).toContain("services:");
    expect(icons).toContain("galerie:");
    expect(icons).toContain("faq:");
    expect(icons).toContain("reserver:");
    expect(icons).toContain("contact:");
    expect(source).not.toMatch(
      /Avis clientes|À propos|Nos réalisations|Instagram|TikTok|Facebook|SUIVEZ-NOUS/i,
    );
    expect(source).not.toContain("mailto:");
    expect(icons).not.toMatch(/Instagram|TikTok|Facebook/i);
  });

  it("prépare le CTA WhatsApp via props prérempli sans hardcoder wa.me ni le numéro", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );

    expect(source).toContain("whatsappUrl");
    expect(source).toContain("data-menu-whatsapp-cta");
    expect(source).toContain("md:max-lg:max-w-[16.5rem]");
    expect(source).toContain("md:max-lg:self-start");
    expect(source).not.toContain("wa.me/33749616582");
    expect(source).not.toContain("+33749616582");
    expect(source).not.toContain("whatsappPrefillMessage");
    expect(whatsappUrl).toContain("?text=");
    expect(whatsappUrl.startsWith(siteConfig.contact.whatsappUrl)).toBe(true);
  });

  it("implémente dialog, Escape, focus trap, lock scroll et portal body", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );

    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toContain("Navigation principale");
    expect(source).toContain("Fermer le menu");
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain('event.key !== "Tab"');
    expect(source).toContain("event.shiftKey");
    expect(source).toContain("closeRef.current?.focus()");
    expect(source).toContain("triggerRef.current?.focus()");
    expect(source).toContain('document.body.style.overflow = "hidden"');
    expect(source).toContain("createPortal");
    expect(source).toContain("document.body");
    expect(source).toContain("onBackdropClick");
    expect(source).toContain("event.target === event.currentTarget");
    expect(source).toContain("pointer-events-none absolute inset-0 bg-black/50");
    expect(source).toContain("primie-nav-dialog primie-nav-glass");
    expect(source).toContain("syncActiveFromLocation");
    expect(source).toContain('addEventListener("hashchange"');
    expect(source).not.toMatch(/onClick=\{\(event\) => event\.stopPropagation\(\)\}/);
  });

  it("monte les assets Hero R2 webp sans PNG ni priority", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );

    expect(source).toContain("heroAssetsR2");
    expect(source).toContain('alt: ""');
    expect(source).toContain("getImageProps");
    expect(source).toContain("HERO_DESKTOP_MEDIA");
    expect(source).toContain("{open ? <MenuHeroArtDirection /> : null}");
    expect(source).not.toMatch(/priority:\s*true/);
    expect(source).not.toMatch(/\.png/);
    expect(source).not.toContain("images/Hero");

    const hero = readFileSync(join(process.cwd(), "content/hero.ts"), "utf8");
    expect(hero).toContain("/images/hero/primie-hero-r2-desktop.webp");
    expect(hero).toContain("/images/hero/primie-hero-r2-mobile.webp");
  });

  it("résout l'état actif route/hash avec aria-current (contrat landing)", () => {
    expect(resolveActiveNavStateFromLocation("/", "", available, true)).toEqual({
      activeId: "accueil",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#accueil", available, true)).toEqual({
      activeId: "accueil",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#services", available, true)).toEqual({
      activeId: "services",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#galerie", available, true)).toEqual({
      activeId: "galerie",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#faq", available, true)).toEqual({
      activeId: "faq",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#reserver", available, true)).toEqual({
      activeId: "reserver",
      ariaCurrent: "location",
    });
    expect(resolveActiveNavStateFromLocation("/", "#contact", available, true)).toEqual({
      activeId: "contact",
      ariaCurrent: "location",
    });
  });

  it("résout /galerie en page courante et refuse un faux Accueil sur hash inconnu", () => {
    expect(resolveActiveNavStateFromLocation("/galerie", "", available, false)).toEqual({
      activeId: "galerie",
      ariaCurrent: "page",
    });
    expect(resolveActiveNavStateFromLocation("/galerie", "#faq", available, false)).toEqual({
      activeId: "galerie",
      ariaCurrent: "page",
    });
    expect(resolveActiveNavStateFromLocation("/", "#inconnu", available, true)).toEqual({
      activeId: undefined,
      ariaCurrent: undefined,
    });
    expect(resolveActiveNavStateFromLocation("/", "#foo", available, true).activeId).not.toBe(
      "accueil",
    );
  });

  it("n’affiche aucune copy non canonique « Chaque cliente, une reine »", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );
    const html = renderMenu(sixItems, {
      galleryLink: {
        href: galleryCopy.landing.ctaHref,
        label: galleryCopy.landing.ctaLabel,
      },
    });

    expect(source).not.toContain("menuCopy");
    expect(source).not.toContain("citationLines");
    expect(source).not.toContain("Chaque cliente");
    expect(source).not.toContain("une reine");
    expect(html).not.toContain("Chaque cliente");
    expect(html).not.toContain("une reine");
    expect(html).not.toContain("œuvre unique");
  });

  it("expose un vrai lien éditorial Gallery avec indicateur et copy canonique", () => {
    const html = renderMenu(sixItems, {
      galleryLink: {
        href: galleryCopy.landing.ctaHref,
        label: galleryCopy.landing.ctaLabel,
      },
    });
    // Dialog fermé au SSR — le lien n’est pas monté ; contrat structurel dans la source.
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );

    expect(galleryCopy.landing.ctaLabel).toBe("Découvrir la galerie");
    expect(galleryCopy.landing.ctaHref).toBe("/galerie");
    expect(source).toContain("galleryLink.href");
    expect(source).toContain("galleryLink.label");
    expect(source).toContain("NavChevronIcon");
    expect(source).toContain("underline underline-offset-4");
    expect(source).toContain("hover:text-gold-light");
    expect(html).toContain(">Menu<");
  });

  it("applique le socle glass R1C / polish sans opacity sur le contenu", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );
    const globals = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

    expect(source).toContain("bg-black/50");
    expect(source).toContain("bg-rich-black/28");
    expect(source).toContain("lg:bg-rich-black/60");
    expect(source).toContain("primie-nav-glass");
    expect(source).toContain("data-menu-mobile-glass-veil");
    expect(source).toContain("data-menu-tablet-nav-veil");
    expect(source).toContain("brightness-[0.82]");
    expect(source).not.toContain("backdrop-blur-xl saturate-[1.08] lg:hidden");
    expect(source).toContain("rounded-[2rem]");
    expect(source).toContain("min-h-14");
    expect(source).toContain("min-h-16");
    expect(source).toContain("NavOrnament");
    expect(source).toContain("font-script");
    expect(source).toContain("object-[68%_26%]");
    expect(source).toContain("lg:object-[78%_14%]");
    expect(source).toContain("{open ? <MenuHeroArtDirection /> : null}");
    expect(source).toContain("data-menu-portrait-zone");
    expect(source).toContain("data-menu-editorial");
    expect(source).toContain("data-menu-editorial-veil");
    expect(source).toContain("max-w-[13.75rem]");
    expect(source).toContain("lg:w-[35%]");
    expect(source).toContain("basis-[42%]");
    expect(source).not.toContain("MenuPortraitLayer");
    expect(source).not.toMatch(/opacity-\d+.*flex-1 flex-col/);
    expect(source).not.toMatch(/SUIVEZ-NOUS|Instagram|TikTok|Facebook/);
    expect(globals).toContain("backdrop-filter: blur(6px)");
    expect(globals).toContain("backdrop-filter: blur(16px)");
    expect(globals).toContain("@media (min-width: 1024px)");
    expect(globals).toContain("@supports not");
    expect(globals).toContain("primie-nav-backdrop-in");
    expect(globals).toContain("prefers-reduced-motion: no-preference");
  });

  it("est le seul Client de navigation shell avec footer-responsive-grid", () => {
    const shellDir = join(process.cwd(), "components/shell");
    const files = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const clientFiles = files
      .filter((name) => {
        const source = readFileSync(join(shellDir, name), "utf8");
        return /["']use client["']/.test(source);
      })
      .sort();

    expect(clientFiles).toEqual(["footer-responsive-grid.tsx", "responsive-navigation-menu.tsx"]);
    expect(files).not.toContain("mobile-navigation.tsx");
  });

  it("n’importe pas site-config ni getVisibleNavigation", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/responsive-navigation-menu.tsx"),
      "utf8",
    );
    expect(source).not.toContain("site-config");
    expect(source).not.toContain("getVisibleNavigation");
    expect(source).not.toContain("server-only");
    expect(source).not.toContain("from lucide");
  });

  it("accepte les href multi-route sans navigation horizontale parallèle", () => {
    const galerieItems: readonly ResolvedNavigationItem[] = [
      { id: "accueil", label: "Accueil", href: "/#accueil" },
      { id: "services", label: "Services", href: "/#services" },
      { id: "galerie", label: "Galerie", href: "/galerie", current: true },
      { id: "faq", label: "FAQ", href: "/#faq" },
      { id: "reserver", label: "Réserver", href: "/#reserver" },
      { id: "contact", label: "Contact", href: "/#contact" },
    ];

    const html = renderMenu(galerieItems, { homeActiveFallback: false });
    expect(html).toContain(">Menu<");
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("Navigation principale");
  });

  it("préserve le contrat Hero desktop (bandeau valeurs) hors du menu", () => {
    const hero = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");
    expect(hero).toContain("hidden");
    expect(hero).toContain("lg:grid");
    expect(hero).toContain("Valeurs PRiMiE");
    expect(hero).toContain("data-hero-editorial");
    expect(hero).toContain("lg:items-start lg:text-left");
  });
});
