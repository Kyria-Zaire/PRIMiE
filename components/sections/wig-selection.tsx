import Image from "next/image";
import { WigCard } from "@/components/wigs/wig-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getFeaturedWigs, wigDecorativePortrait, wigSelectionCopy } from "@/content/wigs";

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

function WigDecorations() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-0 hidden h-[62%] w-[34%] text-gold/22 lg:block"
        viewBox="0 0 260 480"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
      >
        <path
          d="M210 30C160 70 170 140 195 190C225 255 175 310 140 360"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M230 90C185 120 190 180 210 230"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.75"
        />
        <path
          d="M240 160C200 200 210 280 230 330C240 355 220 400 185 430"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[12%] right-[12%] hidden h-28 w-28 lg:block"
      >
        <span className="absolute top-1 left-3 size-1 rounded-full bg-gold/40" />
        <span className="absolute top-7 left-12 size-1.5 rounded-full bg-gold/28" />
        <span className="absolute top-14 left-1 size-1 rounded-full bg-gold/32" />
        <span className="absolute top-4 left-16 size-1 rounded-full bg-gold/22" />
        <span className="absolute top-[4.5rem] left-8 size-1 rounded-full bg-gold/25" />
      </div>
    </>
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

/**
 * Sélection de perruques `#perruques` — Server Component.
 * Corrective visuelle 01C-R2 : densités, portrait, CTA, graphie PRiMiE.
 */
export function WigSelection() {
  const products = getFeaturedWigs();
  const copy = wigSelectionCopy;

  return (
    <Section
      id="perruques"
      tone="cream"
      spacing="none"
      className="relative isolate overflow-x-clip pt-2 pb-2 sm:pt-3 sm:pb-3 lg:pt-0 lg:pb-1"
      aria-labelledby="wig-selection-heading"
    >
      <WigDecorations />

      <Container className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:gap-6">
        {/* Intro : une seule scène texte gauche + portrait droite */}
        <div
          data-wig-intro
          className="relative min-h-[16.75rem] sm:min-h-[17.75rem] lg:min-h-[22rem] xl:min-h-[24rem]"
        >
          <div
            data-wig-intro-copy
            className="relative z-10 flex w-[58%] max-w-[19rem] flex-col items-start gap-2 text-left sm:w-[52%] sm:max-w-sm sm:gap-2.5 lg:w-[48%] lg:max-w-xl lg:gap-2.5 xl:max-w-2xl"
          >
            <LotusMark />

            <p className="flex items-center gap-2 font-sans text-[0.65rem] font-medium tracking-[0.2em] text-gold sm:text-[0.7rem] sm:tracking-[0.22em]">
              <span aria-hidden="true" className="hidden h-px w-5 bg-gold/55 sm:block" />
              <span>
                <span className="uppercase">{copy.eyebrowLead}</span>{" "}
                <span>{copy.eyebrowBrand}</span>
              </span>
              <span aria-hidden="true" className="hidden h-px w-5 bg-gold/55 sm:block" />
            </p>

            <h2
              id="wig-selection-heading"
              className="font-display text-[1.45rem] leading-[1.05] font-semibold tracking-tight sm:text-[1.85rem] lg:text-[2.15rem] xl:text-[2.35rem]"
            >
              <span className="block text-balance text-foreground">{copy.titleLead}</span>
              <span className="mt-0.5 block text-balance text-gold">{copy.titleAccent}</span>
            </h2>

            <span aria-hidden="true" className="flex items-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold/70 sm:w-10" />
              <span className="size-1.5 rotate-45 bg-gold" />
              <span className="h-px w-8 bg-gold/70 sm:w-10" />
            </span>

            <p className="max-w-[16.5rem] font-sans text-[0.8125rem] leading-[1.45] text-muted-foreground sm:max-w-[22rem] sm:text-sm lg:max-w-md lg:text-[0.9375rem]">
              {copy.description}
            </p>

            <ul
              data-wig-values
              className="mt-1 grid w-full max-w-[17rem] list-none grid-cols-2 gap-x-2 gap-y-2.5 p-0 min-[390px]:max-w-none min-[390px]:grid-cols-4 min-[390px]:gap-0 sm:mt-1.5 lg:max-w-xl lg:divide-x lg:divide-bronze/25"
            >
              {copy.values.map((label, index) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-1 px-1 text-center min-[390px]:px-1.5 lg:px-2"
                >
                  <ValueIcon index={index} />
                  <span className="font-sans text-[0.625rem] leading-tight font-medium tracking-wide text-foreground sm:text-[0.6875rem]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-wig-portrait
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-[5] w-[54%] max-w-[13rem] sm:w-[56%] sm:max-w-[16.5rem] md:max-w-[18rem] lg:top-[-0.5rem] lg:right-[-0.5rem] lg:bottom-[-0.75rem] lg:w-[54%] lg:max-w-[26rem] xl:right-[-1rem] xl:max-w-[28rem]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[6%] right-[2%] z-0 hidden size-[94%] rounded-full border border-gold/30 lg:block"
            />
            <Image
              src={PORTRAIT.src}
              alt=""
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              unoptimized
              sizes="(max-width: 1023px) 54vw, 42vw"
              className="relative z-[1] h-full w-full object-contain object-right object-bottom [mask-image:linear-gradient(180deg,#000_72%,transparent)] lg:[mask-image:linear-gradient(180deg,#000_82%,transparent)]"
            />
          </div>
        </div>

        <ul
          data-wig-products
          className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-3.5 lg:grid-cols-3 lg:items-stretch lg:gap-4"
        >
          {products.map((product, index) => (
            <li key={product.id} className="min-w-0">
              <WigCard product={product} index={index as 0 | 1 | 2} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
