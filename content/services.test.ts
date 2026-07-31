import { describe, expect, it } from "vitest";
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

  it("n’ajoute ni prix, ni durée, ni image (description seed autorisée)", () => {
    for (const service of services) {
      const keys = Object.keys(service).sort();
      expect(keys).toEqual(["description", "id", "title"]);
      expect(typeof service.description).toBe("string");
      expect(service.description.length).toBeGreaterThan(0);
    }
  });
});
