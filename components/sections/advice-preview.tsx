import Image from "next/image";
import { AdviceCard } from "@/components/advice/advice-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { advice, adviceCopy, adviceDecorativePortrait } from "@/content/advice";

const PORTRAIT = {
  src: adviceDecorativePortrait.src,
  width: adviceDecorativePortrait.width,
  height: adviceDecorativePortrait.height,
} as const;

function BotanicalOrnaments() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-0 hidden h-[42%] w-[20%] text-gold/28 lg:block"
        viewBox="0 0 280 420"
        fill="none"
        preserveAspectRatio="xMinYMid meet"
      >
        <path
          d="M40 60C70 40 95 70 110 110C130 165 95 200 70 230"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <path
          d="M55 95C90 85 115 120 125 155"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.75"
        />
        <path
          d="M30 180C75 150 120 195 150 230C175 258 165 300 140 330"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-0 h-20 w-[38%] text-gold/20 sm:h-24 lg:hidden"
        viewBox="0 0 220 140"
        fill="none"
        preserveAspectRatio="xMaxYMin meet"
      >
        <path d="M40 30C90 10 140 45 190 25" stroke="currentColor" strokeWidth="1" />
        <path
          d="M60 70C110 50 155 85 200 65"
          stroke="currentColor"
          strokeWidth="0.85"
          opacity="0.7"
        />
      </svg>
    </>
  );
}

/**
 * Aperçu Conseils `#conseils` — Server Component.
 * Section éditoriale statique : aucun lien, CTA ni route page Conseils.
 * Placement : GalleryPreview → AdvicePreview → FAQ.
 * Desktop (lg+) : intro alignée sur la grille 3 colonnes des cartes.
 */
export function AdvicePreview() {
  return (
    <Section
      id="conseils"
      tone="paper"
      spacing="none"
      className="relative isolate overflow-x-clip pt-4 pb-10 sm:pt-5 sm:pb-10 lg:pt-6 lg:pb-12"
      aria-labelledby="conseils-heading"
    >
      <BotanicalOrnaments />

      <Container className="relative z-10 flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <div
          data-advice-intro
          className="relative min-h-[11rem] sm:min-h-[12.5rem] lg:grid lg:min-h-0 lg:grid-cols-3 lg:items-start lg:gap-5"
        >
          <div className="relative z-10 flex w-[58%] max-w-[19rem] flex-col items-start gap-2 text-left sm:w-[57%] sm:max-w-sm sm:gap-2 lg:col-span-2 lg:w-full lg:max-w-none lg:gap-2.5">
            <p className="font-sans text-[0.7rem] font-medium tracking-[0.2em] text-gold sm:text-xs">
              <span className="uppercase">{adviceCopy.eyebrowLead}</span>{" "}
              <span>{adviceCopy.eyebrowBrand}</span>
            </p>

            <h2
              id="conseils-heading"
              className="font-display text-[1.55rem] leading-[1.08] font-semibold tracking-tight sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem]"
            >
              <span className="text-balance text-foreground">
                {adviceCopy.titleLead} <span className="text-gold">{adviceCopy.titleAccent}</span>
              </span>
              <span className="mt-0.5 block text-balance text-foreground sm:mt-1">
                {adviceCopy.titleEnd}
              </span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-0.5 h-px w-12 bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] lg:w-14"
            />

            <p className="max-w-[16rem] font-sans text-sm leading-[1.45] text-muted-foreground sm:max-w-[22rem] sm:text-base lg:max-w-xl">
              {adviceCopy.description}
            </p>
          </div>

          <div
            data-advice-portrait
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-[5] w-[42%] max-w-[11.5rem] sm:w-[41%] sm:max-w-[13.5rem] md:max-w-[14.5rem] lg:relative lg:col-span-1 lg:top-auto lg:right-auto lg:bottom-auto lg:z-10 lg:flex lg:w-full lg:max-w-[17.5rem] lg:items-end lg:self-end lg:justify-self-end xl:max-w-[19rem]"
          >
            <Image
              src={PORTRAIT.src}
              alt=""
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              sizes="(max-width: 1023px) 42vw, 32vw"
              className="h-auto w-full object-contain object-bottom [mask-image:linear-gradient(90deg,transparent_0%,#000_28%,#000_100%),linear-gradient(180deg,#000_42%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:max-h-[14.5rem] xl:max-h-[15.5rem] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_100%),linear-gradient(180deg,#000_66%,transparent_100%)]"
            />
          </div>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-3.5 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {advice.map((item) => (
            <li key={item.id} className="min-w-0">
              <AdviceCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
