import Image from "next/image";
import { wigDecorativePortrait, wigSelectionCopy } from "@/content/wigs";

const PORTRAIT = {
  src: wigDecorativePortrait.src,
  width: wigDecorativePortrait.width,
  height: wigDecorativePortrait.height,
} as const;

function LotusMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 20"
      className="size-5 text-gold sm:size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 17c-3-3-5-6-5-9a5 5 0 0110 0c0 3-2 6-5 9z" />
      <path d="M9 14c-2.5-1.5-4-4-4-6.5A4.5 4.5 0 0114 4" />
      <path d="M19 14c2.5-1.5 4-4 4-6.5A4.5 4.5 0 0014 4" />
      <path d="M14 17v1.5" />
    </svg>
  );
}

function ValueIcon({ index }: { readonly index: number }) {
  const common = "size-4 shrink-0 text-gold sm:size-[1.125rem]";
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
        <path d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.9L12 14.8 7.7 16.5l.8-4.9L5 8.2l4.8-.7L12 3z" />
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
        <path d="M12 4a14 14 0 010 16M12 4a14 14 0 000 16M4 12h16" />
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
        <path d="M6 8h12v11H6z" />
        <path d="M9 8V6a3 3 0 016 0v2" />
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

function WigDecorations() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-1 right-[-1%] hidden h-[85%] w-[46%] text-gold/40 lg:block"
        viewBox="0 0 280 520"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
      >
        <path
          d="M220 24C168 68 178 148 204 204C236 276 182 336 142 392"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M242 88C190 122 196 188 218 242"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.8"
        />
        <path
          d="M252 168C208 214 218 300 240 356C252 386 228 436 188 470"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M188 58c18 10 28 28 24 46M204 74c-10 14-8 30 2 42"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] right-[14%] hidden h-32 w-32 lg:block"
      >
        <span className="absolute top-1 left-3 size-1.5 rounded-full bg-gold/45" />
        <span className="absolute top-8 left-14 size-1 rounded-full bg-gold/32" />
        <span className="absolute top-16 left-2 size-1.5 rounded-full bg-gold/38" />
        <span className="absolute top-5 left-[4.5rem] size-1 rounded-full bg-gold/28" />
        <span className="absolute top-[5.25rem] left-10 size-1 rounded-full bg-gold/30" />
      </div>
    </>
  );
}

/**
 * Intro éditoriale `#perruques` — Server Component.
 * WIG-SALES-DESIGN-R1-R2 : 2×2 jusqu’à xl (trunc=0 à 1024), portrait inchangé.
 */
export function WigEditorialHero() {
  const copy = wigSelectionCopy;

  return (
    <div
      data-wig-intro
      className="relative isolate flex flex-col gap-3 overflow-visible sm:gap-3.5 lg:block lg:min-h-[23rem] lg:max-h-[31.25rem] xl:min-h-[24.5rem]"
    >
      <div className="relative min-h-[17.5rem] sm:min-h-[19rem] lg:min-h-[23rem] xl:min-h-[24.5rem]">
        <WigDecorations />

        <div
          data-wig-intro-copy
          className="relative z-10 flex w-[48%] max-w-[17.5rem] flex-col items-start gap-2 text-left sm:w-[46%] sm:max-w-sm sm:gap-2.5 lg:w-[42%] lg:max-w-lg lg:gap-3 xl:max-w-xl"
        >
          <LotusMark />

          <p className="flex items-center gap-2 font-sans text-xs font-medium tracking-[0.18em] text-gold sm:tracking-[0.2em]">
            <span aria-hidden="true" className="hidden h-px w-5 shrink-0 bg-gold/60 sm:block" />
            <span className="whitespace-nowrap">
              <span className="uppercase">{copy.eyebrowLead}</span> <span>{copy.eyebrowBrand}</span>
            </span>
            <span aria-hidden="true" className="hidden h-px w-5 shrink-0 bg-gold/60 sm:block" />
          </p>

          <h2
            id="wig-selection-heading"
            className="font-display text-[1.55rem] leading-[1.08] font-semibold tracking-tight sm:text-[1.9rem] lg:text-[2.25rem] xl:text-[2.4rem]"
          >
            <span className="block text-balance text-foreground">{copy.titleLead}</span>
            <span className="mt-0.5 block text-balance text-gold">{copy.titleAccent}</span>
          </h2>

          <span aria-hidden="true" className="flex items-center gap-2 text-gold">
            <span className="h-px w-8 bg-gold/75 sm:w-10" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-8 bg-gold/75 sm:w-10" />
          </span>

          <p className="max-w-[15.5rem] font-sans text-xs leading-[1.5] text-muted-foreground sm:max-w-[20rem] sm:text-sm lg:max-w-md lg:text-[0.9375rem]">
            {copy.description}
          </p>
        </div>

        <div
          data-wig-portrait
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-[-4%] z-[5] aspect-[3/4] w-[52%] max-w-[16.75rem] sm:right-[-2%] sm:w-[54%] max-sm:min-h-[17rem] sm:max-w-[20.5rem] md:max-w-[22.5rem] lg:top-[-0.5rem] lg:right-[-0.75rem] lg:bottom-auto lg:w-[56%] lg:max-w-[30rem] lg:aspect-[4/5] xl:right-[-1rem] xl:w-[58%] xl:max-w-[34rem]"
        >
          {/*
            Cutout transparent Deep Wave 900×1350 : object-contain pour
            respecter la silhouette sans fond ni disque décoratif.
          */}
          <Image
            src={PORTRAIT.src}
            alt=""
            fill
            sizes="(max-width: 1023px) 54vw, 48vw"
            unoptimized
            className="z-[1] object-contain object-[center_top] drop-shadow-[0_12px_28px_rgb(0_0_0_/0.18)] [mask-image:linear-gradient(180deg,#000_72%,transparent_100%)]"
          />
          {/* Brouillard blanc bas — fondu léger sur la coupe du buste. */}
          <span
            data-wig-portrait-fog
            className="pointer-events-none absolute inset-x-[-6%] bottom-0 z-[2] h-[26%] bg-gradient-to-t from-white/90 from-[8%] via-white/35 via-[55%] to-transparent sm:h-[24%] lg:h-[22%]"
          />
        </div>
      </div>

      {/*
        2×2 de 320 à 1279 (lisibilité > 4 cols forcées).
        4 cols dès xl uniquement. Ancrée bas-gauche dès lg, sans chevaucher
        les cartes (gap section mesuré 16–24 px).
      */}
      <ul
        data-wig-values
        className="relative z-10 m-0 grid w-full list-none grid-cols-2 gap-x-4 gap-y-4 p-0 lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[min(46%,34rem)] lg:max-w-xl lg:gap-x-3 lg:gap-y-3 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-0 xl:divide-x xl:divide-bronze/30"
      >
        {copy.values.map((label, index) => (
          <li
            key={label}
            data-wig-value
            className="flex min-w-0 flex-col items-center gap-1.5 px-2 text-center sm:px-2.5 xl:px-3"
          >
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-background/85 sm:size-10"
            >
              <ValueIcon index={index} />
            </span>
            <span className="w-full font-sans text-[0.75rem] leading-snug font-medium tracking-wide text-balance hyphens-none [overflow-wrap:normal] [word-break:normal] text-foreground sm:text-xs">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
