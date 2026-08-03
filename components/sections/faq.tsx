import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FaqSearchExperience } from "@/components/sections/faq-search-experience";
import { faq, faqCopy } from "@/content/faq";

/** Portrait FAQ — WebP alpha depuis `images/gallery/faux-locs-deesse.png`. */
const FAQ_PORTRAIT = {
  src: "/images/gallery/faq-portrait-faux-locs-deesse-v1.webp",
  width: 447,
  height: 558,
} as const;

function CrownMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 text-gold sm:size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18h18l-2-9-4 3-3-6-3 6-4-3-2 9z" />
      <path d="M5 18h14v2H5z" />
    </svg>
  );
}

function DiamondRule() {
  return (
    <div className="flex w-full max-w-[14rem] items-center gap-3 sm:max-w-md" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-soft-gold to-transparent" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-soft-gold to-transparent" />
    </div>
  );
}

function QuietLuxuryCurves() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 hidden h-[42%] w-[28%] text-gold/30 lg:block"
        viewBox="0 0 320 360"
        fill="none"
        preserveAspectRatio="xMinYMid meet"
      >
        <path
          d="M20 80C70 30 130 40 170 90C210 140 160 180 120 200"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M40 220C90 180 150 230 200 200C250 170 280 220 300 250"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-24 hidden h-[38%] w-[22%] text-gold/25 lg:block"
        viewBox="0 0 260 300"
        fill="none"
        preserveAspectRatio="xMaxYMax meet"
      >
        <path
          d="M40 40C90 80 120 20 180 50C220 70 240 120 250 160"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M20 200C80 170 140 220 200 190" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 h-28 w-full text-gold/22 lg:hidden"
        viewBox="0 0 390 160"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <path
          d="M20 40C80 10 140 55 200 30C260 5 320 40 370 25"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M40 90C110 60 170 110 240 80C300 55 340 95 380 85"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.7"
        />
      </svg>
    </>
  );
}

/**
 * Section FAQ — Server Component (FAQ-DESIGN-R1/R2 + ASSISTANT-EXPRESS-R1).
 * Client minimal : FaqSearchExperience (recherche / sujets / filtrage).
 */
export function Faq() {
  return (
    <Section
      id="faq"
      tone="cream"
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <QuietLuxuryCurves />

      <Container className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:gap-5">
        {/* Intro compacte — portrait hors flux (absolu), éditorial centré desktop */}
        <div
          data-faq-intro
          className="relative min-h-[16.5rem] sm:min-h-[18rem] lg:min-h-[17.5rem] lg:max-h-[21rem] xl:min-h-[18.5rem] xl:max-h-[22rem]"
        >
          <div className="relative z-10 flex w-[48%] max-w-[16rem] flex-col items-start gap-2.5 text-left sm:w-[50%] sm:max-w-xs sm:gap-3 lg:mx-auto lg:w-[68%] lg:max-w-2xl lg:items-center lg:pr-[30%] lg:text-center xl:pr-[32%]">
            <div className="flex lg:justify-center">
              <CrownMark />
            </div>

            <h2
              id="faq-heading"
              className="font-display text-[1.65rem] leading-[1.05] font-semibold tracking-[0.04em] text-balance uppercase sm:text-4xl lg:text-5xl xl:text-[3.1rem]"
            >
              <span className="block text-foreground">{faqCopy.titleLead}</span>
              <span className="mt-0.5 block bg-[linear-gradient(180deg,var(--color-champagne)_0%,var(--color-gold-light)_42%,var(--color-gold)_100%)] bg-clip-text text-transparent sm:mt-1">
                {faqCopy.titleAccent}
              </span>
            </h2>

            <DiamondRule />

            <p className="max-w-[15rem] font-sans text-sm leading-relaxed text-muted-foreground sm:max-w-[20rem] sm:text-base lg:mx-auto lg:max-w-md">
              {faqCopy.subtitle}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 z-[5] w-[52%] max-w-[12.5rem] sm:w-[50%] sm:max-w-[15rem] md:max-w-[16.5rem] lg:top-0 lg:right-0 lg:bottom-0 lg:z-10 lg:flex lg:w-[32%] lg:max-w-[17.5rem] lg:items-end xl:max-w-[19rem]"
          >
            <Image
              src={FAQ_PORTRAIT.src}
              alt=""
              width={FAQ_PORTRAIT.width}
              height={FAQ_PORTRAIT.height}
              unoptimized
              sizes="(max-width: 1023px) 52vw, 32vw"
              className="h-auto w-full object-contain object-bottom [mask-image:linear-gradient(180deg,#000_66%,transparent)] lg:max-h-full lg:[mask-image:linear-gradient(180deg,#000_76%,transparent)]"
            />
          </div>
        </div>

        <FaqSearchExperience items={faq} />
      </Container>
    </Section>
  );
}

/** Alias architecture — FaqSection = Faq. */
export const FaqSection = Faq;
