import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Contact } from "./contact";

describe("Contact section", () => {
  it("rend #contact avec les coordonnées canoniques uniquement", () => {
    const html = renderToStaticMarkup(<Contact />);

    expect(html).toContain('id="contact"');
    expect(html).toContain(">Contact<");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain('href="https://wa.me/33749616582"');
    expect(html).toContain(">WhatsApp<");
    expect(html).toContain("<address");
    expect(html).not.toContain("?text=");
    expect(html).not.toContain("@");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Facebook");
    expect(html).not.toContain("09h");
    expect(html).not.toContain("Lundi");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("form");
  });

  it("consomme siteConfig et reste un Server Component", () => {
    const source = readFileSync(join(process.cwd(), "components/sections/contact.tsx"), "utf8");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("siteConfig");
    expect(source).toContain("buildWhatsAppUrl");
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
