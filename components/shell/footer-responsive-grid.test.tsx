import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FOOTER_DESKTOP_MEDIA_QUERY,
  FOOTER_DISCLOSURE_IDS,
  FooterResponsiveGrid,
  type FooterDisclosureSlot,
} from "./footer-responsive-grid";

const slots: readonly FooterDisclosureSlot[] = FOOTER_DISCLOSURE_IDS.map((id) => ({
  id,
  title: id,
  icon: <span aria-hidden="true">*</span>,
  children: <p>{`contenu-${id}`}</p>,
}));

function detailsOpenFlags(html: string): boolean[] {
  return [...html.matchAll(/<details([^>]*)>/g)].map((match) =>
    /\sopen(?:[\s>=]|$)/.test(match[1] ?? ""),
  );
}

describe("FooterResponsiveGrid — FOOTER-DESIGN-R1C-R2 / R1C-R3", () => {
  it("est un Client Component dédié au breakpoint 1280", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/footer-responsive-grid.tsx"),
      "utf8",
    );

    expect(source.startsWith('"use client"')).toBe(true);
    expect(source).toContain("FOOTER_DESKTOP_MEDIA_QUERY");
    expect(source).toContain(`"(min-width: 1280px)"`);
    expect(FOOTER_DESKTOP_MEDIA_QUERY).toBe("(min-width: 1280px)");
    expect(source).toContain("window.matchMedia(FOOTER_DESKTOP_MEDIA_QUERY)");
    expect(source).toContain('addEventListener("change"');
    expect(source).toContain("removeEventListener");
    expect(source).toContain("isDesktop || mobileOpen");
    expect(source).toContain('data-desktop={isDesktop ? "true" : "false"}');
    expect(source).toContain("if (isDesktop)");
    expect(source).not.toContain("querySelector");
    expect(source).not.toContain("querySelectorAll");
    expect(source).not.toContain("document.");
    expect(source).not.toContain("@/content/");
    expect(source).not.toContain("site-config");
    expect(source).not.toContain("bookingConfig");
    expect(source).not.toContain("featuredGalleryIds");
    expect(source.indexOf("window.")).toBeGreaterThan(source.indexOf("useEffect"));
  });

  it("SSR mobile-first : Navigation/Services fermés, Contact/Inspirations ouverts", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/footer-responsive-grid.tsx"),
      "utf8",
    );
    const html = renderToStaticMarkup(
      <FooterResponsiveGrid brand={<div>Marque</div>} disclosures={slots} />,
    );

    expect(source).toMatch(/navigation:\s*false/);
    expect(source).toMatch(/services:\s*false/);
    expect(source).toMatch(/contact:\s*true/);
    expect(source).toMatch(/inspirations:\s*true/);

    expect(html).toContain("data-footer-columns");
    expect(html).toContain('data-desktop="false"');
    expect(html.match(/<details\b/g)).toHaveLength(4);
    expect(html.match(/<summary\b/g)).toHaveLength(4);
    expect(detailsOpenFlags(html)).toEqual([false, false, true, true]);
    expect(html).toContain("contenu-navigation");
    expect(html).toContain("contenu-services");
    expect(html).toContain("contenu-contact");
    expect(html).toContain("contenu-inspirations");
    expect(html).toContain(">Marque<");
    expect(html).not.toMatch(/<summary class="[^"]*\shidden(?:\s|")/);
  });

  it("expose les quatre ids de disclosure stables", () => {
    expect(FOOTER_DISCLOSURE_IDS).toEqual(["navigation", "services", "contact", "inspirations"]);
  });

  it("conserve la restauration mobile via état mobileOpen après resize", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/footer-responsive-grid.tsx"),
      "utf8",
    );

    expect(source).toContain("setMobileOpen");
    expect(source).toContain("mobileOpen[disclosure.id]");
    expect(source).toContain("isDesktop || mobileOpen");
    expect(source).toContain('mediaQuery.addEventListener("change"');
  });
});
