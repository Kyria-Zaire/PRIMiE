import { LinkButton } from "@/components/ui/button";
import { wigSelectionCopy } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * CTA global sélection perruques — Server Component.
 * WhatsApp générique via helper ; hauteur tactile ≥52 px.
 */
export function WigGlobalCta() {
  const label = wigSelectionCopy.globalCtaLabel;
  const href = buildWhatsAppUrl(wigSelectionCopy.globalInquiryMessage);

  return (
    <div data-wig-global-cta className="flex justify-center px-0 sm:px-4">
      <LinkButton
        href={href}
        variant="primary"
        size="lg"
        className="min-h-[3.25rem] w-full max-w-xl rounded-full px-6 text-[0.9375rem] tracking-wide text-primary-foreground sm:w-auto sm:min-w-[22rem] sm:px-10 sm:text-base"
        aria-label={`${label} sur WhatsApp`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4 shrink-0 sm:size-[1.125rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8h12l-1 11H7L6 8z" />
          <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
        <span data-wig-global-cta-label>{label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0 sm:size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h9M8 4l4 4-4 4" />
        </svg>
      </LinkButton>
    </div>
  );
}
