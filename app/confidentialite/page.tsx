import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";
import { getConfirmedLegalValue, legalContent, legalPagesLastUpdated } from "@/content/legal";
import { siteConfig } from "@/content/site-config";
import { getLegalReadiness } from "@/lib/legal-readiness";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const readiness = getLegalReadiness();
const plainWhatsAppUrl = buildWhatsAppUrl();

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Chez PRiMiE Coiffure — traitement des demandes de rendez-vous via WhatsApp.",
  robots: readiness.privacyNoticeReady
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export default function ConfidentialitePage() {
  const { privacy } = legalContent;

  const dataController = getConfirmedLegalValue(privacy.dataController);
  const concernedData = getConfirmedLegalValue(privacy.concernedData);
  const purposes = getConfirmedLegalValue(privacy.purposes);
  const legalBasis = getConfirmedLegalValue(privacy.legalBasis);
  const recipients = getConfirmedLegalValue(privacy.recipients);
  const retention = getConfirmedLegalValue(privacy.retention);
  const transferOutsideEu = getConfirmedLegalValue(privacy.transferOutsideEu);
  const rightsExercise = getConfirmedLegalValue(privacy.rightsExerciseProcedure);
  const cnil = getConfirmedLegalValue(privacy.cnilComplaintRight);
  const rightsContact = getConfirmedLegalValue(privacy.rightsContact);

  const phoneDisplay = rightsContact?.phoneDisplay ?? siteConfig.contact.phoneDisplay;
  const phoneE164 = rightsContact?.phoneE164 ?? siteConfig.contact.phoneE164;
  const whatsappUrl = rightsContact?.whatsappUrl ?? plainWhatsAppUrl;

  return (
    <LegalPageShell
      route="/confidentialite"
      title="Politique de confidentialité"
      lastUpdatedLabel={legalPagesLastUpdated}
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données est <strong>{dataController}</strong>.
        </p>
      </LegalSection>

      <LegalSection title="Données concernées">
        {concernedData ? (
          <ul>
            {concernedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </LegalSection>

      <LegalSection title="Parcours technique de la demande">
        <ul>
          <li>La saisie est conservée dans la mémoire du navigateur pendant le remplissage.</li>
          <li>Le message WhatsApp est construit localement dans le navigateur.</li>
          <li>Aucun envoi n’est effectué vers un serveur PRiMiE avant le clic vers WhatsApp.</li>
          <li>
            Le transfert vers WhatsApp/Meta n’a lieu que lorsque la personne active le bouton
            d’envoi.
          </li>
          <li>
            Aucun localStorage ni stockage serveur PRiMiE n’est utilisé pour conserver la demande.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalités">
        {purposes ? (
          <ul>
            {purposes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </LegalSection>

      <LegalSection title="Bases juridiques">
        {legalBasis ? (
          <ul>
            {legalBasis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </LegalSection>

      <LegalSection title="Destinataires">
        {recipients ? (
          <ul>
            {recipients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {transferOutsideEu ? <p>{transferOutsideEu}</p> : null}
      </LegalSection>

      <LegalSection title="Conservation">
        <p>{retention}</p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <ul>
          <li>Droit d’accès</li>
          <li>Droit de rectification</li>
          <li>Droit d’effacement</li>
          <li>Droit à la limitation</li>
          <li>Droit d’opposition, lorsque applicable</li>
          <li>Droit d’introduire une réclamation auprès de la CNIL</li>
        </ul>
        {rightsExercise ? <p>{rightsExercise}</p> : null}
        {cnil ? (
          <p>
            {cnil.label}{" "}
            <a href={cnil.url} rel="noopener noreferrer" target="_blank">
              {cnil.url}
            </a>
          </p>
        ) : null}
      </LegalSection>

      <LegalSection title="Exercer vos droits">
        <p>
          Contact provisoire : téléphone <a href={`tel:${phoneE164}`}>{phoneDisplay}</a> ou{" "}
          <a href={whatsappUrl}>WhatsApp</a> (sans message prérempli).
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
