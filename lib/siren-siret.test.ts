import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  canConfirmFrenchBusinessIdentifier,
  isConsistentSirenSiretPair,
  isValidSiren,
  isValidSiret,
  passesLuhnCheck,
} from "./siren-siret";

/** Exemples synthétiques valides (Luhn) — aucun numéro métier PRiMiE. */
const SYNTHETIC_VALID_SIREN = "732829320";
const SYNTHETIC_VALID_SIRET = "73282932000074";
const SYNTHETIC_INVALID_SIREN = "123456789";
const SYNTHETIC_INVALID_SIRET = "12345678901234";

/** Candidat communiqué invalidé — interdit dans le dépôt. */
const REJECTED_CANDIDATE_SIRET = "99003724400022";

function collectSourceFiles(root: string, acc: string[] = []): string[] {
  for (const name of readdirSync(root)) {
    if (name === "node_modules" || name === ".next" || name === ".git") {
      continue;
    }
    const full = join(root, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collectSourceFiles(full, acc);
      continue;
    }
    if (/\.(ts|tsx|js|jsx|md|json)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

describe("validation SIREN / SIRET — LEGAL-PAGES-01C-R1", () => {
  it("exige des caractères numériques uniquement", () => {
    expect(isValidSiren("73282932A")).toBe(false);
    expect(isValidSiret("7328293200007A")).toBe(false);
    expect(passesLuhnCheck("73282932A")).toBe(false);
  });

  it("exige les longueurs 9 et 14", () => {
    expect(isValidSiren("73282932")).toBe(false);
    expect(isValidSiren("7328293200")).toBe(false);
    expect(isValidSiret("7328293200007")).toBe(false);
    expect(isValidSiret("732829320000740")).toBe(false);
  });

  it("applique le contrôle Luhn sur des exemples synthétiques", () => {
    expect(isValidSiren(SYNTHETIC_VALID_SIREN)).toBe(true);
    expect(isValidSiret(SYNTHETIC_VALID_SIRET)).toBe(true);
    expect(isValidSiren(SYNTHETIC_INVALID_SIREN)).toBe(false);
    expect(isValidSiret(SYNTHETIC_INVALID_SIRET)).toBe(false);
  });

  it("vérifie la cohérence SIREN / SIRET", () => {
    expect(isConsistentSirenSiretPair(SYNTHETIC_VALID_SIREN, SYNTHETIC_VALID_SIRET)).toBe(true);
    expect(isConsistentSirenSiretPair(SYNTHETIC_VALID_SIREN, "12345678200014")).toBe(false);
  });

  it("refuse la confirmation métier d’un identifiant invalide", () => {
    expect(canConfirmFrenchBusinessIdentifier("siren", SYNTHETIC_VALID_SIREN)).toBe(true);
    expect(canConfirmFrenchBusinessIdentifier("siret", SYNTHETIC_VALID_SIRET)).toBe(true);
    expect(canConfirmFrenchBusinessIdentifier("siren", SYNTHETIC_INVALID_SIREN)).toBe(false);
    expect(canConfirmFrenchBusinessIdentifier("siret", SYNTHETIC_INVALID_SIRET)).toBe(false);
  });

  it("n’utilise aucun numéro Prisca non vérifié comme fixture publique", () => {
    const helperSource = readFileSync(join(process.cwd(), "lib/siren-siret.ts"), "utf8");
    const testSource = readFileSync(join(process.cwd(), "lib/siren-siret.test.ts"), "utf8");
    expect(helperSource).not.toContain(REJECTED_CANDIDATE_SIRET);
    expect(helperSource).not.toMatch(/Prisca/i);
    expect(testSource).toContain("SYNTHETIC_");
    expect(testSource).toContain("aucun numéro métier PRiMiE");
  });

  it("interdit la présence du SIRET candidat invalidé hors du test d’absence", () => {
    const roots = ["app", "components", "content", "lib", "docs"];
    for (const root of roots) {
      for (const file of collectSourceFiles(join(process.cwd(), root))) {
        if (file.endsWith(`${join("lib", "siren-siret.test.ts")}`)) {
          continue;
        }
        // Windows path normalization
        if (file.replaceAll("\\", "/").endsWith("lib/siren-siret.test.ts")) {
          continue;
        }
        const text = readFileSync(file, "utf8");
        expect(text, file).not.toContain(REJECTED_CANDIDATE_SIRET);
      }
    }
  });
});
