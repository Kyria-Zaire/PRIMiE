import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { faq } from "../content/faq";
import { gallery } from "../content/gallery";
import { services } from "../content/services";
import { siteConfig } from "../content/site-config";
import { testimonials } from "../content/testimonials";

const EXPECTED_TITLES = [
  "Tresses & coiffure femme et homme",
  "Traitement de perruque",
  "Pose perruque",
  "Look & twist",
  "Vente et pose de perruques",
  "Tissage",
] as const;

const EXPECTED_DESCRIPTIONS = [
  "Des tresses et coiffures pour femmes et hommes, définies selon le style recherché.",
  "Entretien et remise en forme de votre perruque selon son état et le résultat souhaité.",
  "Pose de votre perruque après échange sur le modèle et le rendu souhaité.",
  "Réalisation de twists selon le style et la finition choisis.",
  "Choix et pose de perruques selon les modèles disponibles et le rendu recherché.",
  "Réalisation de tissages selon le style défini lors de l’échange.",
] as const;

const EXPECTED_FAQ = [
  {
    question: "Comment prendre rendez-vous ?",
    answer: "Contactez Prisca sur WhatsApp en précisant la prestation souhaitée.",
  },
  {
    question: "Proposez-vous des prestations à domicile ?",
    answer:
      "Oui. Les prestations sont proposées à domicile. La faisabilité du déplacement est confirmée lors de l’échange sur WhatsApp.",
  },
  {
    question: "Combien de temps dure une prestation ?",
    answer:
      "La durée dépend de la coiffure choisie. Une estimation peut être précisée lors de l’échange.",
  },
  {
    question: "Comment préparer mes cheveux avant la prestation ?",
    answer:
      "La préparation dépend de la prestation choisie. Les consignes sont précisées lors de l’échange sur WhatsApp.",
  },
  {
    question: "Proposez-vous des prestations pour les hommes ?",
    answer: "Oui. Certaines prestations sont proposées aux femmes et aux hommes.",
  },
] as const;

const WHATSAPP_PREFILL =
  "Bonjour Prisca 👋\n\nJe souhaite prendre rendez-vous pour une prestation chez PRiMiE Coiffure.\n\nPourriez-vous me communiquer vos disponibilités ainsi qu’un devis ?\n\nMerci 😊";

describe("seed contents PO_APPROVED_SEED", () => {
  it("expose le slogan exact avec la graphie PRiMiE", () => {
    expect(siteConfig.brand.slogan).toBe("La beauté commence par une belle coiffure.");
    expect(siteConfig.brand.shortName).toBe("PRiMiE");
    expect(siteConfig.brand.slogan).not.toMatch(/PRIMiE|PRIMIE|Primie/);
  });

  it("expose six services avec descriptions exactes et illustrations WebP", () => {
    expect(services).toHaveLength(6);
    expect(services.map((service) => service.title)).toEqual([...EXPECTED_TITLES]);
    expect(services.map((service) => service.description)).toEqual([...EXPECTED_DESCRIPTIONS]);

    for (const service of services) {
      const keys = Object.keys(service).sort();
      expect(keys).toEqual(["description", "id", "illustration", "title"]);
      expect(service).not.toHaveProperty("price");
      expect(service).not.toHaveProperty("duration");
      expect(service).not.toHaveProperty("image");
      expect(service.illustration.status).toBe("SERVICE_ILLUSTRATION");
      expect(service.illustration.alt).toBe("");
      expect(service.illustration.src).toMatch(/^\/images\/services\/[\w-]+\.webp$/);
      expect(service.description).not.toMatch(/PRIMiE|PRIMIE|Primie/);
      expect(service.title).not.toMatch(/PRIMiE|PRIMIE|Primie/);
    }
  });

  it("expose cinq FAQ prudentes exactes sans dimanche ni horaires", () => {
    expect(faq).toHaveLength(5);
    expect(faq.map(({ question, answer }) => ({ question, answer }))).toEqual([...EXPECTED_FAQ]);

    const serialized = JSON.stringify(faq);
    expect(serialized).not.toMatch(/dimanche/i);
    expect(serialized).not.toMatch(/09h00|19h00|horaire/i);
    expect(serialized).not.toMatch(/paiement|annulation|Instagram/i);
  });

  it("centralise le message WhatsApp prérempli sans l’activer implicitement", () => {
    expect(siteConfig.contact.whatsappPrefillMessage).toBe(WHATSAPP_PREFILL);
    expect(siteConfig.contact.whatsappPrefillMessage).toContain("PRiMiE");
    expect(siteConfig.contact.whatsappPrefillMessage).not.toMatch(/PRIMiE|PRIMIE|Primie/);
    expect(siteConfig.contact.whatsappUrl).toBe("https://wa.me/33749616582");
  });

  it("maintient les témoignages vides et la galerie hors pistes nominatives", () => {
    expect(gallery).toHaveLength(14);
    expect(testimonials).toEqual([]);

    const runtimeBlob = JSON.stringify({
      gallery,
      testimonials,
      faq,
      services,
      siteConfig,
    });
    expect(runtimeBlob).not.toContain("Olive");
    expect(runtimeBlob).not.toContain("Octavie");
    expect(runtimeBlob).not.toContain("Annaelle");
    expect(runtimeBlob).not.toContain("Plamédie");
    expect(runtimeBlob).not.toMatch(/Nos réalisations/i);
  });

  it("n’introduit pas benefits.ts ni PNG source dans public/", () => {
    expect(existsSync(join(process.cwd(), "content/benefits.ts"))).toBe(false);

    const publicDir = join(process.cwd(), "public");
    const publicEntries = existsSync(publicDir)
      ? readdirSync(publicDir, { withFileTypes: true })
      : [];
    const imageFiles = publicEntries.filter(
      (entry) => entry.isFile() && /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(entry.name),
    );
    expect(imageFiles).toEqual([]);

    const heroWebp = join(process.cwd(), "public/images/hero/primie-hero-v1.webp");
    const heroMobileWebp = join(process.cwd(), "public/images/hero/primie-hero-mobile-v1.webp");
    const logoWebp = join(process.cwd(), "public/brand/logo/primie-logo-v1.webp");
    const sourcePngInPublic = join(process.cwd(), "public/images/hero/primie-hero.png");
    const mobilePngInPublic = join(
      process.cwd(),
      "public/images/hero/primie section hero mobile.png",
    );
    const logoSourceInPublic = join(process.cwd(), "public/brand/logo/logo.png");
    expect(existsSync(heroWebp)).toBe(true);
    expect(existsSync(heroMobileWebp)).toBe(true);
    expect(existsSync(logoWebp)).toBe(true);
    expect(existsSync(sourcePngInPublic)).toBe(false);
    expect(existsSync(mobilePngInPublic)).toBe(false);
    expect(existsSync(logoSourceInPublic)).toBe(false);
    expect(existsSync(join(process.cwd(), "images/primie-hero.png"))).toBe(true);
    expect(existsSync(join(process.cwd(), "images/primie section hero mobile.png"))).toBe(true);
    expect(existsSync(join(process.cwd(), "images/logo.png"))).toBe(true);

    for (const service of services) {
      const webp = join(process.cwd(), "public", service.illustration.src.replace(/^\//, ""));
      const pngPublic = join(process.cwd(), "public/images/services", `${service.id}.png`);
      const pngSource = join(process.cwd(), "images/services", `${service.id}.png`);
      expect(existsSync(webp)).toBe(true);
      expect(existsSync(pngPublic)).toBe(false);
      expect(existsSync(pngSource)).toBe(true);
    }

    const root = siteConfig as Record<string, unknown>;
    const contact = siteConfig.contact as Record<string, unknown>;
    expect(root).not.toHaveProperty("hours");
    expect(root).not.toHaveProperty("address");
    expect(root).not.toHaveProperty("social");
    expect(contact).not.toHaveProperty("hours");
    expect(contact).not.toHaveProperty("email");
    expect(contact).not.toHaveProperty("serviceArea");
  });
});
