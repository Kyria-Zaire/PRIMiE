import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import type { WigProduct, WigProductId } from "@/content/types";
import { wigSelectionCopy } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type WigCardProps = {
  readonly product: WigProduct;
  readonly index: 0 | 1 | 2;
  readonly sizes?: string;
};

const BADGES = ["01", "02", "03"] as const;

const OBJECT_POSITION: Record<WigProductId, string> = {
  "body-wave": "48% 18%",
  "deep-wave": "50% 16%",
  lisse: "50% 14%",
};

/** Mobile ~43 % image ; xl ~47 % image / 53 % contenu (R1-R2). */
const DEFAULT_SIZES = "(max-width: 1279px) 46vw, 16vw";

/**
 * Carte produit Sélection perruques — Server Component.
 * WIG-SALES-DESIGN-R1-R2 : contenu plus large, CTA ≤2 lignes, hauteurs égales.
 */
export function WigCard({ product, index, sizes = DEFAULT_SIZES }: WigCardProps) {
  const badge = BADGES[index];
  const whatsappUrl = buildWhatsAppUrl(product.inquiryMessage);
  const tariffNote = wigSelectionCopy.productTariffNote;

  return (
    <article
      data-wig-card
      className="relative flex h-full min-h-[16.75rem] flex-row overflow-hidden rounded-2xl border border-bronze/40 bg-background shadow-soft sm:min-h-[14rem] xl:min-h-[17.5rem]"
    >
      <div
        data-wig-card-media
        className="relative w-[43%] shrink-0 self-stretch sm:w-[44%] xl:w-[47%]"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION[product.id] }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 left-2.5 z-[1] flex size-8 items-center justify-center rounded-full border border-gold/55 bg-background/95 font-display text-xs font-semibold tracking-wide text-foreground shadow-soft sm:size-9 xl:top-3 xl:left-3"
        >
          {badge}
        </span>
      </div>

      <div
        data-wig-card-body
        className="relative flex min-w-0 flex-1 flex-col gap-2 px-3 py-3.5 sm:gap-2.5 sm:px-4 sm:py-4 xl:w-[53%] xl:px-5 xl:py-5"
      >
        <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
          <p className="font-sans text-xs font-medium tracking-[0.14em] text-gold uppercase sm:tracking-[0.16em]">
            {product.textureLabel}
          </p>

          <h3 className="font-display text-base leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-[1.0625rem] xl:text-lg">
            {product.name}
          </h3>

          <span aria-hidden="true" className="my-0.5 flex items-center gap-1.5 text-gold">
            <span className="h-px w-4 bg-gold/65" />
            <span className="size-1 rotate-45 bg-gold" />
            <span className="h-px w-4 bg-gold/65" />
          </span>

          <p className="font-sans text-xs leading-[1.45] text-muted-foreground sm:text-[0.8125rem] xl:text-sm">
            {product.shortDescription}
          </p>

          <p className="font-sans text-xs leading-snug text-bronze">{tariffNote}</p>
        </div>

        {/*
          CTA toujours ≤2 lignes : label en 2 spans + flèche à droite
          (jamais seule sur une 3e ligne). Texte ≥14 px (text-sm).
        */}
        <div data-wig-card-cta className="mt-auto pt-1">
          <LinkButton
            href={whatsappUrl}
            size="sm"
            variant="ghost"
            className="min-h-12 w-full flex-row items-center justify-center gap-1.5 rounded-md border border-bronze/55 px-2.5 text-center font-sans text-sm leading-snug text-foreground hover:bg-champagne/35 sm:px-3"
            aria-label={`Demander le tarif de la ${product.name} sur WhatsApp`}
          >
            <span
              data-wig-cta-label
              className="flex min-w-0 flex-col items-center justify-center text-center leading-[1.25]"
            >
              <span>Demander le tarif</span>
              <span>sur WhatsApp</span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 shrink-0 self-center text-bronze"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h9M8 4l4 4-4 4" />
            </svg>
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
