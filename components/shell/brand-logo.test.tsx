import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { BrandLogo, BRAND_LOGO } from "./brand-logo";

describe("BrandLogo", () => {
  it("rend le WebP de production via next/image avec alt PRiMiE", () => {
    const html = renderToStaticMarkup(<BrandLogo priority />);
    const productionAsset = join(process.cwd(), "public/brand/logo/primie-logo-v1.webp");
    const sourcePng = join(process.cwd(), "images/logo.png");

    expect(existsSync(productionAsset)).toBe(true);
    expect(statSync(productionAsset).size).toBeLessThanOrEqual(100 * 1024);
    expect(existsSync(sourcePng)).toBe(true);

    expect(html).toContain("primie-logo-v1.webp");
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("<img");
    expect(BRAND_LOGO.src).toBe("/brand/logo/primie-logo-v1.webp");
    expect(BRAND_LOGO.width).toBe(707);
    expect(BRAND_LOGO.height).toBe(353);
  });

  it("n’importe pas la source PNG locale", () => {
    const source = readFileSync(join(process.cwd(), "components/shell/brand-logo.tsx"), "utf8");
    expect(source).toContain('from "next/image"');
    expect(source).not.toContain("images/logo.png");
    expect(source).not.toMatch(/["']use client["']/);
  });
});
