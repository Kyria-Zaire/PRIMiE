import Image from "next/image";
import type { AdviceItem } from "@/content/types";

export type AdviceCardProps = {
  readonly item: AdviceItem;
  /** Tailles next/image — aperçu landing. */
  readonly sizes?: string;
};

const DEFAULT_SIZES = "(max-width: 1023px) 39vw, 30vw";

/** Cadrages distincts — carte 02 ≠ portrait décoratif d’intro. */
const OBJECT_POSITION: Record<AdviceItem["id"], string> = {
  "preparation-cheveux": "50% 42%",
  "entretien-tresses": "42% 28%",
  /** Portrait Gallery deep wave — visage et longueurs dans le crop 3/2. */
  "soin-perruque": "50% 22%",
};

/**
 * Carte Conseils — Server Component.
 * Aperçu éditorial uniquement : aucun lien, bouton ni CTA.
 */
export function AdviceCard({ item, sizes = DEFAULT_SIZES }: AdviceCardProps) {
  return (
    <article className="relative flex h-full min-h-[11rem] cursor-default flex-row overflow-hidden rounded-2xl border border-bronze/35 bg-background shadow-soft sm:min-h-[11.875rem] lg:min-h-0 lg:flex-col">
      <div className="relative w-[38%] shrink-0 self-stretch sm:w-[39%] lg:aspect-[3/2] lg:w-full">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION[item.id] }}
        />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-4 pr-4 pl-6 sm:gap-2 sm:pr-5 sm:pl-7 lg:items-center lg:gap-2 lg:px-5 lg:pt-8 lg:pb-6 lg:text-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 z-[1] flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze/40 bg-background font-display text-xs font-semibold tracking-wide text-foreground shadow-soft sm:size-9 sm:text-sm lg:top-0 lg:left-1/2 lg:z-10 lg:size-10 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-sm"
        >
          {item.number}
        </span>

        <p className="font-sans text-[0.6875rem] font-medium tracking-[0.18em] text-gold uppercase sm:text-xs">
          {item.category}
        </p>

        <h3 className="font-display text-[0.9375rem] leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-lg lg:text-xl">
          {item.title}
        </h3>

        <p className="font-sans text-sm leading-[1.45] text-muted-foreground sm:text-[0.9375rem] lg:text-[0.9375rem]">
          {item.summary}
        </p>
      </div>
    </article>
  );
}
