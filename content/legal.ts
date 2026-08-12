/**
 * Couche légale non publique — LEGAL-PAGES-01B.
 * Statuts `confirmed` / `pending_prisca` / `pending_verification` uniquement ;
 * aucune page légale ni lien Footer.
 */

import { siteConfig } from "./site-config";
import type {
  ConfirmedLegalFact,
  CookieConsentRuntimeVerdict,
  HostingCandidate,
  LegalFact,
  LegalFactSource,
  PendingLegalFact,
  PendingLegalRequestFrom,
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
  requestedFrom: Exclude<PendingLegalRequestFrom, "Prisca">,
): PendingLegalFact {
  return {
    status: "pending_verification",
    reason,
    requestedFrom,
    source: "pending",
  };
}

/** Candidat d’infrastructure — distinct de l’hébergeur légal confirmé. */
export const hostingCandidate: HostingCandidate = {
  provider: "Vercel",
  status: "candidate",
  confirmationCondition: "À confirmer uniquement après le déploiement réel du site de production.",
};

const termsScope: TermsScope = {
  status: "blocked_legal_scope",
  reason:
    "CGV non publiables tant que manquent : identité juridique complète, politique tarifaire (affichage public ou sur demande), règles d’annulation/report/absence, règles de livraison/retrait/retour et garanties des perruques, médiateur de la consommation réellement conventionné.",
};

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

export const legalContent = {
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
    legalStatus: pendingPrisca(
      "Statut juridique exact (micro-entreprise, EI, société, etc.) non confirmé.",
    ),
    siren: pendingPrisca("Numéro SIREN non fourni."),
    siret: pendingPrisca("Numéro SIRET non fourni."),
    registration: pendingPrisca("Mention d’immatriculation applicable (RCS/RNE/RM) non confirmée."),
    vatNumber: pendingPrisca("Régime de TVA et mention exacte applicable non confirmés."),
    publicProfessionalAddress: pendingVerification(
      "Adresse professionnelle ou de domiciliation publiable non autorisée pour le moment.",
      "CTO",
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
    publicationDirector: pendingVerification(
      "Identité exacte du directeur de publication non confirmée juridiquement.",
      "CTO",
    ),
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
    confirmedHost: pendingVerification(
      "Identité et coordonnées légales exactes de l’hébergeur applicables au contrat non confirmées — Vercel reste un candidat distinct et non publiable.",
      "deployment",
    ),
    hostLegalName: pendingVerification(
      "Raison sociale de l’hébergeur confirmé non disponible tant que l’hébergement de production n’est pas déployé.",
      "deployment",
    ),
    hostAddress: pendingVerification(
      "Adresse de l’hébergeur confirmé non disponible tant que l’hébergement de production n’est pas déployé.",
      "deployment",
    ),
    hostPhone: pendingVerification(
      "Téléphone de l’hébergeur confirmé non applicable tant que l’hébergeur n’est pas confirmé.",
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
      "Le prix est communiqué sur WhatsApp avant la prestation.",
      "po_confirmation",
    ),
    pricingDisplayPolicy: pendingPrisca(
      "Politique tarifaire d’affichage non tranchée : tarifs publics ou communiqués uniquement sur demande.",
    ),
    deposit: confirmed("Aucun acompte n’est demandé actuellement.", "po_confirmation"),
    paymentMethods: confirmed(
      {
        methods: ["espèces", "virement bancaire"] as const,
      },
      "po_confirmation",
    ),
    cancellationRescheduling: pendingPrisca(
      "Règles exactes d’annulation, de report et d’absence non confirmées.",
    ),
    travelFees: confirmed("Aucun frais de déplacement actuellement.", "po_confirmation"),
    separateWigSales: confirmed(
      "Les perruques peuvent être vendues seules, sans prestation. Les demandes et commandes passent par WhatsApp.",
      "po_confirmation",
    ),
    wigDeliveryWithdrawalReturns: pendingPrisca(
      "Règles exactes de livraison, retrait et retour des perruques non confirmées.",
    ),
    wigLegalGuarantees: pendingPrisca(
      "Garanties légales applicables aux ventes de perruques non formalisées pour publication.",
    ),
    contractConclusionPlace: pendingPrisca("Lieu de conclusion du contrat non confirmé."),
    distanceSelling: pendingPrisca("Périmètre vente à distance non confirmé."),
    delayAbsenceImpossibility: pendingPrisca(
      "Règles en cas de retard, absence ou impossibilité non confirmées.",
    ),
  },
  privacy: {
    dataController: pendingPrisca("Identité complète du responsable du traitement non confirmée."),
    rightsContact: pendingPrisca("Contact retenu pour l’exercice des droits RGPD non confirmé."),
    purposes: pendingPrisca("Finalités de traitement non formalisées pour publication."),
    concernedData: pendingPrisca(
      "Liste exhaustive des données concernées hors inventaire technique non confirmée.",
    ),
    legalBasis: pendingPrisca("Bases légales par finalité non confirmées."),
    mandatoryOptionalCharacter: pendingPrisca(
      "Caractère obligatoire ou facultatif des données non formalisé pour publication.",
    ),
    recipients: pendingPrisca(
      "Destinataires des données non formalisés pour publication (hors canal WhatsApp documenté techniquement).",
    ),
    retention: confirmed(
      "Les conversations WhatsApp sont conservées au maximum un mois par Prisca après la dernière interaction.",
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
      "Aucune transmission commerciale volontaire des coordonnées à des tiers. WhatsApp/Meta intervient uniquement lorsque l’utilisateur ouvre WhatsApp.",
      "po_confirmation",
    ),
    transferOutsideEu: pendingPrisca(
      "Transferts hors Union européenne non formalisés pour publication (WhatsApp/Meta à documenter sans inventer un rôle de sous-traitant).",
    ),
    rightsExerciseProcedure: pendingPrisca("Procédure d’exercice des droits non confirmée."),
    cnilComplaintRight: pendingPrisca(
      "Mention du droit de réclamation auprès de la CNIL — contact droits manquant.",
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
  cookieConsentRuntime,
  termsScope,
  hostingCandidate,
  technicalPrivacyInventory,
};

export type LegalContent = {
  readonly publisher: typeof legalContent.publisher;
  readonly hosting: typeof legalContent.hosting;
  readonly mediation: typeof legalContent.mediation;
  readonly commercialOperations: typeof legalContent.commercialOperations;
  readonly privacy: typeof legalContent.privacy;
  readonly bookingDataCollection: typeof legalContent.bookingDataCollection;
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
