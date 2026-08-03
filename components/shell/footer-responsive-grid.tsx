"use client";

import { useEffect, useState, type ReactNode, type ToggleEvent } from "react";

/** Breakpoint desktop Footer — FOOTER-DESIGN-R1C-R2. */
export const FOOTER_DESKTOP_MEDIA_QUERY = "(min-width: 1280px)";

export const FOOTER_DISCLOSURE_IDS = ["navigation", "services", "contact", "inspirations"] as const;

export type FooterDisclosureId = (typeof FOOTER_DISCLOSURE_IDS)[number];

export type FooterDisclosureSlot = {
  readonly id: FooterDisclosureId;
  readonly title: string;
  readonly icon: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
};

export type FooterResponsiveGridProps = {
  readonly brand: ReactNode;
  readonly disclosures: readonly FooterDisclosureSlot[];
};

type MobileOpenState = Record<FooterDisclosureId, boolean>;

const INITIAL_MOBILE_OPEN: MobileOpenState = {
  navigation: false,
  services: false,
  contact: false,
  inspirations: false,
};

const panelClassName =
  "max-xl:border-t max-xl:border-soft-gold/35 max-xl:pt-3 max-xl:pb-4 xl:border-0 xl:pt-0 xl:pb-0";

const columnTitleClassName =
  "font-display text-base font-semibold tracking-[0.16em] text-gold uppercase sm:text-[1.05rem]";

function ColumnHeading({ children }: { readonly children: ReactNode }) {
  return (
    <div className="mb-3 flex flex-col items-center gap-1.5 xl:mb-3.5 xl:items-start">
      <svg
        aria-hidden="true"
        viewBox="0 0 32 18"
        className="h-4 w-8 text-gold"
        fill="none"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M16 1.2c.9 2.8 3.2 4.8 6.1 5.4-2.9.6-5.2 2.6-6.1 5.4-.9-2.8-3.2-4.8-6.1-5.4 2.9-.6 5.2-2.6 6.1-5.4Z"
        />
        <path
          fill="currentColor"
          opacity="0.88"
          d="M7.2 3.1c.45 1.5 1.7 2.6 3.2 3-1.5.4-2.75 1.5-3.2 3-.45-1.5-1.7-2.6-3.2-3 1.5-.4 2.75-1.5 3.2-3Z"
        />
        <path
          fill="currentColor"
          opacity="0.88"
          d="M24.8 3.1c.45 1.5 1.7 2.6 3.2 3-1.5.4-2.75 1.5-3.2 3-.45-1.5-1.7-2.6-3.2-3 1.5-.4 2.75-1.5 3.2-3Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          d="M16 12.2v4.2"
          opacity="0.7"
        />
      </svg>
      <p className={columnTitleClassName}>{children}</p>
    </div>
  );
}

/**
 * Grille Footer responsive — Client minimal (FOOTER-DESIGN-R1C-R2).
 * Ouvre les details via attribut `open` dès 1280 px (matchMedia).
 */
export function FooterResponsiveGrid({ brand, disclosures }: FooterResponsiveGridProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<MobileOpenState>(INITIAL_MOBILE_OPEN);

  useEffect(() => {
    const mediaQuery = window.matchMedia(FOOTER_DESKTOP_MEDIA_QUERY);
    const syncDesktop = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncDesktop();
    mediaQuery.addEventListener("change", syncDesktop);
    return () => {
      mediaQuery.removeEventListener("change", syncDesktop);
    };
  }, []);

  function handleToggle(id: FooterDisclosureId, event: ToggleEvent<HTMLDetailsElement>) {
    if (isDesktop) {
      return;
    }
    const nextOpen = event.currentTarget.open;
    setMobileOpen((current) => ({ ...current, [id]: nextOpen }));
  }

  return (
    <div
      data-footer-columns
      data-desktop={isDesktop ? "true" : "false"}
      className="flex flex-col gap-1 xl:grid xl:grid-cols-[1.08fr_0.92fr_1fr_1.05fr_1.22fr] xl:items-start xl:gap-0"
    >
      {brand}
      {disclosures.map((disclosure) => {
        const open = isDesktop || mobileOpen[disclosure.id];
        return (
          <details
            key={disclosure.id}
            className={[
              "footer-disclosure group border-b border-bronze/35 xl:border-0",
              disclosure.className,
            ]
              .filter(Boolean)
              .join(" ")}
            open={open}
            onToggle={(event) => handleToggle(disclosure.id, event)}
          >
            <summary
              className={[
                "flex min-h-14 cursor-pointer list-none items-center gap-3 py-3.5 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus [&::-webkit-details-marker]:hidden",
                isDesktop ? "hidden" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-bronze/55 bg-warm-cream text-gold shadow-soft"
              >
                {disclosure.icon}
              </span>
              <span className="min-w-0 flex-1 font-display text-base font-semibold tracking-[0.08em] text-foreground uppercase group-open:text-gold">
                {disclosure.title}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex size-8 shrink-0 items-center justify-center text-lg leading-none text-gold motion-safe:transition-transform motion-safe:duration-short motion-safe:ease-soft group-open:rotate-180 motion-reduce:transition-none"
              >
                ⌄
              </span>
            </summary>
            <div className={panelClassName}>
              <div className={isDesktop ? "mb-3 block" : "mb-3 hidden"}>
                <ColumnHeading>{disclosure.title}</ColumnHeading>
              </div>
              {disclosure.children}
            </div>
          </details>
        );
      })}
    </div>
  );
}
