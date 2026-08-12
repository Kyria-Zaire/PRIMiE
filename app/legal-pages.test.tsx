import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import MentionsLegalesPage, { metadata as mentionsMetadata } from "@/app/mentions-legales/page";
import ConfidentialitePage, { metadata as privacyMetadata } from "@/app/confidentialite/page";
import { siteConfig } from "@/content/site-config";

const FORBIDDEN_PUBLIC = [
  /À compléter/i,
  /\ben attente\b/i,
  /\bXXX\b/,
  /SIREN/i,
  /SIRET/i,
  /TVA\s*intracommunautaire/i,
  /médiateur/i,
  /@primie/i,
  /example\.com/i,
];

describe("pages légales — LEGAL-PAGES-01C", () => {
  it("rend Mentions légales avec un h1, faits confirmés et noindex", () => {
    const html = renderToStaticMarkup(<MentionsLegalesPage />);
    const source = readFileSync(join(process.cwd(), "app/mentions-legales/page.tsx"), "utf8");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain("Mentions légales");
    expect(html).toContain("Prisca Foani");
    expect(html).toContain("micro-entrepreneur");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("PRiMiE");
    expect(html).toContain("24 rue Docteur Thomas");
    expect(html).toContain("02200");
    expect(html).toContain("Soissons");
    expect(html).toContain(siteConfig.contact.phoneDisplay);
    expect(html).toContain(`tel:${siteConfig.contact.phoneE164}`);
    expect(html).toContain("Directrice de la publication");
    expect(html).toContain("Vercel Inc.");
    expect(html).toContain("440 N Barranca Avenue");
    expect(html).toContain('id="contenu-principal"');
    expect(html).toContain('tabindex="-1"');
    expect(html).not.toMatch(/SIREN|SIRET/i);
    expect(html).not.toContain("imoria.co@gmail.com");
    expect(html).not.toMatch(/partenaire technique/i);
    expect(source).not.toMatch(/["']use client["']/);
    expect(mentionsMetadata.robots).toEqual({
      index: false,
      follow: false,
      noarchive: true,
    });

    for (const pattern of FORBIDDEN_PUBLIC) {
      expect(html).not.toMatch(pattern);
    }
  });

  it("rend Confidentialité avec parcours Booking, rétention et CNIL", () => {
    const html = renderToStaticMarkup(<ConfidentialitePage />);
    const source = readFileSync(join(process.cwd(), "app/confidentialite/page.tsx"), "utf8");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain("Politique de confidentialité");
    expect(html).toContain("Prisca Foani");
    expect(html).toContain("Nom");
    expect(html).toContain("Téléphone");
    expect(html).toContain("Prestation");
    expect(html).toContain("Date souhaitée");
    expect(html).toContain("Créneau souhaité");
    expect(html).toContain("mémoire du navigateur");
    expect(html).toContain("construit localement");
    expect(html).toContain("Aucun envoi n’est effectué vers un serveur PRiMiE");
    expect(html).toContain("localStorage");
    expect(html).toContain("maximum un mois");
    expect(html).toContain("https://www.cnil.fr/fr/plaintes");
    expect(html).toContain(`href="${siteConfig.contact.whatsappUrl}"`);
    expect(html).toMatch(/Exercer vos droits[\s\S]*?href="https:\/\/wa\.me\/33749616582"(?!\?)/);
    expect(html).toContain("imoria.co@gmail.com");
    expect(html).toContain("mailto:imoria.co@gmail.com");
    expect(html).toMatch(
      /Contact pour l(?:&#x27;|')exercice de vos droits, mandaté pour Chez PRiMiE Coiffure/i,
    );
    expect(html).toMatch(
      /reçues pour le compte de Chez PRiMiE Coiffure[\s\S]*?Prisca Foani, responsable du traitement/i,
    );
    expect((html.match(/imoria\.co@gmail\.com/g) ?? []).length).toBe(2);
    expect(html).not.toMatch(/partenaire technique/i);
    expect(html).not.toMatch(/\bDPO\b/i);
    expect(html).not.toMatch(/délégué[^<]{0,40}protection des données/i);
    expect(html).not.toContain("cotraitant");
    expect(html).not.toMatch(/sous-traitant confirmé/i);
    expect(html).not.toMatch(/responsable du traitement[^<]{0,120}imoria/i);
    expect(html).not.toMatch(/imoria[^<]{0,120}responsable du traitement/i);
    expect(html).toContain("sous-traitant");
    expect(source).not.toMatch(/["']use client["']/);
    expect(privacyMetadata.robots).toEqual({
      index: false,
      follow: false,
      noarchive: true,
    });

    for (const pattern of FORBIDDEN_PUBLIC) {
      expect(html).not.toMatch(pattern);
    }
  });

  it("conserve le shell Server pour le layout légal", () => {
    const shell = readFileSync(
      join(process.cwd(), "components/legal/legal-page-shell.tsx"),
      "utf8",
    );
    expect(shell).not.toMatch(/["']use client["']/);
    expect(shell).toContain("SkipLink");
    expect(shell).toContain("Footer");
  });
});
