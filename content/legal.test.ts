import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  cookieConsentRuntime,
  getConfirmedLegalValue,
  isConfirmedLegalFact,
  isPendingLegalFact,
  legalContent,
} from "../content/legal";
import { siteConfig } from "../content/site-config";

const PLACEHOLDER_PATTERNS = [
  /À compléter/i,
  /\bTBD\b/,
  /\bTODO\b/,
  /000000000/,
  /example\.com/i,
  /placeholder/i,
];

describe("legalContent — architecture progressive non publique", () => {
  it("distingue les faits confirmés des faits en attente", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.commercialName)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.phone)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.legalIdentity)).toBe(true);
    expect(isPendingLegalFact(legalContent.publisher.siret)).toBe(true);
    expect(legalContent.publisher.siret.status).toBe("pending_prisca");
  });

  it("empêche de lire une donnée pending comme confirmed", () => {
    const fact = legalContent.publisher.siret;
    expect(fact.status).toBe("pending_prisca");
    expect(isConfirmedLegalFact(fact)).toBe(false);
    expect(getConfirmedLegalValue(fact)).toBeUndefined();
    if (isPendingLegalFact(fact)) {
      expect(fact).toHaveProperty("reason");
      expect(fact).not.toHaveProperty("value");
      expect(fact.source).toBe("pending");
    }
  });

  it("n’expose aucun placeholder interdit dans le module legal", () => {
    const source = readFileSync(join(process.cwd(), "content/legal.ts"), "utf8");
    for (const pattern of PLACEHOLDER_PATTERNS) {
      expect(source).not.toMatch(pattern);
    }
  });

  it("réutilise le téléphone canonique de siteConfig sans duplication hardcodée", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.phone)).toBe(true);
    if (legalContent.publisher.phone.status === "confirmed") {
      expect(legalContent.publisher.phone.value.display).toBe(siteConfig.contact.phoneDisplay);
      expect(legalContent.publisher.phone.value.e164).toBe(siteConfig.contact.phoneE164);
      expect(legalContent.publisher.phone.source).toBe("site_config");
    }
    const legalSource = readFileSync(join(process.cwd(), "content/legal.ts"), "utf8");
    expect(legalSource).not.toContain("+33 7 49 61 65 82");
    expect(legalSource).not.toContain("+33749616582");
  });

  it("confirme l’identité publique PO : Prisca Foani", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.legalIdentity)).toBe(true);
    if (legalContent.publisher.legalIdentity.status === "confirmed") {
      expect(legalContent.publisher.legalIdentity.value).toBe("Prisca Foani");
      expect(legalContent.publisher.legalIdentity.source).toBe("po_confirmation");
    }
  });

  it("conserve les champs administratifs obligatoires en pending_prisca ou pending_verification", () => {
    expect(legalContent.publisher.legalStatus.status).toBe("pending_prisca");
    expect(legalContent.publisher.siren.status).toBe("pending_prisca");
    expect(legalContent.publisher.siret.status).toBe("pending_prisca");
    expect(legalContent.publisher.registration.status).toBe("pending_prisca");
    expect(legalContent.publisher.vatNumber.status).toBe("pending_prisca");
    expect(legalContent.publisher.publicProfessionalEmail.status).toBe("pending_prisca");
    expect(legalContent.publisher.publicProfessionalAddress.status).toBe("pending_verification");
    expect(legalContent.publisher.publicationDirector.status).toBe("pending_verification");
    expect(legalContent.hosting.confirmedHost.status).toBe("pending_verification");
    expect(legalContent.commercialOperations.pricingDisplayPolicy.status).toBe("pending_prisca");
    expect(legalContent.commercialOperations.wigDeliveryWithdrawalReturns.status).toBe(
      "pending_prisca",
    );
    expect(legalContent.commercialOperations.wigLegalGuarantees.status).toBe("pending_prisca");
  });

  it("maintient Vercel en candidat, jamais hébergeur confirmé", () => {
    expect(legalContent.hostingCandidate.provider).toBe("Vercel");
    expect(legalContent.hostingCandidate.status).toBe("candidate");
    expect(isPendingLegalFact(legalContent.hosting.confirmedHost)).toBe(true);
    if (isPendingLegalFact(legalContent.hosting.confirmedHost)) {
      expect(legalContent.hosting.confirmedHost.reason).toMatch(/Vercel|candidat/i);
    }
  });

  it("fixe le périmètre CGV à blocked_legal_scope", () => {
    expect(legalContent.termsScope.status).toBe("blocked_legal_scope");
    if (legalContent.termsScope.status === "blocked_legal_scope") {
      expect(legalContent.termsScope.reason).toMatch(/médiateur/i);
      expect(legalContent.termsScope.reason).toMatch(/annulation/i);
      expect(legalContent.termsScope.reason).toMatch(/perruques/i);
      expect(legalContent.termsScope.reason).toMatch(/tarifaire/i);
    }
  });

  it("consolide les faits PO_CONFIRMED commerciaux", () => {
    expect(isConfirmedLegalFact(legalContent.commercialOperations.appointmentConfirmation)).toBe(
      true,
    );
    expect(isConfirmedLegalFact(legalContent.commercialOperations.deposit)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.travelFees)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.paymentMethods)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.separateWigSales)).toBe(true);

    if (legalContent.commercialOperations.deposit.status === "confirmed") {
      expect(legalContent.commercialOperations.deposit.value).toMatch(/aucun acompte/i);
      expect(legalContent.commercialOperations.deposit.source).toBe("po_confirmation");
    }
    if (legalContent.commercialOperations.paymentMethods.status === "confirmed") {
      expect(legalContent.commercialOperations.paymentMethods.value.methods).toEqual([
        "espèces",
        "virement bancaire",
      ]);
    }
  });

  it("consolide confidentialité PO (rétention WhatsApp, non partage, pas de marketing secondaire)", () => {
    expect(isConfirmedLegalFact(legalContent.privacy.retention)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.privacy.thirdPartySharing)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.privacy.prospecting)).toBe(true);

    if (legalContent.privacy.retention.status === "confirmed") {
      expect(legalContent.privacy.retention.value).toMatch(/un mois/i);
      expect(legalContent.privacy.retention.value).toMatch(/WhatsApp/i);
    }
    if (legalContent.privacy.thirdPartySharing.status === "confirmed") {
      expect(legalContent.privacy.thirdPartySharing.value).toMatch(/WhatsApp|Meta/i);
    }
    if (legalContent.privacy.prospecting.status === "confirmed") {
      expect(legalContent.privacy.prospecting.value).toBe(false);
    }
  });

  it("confirme l’absence de médiateur choisi (bloque la publication légale)", () => {
    expect(legalContent.mediation.selectionStatus.status).toBe("confirmed");
    if (legalContent.mediation.selectionStatus.status === "confirmed") {
      expect(legalContent.mediation.selectionStatus.value).toBe("not_selected");
      expect(legalContent.mediation.selectionStatus.source).toBe("po_confirmation");
    }

    expect(isPendingLegalFact(legalContent.mediation.mediatorName)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.referralProcedure)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.mediatorAddress)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.mediatorUrl)).toBe(true);
  });

  it("cartographie le flux Booking → WhatsApp sans qualifier Meta de sous-traitant", () => {
    const { technicalPrivacyInventory } = legalContent;
    expect(isConfirmedLegalFact(technicalPrivacyInventory.browserMemoryOnlyBeforeClick)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noPrimieRequestBeforeClick)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.whatsAppMetaOwnTermsApply)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noSecondaryMarketingUseCurrently)).toBe(
      true,
    );
    if (technicalPrivacyInventory.whatsAppMetaOwnTermsApply.status === "confirmed") {
      expect(technicalPrivacyInventory.whatsAppMetaOwnTermsApply.value).toMatch(/sous-traitant/i);
      expect(technicalPrivacyInventory.whatsAppMetaOwnTermsApply.value).toMatch(/sans preuve/i);
    }
  });

  it("conserve le verdict cookies sans bandeau runtime", () => {
    expect(cookieConsentRuntime.currentRuntime).toBe("NO_CONSENT_BANNER_REQUIRED_CURRENT_RUNTIME");
    expect(cookieConsentRuntime.productionDomainReauditRequired).toBe(true);
  });

  it("ne stocke aucune donnée sensible ni preuve privée", () => {
    const serialized = JSON.stringify(legalContent);
    expect(serialized).not.toMatch(/carte.?identit/i);
    expect(serialized).not.toMatch(/passport/i);
    expect(serialized).not.toMatch(/@/);
    expect(serialized).not.toMatch(/SIRE[NT]\s*[:=]\s*["'][0-9]/i);
  });
});

describe("legalContent — anti-régression routes et Footer", () => {
  const legalRoutes = [
    "app/mentions-legales/page.tsx",
    "app/confidentialite/page.tsx",
    "app/politique-de-confidentialite/page.tsx",
    "app/cgv/page.tsx",
  ];

  it.each(legalRoutes)("n’existe pas : %s", (routePath) => {
    expect(existsSync(join(process.cwd(), routePath))).toBe(false);
  });

  it("n’ajoute aucun lien légal au Footer", () => {
    const footerSource = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    expect(footerSource).not.toMatch(/mentions-legales/i);
    expect(footerSource).not.toMatch(/confidentialite/i);
    expect(footerSource).not.toMatch(/politique-de-confidentialite/i);
    expect(footerSource).not.toMatch(/\/cgv/i);
  });

  it("n’ajoute aucune bannière cookies", () => {
    const footerSource = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(footerSource).not.toMatch(/cookie/i);
    expect(layoutSource).not.toMatch(/cookie/i);
    expect(layoutSource).not.toMatch(/consent/i);
  });
});
