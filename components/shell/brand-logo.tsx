import Image from "next/image";
import { siteConfig } from "@/content/site-config";

export const BRAND_LOGO = {
  src: "/brand/logo/primie-logo-v1.webp",
  width: 707,
  height: 353,
} as const;

type BrandLogoProps = {
  priority?: boolean;
  className?: string;
};

/**
 * Wordmark officiel PRiMiE — Server Component via next/image.
 * Source de travail locale hors public (non importée au runtime).
 */
export function BrandLogo({
  priority = false,
  className = "h-11 w-auto sm:h-12 lg:h-14",
}: BrandLogoProps) {
  return (
    <Image
      src={BRAND_LOGO.src}
      alt={siteConfig.brand.shortName}
      width={220}
      height={110}
      priority={priority}
      className={className}
    />
  );
}
