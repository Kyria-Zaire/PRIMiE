/**
 * Gate d’indexation publique — STAGING-SAFETY-01.
 * Fermé par défaut. Ouvert seulement si VERCEL_ENV=production
 * ET SITE_PUBLIC_LAUNCH_ENABLED=true (chaîne exacte, sensible à la casse).
 */

import type { Metadata, MetadataRoute } from "next";

export type ReleaseEnvironment = Record<string, string | undefined>;

/** Directive unique pour metadata HTML et header HTTP. */
export const SEARCH_INDEXING_BLOCK_DIRECTIVE = "noindex, nofollow, noarchive" as const;

export const X_ROBOTS_TAG_HEADER_NAME = "X-Robots-Tag" as const;

/**
 * Indexation autorisée uniquement avec la double condition exacte.
 * Absent, vide, invalide, Preview, Development ou inconnu → interdit.
 */
export function isSearchIndexingEnabled(env: ReleaseEnvironment = process.env): boolean {
  return env.VERCEL_ENV === "production" && env.SITE_PUBLIC_LAUNCH_ENABLED === "true";
}

export function getMetadataRobots(
  env: ReleaseEnvironment = process.env,
): NonNullable<Metadata["robots"]> {
  if (isSearchIndexingEnabled(env)) {
    return {
      index: true,
      follow: true,
    };
  }

  return {
    index: false,
    follow: false,
    noarchive: true,
  };
}

export function buildRobotsRoute(env: ReleaseEnvironment = process.env): MetadataRoute.Robots {
  if (isSearchIndexingEnabled(env)) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}

export function getXRobotsTagHeader(
  env: ReleaseEnvironment = process.env,
): { key: typeof X_ROBOTS_TAG_HEADER_NAME; value: typeof SEARCH_INDEXING_BLOCK_DIRECTIVE } | null {
  if (isSearchIndexingEnabled(env)) {
    return null;
  }

  return {
    key: X_ROBOTS_TAG_HEADER_NAME,
    value: SEARCH_INDEXING_BLOCK_DIRECTIVE,
  };
}
