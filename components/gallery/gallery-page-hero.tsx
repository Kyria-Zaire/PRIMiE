import Image from "next/image";
import { galleryCopy } from "@/content/gallery";

/** Portrait Hero dédié — WebP alpha depuis `images/gallery/tresses-longues.png`. */
export const GALLERY_HERO_PORTRAIT = {
  src: "/images/gallery/gallery-hero-model-v1.webp",
  width: 1024,
  height: 1536,
} as const;

function CrownMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 text-gold sm:size-6 lg:mx-auto"
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

function GoldSwirlsLeft() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-4 left-0 hidden h-[70%] w-[38%] text-gold/40 lg:block"
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      <path d="M48 68l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function GoldSwirlsRight() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-8 hidden h-[55%] w-[28%] text-gold/30 lg:block"
      viewBox="0 0 260 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMax meet"
    >
      <path
        d="M40 40C90 80 120 20 180 50C220 70 240 120 250 160"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M20 200C80 170 140 220 200 190" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function GoldSwirlsMobile() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-2 h-40 w-full text-gold/30 lg:hidden"
      viewBox="0 0 390 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin slice"
    >
      <path d="M10 90C70 30 140 20 200 70" stroke="currentColor" strokeWidth="1.1" />
      <path d="M280 20C330 50 360 30 385 70" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Zone éditoriale + portrait détouré du Hero `/galerie` — Server Component.
 * Les filtres sont injectés par le parent client dans le même `<header>`.
 */
export function GalleryPageHero() {
  const copy = galleryCopy.page;

  return (
    <div className="relative mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
      <GoldSwirlsMobile />
      <GoldSwirlsLeft />
      <GoldSwirlsRight />

      <div className="relative min-h-[280px] pt-8 pb-2 sm:min-h-[300px] sm:pt-10 lg:flex lg:min-h-[340px] lg:max-h-[400px] lg:items-center lg:pt-8 lg:pb-3 xl:min-h-[360px] xl:max-h-[420px]">
        <div className="relative z-10 w-[58%] max-w-[17rem] text-left sm:w-[55%] sm:max-w-xs lg:mx-auto lg:w-[68%] lg:max-w-2xl lg:pr-[28%] lg:text-center">
          <div className="mb-3 flex lg:justify-center">
            <CrownMark />
          </div>

          <h1
            id="galerie-page-heading"
            className="font-display text-[2rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
          >
            <span className="block text-foreground">Galerie</span>
            <span className="block bg-cta-gold bg-clip-text text-transparent">d’inspirations</span>
          </h1>

          <p className="mt-3 font-script text-xl leading-snug text-bronze sm:text-2xl lg:mt-4 lg:whitespace-nowrap lg:text-[1.65rem]">
            {copy.accent}
          </p>

          <span
            aria-hidden="true"
            className="mt-3 flex items-center gap-2 text-gold lg:mt-4 lg:justify-center"
          >
            <span className="h-px w-8 bg-gold/70 sm:w-10" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-8 bg-gold/70 sm:w-10" />
          </span>

          <p className="mt-3 max-w-[18rem] font-sans text-xs leading-relaxed text-muted-foreground sm:max-w-[22rem] sm:text-sm lg:mx-auto lg:mt-4 lg:max-w-md lg:text-sm">
            {copy.description}
          </p>
        </div>

        <div
          className="pointer-events-none absolute right-0 bottom-0 z-[5] w-[46%] max-w-[11.5rem] sm:max-w-[13.5rem] md:max-w-[15rem] lg:top-0 lg:right-4 lg:bottom-0 lg:z-10 lg:flex lg:w-[32%] lg:max-w-[17rem] lg:items-end xl:right-6 xl:max-w-[18.5rem]"
          aria-hidden="true"
        >
          <Image
            src={GALLERY_HERO_PORTRAIT.src}
            alt=""
            width={GALLERY_HERO_PORTRAIT.width}
            height={GALLERY_HERO_PORTRAIT.height}
            priority
            unoptimized
            sizes="(max-width: 1023px) 46vw, 32vw"
            className="h-auto w-full object-contain object-bottom [mask-image:linear-gradient(180deg,#000_68%,transparent)] lg:max-h-full lg:[mask-image:linear-gradient(180deg,#000_78%,transparent)]"
          />
        </div>
      </div>
    </div>
  );
}
