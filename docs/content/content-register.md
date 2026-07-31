# Registre de contenus PRiMiE

Document public versionnable. Statuts : `VALIDATED` · `PO_APPROVED_SEED` ·
`ACTIVATED` · `ACTIVATED_BOOKING_ONLY` · `PENDING_PRISCA` · `BLOCKED_ASSET` ·
`REJECTED_FOR_PUBLICATION`.

Les preuves privées (consentements, conversations, identité) restent hors dépôt.

| Élément | Valeur / résumé | Statut | Autorité | Date | Destination code | Blocker | Prochaine action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Graphie `PRiMiE` | Marque courte officielle | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Nom commercial | Chez PRiMiE Coiffure | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Activité | Coiffure et beauté afro à domicile | VALIDATED | CTO / métier | 2026-07-31 | `site-config.ts` | — | — |
| Téléphone / WhatsApp | Canoniques | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Slogan | Révélez votre beauté, une coiffure à la fois. | ACTIVATED | PO / CTO | 2026-07-31 | Hero via `siteConfig.brand.slogan` | — | — |
| 6 titres services | Liste do-not-break | VALIDATED | CTO / métier | 2026-07-31 | `services.ts` | — | — |
| 6 descriptions services | Seed PO exactes | ACTIVATED | PO / CTO | 2026-07-31 | cartes Services | — | — |
| Prix / durées | Non publiés | PENDING_PRISCA | Prisca | 2026-07-31 | — | Décision métier | Rester hors runtime public |
| Message WhatsApp prérempli | Bonjour Prisca… devis | ACTIVATED_BOOKING_ONLY | PO / CTO | 2026-07-31 | Header / Hero / Booking (+ menu mobile) | Contact/Footer sans `?text=` | — |
| FAQ (5 Q/R) | Seed prudente | ACTIVATED | PO / CTO | 2026-07-31 | `#faq` + nav | — | — |
| Logo visuel | Retenu en principe V1 | BLOCKED_ASSET | PO / CTO | 2026-07-31 | `public/brand/` (futur) | Fichier prêt + variantes | 01D / asset gate |
| Photo Hero | Absente | BLOCKED_ASSET | Prisca | 2026-07-31 | Hero | Photo + autorisation | Conserver Hero CSS |
| Galerie | `[]` | BLOCKED_ASSET | Prisca | 2026-07-31 | `gallery.ts` | ≥4 réalisations + droits | Collecte 01D |
| Témoignages | `[]` | PENDING_PRISCA | Prisca | 2026-07-31 | `testimonials.ts` | Texte + consentement | Collecte 01D |
| Pistes avis (prénoms seuls) | Olive, Octavie, Annaelle, Plamédie — pistes uniquement | PENDING_PRISCA | PO | 2026-07-31 | registre seulement | Pas de texte/consentement | Demander textes exacts |
| Pourquoi choisir PRiMiE | 5 brouillons PO | PENDING_PRISCA | Prisca | 2026-07-31 | futur `benefits.ts` | Non créé | Validation Prisca |
| Horaires proposés | Lun–sam 09h–19h sur RDV | PENDING_PRISCA | Prisca | 2026-07-31 | — | Non publiés | Confirmer avant runtime |
| Dimanche | Non confirmé | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer ou rester masqué |
| Zone | Domicile OK, zone précise non | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer formulation |
| Réseaux sociaux | En création, aucun lien | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Attendre URL publiques |
| Mentions légales | Absentes | PENDING_PRISCA | Prisca / CTO | 2026-07-31 | — | Production | Gate Release |
| Domaine | Non confirmé | PENDING_PRISCA | CTO | 2026-07-31 | — | SEO / Prod | Décision domaine |

## Politiques

- Galerie « Nos réalisations » : uniquement vraies réalisations ; pas d’illustration / stock / IA présentée comme réalisation.
- Témoignages : aucun prénom runtime sans texte exact et consentement.
- Preuves de consentement : hors `public/` et hors ce registre détaillé.
- CTA Contact et Footer : WhatsApp sans message prérempli.
