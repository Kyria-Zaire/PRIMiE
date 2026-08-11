import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { isSearchIndexingEnabled } from "@/lib/release-safety";

const root = path.resolve(__dirname, "..");

describe("STAGING-SAFETY-01 anti-régression", () => {
  it("n’expose aucune variable NEXT_PUBLIC_SITE_PUBLIC_LAUNCH_ENABLED", () => {
    const sources = [
      "lib/release-safety.ts",
      "app/layout.tsx",
      "app/root-metadata.ts",
      "app/robots.ts",
      "next.config.ts",
    ];

    for (const relative of sources) {
      const contents = readFileSync(path.join(root, relative), "utf8");
      expect(contents).not.toContain("NEXT_PUBLIC_SITE_PUBLIC_LAUNCH_ENABLED");
      expect(contents).not.toMatch(/NEXT_PUBLIC_.*LAUNCH/);
    }
  });

  it("n’ajoute aucun fichier .env", () => {
    const envCandidates = [
      ".env",
      ".env.local",
      ".env.development",
      ".env.production",
      ".env.preview",
    ];
    for (const file of envCandidates) {
      expect(existsSync(path.join(root, file))).toBe(false);
    }
  });

  it("ne code aucune URL Vercel en dur dans le gate", () => {
    const contents = readFileSync(path.join(root, "lib/release-safety.ts"), "utf8");
    expect(contents).not.toMatch(/vercel\.app/i);
    expect(contents).not.toMatch(/primie-staging/i);
  });

  it("n’active pas l’indexation avec NODE_ENV=production seul", () => {
    expect(isSearchIndexingEnabled({ NODE_ENV: "production" })).toBe(false);
    expect(
      isSearchIndexingEnabled({
        NODE_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBe(false);
  });

  it("robots() runtime par défaut reste fermé sans sitemap/host", () => {
    const route = robots();
    expect(route).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
    expect(route).not.toHaveProperty("sitemap");
    expect(route).not.toHaveProperty("host");
  });

  it("ne change pas les routes app / et /galerie", () => {
    expect(existsSync(path.join(root, "app/page.tsx"))).toBe(true);
    expect(existsSync(path.join(root, "app/galerie/page.tsx"))).toBe(true);
  });
});
