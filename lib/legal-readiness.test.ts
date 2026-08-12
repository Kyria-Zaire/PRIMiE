import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { legalContent } from "@/content/legal";
import {
  getLegalReadiness,
  getPublishableLegalContent,
  isHostingCandidatePublishable,
  isLegalIdentityComplete,
} from "@/lib/legal-readiness";

describe("getLegalReadiness", () => {
  it("retourne tous les gates de publication à false dans l’état actuel", () => {
    const readiness = getLegalReadiness();

    expect(readiness.legalNoticeReady).toBe(false);
    expect(readiness.privacyNoticeReady).toBe(false);
    expect(readiness.termsScopeReady).toBe(false);
    expect(readiness.mediatorReady).toBe(false);
    expect(readiness.publicRoutesReady).toBe(false);
    expect(readiness.publicLaunchReady).toBe(false);
    expect(readiness.cookieConsentBannerRequired).toBe(false);
    expect(readiness.productionDomainCookieReauditRequired).toBe(true);
  });

  it("liste explicitement les champs manquants depuis les statuts pending", () => {
    const { missingFields } = getLegalReadiness();

    expect(missingFields.length).toBeGreaterThan(0);
    expect(missingFields).not.toContain("publisher.legalIdentity");
    expect(missingFields).toContain("publisher.siren");
    expect(missingFields).toContain("mediation.selectionStatus");
    expect(missingFields).toContain("privacy.dataController");
    expect(missingFields).toContain("hosting.confirmedHost");
    expect(missingFields).toContain("termsScope");
    expect(missingFields).toContain("privacy.marketingConsentMechanism");
    expect(missingFields).not.toContain("privacy.prospecting");
    expect(missingFields).not.toContain("privacy.retention");
  });

  it("calcule les résultats depuis legalContent, pas depuis une liste figée indépendante", () => {
    const readiness = getLegalReadiness(legalContent);
    expect(readiness.missingFields).toEqual(getLegalReadiness().missingFields);
  });
});

describe("getPublishableLegalContent — garde anti-publication", () => {
  it("retourne not_ready tant que les gates ne sont pas complets", () => {
    const result = getPublishableLegalContent();
    expect(result.status).toBe("not_ready");
    if (result.status === "not_ready") {
      expect(result.blockingFields.length).toBeGreaterThan(0);
    }
  });

  it("n’expose jamais les coordonnées du candidat Vercel", () => {
    const serialized = JSON.stringify(getPublishableLegalContent());
    expect(serialized).not.toMatch(/340 S Lemon Ave/i);
    expect(serialized).not.toMatch(/Barranca/i);
    expect(serialized).not.toMatch(/vercel\.com\/legal/i);
  });

  it("ne masque pas silencieusement les obligations manquantes", () => {
    const result = getPublishableLegalContent();
    expect(result.status).toBe("not_ready");
    if (result.status === "not_ready") {
      expect(result.blockingFields).toContain("publisher.siren");
    }
  });
});

describe("identité et hébergement", () => {
  it("considère l’identité légale comme incomplète", () => {
    expect(isLegalIdentityComplete()).toBe(false);
  });

  it("garde Vercel non publiable comme hébergeur", () => {
    expect(isHostingCandidatePublishable()).toBe(true);
    expect(legalContent.hostingCandidate.status).toBe("candidate");
    expect(legalContent.hosting.confirmedHost.status).toBe("pending_verification");
  });
});

describe("anti-régression build — absence de routes légales", () => {
  it("n’inclut aucune route légale dans app/", () => {
    const legalRouteDirs = [
      "mentions-legales",
      "confidentialite",
      "politique-de-confidentialite",
      "cgv",
    ];
    for (const dir of legalRouteDirs) {
      expect(existsSync(join(process.cwd(), "app", dir))).toBe(false);
    }
  });

  it("n’importe pas legalContent dans l’UI publique", () => {
    const pageSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(pageSource).not.toMatch(/content\/legal/);
    expect(pageSource).not.toMatch(/legal-readiness/);
  });
});

describe("dépendances — aucun package supplémentaire", () => {
  it("n’ajoute pas de dépendance pour l’architecture légale", () => {
    const pkg = readFileSync(join(process.cwd(), "package.json"), "utf8");
    expect(pkg).not.toMatch(/@legal/i);
  });
});
