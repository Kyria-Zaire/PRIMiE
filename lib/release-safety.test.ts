import { describe, expect, it } from "vitest";
import {
  SEARCH_INDEXING_BLOCK_DIRECTIVE,
  X_ROBOTS_TAG_HEADER_NAME,
  buildRobotsRoute,
  getMetadataRobots,
  getXRobotsTagHeader,
  isSearchIndexingEnabled,
} from "./release-safety";

describe("isSearchIndexingEnabled", () => {
  it("interdit un environnement vide", () => {
    expect(isSearchIndexingEnabled({})).toBe(false);
  });

  it("interdit VERCEL_ENV=development", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "development",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBe(false);
  });

  it("interdit VERCEL_ENV=preview", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "preview",
      }),
    ).toBe(false);
  });

  it("interdit Preview même avec SITE_PUBLIC_LAUNCH_ENABLED=true", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "preview",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBe(false);
  });

  it("interdit Production sans flag", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
      }),
    ).toBe(false);
  });

  it("interdit Production avec false", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "false",
      }),
    ).toBe(false);
  });

  it("interdit Production avec TRUE (casse)", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "TRUE",
      }),
    ).toBe(false);
  });

  it("interdit Production avec 1", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "1",
      }),
    ).toBe(false);
  });

  it("autorise uniquement Production avec true exact", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBe(true);
  });

  it("n’autorise pas NODE_ENV=production seul", () => {
    expect(
      isSearchIndexingEnabled({
        NODE_ENV: "production",
      }),
    ).toBe(false);
    expect(
      isSearchIndexingEnabled({
        NODE_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBe(false);
  });

  it("interdit Production avec yes", () => {
    expect(
      isSearchIndexingEnabled({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "yes",
      }),
    ).toBe(false);
  });
});

describe("getMetadataRobots", () => {
  it("mode fermé : index/follow false et noarchive", () => {
    const robots = getMetadataRobots({});
    expect(robots).toEqual({
      index: false,
      follow: false,
      noarchive: true,
    });
  });

  it("mode ouvert : index/follow true sans noarchive", () => {
    const robots = getMetadataRobots({
      VERCEL_ENV: "production",
      SITE_PUBLIC_LAUNCH_ENABLED: "true",
    });
    expect(robots).toEqual({
      index: true,
      follow: true,
    });
    expect(robots).not.toHaveProperty("noarchive");
  });
});

describe("buildRobotsRoute", () => {
  it("gate fermé : Disallow / sans Allow contradictoire", () => {
    const route = buildRobotsRoute({ VERCEL_ENV: "preview" });
    expect(route).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
    expect(route).not.toHaveProperty("sitemap");
    expect(route).not.toHaveProperty("host");
    const rules = route.rules;
    expect(rules).not.toBeInstanceOf(Array);
    if (rules && !Array.isArray(rules)) {
      expect(rules).not.toHaveProperty("allow");
    }
  });

  it("gate ouvert : Allow / sans Disallow /", () => {
    const route = buildRobotsRoute({
      VERCEL_ENV: "production",
      SITE_PUBLIC_LAUNCH_ENABLED: "true",
    });
    expect(route).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
    });
    expect(route).not.toHaveProperty("sitemap");
    expect(route).not.toHaveProperty("host");
    const rules = route.rules;
    expect(rules).not.toBeInstanceOf(Array);
    if (rules && !Array.isArray(rules)) {
      expect(rules).not.toHaveProperty("disallow");
    }
  });
});

describe("getXRobotsTagHeader", () => {
  it("mode fermé : header centralisé présent", () => {
    expect(getXRobotsTagHeader({})).toEqual({
      key: X_ROBOTS_TAG_HEADER_NAME,
      value: SEARCH_INDEXING_BLOCK_DIRECTIVE,
    });
    expect(SEARCH_INDEXING_BLOCK_DIRECTIVE).toBe("noindex, nofollow, noarchive");
  });

  it("mode ouvert : header bloquant absent", () => {
    expect(
      getXRobotsTagHeader({
        VERCEL_ENV: "production",
        SITE_PUBLIC_LAUNCH_ENABLED: "true",
      }),
    ).toBeNull();
  });
});
