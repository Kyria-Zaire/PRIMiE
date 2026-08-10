import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { WigCard } from "./wig-card";
import { wigs, wigSelectionCopy } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("WigCard", () => {
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
    expect(plain).toContain("Demander le tarif sur WhatsApp");
    expect(html).toContain(`href="${expected}"`);
    expect(html).toContain(`aria-label="Demander le tarif de la ${product.name} sur WhatsApp"`);
    expect(html.match(/href="/g)).toHaveLength(1);
    expect(source).toContain("buildWhatsAppUrl");
    expect(source).not.toContain("wa.me/33749616582");
  });

  it("découpe le CTA en deux lignes contrôlées sous 390 px", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).toContain("data-wig-cta-label");
    expect(html).toContain("block whitespace-nowrap min-[390px]:inline");
    expect(html).toContain("flex-col");
    expect(html).toContain("min-[390px]:flex-row");
    expect(html).toContain("Demander le tarif");
    expect(html).toContain("sur WhatsApp");
    expect(html).toContain("min-h-11");
    expect(html).toContain("text-xs");
    expect(html).toContain("lg:text-xs");
    expect(html).not.toContain("0.71875rem");
    expect(html).toMatch(/aria-hidden="true"/);
    expect(source).not.toMatch(/["']use client["']/);
  });

  it("n’expose aucun prix ni caractéristique interdite", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).not.toContain("240 €");
    expect(html).not.toMatch(/\d+\s*€/);
    expect(html).not.toMatch(/100\s*%\s*cheveux humains/i);
    expect(html).not.toMatch(/Naturel/i);
    expect(html).not.toMatch(/en stock|disponible immédiatement/i);
    expect(html).not.toContain("/perruques");
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

  it("reste une carte horizontale compacte avec flèche CTA décorative", () => {
    const html = renderToStaticMarkup(<WigCard product={product} index={0} />);
    expect(html).toContain("data-wig-card");
    expect(html).toContain("flex-row");
    expect(html).toContain("w-[44%]");
    expect(html).toContain("min-h-11");
    expect(html).toContain('aria-hidden="true"');
    expect(source).toContain("flex-row");
    expect(source).toContain("aria-hidden");
  });
});
