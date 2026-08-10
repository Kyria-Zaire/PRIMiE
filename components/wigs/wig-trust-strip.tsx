import { wigSelectionCopy } from "@/content/wigs";

function TrustIcon({ index }: { readonly index: number }) {
  const common = "size-4 text-gold sm:size-[1.125rem]";
  if (index === 0) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 8h16v10H4z" />
        <path d="M8 8V6h8v2" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 1.5" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4.5 11.5c1.8-4 5-6 7.5-6s5.7 2 7.5 6c-1.8 4-5 6-7.5 6s-5.7-2-7.5-6z" />
        <circle cx="12" cy="11.5" r="2.2" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3v3M8 7a6 6 0 108 0" />
      <path d="M9 14h6M10 17h4" />
    </svg>
  );
}

/**
 * Bandeau de réassurance factuel — Server Component.
 * WIG-SALES-DESIGN-R1-R1 : 2×2 mobile sûr, structure desktop plus présente.
 */
export function WigTrustStrip() {
  return (
    <ul
      data-wig-facts
      className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-bronze/25 bg-background/55 p-4 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-bronze/30 sm:px-2 sm:py-5 lg:px-3"
    >
      {wigSelectionCopy.trustItems.map((item, index) => (
        <li
          key={item.title}
          data-wig-fact
          className="flex min-w-0 flex-col items-center gap-2 px-2 text-center sm:px-3 lg:px-4"
        >
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-surface shadow-soft sm:size-11"
          >
            <TrustIcon index={index} />
          </span>
          <span className="w-full font-sans text-[0.75rem] leading-snug font-semibold tracking-wide text-balance hyphens-none [overflow-wrap:normal] [word-break:normal] text-foreground sm:text-[0.8125rem]">
            {item.title}
          </span>
          <span className="w-full font-sans text-[0.75rem] leading-snug text-balance hyphens-none [overflow-wrap:normal] [word-break:normal] text-muted-foreground sm:text-xs">
            {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}
