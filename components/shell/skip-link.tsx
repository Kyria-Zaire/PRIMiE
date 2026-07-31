/**
 * Lien d’évitement — premier focusable de la page, avant le Header.
 */
export function SkipLink() {
  return (
    <a
      href="#contenu-principal"
      className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[var(--z-mobile-nav)] focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center focus-visible:rounded-md focus-visible:bg-cta-gold focus-visible:px-4 focus-visible:font-sans focus-visible:text-sm focus-visible:font-semibold focus-visible:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
    >
      Aller au contenu principal
    </a>
  );
}
