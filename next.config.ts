import { realpathSync } from "node:fs";
import type { NextConfig } from "next";
import { getXRobotsTagHeader } from "./lib/release-safety";

const projectRoot = realpathSync.native(process.cwd());

export const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
] as const;

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const robotsHeader = getXRobotsTagHeader();
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, ...(robotsHeader ? [robotsHeader] : [])],
      },
    ];
  },
};

export default nextConfig;
