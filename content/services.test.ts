import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { services } from "../content/services";

const EXPECTED_TITLES = [
  "Tresses & coiffure femme et homme",
  "Traitement de perruque",
  "Pose perruque",
  "Look & twist",
  "Vente et pose de perruques",
  "Tissage",
] as const;

describe("services", () => {
  it("contient exactement six prestations dans l’ordre canonique", () => {
    expect(services).toHaveLength(6);
    expect(services.map((service) => service.title)).toEqual([...EXPECTED_TITLES]);
  });

  it("garantit des identifiants et titres uniques", () => {
    const ids = services.map((service) => service.id);
    const titles = services.map((service) => service.title);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("associe une illustration SERVICE_ILLUSTRATION WebP sans prix ni durée", () => {
    for (const service of services) {
      const keys = Object.keys(service).sort();
      expect(keys).toEqual(["description", "id", "illustration", "title"]);
      expect(typeof service.description).toBe("string");
      expect(service.description.length).toBeGreaterThan(0);
      expect(service).not.toHaveProperty("price");
      expect(service).not.toHaveProperty("duration");
      expect(service).not.toHaveProperty("image");
      expect(service.illustration.status).toBe("SERVICE_ILLUSTRATION");
      expect(service.illustration.alt).toBe("");
      expect(service.illustration.src).toBe(`/images/services/${service.id}.webp`);
      expect(service.illustration.width).toBeGreaterThan(0);
      expect(service.illustration.height).toBeGreaterThan(0);
      expect(["cover", "contain"]).toContain(service.illustration.objectFit);

      const webpPath = join(process.cwd(), "public", service.illustration.src.replace(/^\//, ""));
      expect(existsSync(webpPath)).toBe(true);
      expect(statSync(webpPath).size).toBeLessThanOrEqual(180 * 1024);
      expect(existsSync(join(process.cwd(), "images/services", `${service.id}.png`))).toBe(true);
    }
  });
});
