import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { WigCard } from "./wig-card";
import { wigs, wigSelectionCopy } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("WigCard — WIG-SALES-DESIGN-R1-R2", () => {
  const source = readFileSync(join(process.cwd(), "components/wigs/wig-card.tsx"), "utf8");
  const product = wigs[0]!;

  it("reste un Server Component sans état", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
  });

  it("rend texture, nom, description, badge, image et mention tarif", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);

    expect(html).toContain(product.textureLabel);
    expect(html).toContain(`>${product.name}<`);
    expect(html).toContain(product.shortDescription);
    expect(html).toContain(">01<");
    expect(html).toContain("body-wave.webp");
    expect(html).toContain(`alt="${product.image.alt}"`);
    expect(html).toContain("Informations et tarif sur demande");
    expect(html).toContain("<article");
    expect(html).toContain("<h3");
  });

  it("branche le CTA WhatsApp via buildWhatsAppUrl et le message produit", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    const expected = buildWhatsAppUrl(product.inquiryMessage);
    const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

    expect(wigSelectionCopy.productCtaLabel).toBe("Demander le tarif sur WhatsApp");
    expect(plain).toContain("Demander le tarif");
    expect(plain).toContain("sur WhatsApp");
    expect(html).toContain(`href="${expected}"`);
    expect(html).toContain(`aria-label="Demander le tarif de la ${product.name} sur WhatsApp"`);
    expect(html.match(/href="/g)).toHaveLength(1);
    expect(source).toContain("buildWhatsAppUrl");
    expect(source).not.toContain("wa.me/33749616582");
    expect(expected).not.toContain("%25");
  });

  it("structure le CTA en deux lignes max avec flèche séparée et text-sm", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).toContain("data-wig-cta-label");
    expect(html).toContain("Demander le tarif");
    expect(html).toContain("sur WhatsApp");
    expect(html).toContain("flex-col");
    expect(html).toContain("flex-row");
    expect(html).toContain("min-h-12");
    expect(html).toContain("text-sm");
    expect(html).not.toContain("whitespace-nowrap");
    expect(html).not.toContain("line-clamp");
    expect(html).toMatch(/aria-hidden="true"/);
    expect(source).toContain("mt-auto");
    expect(source).toContain("data-wig-card-cta");
  });

  it("n’expose aucun prix ni caractéristique interdite", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).not.toContain("240 €");
    expect(html).not.toMatch(/\d+\s*€/);
    expect(html).not.toMatch(/100\s*%\s*cheveux humains/i);
    expect(html).not.toMatch(/Naturel \(1B\)/i);
    expect(html).not.toMatch(/en stock|disponible immédiatement/i);
    expect(html).not.toContain("/perruques");
    expect(html).not.toMatch(/PayPal|Mobile Money|livraison rapide|retour facile/i);
  });

  it("couvre les trois badges 01–03", () => {
    for (const [index, productItem] of wigs.entries()) {
      const html = renderToStaticMarkup(
        <WigCard product={productItem} index={index as 0 | 1 | 2} />,
      );
      expect(html).toContain(`>0${index + 1}<`);
      expect(html).toContain(productItem.name);
    }
  });

  it("reste une carte horizontale avec ratio contenu élargi dès xl", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).toContain("data-wig-card");
    expect(html).toContain("data-wig-card-media");
    expect(html).toContain("flex-row");
    expect(html).toContain("w-[43%]");
    expect(html).toContain("xl:w-[47%]");
    expect(html).toContain("xl:w-[53%]");
    expect(html).toContain("min-h-12");
    expect(html).toContain("h-full");
    expect(source).toContain("aria-hidden");
  });
});
