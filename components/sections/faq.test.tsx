import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { faq, faqCopy } from "@/content/faq";
import { FAQ_ASSISTANT_COPY, FAQ_QUICK_TOPICS } from "@/lib/faq-topics";
import { Faq } from "./faq";

const FORBIDDEN_MOCK_QUESTIONS = [
  "Fournissez-vous les cheveux ou les perruques",
  "Comment entretenir ma perruque",
  "Quels sont les moyens de paiement acceptés",
  "Vos prestations sont-elles garanties",
];

const FAQ_SOURCE = readFileSync(join(process.cwd(), "components/sections/faq.tsx"), "utf8");
const EXPERIENCE_SOURCE = readFileSync(
  join(process.cwd(), "components/sections/faq-search-experience.tsx"),
  "utf8",
);
const FAQ_CONTENT_SOURCE = readFileSync(join(process.cwd(), "content/faq.ts"), "utf8");

describe("Faq section — FAQ-ASSISTANT-EXPRESS-R1", () => {
  it("rend #faq unique avec les 5 Q/R de content/faq.ts", () => {
    const html = renderToStaticMarkup(<Faq />);

    expect(html).toContain('id="faq"');
    expect(html.match(/id="faq"/g)).toHaveLength(1);
    expect(html).toContain(`>${faqCopy.titleLead}<`);
    expect(html).toContain(`>${faqCopy.titleAccent}<`);
    expect(html).toContain(faqCopy.subtitle);
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html.match(/<details\b/g)).toHaveLength(5);
    expect(html.match(/<summary\b/g)).toHaveLength(5);

    for (const item of faq) {
      expect(html).toContain(item.question);
      expect(html).toContain(item.answer);
    }
  });

  it("remplace le panneau info par l’Assistant express", () => {
    const html = renderToStaticMarkup(<Faq />);

    expect(html).toContain(FAQ_ASSISTANT_COPY.title);
    expect(html).toContain(FAQ_ASSISTANT_COPY.description);
    expect(html).toContain("data-faq-assistant");
    expect(html).toContain('aria-pressed="false"');

    for (const topic of FAQ_QUICK_TOPICS) {
      expect(html).toContain(topic.label);
    }

    expect(html).not.toContain("Horaires");
    expect(html).not.toContain("Zone d’intervention");
    expect(html).not.toContain("Besoin d’aide");
    expect(html).not.toContain("Nous contacter");
    expect(html).not.toMatch(/tel:\+33749616582/);
    expect(existsSync(join(process.cwd(), "components/sections/faq-info-panel.tsx"))).toBe(false);
    expect(FAQ_SOURCE).not.toContain("FaqInfoPanel");
  });

  it("câble la sélection de sujet vers recherche, details et a11y", () => {
    expect(EXPERIENCE_SOURCE).toContain("handleTopicSelect");
    expect(EXPERIENCE_SOURCE).toContain("setQuery(topic.searchTerm)");
    expect(EXPERIENCE_SOURCE).toContain("setOpenItemId");
    expect(EXPERIENCE_SOURCE).toContain("aria-pressed");
    expect(EXPERIENCE_SOURCE).toContain('aria-live="polite"');
    expect(EXPERIENCE_SOURCE).toContain("FAQ_ASSISTANT_COPY.resetLabel");
    expect(EXPERIENCE_SOURCE).toContain("resetAssistant");
    expect(EXPERIENCE_SOURCE).toContain("handleSearchChange");
    expect(EXPERIENCE_SOURCE).toContain("scrollIntoView");
    expect(EXPERIENCE_SOURCE).toContain("prefersReducedMotion");
    expect(EXPERIENCE_SOURCE).toContain("faq-summary-");
    expect(EXPERIENCE_SOURCE).toContain(".focus(");
  });

  it("rejette le contenu fictif et conserve la recherche", () => {
    const html = renderToStaticMarkup(<Faq />);

    for (const question of FORBIDDEN_MOCK_QUESTIONS) {
      expect(html).not.toContain(question);
    }

    expect(html).not.toContain("06 00 00 00 00");
    expect(html).not.toMatch(/déplacement inclus/i);
    expect(html).toContain('type="search"');
    expect(html).toContain(`placeholder="${faqCopy.searchPlaceholder}"`);
    expect(EXPERIENCE_SOURCE).toContain("filterFaqItems");
    expect(EXPERIENCE_SOURCE).toContain("faqCopy.emptyResults");
  });

  it("conserve le portrait FAQ et l’intro compacte", () => {
    const html = renderToStaticMarkup(<Faq />);
    const assetPath = join(
      process.cwd(),
      "public/images/gallery/faq-portrait-faux-locs-deesse-v1.webp",
    );

    expect(existsSync(assetPath)).toBe(true);
    expect(html).toMatch(/faq-portrait-faux-locs-deesse-v1\.webp/);
    expect(html).toMatch(/alt=""/);
    expect(FAQ_SOURCE).toContain("data-faq-intro");
    expect(FAQ_SOURCE).not.toMatch(/min-h-screen|min-h-svh/);
  });

  it("applique font-display aux questions et font-sans aux réponses", () => {
    expect(EXPERIENCE_SOURCE).toContain(
      "font-display text-[0.95rem] leading-snug font-semibold text-balance",
    );
    expect(EXPERIENCE_SOURCE).toMatch(/<p className="[^"]*font-sans[^"]*">\s*\{item\.answer\}/);
  });

  it("ne modifie pas les Q/R de content/faq.ts et garde la frontière Server/Client", () => {
    const packageJson = readFileSync(join(process.cwd(), "package.json"), "utf8");

    expect(FAQ_CONTENT_SOURCE).toContain('id: "prendre-rendez-vous"');
    expect(FAQ_CONTENT_SOURCE).toContain("Comment prendre rendez-vous ?");
    expect(FAQ_CONTENT_SOURCE).toContain("Proposez-vous des prestations pour les hommes ?");
    expect(FAQ_SOURCE).not.toMatch(/["']use client["']/);
    expect(FAQ_SOURCE).toContain("FaqSearchExperience");
    expect(EXPERIENCE_SOURCE).toMatch(/["']use client["']/);
    expect(packageJson).not.toMatch(/framer-motion|fuse\.js|cmdk|@radix-ui\/react-accordion/);
  });
});
