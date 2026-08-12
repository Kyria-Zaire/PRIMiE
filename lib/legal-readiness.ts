/**
 * Readiness et garde anti-publication — LEGAL-PAGES-01C.
 * Distingue routesImplemented / contentComplete / publicLaunchReady.
 * Une route existante ne satisfait pas le gate légal de contenu.
 */

import {
  cookieConsentRuntime,
  isConfirmedLegalFact,
  legalContent,
  type LegalContent,
} from "@/content/legal";
import type { LegalFact, TermsScope } from "@/content/types";

type LegalFactResolver = {
  readonly path: string;
  readonly resolve: (content: LegalContent) => LegalFact<unknown>;
};

export type LegalReadiness = {
  /** Routes HTTP implémentées (existence ≠ contenu complet). */
  readonly legalNoticeRouteImplemented: boolean;
  readonly privacyNoticeRouteImplemented: boolean;
  readonly termsRouteImplemented: boolean;
  readonly routesImplemented: boolean;
  /** Contenu administratif / commercial complet pour publication. */
  readonly contentComplete: boolean;
  readonly legalNoticeReady: boolean;
  readonly privacyNoticeReady: boolean;
  readonly termsScopeReady: boolean;
  readonly mediatorReady: boolean;
  readonly pricingDisplayReady: boolean;
  readonly wigSalesTermsReady: boolean;
  /** Gates de contenu + routes : faux tant que le contenu légal n’est pas complet. */
  readonly legalRoutesReady: boolean;
  /** Alias historique : contenu prêt pour routes publiques complètes. */
  readonly publicRoutesReady: boolean;
  /** Toujours false tant que LEGAL GATES / PUBLIC LAUNCH restent fermés. */
  readonly publicLaunchReady: boolean;
  readonly protectedStagingReady: boolean;
  readonly cookieConsentBannerRequired: boolean;
  readonly productionDomainCookieReauditRequired: boolean;
  readonly partnerRelationshipConfirmed: boolean;
  readonly partnerEmailReady: boolean;
  readonly partnerIdentityVerified: boolean;
  readonly partnerSiretOfficiallyVerified: boolean;
  readonly partnerGdprRoleQualified: boolean;
  readonly privacyRightsContactReady: boolean;
  readonly serviceProviderBusinessIdentityReady: boolean;
  readonly missingFields: readonly string[];
};

export type PublishableLegalContent = {
  readonly publisher: {
    readonly commercialName: string;
    readonly shortBrandName: string;
    readonly phone: { readonly display: string; readonly e164: string };
    readonly publicOwnerFirstName: string;
    readonly activity: string;
    readonly legalIdentity: string;
  };
  readonly bookingDataCollection: LegalContent["bookingDataCollection"];
  readonly technicalPrivacyInventory: LegalContent["technicalPrivacyInventory"];
  readonly cookieConsentRuntime: LegalContent["cookieConsentRuntime"];
};

export type PublishableLegalResult =
  | { readonly status: "not_ready"; readonly blockingFields: readonly string[] }
  | { readonly status: "ready"; readonly content: PublishableLegalContent };

const LEGAL_NOTICE_REQUIRED: readonly LegalFactResolver[] = [
  { path: "publisher.legalIdentity", resolve: (c) => c.publisher.legalIdentity },
  { path: "publisher.commercialName", resolve: (c) => c.publisher.commercialName },
  { path: "publisher.legalStatus", resolve: (c) => c.publisher.legalStatus },
  { path: "publisher.siren", resolve: (c) => c.publisher.siren },
  { path: "publisher.siret", resolve: (c) => c.publisher.siret },
  { path: "publisher.registration", resolve: (c) => c.publisher.registration },
  { path: "publisher.vatNumber", resolve: (c) => c.publisher.vatNumber },
  {
    path: "publisher.publicProfessionalAddress",
    resolve: (c) => c.publisher.publicProfessionalAddress,
  },
  {
    path: "publisher.publicProfessionalEmail",
    resolve: (c) => c.publisher.publicProfessionalEmail,
  },
  { path: "publisher.phone", resolve: (c) => c.publisher.phone },
  {
    path: "publisher.publicationDirector",
    resolve: (c) => c.publisher.publicationDirector,
  },
  { path: "hosting.publicDomain", resolve: (c) => c.hosting.publicDomain },
  { path: "hosting.confirmedHost", resolve: (c) => c.hosting.confirmedHost },
  { path: "hosting.hostLegalName", resolve: (c) => c.hosting.hostLegalName },
  { path: "hosting.hostAddress", resolve: (c) => c.hosting.hostAddress },
  { path: "hosting.hostPhone", resolve: (c) => c.hosting.hostPhone },
  { path: "mediation.membershipOrConvention", resolve: (c) => c.mediation.membershipOrConvention },
  { path: "mediation.mediatorName", resolve: (c) => c.mediation.mediatorName },
  { path: "mediation.mediatorAddress", resolve: (c) => c.mediation.mediatorAddress },
  { path: "mediation.mediatorUrl", resolve: (c) => c.mediation.mediatorUrl },
  { path: "mediation.referralProcedure", resolve: (c) => c.mediation.referralProcedure },
];

const PRIVACY_NOTICE_REQUIRED: readonly LegalFactResolver[] = [
  { path: "privacy.dataController", resolve: (c) => c.privacy.dataController },
  { path: "privacy.rightsContact", resolve: (c) => c.privacy.rightsContact },
  {
    path: "publisher.publicProfessionalEmail",
    resolve: (c) => c.publisher.publicProfessionalEmail,
  },
  { path: "privacy.purposes", resolve: (c) => c.privacy.purposes },
  { path: "privacy.concernedData", resolve: (c) => c.privacy.concernedData },
  { path: "privacy.legalBasis", resolve: (c) => c.privacy.legalBasis },
  {
    path: "privacy.mandatoryOptionalCharacter",
    resolve: (c) => c.privacy.mandatoryOptionalCharacter,
  },
  {
    path: "privacy.marketingConsentMechanism",
    resolve: (c) => c.privacy.marketingConsentMechanism,
  },
  {
    path: "privacy.marketingOptOutMechanism",
    resolve: (c) => c.privacy.marketingOptOutMechanism,
  },
  {
    path: "privacy.marketingInformationNotice",
    resolve: (c) => c.privacy.marketingInformationNotice,
  },
  { path: "privacy.recipients", resolve: (c) => c.privacy.recipients },
  { path: "privacy.retention", resolve: (c) => c.privacy.retention },
  { path: "privacy.prospecting", resolve: (c) => c.privacy.prospecting },
  { path: "privacy.thirdPartySharing", resolve: (c) => c.privacy.thirdPartySharing },
  { path: "privacy.transferOutsideEu", resolve: (c) => c.privacy.transferOutsideEu },
  {
    path: "privacy.rightsExerciseProcedure",
    resolve: (c) => c.privacy.rightsExerciseProcedure,
  },
  { path: "privacy.cnilComplaintRight", resolve: (c) => c.privacy.cnilComplaintRight },
];

const TERMS_SCOPE_COMMERCIAL_REQUIRED: readonly LegalFactResolver[] = [
  {
    path: "commercialOperations.quoteProcess",
    resolve: (c) => c.commercialOperations.quoteProcess,
  },
  {
    path: "commercialOperations.priceCommunication",
    resolve: (c) => c.commercialOperations.priceCommunication,
  },
  {
    path: "commercialOperations.pricingDisplayPolicy",
    resolve: (c) => c.commercialOperations.pricingDisplayPolicy,
  },
  { path: "commercialOperations.deposit", resolve: (c) => c.commercialOperations.deposit },
  {
    path: "commercialOperations.paymentMethods",
    resolve: (c) => c.commercialOperations.paymentMethods,
  },
  {
    path: "commercialOperations.cancellationRescheduling",
    resolve: (c) => c.commercialOperations.cancellationRescheduling,
  },
  { path: "commercialOperations.travelFees", resolve: (c) => c.commercialOperations.travelFees },
  {
    path: "commercialOperations.separateWigSales",
    resolve: (c) => c.commercialOperations.separateWigSales,
  },
  {
    path: "commercialOperations.wigDeliveryWithdrawalReturns",
    resolve: (c) => c.commercialOperations.wigDeliveryWithdrawalReturns,
  },
  {
    path: "commercialOperations.wigLegalGuarantees",
    resolve: (c) => c.commercialOperations.wigLegalGuarantees,
  },
  {
    path: "commercialOperations.contractConclusionPlace",
    resolve: (c) => c.commercialOperations.contractConclusionPlace,
  },
  {
    path: "commercialOperations.distanceSelling",
    resolve: (c) => c.commercialOperations.distanceSelling,
  },
  {
    path: "commercialOperations.delayAbsenceImpossibility",
    resolve: (c) => c.commercialOperations.delayAbsenceImpossibility,
  },
];

function collectMissingFields(
  content: LegalContent,
  fields: readonly LegalFactResolver[],
): string[] {
  return fields
    .filter(({ resolve }) => !isConfirmedLegalFact(resolve(content)))
    .map(({ path }) => path);
}

function isTermsScopeReady(termsScope: TermsScope, content: LegalContent): boolean {
  switch (termsScope.status) {
    case "blocked_legal_scope":
      return false;
    case "not_required_for_current_scope":
      return true;
    case "required":
      return collectMissingFields(content, TERMS_SCOPE_COMMERCIAL_REQUIRED).length === 0;
  }
}

function getTermsScopeMissing(content: LegalContent): string[] {
  const status: TermsScope["status"] = content.termsScope.status;

  if (status === "required") {
    return collectMissingFields(content, TERMS_SCOPE_COMMERCIAL_REQUIRED);
  }

  if (status === "blocked_legal_scope") {
    return ["termsScope"];
  }

  return [];
}

function getMediationSelectionStatusMissing(content: LegalContent): string[] {
  const selection = content.mediation.selectionStatus;

  if (selection.status === "confirmed" && selection.value === "not_selected") {
    return ["mediation.selectionStatus"];
  }

  return [];
}

function isMediatorReady(content: LegalContent): boolean {
  return (
    getMediationSelectionStatusMissing(content).length === 0 &&
    isConfirmedLegalFact(content.mediation.membershipOrConvention) &&
    isConfirmedLegalFact(content.mediation.mediatorName) &&
    isConfirmedLegalFact(content.mediation.mediatorAddress) &&
    isConfirmedLegalFact(content.mediation.mediatorUrl) &&
    isConfirmedLegalFact(content.mediation.referralProcedure)
  );
}

export function getLegalReadiness(content: LegalContent = legalContent): LegalReadiness {
  const legalNoticeMissing = collectMissingFields(content, LEGAL_NOTICE_REQUIRED);
  const mediationSelectionStatusMissing = getMediationSelectionStatusMissing(content);
  const privacyMissing = collectMissingFields(content, PRIVACY_NOTICE_REQUIRED);
  const termsMissing = getTermsScopeMissing(content);
  const termsScope: TermsScope = content.termsScope;

  const missingFields = [
    ...new Set([
      ...legalNoticeMissing,
      ...mediationSelectionStatusMissing,
      ...privacyMissing,
      ...termsMissing,
    ]),
  ];

  const legalNoticeReady =
    !missingFields.includes("mediation.selectionStatus") && legalNoticeMissing.length === 0;
  const privacyNoticeReady = privacyMissing.length === 0;
  const termsScopeReady = isTermsScopeReady(termsScope, content);
  const mediatorReady = isMediatorReady(content);
  const pricingDisplayReady = content.readinessFlags.pricingDisplayReady;
  const wigSalesTermsReady = content.readinessFlags.wigSalesTermsReady;
  const partnerRelationshipConfirmed = content.readinessFlags.partnerRelationshipConfirmed;
  const partnerEmailReady = content.readinessFlags.partnerEmailReady;
  const partnerIdentityVerified =
    content.readinessFlags.partnerIdentityVerified &&
    content.actors.technicalPartner.identityStatus !== "pending_verification";
  const partnerSiretOfficiallyVerified = content.readinessFlags.partnerSiretOfficiallyVerified;
  const partnerGdprRoleQualified =
    content.readinessFlags.partnerGdprRoleQualified &&
    content.actors.technicalPartner.gdprRole !== "pending_qualification" &&
    content.actors.technicalPartner.gdprRoleStatus !== "pending_verification";
  const privacyRightsContactReady =
    content.readinessFlags.privacyRightsContactReady &&
    isConfirmedLegalFact(content.actors.privacyRightsContact.email) &&
    isConfirmedLegalFact(content.actors.privacyRightsContact.mandateLabel) &&
    isConfirmedLegalFact(content.actors.privacyRightsContact.transferNotice);
  const serviceProviderBusinessIdentityReady =
    content.readinessFlags.serviceProviderBusinessIdentityReady;

  const legalNoticeRouteImplemented = content.routesImplementation.legalNoticeRouteImplemented;
  const privacyNoticeRouteImplemented = content.routesImplementation.privacyNoticeRouteImplemented;
  const termsRouteImplemented = content.routesImplementation.termsRouteImplemented;
  const routesImplemented = legalNoticeRouteImplemented && privacyNoticeRouteImplemented;

  const contentComplete = legalNoticeReady && privacyNoticeReady && termsScopeReady;
  const legalRoutesReady = routesImplemented && contentComplete;
  const publicRoutesReady = contentComplete;

  return {
    legalNoticeRouteImplemented,
    privacyNoticeRouteImplemented,
    termsRouteImplemented,
    routesImplemented,
    contentComplete,
    legalNoticeReady,
    privacyNoticeReady,
    termsScopeReady,
    mediatorReady,
    pricingDisplayReady,
    wigSalesTermsReady,
    legalRoutesReady,
    publicRoutesReady,
    publicLaunchReady: false,
    protectedStagingReady: content.readinessFlags.protectedStagingReady,
    cookieConsentBannerRequired: false,
    productionDomainCookieReauditRequired: cookieConsentRuntime.productionDomainReauditRequired,
    partnerRelationshipConfirmed,
    partnerEmailReady,
    partnerIdentityVerified,
    partnerSiretOfficiallyVerified,
    partnerGdprRoleQualified,
    privacyRightsContactReady,
    serviceProviderBusinessIdentityReady,
    missingFields,
  };
}

function extractPublishableConfirmed(content: LegalContent): PublishableLegalContent {
  const { publisher } = content;

  if (
    !isConfirmedLegalFact(publisher.commercialName) ||
    !isConfirmedLegalFact(publisher.shortBrandName) ||
    !isConfirmedLegalFact(publisher.phone) ||
    !isConfirmedLegalFact(publisher.publicOwnerFirstName) ||
    !isConfirmedLegalFact(publisher.activity) ||
    !isConfirmedLegalFact(publisher.legalIdentity)
  ) {
    throw new Error("extractPublishableConfirmed called with incomplete confirmed publisher facts");
  }

  return {
    publisher: {
      commercialName: publisher.commercialName.value,
      shortBrandName: publisher.shortBrandName.value,
      phone: publisher.phone.value,
      publicOwnerFirstName: publisher.publicOwnerFirstName.value,
      activity: publisher.activity.value,
      legalIdentity: publisher.legalIdentity.value,
    },
    bookingDataCollection: content.bookingDataCollection,
    technicalPrivacyInventory: content.technicalPrivacyInventory,
    cookieConsentRuntime: content.cookieConsentRuntime,
  };
}

export function getPublishableLegalContent(
  content: LegalContent = legalContent,
): PublishableLegalResult {
  const readiness = getLegalReadiness(content);

  if (!readiness.publicRoutesReady) {
    return { status: "not_ready", blockingFields: readiness.missingFields };
  }

  return {
    status: "ready",
    content: extractPublishableConfirmed(content),
  };
}

/** Identité légale complète — distincte du prénom public. */
export function isLegalIdentityComplete(content: LegalContent = legalContent): boolean {
  return (
    isConfirmedLegalFact(content.publisher.legalIdentity) &&
    isConfirmedLegalFact(content.publisher.legalStatus) &&
    isConfirmedLegalFact(content.publisher.siren) &&
    isConfirmedLegalFact(content.publisher.siret) &&
    isConfirmedLegalFact(content.publisher.registration) &&
    isConfirmedLegalFact(content.publisher.vatNumber)
  );
}

/**
 * Hébergement encore partiel (téléphone / domaine) — le candidat reste non
 * « complet » même si raison sociale et adresse publiques sont confirmées.
 */
export function isHostingCandidatePublishable(content: LegalContent = legalContent): boolean {
  return content.hostingCandidate.status === "candidate";
}
