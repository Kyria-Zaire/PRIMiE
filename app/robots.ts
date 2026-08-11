import type { MetadataRoute } from "next";
import { buildRobotsRoute } from "@/lib/release-safety";

export default function robots(): MetadataRoute.Robots {
  return buildRobotsRoute();
}
