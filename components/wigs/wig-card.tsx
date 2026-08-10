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

const DEFAULT_SIZES = "(max-width: 1023px) 44vw, 15vw";

/**
 * Carte produit Sélection perruques — Server Component.
 * Micro-correctif 01C-R2-R1 : CTA ≤2 lignes à 320 px.
 */
export function WigCard({ product, index, sizes = DEFAULT_SIZES }: WigCardProps) {
  const badge = BADGES[index];
  const whatsappUrl = buildWhatsAppUrl(product.inquiryMessage);
  const ctaLabel = wigSelectionCopy.productCtaLabel;
  const ctaBreak = " sur ";
  const ctaBreakIndex = ctaLabel.lastIndexOf(ctaBreak);
  const ctaLine1 = ctaBreakIndex >= 0 ? ctaLabel.slice(0, ctaBreakIndex) : ctaLabel;
  const ctaLine2 = ctaBreakIndex >= 0 ? ctaLabel.slice(ctaBreakIndex + 1) : "";

  return (
    <article
      data-wig-card
      className="relative flex h-full min-h-[11.25rem] flex-row overflow-hidden rounded-2xl border border-bronze/35 bg-background shadow-soft sm:min-h-[12rem] lg:min-h-[17rem] lg:max-h-[18.125rem]"
    >
      <div className="relative w-[44%] shrink-0 self-stretch sm:w-[45%] lg:w-[42%]">
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
          className="pointer-events-none absolute top-2.5 left-2.5 z-[1] flex size-7 items-center justify-center rounded-full border border-bronze/45 bg-background/95 font-display text-[0.6875rem] font-semibold tracking-wide text-foreground shadow-soft sm:size-8 sm:text-xs"
        >
          {badge}
        </span>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-1 px-3 py-3 sm:gap-1.5 sm:px-3.5 sm:py-3.5 lg:px-4 lg:py-4">
        <p className="font-sans text-[0.625rem] font-medium tracking-[0.16em] text-gold uppercase sm:text-[0.6875rem] sm:tracking-[0.18em]">
          {product.textureLabel}
        </p>

        <h3 className="font-display text-[0.875rem] leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-[0.9375rem] lg:text-base">
          {product.name}
        </h3>

        <span aria-hidden="true" className="my-0.5 flex items-center gap-1 text-gold">
          <span className="h-px w-3.5 bg-gold/60" />
          <span className="size-1 rotate-45 bg-gold" />
          <span className="h-px w-3.5 bg-gold/60" />
        </span>

        <p className="font-sans text-[0.75rem] leading-[1.4] text-muted-foreground sm:text-[0.8125rem] lg:text-sm">
          {product.shortDescription}
        </p>

        <p className="font-sans text-[0.6875rem] leading-snug text-bronze sm:text-xs">
          Informations et tarif sur demande
        </p>

        <div className="mt-auto pt-1.5 sm:pt-2">
          <LinkButton
            href={whatsappUrl}
            size="sm"
            variant="ghost"
            className="min-h-11 w-full flex-col justify-center gap-0.5 border border-bronze/50 px-1.5 text-center text-xs leading-[1.25] text-foreground hover:bg-champagne/35 min-[390px]:flex-row min-[390px]:gap-1 sm:px-2 sm:text-[0.75rem] lg:px-2.5 lg:text-xs xl:text-[0.8125rem]"
            aria-label={`Demander le tarif de la ${product.name} sur WhatsApp`}
          >
            <span data-wig-cta-label className="min-w-0 text-center">
              <span className="block whitespace-nowrap min-[390px]:inline min-[390px]:whitespace-normal">
                {ctaLine1}
              </span>
              {ctaLine2 ? (
                <span className="block whitespace-nowrap min-[390px]:inline min-[390px]:whitespace-normal">
                  {" "}
                  {ctaLine2}
                </span>
              ) : null}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3 shrink-0 text-bronze sm:size-3.5"
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
