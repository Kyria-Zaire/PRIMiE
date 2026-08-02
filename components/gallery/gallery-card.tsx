import Image from "next/image";
import type { GalleryItem } from "@/content/types";

export type GalleryCardProps = {
  readonly item: GalleryItem;
  /** Tailles next/image — aperçu rail vs grille page. */
  readonly sizes?: string;
  readonly titleAs?: "h3" | "p";
};

const DEFAULT_SIZES =
  "(max-width: 430px) 82vw, (max-width: 768px) 48vw, (max-width: 1024px) 30vw, 23vw";

/**
 * Carte d’inspiration galerie — Server Component (ou enfant d’un Client).
 * Image dominante + titre bas ; aucun lien ni CTA individuel.
 */
export function GalleryCard({ item, sizes = DEFAULT_SIZES, titleAs = "h3" }: GalleryCardProps) {
  const TitleTag = titleAs;
  const objectPosition = item.objectPosition ?? "center";

  return (
    <article className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black shadow-soft">
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={sizes}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 px-4 py-3 sm:px-5 sm:py-4">
        <TitleTag className="line-clamp-2 break-words font-display text-base font-semibold tracking-tight text-balance text-on-dark sm:text-lg">
          {item.title}
        </TitleTag>
      </div>
    </article>
  );
}
