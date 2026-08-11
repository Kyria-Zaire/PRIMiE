import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isConfirmedLegalFact, isPendingLegalFact, legalContent } from "../content/legal";
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
  });

  it("empêche de lire une donnée pending comme confirmed", () => {
    const fact = legalContent.publisher.siret;
    expect(fact.status).toBe("pending");
    expect(isConfirmedLegalFact(fact)).toBe(false);
    if (fact.status === "pending") {
      expect(fact).toHaveProperty("reason");
      expect(fact).not.toHaveProperty("value");
    }
  });

  it("n’expose aucun placeholder interdit dans le module legal", () => {
    const source = readFileSync(join(process.cwd(), "content/legal.ts"), "utf8");
    for (const pattern of PLACEHOLDER_PATTERNS) {
      expect(source).not.toMatch(pattern);
    }
  });

  it("réutilise le téléphone canonique de siteConfig", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.phone)).toBe(true);
    if (legalContent.publisher.phone.status === "confirmed") {
      expect(legalContent.publisher.phone.value.display).toBe(siteConfig.contact.phoneDisplay);
      expect(legalContent.publisher.phone.value.e164).toBe(siteConfig.contact.phoneE164);
      expect(legalContent.publisher.phone.source).toContain("site-config.ts");
    }
  });

  it("confirme l’identité publique autorisée : Prisca Foani", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.legalIdentity)).toBe(true);
    if (legalContent.publisher.legalIdentity.status === "confirmed") {
      expect(legalContent.publisher.legalIdentity.value).toBe("Prisca Foani");
      expect(legalContent.publisher.legalIdentity.source).toBe("CTO");
    }
  });

  it("maintient Vercel en candidat, jamais hébergeur confirmé", () => {
    expect(legalContent.hostingCandidate.provider).toBe("Vercel");
    expect(legalContent.hostingCandidate.status).toBe("candidate");
    expect(isPendingLegalFact(legalContent.hosting.confirmedHost)).toBe(true);
    if (legalContent.hosting.confirmedHost.status === "pending") {
      expect(legalContent.hosting.confirmedHost.reason).toMatch(/Vercel|candidat/i);
    }
  });

  it("fixe le périmètre CGV à blocked_legal_scope", () => {
    expect(legalContent.termsScope.status).toBe("blocked_legal_scope");
    if (legalContent.termsScope.status === "blocked_legal_scope") {
      expect(legalContent.termsScope.reason).toMatch(/prix/i);
      expect(legalContent.termsScope.reason).toMatch(/acompte/i);
      expect(legalContent.termsScope.reason).toMatch(/perruques/i);
      expect(legalContent.termsScope.reason).toMatch(/WhatsApp/i);
    }
  });

  it("consolide le processus de réservation (confirmation / prix / devis / acompte)", () => {
    expect(isConfirmedLegalFact(legalContent.commercialOperations.appointmentConfirmation)).toBe(
      true,
    );
    expect(isConfirmedLegalFact(legalContent.commercialOperations.quoteProcess)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.priceCommunication)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.deposit)).toBe(true);

    if (legalContent.commercialOperations.quoteProcess.status === "confirmed") {
      expect(legalContent.commercialOperations.quoteProcess.value).toMatch(/aucun devis/i);
    }
    if (legalContent.commercialOperations.deposit.status === "confirmed") {
      expect(legalContent.commercialOperations.deposit.value).toMatch(/aucun acompte/i);
    }
    if (legalContent.commercialOperations.priceCommunication.status === "confirmed") {
      expect(legalContent.commercialOperations.priceCommunication.value).toMatch(/WhatsApp/i);
      expect(legalContent.commercialOperations.priceCommunication.value).toMatch(
        /avant la prestation/i,
      );
    }
  });

  it("consolide paiements (espèces + virement) et frais de déplacement", () => {
    expect(isConfirmedLegalFact(legalContent.commercialOperations.paymentMethods)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.commercialOperations.travelFees)).toBe(true);

    if (legalContent.commercialOperations.travelFees.status === "confirmed") {
      expect(legalContent.commercialOperations.travelFees.value).toMatch(
        /aucun frais de déplacement/i,
      );
    }
    if (legalContent.commercialOperations.paymentMethods.status === "confirmed") {
      expect(legalContent.commercialOperations.paymentMethods.value.methods).toEqual([
        "espèces",
        "virement bancaire",
      ]);
    }
  });

  it("consolide vente de perruques seules via WhatsApp", () => {
    expect(isConfirmedLegalFact(legalContent.commercialOperations.separateWigSales)).toBe(true);
    if (legalContent.commercialOperations.separateWigSales.status === "confirmed") {
      expect(legalContent.commercialOperations.separateWigSales.value).toMatch(/seules/i);
      expect(legalContent.commercialOperations.separateWigSales.value).toMatch(/WhatsApp/i);
    }
  });

  it("consolide confidentialité métier (suppression WhatsApp + non partage + promotions)", () => {
    expect(isConfirmedLegalFact(legalContent.privacy.retention)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.privacy.thirdPartySharing)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.privacy.prospecting)).toBe(true);
    expect(isPendingLegalFact(legalContent.privacy.mandatoryOptionalCharacter)).toBe(true);

    if (legalContent.privacy.retention.status === "confirmed") {
      expect(legalContent.privacy.retention.value).toMatch(/un mois/i);
      expect(legalContent.privacy.retention.value).toMatch(/WhatsApp/i);
    }
    if (legalContent.privacy.thirdPartySharing.status === "confirmed") {
      expect(legalContent.privacy.thirdPartySharing.value).toMatch(/pas partagées/i);
    }
    if (legalContent.privacy.prospecting.status === "confirmed") {
      expect(legalContent.privacy.prospecting.value).toBe(true);
    }
    if (legalContent.privacy.mandatoryOptionalCharacter.status === "pending") {
      expect(legalContent.privacy.mandatoryOptionalCharacter.reason).not.toMatch(
        /consentement|désinscription|désinscrire|refus/i,
      );
    }
  });

  it("confirme l’absence de médiateur choisi (bloque la publication légale)", () => {
    expect(legalContent.mediation.selectionStatus.status).toBe("confirmed");
    if (legalContent.mediation.selectionStatus.status === "confirmed") {
      expect(legalContent.mediation.selectionStatus.value).toBe("not_selected");
      expect(legalContent.mediation.selectionStatus.source).toMatch(/CTO/i);
    }

    expect(isPendingLegalFact(legalContent.mediation.mediatorName)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.referralProcedure)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.mediatorAddress)).toBe(true);
    expect(isPendingLegalFact(legalContent.mediation.mediatorUrl)).toBe(true);
  });

  it("modélise prospection promo via champs marketing dédiés (pending)", () => {
    expect(isPendingLegalFact(legalContent.privacy.marketingConsentMechanism)).toBe(true);
    expect(isPendingLegalFact(legalContent.privacy.marketingOptOutMechanism)).toBe(true);
    expect(isPendingLegalFact(legalContent.privacy.marketingInformationNotice)).toBe(true);
  });

  it("confirme l’inventaire technique sans stockage serveur démontré", () => {
    const { technicalPrivacyInventory } = legalContent;
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noPrimieServerStorage)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noDatabase)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noBookingPersistenceAfterReload)).toBe(
      true,
    );
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noPrimieApiSubmission)).toBe(true);
  });

  it("confirme le flux Booking sans confirmation automatique", () => {
    expect(isConfirmedLegalFact(legalContent.bookingDataCollection.noAutomaticConfirmation)).toBe(
      true,
    );
    if (legalContent.bookingDataCollection.noAutomaticConfirmation.status === "confirmed") {
      expect(legalContent.bookingDataCollection.noAutomaticConfirmation.value).toBe(true);
    }
    expect(isConfirmedLegalFact(legalContent.commercialOperations.appointmentConfirmation)).toBe(
      true,
    );
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
    "app/cgv/page.tsx",
  ];

  it.each(legalRoutes)("n’existe pas : %s", (routePath) => {
    expect(existsSync(join(process.cwd(), routePath))).toBe(false);
  });

  it("n’ajoute aucun lien légal au Footer", () => {
    const footerSource = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    expect(footerSource).not.toMatch(/mentions-legales/i);
    expect(footerSource).not.toMatch(/confidentialite/i);
    expect(footerSource).not.toMatch(/\/cgv/i);
  });
});
