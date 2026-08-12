import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";
import { getConfirmedLegalValue, legalContent, legalPagesLastUpdated } from "@/content/legal";
import { siteConfig } from "@/content/site-config";
import { getLegalReadiness } from "@/lib/legal-readiness";

const readiness = getLegalReadiness();

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de Chez PRiMiE Coiffure — identité, contact et hébergement techniques confirmés.",
  robots: readiness.legalNoticeReady
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export default function MentionsLegalesPage() {
  const { publisher, hosting } = legalContent;

  const legalIdentity = getConfirmedLegalValue(publisher.legalIdentity);
  const legalStatus = getConfirmedLegalValue(publisher.legalStatus);
  const commercialName = getConfirmedLegalValue(publisher.commercialName);
  const shortBrandName = getConfirmedLegalValue(publisher.shortBrandName);
  const activity = getConfirmedLegalValue(publisher.activity);
  const address = getConfirmedLegalValue(publisher.publicProfessionalAddress);
  const phone = getConfirmedLegalValue(publisher.phone);
  const publicationDirector = getConfirmedLegalValue(publisher.publicationDirector);
  const hostLegalName = getConfirmedLegalValue(hosting.hostLegalName);
  const hostAddress = getConfirmedLegalValue(hosting.hostAddress);
  const confirmedHost = getConfirmedLegalValue(hosting.confirmedHost);

  return (
    <LegalPageShell
      route="/mentions-legales"
      title="Mentions légales"
      lastUpdatedLabel={legalPagesLastUpdated}
    >
      <LegalSection title="Éditeur du site">
        <p>
          {`Le site est édité par `}
          <strong>{legalIdentity}</strong>
          {legalStatus ? `, ${legalStatus.toLowerCase()}.` : "."}
        </p>
        <p>
          {`Nom commercial : `}
          <strong>{commercialName}</strong>
          {shortBrandName ? (
            <>
              {" "}
              (marque <strong>{shortBrandName}</strong>)
            </>
          ) : null}
          {"."}
        </p>
        {activity ? <p>Activité : {activity}.</p> : null}
        {address ? (
          <p>
            {`Adresse professionnelle : ${address.street}, ${address.postalCode} ${address.city}, ${address.country}.`}
          </p>
        ) : null}
        {phone ? (
          <p>
            Téléphone : <a href={`tel:${phone.e164}`}>{phone.display}</a>
          </p>
        ) : null}
      </LegalSection>

      <LegalSection title="Directrice de la publication">
        <p>{publicationDirector}</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        {confirmedHost && hostLegalName && hostAddress ? (
          <>
            <p>{confirmedHost}.</p>
            <p>
              <strong>{hostLegalName}</strong>
              <br />
              {hostAddress}
            </p>
          </>
        ) : null}
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative au site, contactez {siteConfig.brand.owner} au{" "}
          <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phoneDisplay}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
