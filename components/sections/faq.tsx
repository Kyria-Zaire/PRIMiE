import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/faq";

/**
 * Section FAQ — Server Component.
 * Accordion HTML natif (`details`/`summary`) ; données : content/faq.ts.
 */
export function Faq() {
  return (
    <Section id="faq" tone="cream" aria-labelledby="faq-heading">
      <Container className="flex max-w-3xl flex-col gap-8 md:gap-10">
        <h2
          id="faq-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Questions fréquentes
        </h2>

        <div className="flex flex-col gap-3">
          {faq.map((item) => (
            <details
              key={item.id}
              className="group rounded-lg border border-bronze/30 bg-background open:border-soft-gold/50"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-sans text-base font-medium text-foreground marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:px-5 [&::-webkit-details-marker]:hidden">
                <span className="text-balance">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-6 shrink-0 items-center justify-center font-display text-lg leading-none text-bronze transition-transform duration-short ease-soft group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-bronze/20 px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
