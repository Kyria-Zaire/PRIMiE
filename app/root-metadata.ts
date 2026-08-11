import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { getMetadataRobots, type ReleaseEnvironment } from "@/lib/release-safety";

/** Metadata racine — gate d’indexation centralisé (STAGING-SAFETY-01). */
export function buildRootMetadata(env: ReleaseEnvironment = process.env): Metadata {
  return {
    title: siteConfig.brand.commercialName,
    description: siteConfig.brand.activity,
    robots: getMetadataRobots(env),
  };
}
