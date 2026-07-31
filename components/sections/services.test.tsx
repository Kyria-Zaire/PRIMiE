import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
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

const EXPECTED_WEBP = [
  "tresses-coiffure.webp",
  "traitement-perruque.webp",
  "pose-perruque.webp",
  "look-twist.webp",
  "vente-pose-perruques.webp",
  "tissage.webp",
] as const;

describe("Services section", () => {
  it("rend #services avec six cartes illustrées dans l’ordre canonique", () => {
    const html = renderToStaticMarkup(<Services />);

    expect(html).toContain('id="services"');
    expect(html).toContain(">Nos services<");
    expect(html).toContain("<h2");
    expect(html).toContain("<ul");
    expect(html.match(/<li\b/g)).toHaveLength(6);
    expect(html.match(/<h3\b/g)).toHaveLength(6);
    expect(html.match(/<img\b/g)).toHaveLength(6);

    for (const title of EXPECTED_TITLES) {
      expect(html).toContain(title.replaceAll("&", "&amp;"));
    }

    for (const service of services) {
      expect(html).toContain(service.id);
      expect(html).toContain(service.description);
      expect(html).toContain(`${service.id}.webp`);
      expect(service.illustration.alt).toBe("");
      expect(service.illustration.status).toBe("SERVICE_ILLUSTRATION");
    }

    const titleOrder = EXPECTED_TITLES.map((title) => html.indexOf(title.replaceAll("&", "&amp;")));
    expect([...titleOrder].sort((a, b) => a - b)).toEqual(titleOrder);
    expect(services).toHaveLength(6);
  });

  it("applique une grille photo responsive sans carrousel JS", () => {
    const html = renderToStaticMarkup(<Services />);
    const source = readFileSync(join(process.cwd(), "components/sections/services.tsx"), "utf8");

    expect(html).toContain("grid-cols-1");
    expect(html).toContain("sm:grid-cols-2");
    expect(html).toContain("lg:grid-cols-3");
    expect(html).toContain("aspect-[4/3]");
    expect(html).toContain("rounded-2xl");
    expect(html).toContain("object-cover");
    expect(html).toContain("object-contain");
    expect(html).toContain("from-black/80");
    expect(html).toContain("text-on-dark");
    expect(html).toContain('alt=""');

    expect(services.find((s) => s.id === "pose-perruque")?.illustration.objectFit).toBe("contain");
    expect(services.find((s) => s.id === "tissage")?.illustration.objectFit).toBe("contain");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|framer-motion|swiper|embla)\b/i);
    expect(source).toContain('from "@/content/services"');
    expect(source).toContain("service.illustration");
    expect(source).toContain("service.title");
    expect(source).toContain("service.description");
    expect(source).not.toContain("images/services/");
    expect(source).not.toMatch(/\.png/);
    expect(source).not.toContain("<a ");
  });

  it("n’expose ni prix, durée, CTA carte, ni section réalisations", () => {
    const html = renderToStaticMarkup(<Services />);

    expect(html).not.toContain("€");
    expect(html).not.toContain("prix");
    expect(html).not.toContain("durée");
    expect(html).not.toContain("Réserver");
    expect(html).not.toContain("wa.me");
    expect(html).not.toContain("<a ");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("Extensions cils");
    expect(html).not.toContain("Extensions Cils");
    expect(html).not.toContain("Autres prestations");
    expect(html).not.toContain("Nos réalisations");
    expect(html).not.toContain("Tresses Afro");
    expect(html).not.toContain("Bantu Knots");
    expect(html).not.toContain("Instagram");
    expect(html).not.toMatch(/>0[1-6]</);
  });

  it("sert six WebP de production sans importer les PNG sources", () => {
    for (const file of EXPECTED_WEBP) {
      const webp = join(process.cwd(), "public/images/services", file);
      expect(existsSync(webp)).toBe(true);
      expect(statSync(webp).size).toBeLessThanOrEqual(180 * 1024);
      expect(
        existsSync(join(process.cwd(), "public/images/services", file.replace(".webp", ".png"))),
      ).toBe(false);
    }

    for (const service of services) {
      expect(service.illustration.src).toBe(`/images/services/${service.id}.webp`);
      expect(existsSync(join(process.cwd(), "images/services", `${service.id}.png`))).toBe(true);
    }
  });
});
