import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryCard } from "./gallery-card";
import { featuredGallery } from "@/content/gallery";

describe("GalleryCard", () => {
  const item = featuredGallery[0]!;

  it("rend next/image WebP avec alt, dimensions et titre, sans lien ni priority", () => {
    const html = renderToStaticMarkup(<GalleryCard item={item} />);
    const source = readFileSync(join(process.cwd(), "components/gallery/gallery-card.tsx"), "utf8");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(html).toContain(`${item.id}.webp`);
    expect(html).toContain(`alt="${item.alt}"`);
    expect(html).toContain(`width="${item.width}"`);
    expect(html).toContain(`height="${item.height}"`);
    expect(html).toContain('loading="lazy"');
    expect(html).toContain(`>${item.title}<`);
    expect(html).toContain("bg-gradient-to-t");
    expect(html).toContain("object-cover");
    expect(html).toContain("line-clamp-2");
    expect(html).toContain("px-4");
    expect(html).not.toMatch(/<a[\s>]/);
    expect(html).not.toMatch(/<button\b/);
    expect(html.toLowerCase()).not.toContain("priority");
    expect(html).not.toMatch(/Nos réalisations/i);
  });
});
