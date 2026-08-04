"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { getImageProps } from "next/image";
import { Button, LinkButton } from "@/components/ui/button";
import {
  NavChevronIcon,
  NavCloseIcon,
  NavItemIcon,
  NavOrnament,
  NavWhatsAppIcon,
} from "@/components/shell/navigation-icons";
import { heroAssetsR2 } from "@/content/hero";
import type { ResolvedNavigationItem } from "@/content/types";

/** Breakpoint art direction — aligné Tailwind `lg` (1024px). */
const HERO_DESKTOP_MEDIA = "(min-width: 1024px)";

/**
 * Crops Hero ambiant menu — WebP inchangés.
 * - mobile (&lt;1024) : `object-[68%_26%]` — visage / boucle / tresses à droite
 * - desktop : visage / chignon / épaule dans la zone portrait (~droite 42–50 %)
 */
const HERO_OBJECT_POSITION_CLASS =
  "object-[68%_26%] min-[390px]:object-[70%_24%] lg:object-[78%_14%] xl:object-[80%_12%]";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export type NavigationEditorial = {
  readonly commercialName: string;
  readonly activity: string;
  readonly slogan: string;
};

export type NavigationGalleryLink = {
  readonly href: string;
  readonly label: string;
};

export type ResponsiveNavigationMenuProps = {
  readonly items: readonly ResolvedNavigationItem[];
  readonly whatsappUrl: string;
  readonly whatsappLabel: string;
  /** BrandLogo préparé côté Server (slot). */
  readonly logo: ReactNode;
  readonly editorial: NavigationEditorial;
  /** Lien Galerie optionnel — libellé issu de galleryCopy uniquement. */
  readonly galleryLink?: NavigationGalleryLink;
  /**
   * Sur `/`, Accueil est actif par défaut (aria-current="location")
   * tant qu’aucun item n’a `current`.
   */
  readonly homeActiveFallback?: boolean;
};

export type ActiveNavState = {
  readonly activeId: string | undefined;
  readonly ariaCurrent: "page" | "location" | undefined;
};

function normalizeHashId(hash: string): string {
  const raw = hash.replace(/^#/, "").trim();
  const cleaned = raw.replace(/^\//, "");
  return cleaned.split("/")[0]?.trim() ?? "";
}

/**
 * Résout l'état actif visuel du menu selon route/hash.
 * Les ids viennent des items de navigation (pas de liste dupliquée).
 */
export function resolveActiveNavStateFromLocation(
  pathname: string,
  hash: string,
  availableIds: ReadonlySet<string>,
  homeActiveFallback: boolean,
): ActiveNavState {
  // /galerie = Galerie en "page" (prioritaire).
  if (pathname === "/galerie" && availableIds.has("galerie")) {
    return { activeId: "galerie", ariaCurrent: "page" };
  }

  const hashId = normalizeHashId(hash);

  // Hash connu = ancre landing active (aria-current="location").
  if (hashId && availableIds.has(hashId)) {
    return { activeId: hashId, ariaCurrent: "location" };
  }

  // Hash inconnu : ne jamais forcer Accueil.
  if (hashId) {
    return { activeId: undefined, ariaCurrent: undefined };
  }

  // "/" sans hash => Accueil si fallback (contrat homeActiveFallback).
  if (homeActiveFallback && availableIds.has("accueil")) {
    return { activeId: "accueil", ariaCurrent: "location" };
  }

  return { activeId: undefined, ariaCurrent: undefined };
}

function isElementVisible(element: HTMLElement): boolean {
  if (element.hasAttribute("disabled") || element.getAttribute("aria-hidden") === "true") {
    return false;
  }
  if (element.tabIndex < 0 && element.tagName !== "A" && element.tagName !== "BUTTON") {
    return false;
  }
  const style = window.getComputedStyle(element);
  if (style.visibility === "hidden" || style.display === "none") {
    return false;
  }
  return element.getClientRects().length > 0;
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isElementVisible,
  );
}

function MenuHeroArtDirection() {
  /** Couvre le panneau / viewport du menu — `100vw` conforme au contrat R1C. */
  const common = { alt: "", sizes: "100vw" } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    width: heroAssetsR2.desktop.width,
    height: heroAssetsR2.desktop.height,
    quality: 72,
    src: heroAssetsR2.desktop.src,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    width: heroAssetsR2.mobile.width,
    height: heroAssetsR2.mobile.height,
    quality: 72,
    src: heroAssetsR2.mobile.src,
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <picture className="contents">
        <source media={HERO_DESKTOP_MEDIA} srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileProps}
          alt=""
          srcSet={mobileSrcSet}
          className={`absolute inset-0 h-full w-full object-cover ${HERO_OBJECT_POSITION_CLASS} blur-[0.35px] brightness-[0.82] saturate-[0.98] scale-[1.02] lg:blur-[0.75px] lg:brightness-[0.88] lg:saturate-[1.02] lg:scale-[1.02]`}
          style={{
            ...mobileProps.style,
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      </picture>
      {/* Voiles photo : densifiés à gauche uniquement — droite = portrait lisible (asset R2). */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/28 to-transparent lg:from-black/45 lg:via-transparent lg:to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black/55 to-transparent lg:w-[35%] lg:from-black/50 lg:to-transparent" />
    </div>
  );
}

export function ResponsiveNavigationMenu({
  items,
  whatsappUrl,
  whatsappLabel,
  logo,
  editorial,
  galleryLink,
  homeActiveFallback = false,
}: ResponsiveNavigationMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const availableIds = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef<string | null>(null);
  const reactId = useId();
  const dialogId = `primie-nav-dialog-${reactId.replace(/:/g, "")}`;
  const titleId = `${dialogId}-title`;

  const eyebrowBrand = (() => {
    const source = editorial.commercialName;
    const marker = "PRiMiE";
    const idx = source.indexOf(marker);
    if (idx === -1) {
      return source;
    }
    const before = source.slice(0, idx).toUpperCase();
    const after = source.slice(idx + marker.length).toUpperCase();
    return `${before}${marker}${after}`;
  })();

  const initialActive: ActiveNavState = (() => {
    const current = items.find((item) => item.current);
    if (current?.id === "galerie") {
      return { activeId: "galerie", ariaCurrent: "page" };
    }
    if (homeActiveFallback) {
      return { activeId: "accueil", ariaCurrent: "location" };
    }
    return { activeId: undefined, ariaCurrent: undefined };
  })();

  const [activeNav, setActiveNav] = useState<ActiveNavState>(initialActive);

  const syncActiveFromLocation = useCallback(() => {
    setActiveNav(
      resolveActiveNavStateFromLocation(
        window.location.pathname,
        window.location.hash,
        availableIds,
        homeActiveFallback,
      ),
    );
  }, [availableIds, homeActiveFallback]);

  const unlockScroll = useCallback(() => {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  }, []);

  const lockScroll = useCallback(() => {
    if (previousOverflowRef.current === null) {
      previousOverflowRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(
    (options?: { restoreFocus?: boolean }) => {
      setOpen(false);
      unlockScroll();
      if (options?.restoreFocus) {
        triggerRef.current?.focus();
      }
    },
    [unlockScroll],
  );

  const openMenu = useCallback(() => {
    syncActiveFromLocation();
    lockScroll();
    setOpen(true);
  }, [lockScroll, syncActiveFromLocation]);

  const toggleMenu = () => {
    if (open) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    setMounted(true);
    syncActiveFromLocation();
  }, [syncActiveFromLocation]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  // Sync route/hash en continu (ouverture + navigation ancre sans ScrollSpy).
  useEffect(() => {
    if (!mounted) return;
    syncActiveFromLocation();
    window.addEventListener("hashchange", syncActiveFromLocation);
    window.addEventListener("popstate", syncActiveFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncActiveFromLocation);
      window.removeEventListener("popstate", syncActiveFromLocation);
    };
  }, [mounted, syncActiveFromLocation]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = getFocusable(dialogRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable.at(0);
      const last = focusable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  const onBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeMenu({ restoreFocus: true });
    }
  };

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu({ restoreFocus: true });
    }
  };

  const dialog =
    open && mounted ? (
      <div
        className="primie-nav-overlay fixed inset-0 flex h-[100dvh] w-full items-stretch justify-center p-[max(0.875rem,env(safe-area-inset-top))_max(0.875rem,env(safe-area-inset-right))_max(0.875rem,env(safe-area-inset-bottom))_max(0.875rem,env(safe-area-inset-left))] lg:items-center lg:p-8"
        style={{ zIndex: "var(--z-nav-dialog)" }}
        onClick={onBackdropClick}
      >
        {/* Voile décoratif — pointer-events-none pour laisser l’overlay recevoir le clic hors panneau */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" aria-hidden="true" />

        {/* role=dialog = panneau glass réel (pas un wrapper plein viewport) */}
        <div
          ref={dialogRef}
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="primie-nav-dialog primie-nav-glass relative flex max-h-full w-full max-w-[1240px] flex-col overflow-hidden rounded-[2rem] border border-bronze/45 bg-rich-black/28 shadow-elevated ring-1 ring-gold/15 lg:max-h-[90dvh] lg:min-h-[min(88dvh,48rem)] lg:flex-row lg:bg-rich-black/60"
          onKeyDown={onDialogKeyDown}
        >
          {/* Hero + gradients (montés seulement à l’ouverture) — déjà pointer-events-none */}
          {open ? <MenuHeroArtDirection /> : null}

          {/*
            Voiles — mobile : verre fumé léger (portrait perceptible) ;
            desktop R2B : nav + éditorial seulement, portrait libre.
          */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rich-black/22 via-rich-black/08 to-rich-black/16 lg:hidden"
            aria-hidden="true"
            data-menu-mobile-glass-veil
          />
          {/* Lisibilité locale derrière la colonne de liens — sans flou excessif. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[min(68%,28rem)] bg-gradient-to-b from-rich-black/32 via-rich-black/12 to-transparent lg:hidden"
            aria-hidden="true"
          />
          {/* Tablette 768–1023 : voile gauche renforcé (nav + CTA) — portrait droite intact. */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(58%,24rem)] bg-gradient-to-r from-rich-black/42 via-rich-black/16 to-transparent md:max-lg:block lg:hidden"
            aria-hidden="true"
            data-menu-tablet-nav-veil
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-gradient-to-b from-rich-black/74 via-rich-black/60 to-rich-black/12 backdrop-blur-xl saturate-[1.08] lg:block lg:w-[35%] lg:bg-rich-black/55 lg:bg-gradient-to-b lg:from-rich-black/55 lg:via-rich-black/55 lg:to-rich-black/55 lg:backdrop-blur-md"
            aria-hidden="true"
          />
          {/* Masque éditorial uniquement — s’arrête avant la zone portrait (~42 %+ à droite). */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[35%] hidden w-[min(14rem,22%)] bg-gradient-to-r from-rich-black/48 via-rich-black/20 to-transparent lg:block"
            aria-hidden="true"
            data-menu-editorial-veil
          />

          {/* Fermer — desktop top-right indépendant de la grille */}
          <div className="absolute right-4 top-4 z-20 lg:right-6 lg:top-6">
            <Button
              ref={closeRef}
              type="button"
              variant="ghost"
              size="md"
              className="min-h-12 min-w-12 shrink-0 px-2 text-gold no-underline hover:text-ivory hover:no-underline"
              aria-label="Fermer le menu"
              onClick={() => {
                closeMenu({ restoreFocus: true });
              }}
            >
              <NavCloseIcon className="size-6" />
            </Button>
          </div>

          {/* Colonne Navigation — ~35 % desktop (34–38 %) */}
          <div
            className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col lg:w-[35%] lg:flex-none lg:border-r lg:border-bronze/25"
            data-menu-nav-column
          >
            <div className="flex shrink-0 items-center gap-3 px-4 pb-3 pt-4 sm:px-5 lg:px-6 lg:pb-4 lg:pt-7">
              <div className="min-w-0">{logo}</div>
            </div>

            <h2 id={titleId} className="sr-only">
              Navigation principale
            </h2>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-6 sm:px-5 md:max-lg:max-w-[min(100%,22rem)] lg:max-w-none lg:px-6 lg:pb-7 lg:overflow-y-hidden">
              <nav aria-label="Navigation principale" className="flex flex-col">
                {items.map((item, index) => {
                  const isActive = item.id === activeNav.activeId;
                  const ariaCurrent = isActive ? activeNav.ariaCurrent : undefined;
                  const isLast = index === items.length - 1;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-current={ariaCurrent}
                      className={[
                        "group inline-flex min-h-14 items-center gap-3.5 py-3.5 font-display text-[0.9375rem] font-medium uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:text-base lg:min-h-[3.5rem] lg:text-sm xl:text-base",
                        isActive
                          ? "rounded-lg bg-bronze/50 bg-gradient-to-r from-gold/25 to-transparent px-2.5 text-ivory"
                          : "px-2.5",
                        isLast ? "" : "border-b border-bronze/40",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        closeMenu();
                      }}
                    >
                      <NavItemIcon id={item.id} className="size-5 shrink-0 text-gold" />
                      <span className="min-w-0 flex-1">{item.label}</span>
                      <NavChevronIcon className="size-4 shrink-0 text-gold/85" />
                    </a>
                  );
                })}
              </nav>

              {/*
                CTA : pleine largeur sur petit mobile ; zone éditoriale stable
                (max-width + alignement gauche) entre 768 et 1023 px pour éviter
                le visage ; desktop lg: inchangé dans la colonne nav.
              */}
              <div
                className="mt-6 flex w-full flex-col items-stretch gap-5 md:max-lg:mt-auto md:max-lg:w-[min(100%,16.5rem)] md:max-lg:max-w-[16.5rem] md:max-lg:self-start lg:mt-auto lg:w-full lg:max-w-none lg:pt-8"
                data-menu-whatsapp-cta
              >
                <LinkButton
                  href={whatsappUrl}
                  size="lg"
                  className="min-h-16 w-full justify-center rounded-2xl px-5 text-sm uppercase tracking-[0.06em] sm:text-base"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <NavWhatsAppIcon className="size-5 shrink-0 text-primary-foreground" />
                  {whatsappLabel}
                </LinkButton>
                <div
                  className="flex justify-center pb-1 md:max-lg:justify-start lg:justify-start"
                  aria-hidden="true"
                >
                  <NavOrnament className="h-4 w-28 text-gold/75" />
                </div>
              </div>
            </div>
          </div>

          {/* Scène droite desktop : éditorial contenu (~320–360px) + zone portrait exclusive (~42–45 %) */}
          <aside className="relative z-10 hidden min-h-0 flex-1 lg:flex" data-menu-scene>
            <div className="flex min-h-0 w-full min-w-0">
              <div
                className="flex w-full max-w-[13.75rem] shrink-0 flex-col justify-start overflow-y-hidden px-4 pb-8 pt-10 text-center xl:max-w-[16rem] xl:px-6 xl:pt-12 min-[1440px]:max-w-[17.5rem]"
                data-menu-editorial
              >
                <p className="font-display text-base font-semibold tracking-[0.06em] text-gold xl:text-lg">
                  {eyebrowBrand}
                </p>
                <div className="mt-2.5 flex justify-center" aria-hidden="true">
                  <NavOrnament className="h-4 w-28 text-gold/70" />
                </div>
                <p className="mt-5 font-display text-xl leading-snug text-ivory xl:text-2xl">
                  {editorial.activity.endsWith(".") ? editorial.activity : `${editorial.activity}.`}
                </p>
                <p className="mt-3.5 font-script text-xl leading-snug text-ivory/90 xl:text-[1.45rem]">
                  {editorial.slogan}
                </p>

                {galleryLink ? (
                  <a
                    href={galleryLink.href}
                    className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 font-sans text-sm font-semibold text-gold underline underline-offset-4 transition-colors hover:text-gold-light hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                    onClick={() => {
                      closeMenu();
                    }}
                  >
                    {galleryLink.label}
                    <NavChevronIcon className="size-4 shrink-0 text-gold/85" />
                  </a>
                ) : null}
              </div>

              {/* Zone portrait exclusive — fenêtre transparente sur le Hero R2 (sans re-crop). */}
              <div
                className="relative min-h-0 min-w-0 flex-1 basis-[42%]"
                aria-hidden="true"
                data-menu-portrait-zone
              />
            </div>
          </aside>
        </div>
      </div>
    ) : null;

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="md"
        className="min-h-11 min-w-11 text-on-dark no-underline hover:text-gold hover:no-underline"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={toggleMenu}
      >
        Menu
      </Button>
      {mounted && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}

/** @deprecated Alias — utiliser ResponsiveNavigationMenu. */
export const MobileNavigation = ResponsiveNavigationMenu;
