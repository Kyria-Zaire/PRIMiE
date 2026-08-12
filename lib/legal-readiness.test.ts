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

describe("getLegalReadiness — LEGAL-PAGES-01C", () => {
  it("distingue routesImplemented, contentComplete et publicLaunchReady", () => {
    const readiness = getLegalReadiness();

    expect(readiness.legalNoticeRouteImplemented).toBe(true);
    expect(readiness.privacyNoticeRouteImplemented).toBe(true);
    expect(readiness.termsRouteImplemented).toBe(false);
    expect(readiness.routesImplemented).toBe(true);
    expect(readiness.contentComplete).toBe(false);
    expect(readiness.legalNoticeReady).toBe(false);
    expect(readiness.privacyNoticeReady).toBe(false);
    expect(readiness.termsScopeReady).toBe(false);
    expect(readiness.mediatorReady).toBe(false);
    expect(readiness.pricingDisplayReady).toBe(false);
    expect(readiness.wigSalesTermsReady).toBe(false);
    expect(readiness.legalRoutesReady).toBe(false);
    expect(readiness.publicRoutesReady).toBe(false);
    expect(readiness.publicLaunchReady).toBe(false);
    expect(readiness.protectedStagingReady).toBe(true);
    expect(readiness.cookieConsentBannerRequired).toBe(false);
    expect(readiness.productionDomainCookieReauditRequired).toBe(true);
    expect(readiness.partnerRelationshipConfirmed).toBe(true);
    expect(readiness.partnerEmailReady).toBe(true);
    expect(readiness.partnerIdentityVerified).toBe(false);
    expect(readiness.partnerSiretOfficiallyVerified).toBe(false);
    expect(readiness.partnerGdprRoleQualified).toBe(false);
    expect(readiness.privacyRightsContactReady).toBe(true);
    expect(readiness.serviceProviderBusinessIdentityReady).toBe(false);
  });

  it("liste explicitement les champs manquants depuis les statuts pending", () => {
    const { missingFields } = getLegalReadiness();

    expect(missingFields.length).toBeGreaterThan(0);
    expect(missingFields).not.toContain("publisher.legalIdentity");
    expect(missingFields).not.toContain("publisher.legalStatus");
    expect(missingFields).not.toContain("publisher.publicProfessionalAddress");
    expect(missingFields).not.toContain("hosting.confirmedHost");
    expect(missingFields).not.toContain("privacy.dataController");
    expect(missingFields).toContain("publisher.siren");
    expect(missingFields).toContain("publisher.publicProfessionalEmail");
    expect(missingFields).toContain("hosting.hostPhone");
    expect(missingFields).toContain("mediation.selectionStatus");
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
  it("retourne not_ready tant que les gates de contenu ne sont pas complets", () => {
    const result = getPublishableLegalContent();
    expect(result.status).toBe("not_ready");
    if (result.status === "not_ready") {
      expect(result.blockingFields.length).toBeGreaterThan(0);
      expect(result.blockingFields).toContain("publisher.siren");
    }
  });

  it("ne masque pas silencieusement les obligations manquantes", () => {
    const result = getPublishableLegalContent();
    expect(result.status).toBe("not_ready");
    if (result.status === "not_ready") {
      expect(result.blockingFields).toContain("publisher.publicProfessionalEmail");
    }
  });
});

describe("identité et hébergement", () => {
  it("considère l’identité légale comme incomplète sans SIREN/SIRET", () => {
    expect(isLegalIdentityComplete()).toBe(false);
  });

  it("garde le candidat d’hébergement partiel (téléphone / domaine manquants)", () => {
    expect(isHostingCandidatePublishable()).toBe(true);
    expect(legalContent.hostingCandidate.status).toBe("candidate");
    expect(legalContent.hosting.confirmedHost.status).toBe("confirmed");
    expect(legalContent.hosting.hostPhone.status).toBe("pending_verification");
  });
});

describe("routes légales — existence sans gate content", () => {
  it("implémente mentions et confidentialité sans /cgv", () => {
    expect(existsSync(join(process.cwd(), "app/mentions-legales"))).toBe(true);
    expect(existsSync(join(process.cwd(), "app/confidentialite"))).toBe(true);
    expect(existsSync(join(process.cwd(), "app/cgv"))).toBe(false);
  });

  it("n’importe pas legalContent dans la landing page", () => {
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
