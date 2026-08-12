/**
 * Couche légale — LEGAL-PAGES-01C-R1.
 * Statuts `confirmed` / `pending_prisca` / `pending_verification`.
 * Les pages publiques n’affichent que des faits confirmés (jamais de mentions fictives).
 * SIREN/SIRET : `pending_verification` jusqu’à attestation officielle + Annuaire + Luhn.
 */

import { siteConfig } from "./site-config";
import type {
  ConfirmedLegalFact,
  CookieConsentRuntimeVerdict,
  HostingCandidate,
  LegalFact,
  LegalFactSource,
  LegalServiceProvider,
  PendingLegalFact,
  PendingLegalRequestFrom,
  PrivacyRightsContact,
  TechnicalPartner,
  TermsScope,
} from "./types";

function confirmed<T>(
  value: T,
  source: Exclude<LegalFactSource, "pending">,
  sourceDetail?: string,
): ConfirmedLegalFact<T> {
  return sourceDetail === undefined
    ? { status: "confirmed", value, source }
    : { status: "confirmed", value, source, sourceDetail };
}

function pendingPrisca(reason: string): PendingLegalFact {
  return {
    status: "pending_prisca",
    reason,
    requestedFrom: "Prisca",
    source: "pending",
  };
}

function pendingVerification(
  reason: string,
  requestedFrom: PendingLegalRequestFrom,
): PendingLegalFact {
  return {
    status: "pending_verification",
    reason,
    requestedFrom,
    source: "pending",
  };
}

/** Candidat d’infrastructure — téléphone hébergeur et domaine public restent à vérifier. */
export const hostingCandidate: HostingCandidate = {
  provider: "Vercel",
  status: "candidate",
  confirmationCondition:
    "Raison sociale et adresse publiques Vercel Inc. vérifiées ; téléphone hébergeur et domaine public final restent à confirmer.",
};

const termsScope: TermsScope = {
  status: "blocked_legal_scope",
  reason:
    "CGV non publiables tant que manquent : SIREN/SIRET, email, TVA, médiateur conventionné, catalogue de prix détaillé et conditions complètes de vente des perruques.",
};

/** Date de mise à jour des pages légales partielles (01C). */
export const legalPagesLastUpdated = "12 août 2026";

const partnerContactEmail = "imoria.co@gmail.com" as const;

const privacyRightsMandateLabel =
  "Contact pour l'exercice de vos droits, mandaté pour Chez PRiMiE Coiffure" as const;

const privacyRightsTransferNotice =
  "Les informations transmises à cette adresse sont reçues pour le compte de Chez PRiMiE Coiffure et communiquées à Prisca Foani, responsable du traitement, afin de traiter votre demande." as const;

export const VERCEL_HOST_PUBLIC = {
  legalName: "Vercel Inc.",
  address: "440 N Barranca Avenue #4133, Covina, CA 91723, United States",
  sourceUrl: "https://vercel.com/legal/privacy-notice",
} as const;

/**
 * Cartographie technique du flux Booking → WhatsApp.
 * Ne qualifie pas Meta de sous-traitant de Prisca.
 */
const technicalPrivacyInventory = {
  bookingLocalInput: confirmed(
    "Saisie locale dans le widget BookingRequestWidget (état React client) : nom, téléphone, prestation, date et créneau.",
    "runtime_audit",
    "components/booking/booking-request-widget.tsx",
  ),
  browserMemoryOnlyBeforeClick: confirmed(
    "Les données restent dans la mémoire du navigateur tant que l’utilisateur n’a pas cliqué pour ouvrir WhatsApp.",
    "runtime_audit",
    "components/booking/booking-request-widget.tsx",
  ),
  whatsAppMessageClientGeneration: confirmed(
    "Génération du message WhatsApp côté client via buildBookingWhatsAppMessage, puis URL via buildWhatsAppUrl.",
    "runtime_audit",
    "lib/booking/message.ts",
  ),
  noPrimieRequestBeforeClick: confirmed(
    "Aucune requête n’est envoyée au serveur PRiMiE avant le clic explicite vers WhatsApp.",
    "runtime_audit",
    "components/booking/booking-request-widget.tsx — absence de fetch/API route booking",
  ),
  whatsAppNavigationAfterExplicitAction: confirmed(
    "Lors du clic, l’utilisateur quitte le site vers WhatsApp (window.location.assign sur l’URL wa.me).",
    "runtime_audit",
    "components/booking/booking-request-widget.tsx",
  ),
  whatsAppMetaOwnTermsApply: confirmed(
    "WhatsApp/Meta intervient lors de l’utilisation de WhatsApp et applique alors ses propres conditions et traitements. Meta n’est pas qualifiée de sous-traitant de Prisca sans preuve contractuelle.",
    "po_confirmation",
  ),
  noPrimieApiSubmission: confirmed(
    "Aucune soumission vers une API PRiMiE lors de la demande de rendez-vous.",
    "runtime_audit",
    "components/booking/booking-request-widget.tsx — absence de fetch/API route booking",
  ),
  noPrimieServerStorage: confirmed(
    "Aucun stockage serveur PRiMiE des données saisies dans le widget Booking.",
    "runtime_audit",
  ),
  noDatabase: confirmed("Aucune base de données dans le périmètre V1.", "runtime_audit"),
  noNonEssentialAnalyticsDemonstrated: confirmed(
    "Aucun analytics, pixel marketing ou outil publicitaire actuellement dans le runtime applicatif.",
    "po_confirmation",
  ),
  noBookingPersistenceAfterReload: confirmed(
    "Aucune persistance Booking après rechargement (pas de localStorage ni sessionStorage).",
    "runtime_audit",
    "components/booking/booking-request-widget.test.tsx",
  ),
  noSecondaryMarketingUseCurrently: confirmed(
    "Aucun usage marketing secondaire des données de demande n’est autorisé actuellement.",
    "po_confirmation",
  ),
} as const;

/** Verdict cookies — pas de bandeau tant que le runtime reste sans traceur non essentiel. */
export const cookieConsentRuntime: CookieConsentRuntimeVerdict = {
  currentRuntime: "NO_CONSENT_BANNER_REQUIRED_CURRENT_RUNTIME",
  productionDomainReauditRequired: true,
};

/** Séparation explicite Prisca (prestations / RT / publication) ↔ partenaire technique. */
export const legalActors = {
  serviceProvider: {
    legalIdentity: confirmed("Prisca Foani", "po_confirmation"),
    role: confirmed("Exploitante et prestataire des services de coiffure", "po_confirmation"),
    commercialName: confirmed(
      siteConfig.brand.commercialName,
      "site_config",
      "content/site-config.ts — brand.commercialName",
    ),
  } satisfies LegalServiceProvider,
  publicationDirector: confirmed("Prisca Foani", "po_confirmation"),
  dataController: confirmed("Prisca Foani", "po_confirmation"),
  technicalPartner: {
    displayName: confirmed("Partenaire technique et administratif", "po_confirmation"),
    operationalRole: confirmed("technical_administrative_partner", "po_confirmation"),
    identityStatus: "pending_verification",
    relationshipStatus: "confirmed",
    gdprRole: "pending_qualification",
    gdprRoleStatus: "pending_verification",
    commercialContractingParty: confirmed(false, "po_confirmation"),
  } satisfies TechnicalPartner,
  privacyRightsContact: {
    email: confirmed(partnerContactEmail, "po_confirmation"),
    mandateLabel: confirmed(privacyRightsMandateLabel, "po_confirmation"),
    transferNotice: confirmed(privacyRightsTransferNotice, "po_confirmation"),
  } satisfies PrivacyRightsContact,
} as const;

export const legalContent = {
  actors: legalActors,
  publisher: {
    legalIdentity: confirmed("Prisca Foani", "po_confirmation"),
    commercialName: confirmed(
      siteConfig.brand.commercialName,
      "site_config",
      "content/site-config.ts — brand.commercialName",
    ),
    shortBrandName: confirmed(
      siteConfig.brand.shortName,
      "site_config",
      "content/site-config.ts — brand.shortName",
    ),
    legalStatus: confirmed(
      "Entrepreneure individuelle relevant du régime micro-entrepreneur",
      "po_confirmation",
    ),
    siren: pendingVerification(
      "SIREN non vérifié — copie exacte depuis attestation INSEE/INPI/URSSAF puis contrôle Annuaire des entreprises et Luhn requis avant confirmed.",
      "Prisca",
    ),
    siret: pendingVerification(
      "SIRET non vérifié — copie exacte depuis attestation INSEE/INPI/URSSAF puis contrôle Annuaire des entreprises et Luhn requis avant confirmed. Aucun candidat invalide n’est conservé.",
      "Prisca",
    ),
    registration: pendingVerification(
      "Registre d’immatriculation exact (RNE/RM) non vérifié.",
      "Prisca",
    ),
    vatNumber: pendingPrisca(
      "Régime de TVA exact et numéro de TVA intracommunautaire éventuel non confirmés. L’absence de facture ne prouve pas le régime de TVA.",
    ),
    publicProfessionalAddress: confirmed(
      {
        street: "24 rue Docteur Thomas",
        postalCode: "02200",
        city: "Soissons",
        country: "France",
      },
      "po_confirmation",
    ),
    publicProfessionalEmail: pendingPrisca("Email professionnel public non confirmé."),
    phone: confirmed(
      {
        display: siteConfig.contact.phoneDisplay,
        e164: siteConfig.contact.phoneE164,
      },
      "site_config",
      "content/site-config.ts — contact.phoneDisplay / phoneE164",
    ),
    publicationDirector: confirmed("Prisca Foani", "po_confirmation"),
    publicOwnerFirstName: confirmed(
      siteConfig.brand.owner,
      "site_config",
      "content/site-config.ts — brand.owner",
    ),
    activity: confirmed(
      siteConfig.brand.activity,
      "site_config",
      "content/site-config.ts — brand.activity",
    ),
  },
  hosting: {
    publicDomain: pendingVerification("Nom de domaine public final non confirmé.", "deployment"),
    confirmedHost: confirmed("Vercel Inc. — hébergement technique du site", "po_confirmation"),
    hostLegalName: confirmed(
      VERCEL_HOST_PUBLIC.legalName,
      "official_source",
      VERCEL_HOST_PUBLIC.sourceUrl,
    ),
    hostAddress: confirmed(
      VERCEL_HOST_PUBLIC.address,
      "official_source",
      VERCEL_HOST_PUBLIC.sourceUrl,
    ),
    hostPhone: pendingVerification(
      "Téléphone de l’hébergeur non publié dans les sources officielles Vercel vérifiées — non inventé.",
      "deployment",
    ),
  },
  mediation: {
    membershipOrConvention: pendingPrisca(
      "Adhésion ou convention de médiation de la consommation non confirmée — aucun médiateur ne doit être inventé.",
    ),
    selectionStatus: confirmed("not_selected" as const, "po_confirmation"),
    mediatorName: pendingPrisca(
      "Médiateur de la consommation réellement choisi et conventionné non sélectionné.",
    ),
    mediatorAddress: pendingPrisca("Adresse du médiateur non confirmée."),
    mediatorUrl: pendingPrisca("URL du médiateur non confirmée."),
    referralProcedure: pendingPrisca("Modalités de saisine du médiateur non confirmées."),
  },
  commercialOperations: {
    appointmentConfirmation: confirmed(
      "Le rendez-vous reste une demande soumise à confirmation par Prisca sur WhatsApp — la demande WhatsApp n’est pas une confirmation automatique.",
      "po_confirmation",
    ),
    quoteProcess: confirmed(
      "Aucun devis automatisé n’est envoyé par le site actuellement.",
      "po_confirmation",
    ),
    priceCommunication: confirmed(
      "Le tarif applicable est communiqué à la cliente et accepté avant la confirmation définitive du rendez-vous.",
      "po_confirmation",
    ),
    pricingDisplayPolicy: pendingPrisca(
      "Catalogue de prix détaillé non validé — pricingDisplayReady reste false.",
    ),
    deposit: confirmed("Aucun acompte n’est demandé actuellement.", "po_confirmation"),
    paymentMethods: confirmed(
      {
        methods: ["espèces", "virement bancaire"] as const,
      },
      "po_confirmation",
    ),
    cancellationRescheduling: pendingPrisca(
      "Politique d’annulation, de report et d’absence non confirmée — aucune pénalité inventée.",
    ),
    travelFees: confirmed("Aucun frais de déplacement actuellement.", "po_confirmation"),
    separateWigSales: confirmed(
      "Les perruques peuvent faire l’objet d’une demande sur WhatsApp. Le site ne comporte ni panier, ni paiement en ligne, ni commande automatique.",
      "po_confirmation",
    ),
    wigDeliveryWithdrawalReturns: pendingPrisca(
      "Conditions de livraison, retrait et retour des perruques non confirmées — wigSalesTermsReady reste false.",
    ),
    wigLegalGuarantees: pendingPrisca(
      "Garanties commerciales éventuelles non confirmées — les garanties légales applicables ne sont jamais écartées.",
    ),
    contractConclusionPlace: pendingPrisca("Lieu de conclusion du contrat non confirmé."),
    distanceSelling: pendingPrisca("Périmètre vente à distance non confirmé."),
    delayAbsenceImpossibility: pendingPrisca(
      "Règles en cas de retard, absence ou impossibilité non confirmées — aucune pénalité inventée.",
    ),
  },
  privacy: {
    dataController: confirmed("Prisca Foani", "po_confirmation"),
    rightsContact: confirmed(
      {
        phoneDisplay: siteConfig.contact.phoneDisplay,
        phoneE164: siteConfig.contact.phoneE164,
        whatsappUrl: siteConfig.contact.whatsappUrl,
      },
      "po_confirmation",
    ),
    purposes: confirmed(
      [
        "Répondre à la demande de contact ou de rendez-vous",
        "Organiser et confirmer le rendez-vous",
        "Assurer les échanges nécessaires à la prestation",
      ] as const,
      "po_confirmation",
    ),
    concernedData: confirmed(
      ["Nom", "Téléphone", "Prestation", "Date souhaitée", "Créneau souhaité"] as const,
      "po_confirmation",
    ),
    legalBasis: confirmed(
      [
        "Mesures précontractuelles demandées par la personne",
        "Exécution de la relation lorsqu’un rendez-vous est confirmé",
      ] as const,
      "po_confirmation",
    ),
    mandatoryOptionalCharacter: confirmed(
      "Les champs du module de demande sont nécessaires pour transmettre la demande à Prisca via WhatsApp.",
      "po_confirmation",
    ),
    recipients: confirmed(
      [
        "Prisca Foani",
        "WhatsApp/Meta après activation volontaire du lien par la personne",
      ] as const,
      "po_confirmation",
    ),
    retention: confirmed(
      "Les échanges opérationnels conservés par Prisca le sont au maximum un mois, sauf obligation légale distincte.",
      "po_confirmation",
    ),
    prospecting: confirmed(false, "po_confirmation"),
    marketingConsentMechanism: pendingVerification(
      "Mécanisme de consentement promotionnel non défini — aucun usage marketing secondaire actuellement.",
      "CTO",
    ),
    marketingOptOutMechanism: pendingVerification(
      "Mécanisme de refus/désinscription promotionnel non défini — aucun usage marketing secondaire actuellement.",
      "CTO",
    ),
    marketingInformationNotice: pendingVerification(
      "Texte d’information promotionnelle associé non validé — aucun usage marketing secondaire actuellement.",
      "CTO",
    ),
    thirdPartySharing: confirmed(
      "Aucune transmission commerciale volontaire des coordonnées à des tiers. WhatsApp/Meta intervient uniquement lorsque la personne active le CTA WhatsApp.",
      "po_confirmation",
    ),
    transferOutsideEu: confirmed(
      "Lors de l’utilisation de WhatsApp, des traitements peuvent être réalisés par WhatsApp/Meta selon leurs propres conditions, éventuellement hors Union européenne. WhatsApp/Meta n’est pas présentée comme sous-traitant de PRiMiE sans preuve contractuelle.",
      "po_confirmation",
    ),
    rightsExerciseProcedure: confirmed(
      "Pour exercer vos droits, contactez Prisca par téléphone ou WhatsApp (sans message prérempli obligatoire).",
      "po_confirmation",
    ),
    cnilComplaintRight: confirmed(
      {
        label: "Vous pouvez introduire une réclamation auprès de la CNIL.",
        url: "https://www.cnil.fr/fr/plaintes",
      },
      "official_source",
      "https://www.cnil.fr/fr/plaintes",
    ),
  },
  bookingDataCollection: {
    collectedFields: confirmed(
      ["name", "phone", "service", "preferredDate", "preferredTimeSlot"] as const,
      "runtime_audit",
      "lib/booking/message.ts — buildBookingWhatsAppMessage",
    ),
    transmissionChannel: confirmed(
      "Transmission à WhatsApp uniquement après action explicite de l’utilisateur.",
      "runtime_audit",
      "components/booking/booking-request-widget.tsx",
    ),
    noAutomaticConfirmation: confirmed(true, "po_confirmation"),
    noOnlinePayment: confirmed(true, "runtime_audit"),
    noOnlineOrder: confirmed(true, "runtime_audit"),
    noClientAccount: confirmed(true, "runtime_audit"),
  },
  routesImplementation: {
    legalNoticeRouteImplemented: true,
    privacyNoticeRouteImplemented: true,
    termsRouteImplemented: false,
  },
  readinessFlags: {
    pricingDisplayReady: false,
    wigSalesTermsReady: false,
    protectedStagingReady: true,
    partnerRelationshipConfirmed: true,
    partnerEmailReady: true,
    partnerIdentityVerified: false,
    partnerSiretOfficiallyVerified: false,
    partnerGdprRoleQualified: false,
    privacyRightsContactReady: true,
    serviceProviderBusinessIdentityReady: false,
  },
  legalPagesLastUpdated: confirmed(legalPagesLastUpdated, "po_confirmation"),
  cookieConsentRuntime,
  termsScope,
  hostingCandidate,
  technicalPrivacyInventory,
};

export type LegalContent = {
  readonly actors: typeof legalContent.actors;
  readonly publisher: typeof legalContent.publisher;
  readonly hosting: typeof legalContent.hosting;
  readonly mediation: typeof legalContent.mediation;
  readonly commercialOperations: typeof legalContent.commercialOperations;
  readonly privacy: typeof legalContent.privacy;
  readonly bookingDataCollection: typeof legalContent.bookingDataCollection;
  readonly routesImplementation: typeof legalContent.routesImplementation;
  readonly readinessFlags: typeof legalContent.readinessFlags;
  readonly legalPagesLastUpdated: typeof legalContent.legalPagesLastUpdated;
  readonly cookieConsentRuntime: CookieConsentRuntimeVerdict;
  readonly termsScope: TermsScope;
  readonly hostingCandidate: HostingCandidate;
  readonly technicalPrivacyInventory: typeof legalContent.technicalPrivacyInventory;
};

export type LegalFactField = LegalFact<unknown>;

export function isConfirmedLegalFact<T>(fact: LegalFact<T>): fact is ConfirmedLegalFact<T> {
  return fact.status === "confirmed";
}

export function isPendingLegalFact(fact: LegalFact<unknown>): fact is PendingLegalFact {
  return fact.status === "pending_prisca" || fact.status === "pending_verification";
}

/** Expose uniquement une valeur confirmée — jamais un pending. */
export function getConfirmedLegalValue<T>(fact: LegalFact<T>): T | undefined {
  return isConfirmedLegalFact(fact) ? fact.value : undefined;
}
