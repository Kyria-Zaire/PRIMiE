import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { services } from "@/content/services";
import { Services } from "./services";

const EXPECTED_TITLES = [
  "Tresses & coiffure femme et homme",
  "Traitement de perruque",
  "Pose perruque",
  "Look & twist",
  "Vente et pose de perruques",
  "Tissage",
] as const;

describe("Services section", () => {
  it("rend #services avec les six titres et descriptions dans l’ordre", () => {
    const html = renderToStaticMarkup(<Services />);

    expect(html).toContain('id="services"');
    expect(html).toContain(">Nos services<");
    expect(html).toContain("<h2");
    expect(html).toContain("<ul");
    expect(html.match(/<li\b/g)).toHaveLength(6);
    expect(html.match(/<h3\b/g)).toHaveLength(6);

    for (const title of EXPECTED_TITLES) {
      expect(html).toContain(title.replaceAll("&", "&amp;"));
    }

    for (const service of services) {
      expect(html).toContain(service.id);
      expect(html).toContain(service.description);
    }

    const titleOrder = EXPECTED_TITLES.map((title) => html.indexOf(title.replaceAll("&", "&amp;")));
    expect([...titleOrder].sort((a, b) => a - b)).toEqual(titleOrder);
    expect(new Set(services.map((service) => service.id)).size).toBe(6);
  });

  it("n’expose ni prix, image ni CTA individuel", () => {
    const html = renderToStaticMarkup(<Services />);
    const source = readFileSync(join(process.cwd(), "components/sections/services.tsx"), "utf8");

    expect(html).not.toContain("€");
    expect(html).not.toContain("prix");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("Réserver");
    expect(html).not.toContain("wa.me");
    expect(html).not.toContain("Extensions cils");
    expect(html).not.toContain("Autres prestations");
    expect(html).toContain('aria-hidden="true"');
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("service.description");
    expect(source).toContain('from "@/content/services"');
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
