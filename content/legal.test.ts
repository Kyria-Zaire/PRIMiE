import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  cookieConsentRuntime,
  getConfirmedLegalValue,
  isConfirmedLegalFact,
  isPendingLegalFact,
  legalContent,
  legalPagesLastUpdated,
} from "../content/legal";
import { siteConfig } from "../content/site-config";
import { getLegalReadiness } from "../lib/legal-readiness";

const PLACEHOLDER_PATTERNS = [
  /À compléter/i,
  /\ben attente\b/i,
  /\bXXX\b/,
  /\bTBD\b/,
  /\bTODO\b/,
  /000000000/,
  /example\.com/i,
  /placeholder/i,
];

describe("legalContent — LEGAL-PAGES-01C faits confirmés", () => {
  it("distingue les faits confirmés des faits en attente", () => {
    expect(isConfirmedLegalFact(legalContent.publisher.commercialName)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.phone)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.legalIdentity)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.legalStatus)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.publicProfessionalAddress)).toBe(true);
    expect(isConfirmedLegalFact(legalContent.publisher.publicationDirector)).toBe(true);
    expect(isPendingLegalFact(legalContent.publisher.siret)).toBe(true);
    expect(legalContent.publisher.siret.status).toBe("pending_verification");
  });

  it("empêche de lire une donnée pending comme confirmed", () => {
    const fact = legalContent.publisher.siret;
    expect(fact.status).toBe("pending_verification");
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

  it("confirme l’identité publique PO : Prisca Foani et statut micro-entrepreneur", () => {
    expect(getConfirmedLegalValue(legalContent.publisher.legalIdentity)).toBe("Prisca Foani");
    expect(getConfirmedLegalValue(legalContent.publisher.publicationDirector)).toBe("Prisca Foani");
    expect(getConfirmedLegalValue(legalContent.publisher.legalStatus)).toMatch(
      /relevant du régime micro-entrepreneur/i,
    );
    expect(getConfirmedLegalValue(legalContent.publisher.publicProfessionalAddress)).toEqual({
      street: "24 rue Docteur Thomas",
      postalCode: "02200",
      city: "Soissons",
      country: "France",
    });
  });

  it("conserve SIREN/SIRET en pending_verification sans valeur publiable", () => {
    expect(legalContent.publisher.siren.status).toBe("pending_verification");
    expect(legalContent.publisher.siret.status).toBe("pending_verification");
    expect(legalContent.publisher.registration.status).toBe("pending_verification");
    expect(legalContent.publisher.siren).not.toHaveProperty("value");
    expect(legalContent.publisher.siret).not.toHaveProperty("value");
  });

  it("conserve les champs administratifs manquants en pending", () => {
    expect(legalContent.publisher.vatNumber.status).toBe("pending_prisca");
    expect(legalContent.publisher.publicProfessionalEmail.status).toBe("pending_prisca");
    expect(legalContent.hosting.publicDomain.status).toBe("pending_verification");
    expect(legalContent.hosting.hostPhone.status).toBe("pending_verification");
    expect(legalContent.commercialOperations.cancellationRescheduling.status).toBe(
      "pending_prisca",
    );
    expect(legalContent.commercialOperations.delayAbsenceImpossibility.status).toBe(
      "pending_prisca",
    );
    expect(legalContent.commercialOperations.pricingDisplayPolicy.status).toBe("pending_prisca");
    expect(legalContent.commercialOperations.wigDeliveryWithdrawalReturns.status).toBe(
      "pending_prisca",
    );
    expect(legalContent.commercialOperations.wigLegalGuarantees.status).toBe("pending_prisca");
  });

  it("confirme l’hébergement Vercel avec sources officielles vérifiées", () => {
    expect(legalContent.hostingCandidate.provider).toBe("Vercel");
    expect(legalContent.hostingCandidate.status).toBe("candidate");
    expect(getConfirmedLegalValue(legalContent.hosting.hostLegalName)).toBe("Vercel Inc.");
    expect(getConfirmedLegalValue(legalContent.hosting.hostAddress)).toMatch(/Barranca/i);
    expect(isConfirmedLegalFact(legalContent.hosting.confirmedHost)).toBe(true);
    expect(isPendingLegalFact(legalContent.hosting.hostPhone)).toBe(true);
  });

  it("fixe le périmètre CGV à blocked_legal_scope", () => {
    expect(legalContent.termsScope.status).toBe("blocked_legal_scope");
    if (legalContent.termsScope.status === "blocked_legal_scope") {
      expect(legalContent.termsScope.reason).toMatch(/médiateur/i);
      expect(legalContent.termsScope.reason).toMatch(/prix|tarif/i);
      expect(legalContent.termsScope.reason).toMatch(/perruques/i);
    }
  });

  it("consolide les règles commerciales V1 confirmées sans inventer annulation ni CGV perruques", () => {
    expect(getConfirmedLegalValue(legalContent.commercialOperations.priceCommunication)).toMatch(
      /accepté avant la confirmation/i,
    );
    expect(legalContent.commercialOperations.cancellationRescheduling.status).toBe(
      "pending_prisca",
    );
    expect(getConfirmedLegalValue(legalContent.commercialOperations.deposit)).toMatch(
      /aucun acompte/i,
    );
    expect(
      getConfirmedLegalValue(legalContent.commercialOperations.paymentMethods)?.methods,
    ).toEqual(["espèces", "virement bancaire"]);
    expect(legalContent.readinessFlags.pricingDisplayReady).toBe(false);
    expect(legalContent.readinessFlags.wigSalesTermsReady).toBe(false);
  });

  it("consolide confidentialité PO (rétention, parcours, CNIL)", () => {
    expect(getConfirmedLegalValue(legalContent.privacy.dataController)).toBe("Prisca Foani");
    expect(getConfirmedLegalValue(legalContent.privacy.retention)).toMatch(/un mois/i);
    expect(getConfirmedLegalValue(legalContent.privacy.concernedData)).toEqual([
      "Nom",
      "Téléphone",
      "Prestation",
      "Date souhaitée",
      "Créneau souhaité",
    ]);
    expect(getConfirmedLegalValue(legalContent.privacy.cnilComplaintRight)?.url).toBe(
      "https://www.cnil.fr/fr/plaintes",
    );
    expect(getConfirmedLegalValue(legalContent.privacy.prospecting)).toBe(false);
    expect(getConfirmedLegalValue(legalContent.privacy.transferOutsideEu)).toMatch(
      /sous-traitant/i,
    );
  });

  it("confirme l’absence de médiateur choisi (bloque la publication légale)", () => {
    expect(legalContent.mediation.selectionStatus.status).toBe("confirmed");
    if (legalContent.mediation.selectionStatus.status === "confirmed") {
      expect(legalContent.mediation.selectionStatus.value).toBe("not_selected");
    }
    expect(isPendingLegalFact(legalContent.mediation.mediatorName)).toBe(true);
  });

  it("cartographie le flux Booking → WhatsApp sans qualifier Meta de sous-traitant", () => {
    const { technicalPrivacyInventory } = legalContent;
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noPrimieServerStorage)).toBe(true);
    expect(isConfirmedLegalFact(technicalPrivacyInventory.noBookingPersistenceAfterReload)).toBe(
      true,
    );
    if (technicalPrivacyInventory.whatsAppMetaOwnTermsApply.status === "confirmed") {
      expect(technicalPrivacyInventory.whatsAppMetaOwnTermsApply.value).toMatch(/sous-traitant/i);
    }
  });

  it("conserve le verdict cookies sans bandeau runtime", () => {
    expect(cookieConsentRuntime.currentRuntime).toBe("NO_CONSENT_BANNER_REQUIRED_CURRENT_RUNTIME");
    expect(getLegalReadiness().cookieConsentBannerRequired).toBe(false);
  });

  it("fixe la date de mise à jour centralisée", () => {
    expect(legalPagesLastUpdated).toBe("12 août 2026");
    expect(getConfirmedLegalValue(legalContent.legalPagesLastUpdated)).toBe(legalPagesLastUpdated);
  });

  it("ne stocke aucune donnée sensible ni email inventé", () => {
    const serialized = JSON.stringify(legalContent);
    expect(serialized).not.toMatch(/carte.?identit/i);
    expect(serialized).not.toMatch(/passport/i);
    expect(serialized).not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(serialized).not.toMatch(/SIRE[NT]\s*[:=]\s*["'][0-9]/i);
  });
});

describe("legalContent — routes 01C et Footer", () => {
  it("expose les routes mentions et confidentialité, pas /cgv", () => {
    expect(existsSync(join(process.cwd(), "app/mentions-legales/page.tsx"))).toBe(true);
    expect(existsSync(join(process.cwd(), "app/confidentialite/page.tsx"))).toBe(true);
    expect(existsSync(join(process.cwd(), "app/cgv/page.tsx"))).toBe(false);
    expect(existsSync(join(process.cwd(), "app/politique-de-confidentialite/page.tsx"))).toBe(
      false,
    );
    expect(legalContent.routesImplementation.legalNoticeRouteImplemented).toBe(true);
    expect(legalContent.routesImplementation.privacyNoticeRouteImplemented).toBe(true);
    expect(legalContent.routesImplementation.termsRouteImplemented).toBe(false);
  });

  it("ajoute uniquement Mentions légales et Confidentialité au Footer", () => {
    const footerSource = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    expect(footerSource).toMatch(/href="\/mentions-legales"/);
    expect(footerSource).toMatch(/href="\/confidentialite"/);
    expect(footerSource).not.toMatch(/\/cgv/i);
    expect(footerSource).not.toMatch(/médiateur/i);
    expect(footerSource).not.toMatch(/cookie/i);
  });

  it("n’ajoute aucune bannière cookies", () => {
    const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(layoutSource).not.toMatch(/cookie/i);
    expect(layoutSource).not.toMatch(/consent/i);
  });
});
