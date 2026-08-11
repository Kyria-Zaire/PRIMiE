import { describe, expect, it } from "vitest";
import { buildRootMetadata } from "@/app/root-metadata";
import { siteConfig } from "@/content/site-config";
import {
  SEARCH_INDEXING_BLOCK_DIRECTIVE,
  X_ROBOTS_TAG_HEADER_NAME,
  getXRobotsTagHeader,
} from "@/lib/release-safety";
import { securityHeaders } from "../next.config";

describe("buildRootMetadata", () => {
  it("conserve title/description et robots fermés par défaut", () => {
    const metadata = buildRootMetadata({});
    expect(metadata.title).toBe(siteConfig.brand.commercialName);
    expect(metadata.description).toBe(siteConfig.brand.activity);
    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
      noarchive: true,
    });
  });

  it("ouvre index/follow seulement avec le double gate", () => {
    const metadata = buildRootMetadata({
      VERCEL_ENV: "production",
      SITE_PUBLIC_LAUNCH_ENABLED: "true",
    });
    expect(metadata.title).toBe(siteConfig.brand.commercialName);
    expect(metadata.description).toBe(siteConfig.brand.activity);
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });
});

describe("security headers + X-Robots-Tag", () => {
  const requiredSecurityKeys = [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ] as const;

  it("préserve les headers de sécurité existants", () => {
    for (const key of requiredSecurityKeys) {
      expect(securityHeaders.some((header) => header.key === key)).toBe(true);
    }
    expect(securityHeaders).toHaveLength(4);
  });

  it("mode fermé : X-Robots-Tag exact centralisé, sans doublon de clé", () => {
    const robots = getXRobotsTagHeader({});
    expect(robots).not.toBeNull();
    expect(robots?.key).toBe(X_ROBOTS_TAG_HEADER_NAME);
    expect(robots?.value).toBe(SEARCH_INDEXING_BLOCK_DIRECTIVE);

    const merged = [...securityHeaders, ...(robots ? [robots] : [])];
    const robotsKeys = merged.filter((header) => header.key === X_ROBOTS_TAG_HEADER_NAME);
    expect(robotsKeys).toHaveLength(1);
    for (const key of requiredSecurityKeys) {
      expect(merged.some((header) => header.key === key)).toBe(true);
    }
  });

  it("mode ouvert : header bloquant absent, sécurité intacte", () => {
    const robots = getXRobotsTagHeader({
      VERCEL_ENV: "production",
      SITE_PUBLIC_LAUNCH_ENABLED: "true",
    });
    expect(robots).toBeNull();

    const merged = [...securityHeaders, ...(robots ? [robots] : [])];
    expect(merged.some((header) => header.key === X_ROBOTS_TAG_HEADER_NAME)).toBe(false);
    for (const key of requiredSecurityKeys) {
      expect(merged.some((header) => header.key === key)).toBe(true);
    }
  });
});
