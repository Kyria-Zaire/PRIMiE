---
paths:
  - "app/**/*.{ts,tsx}"
  - "components/**/*.tsx"
  - "lib/**/*.ts"
  - "content/**/*.ts"
  - "tests/**/*"
  - "e2e/**/*"
  - "*.config.ts"
  - "package.json"
---

# Tests et assurance qualité

## 1. Objectif
Les tests doivent protéger ce qui compte pour PRiMiE :

- comprendre les prestations ;
- voir les réalisations ;
- naviguer sans blocage sur mobile ;
- appeler ou ouvrir WhatsApp avec le bon numéro ;
- utiliser le site au clavier et avec des technologies d’assistance ;
- conserver le rendu validé ;
- livrer sans erreur de build, de contenu ou de console.

La quantité de tests n’est pas un objectif.

Chaque test doit couvrir un risque utilisateur, métier ou technique identifiable.

---

## 2. Périmètre V1
PRiMiE est une landing page sans :

- authentification ;
- compte ;
- formulaire ;
- paiement ;
- API métier ;
- base de données ;
- espace d’administration.

Ne pas créer de mocks, fixtures ou scénarios pour des fonctionnalités absentes.

Adapter la stratégie si le périmètre évolue.

---

## 3. Pile de test
Utiliser :

| Niveau | Outil | Rôle |
| --- | --- | --- |
| Statique | TypeScript, ESLint | Types, imports et règles de code |
| Unitaire | Vitest | Fonctions et données déterministes |
| Composant | React Testing Library + Vitest | Rendu et interactions isolées |
| End-to-end | Playwright | Parcours dans un vrai navigateur |
| Accessibilité | `@axe-core/playwright` + revue manuelle | Erreurs automatisables et usage réel |
| Visuel | Captures Playwright ciblées | Régressions de mise en page |

Ne pas ajouter Jest, Cypress ou un second outil couvrant le même besoin sans
raison documentée.

---

## 4. Scripts attendus
Le `package.json` doit proposer des commandes cohérentes :

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "build": "next build"
  }
}
```

Adapter les commandes à la configuration et aux versions réellement installées.

Une commande documentée doit exister et réussir.

Ne pas conserver un script fictif.

---

## 5. Tests orientés utilisateur
Interagir comme une utilisatrice :

```ts
screen.getByRole("button", { name: /réserver/i });
page.getByRole("link", { name: /whatsapp/i });
page.getByRole("heading", { name: /nos prestations/i });
```

Priorité des sélecteurs :

1. rôle et nom accessible ;
2. label ;
3. texte visible ;
4. placeholder si nécessaire ;
5. `data-testid` en dernier recours.

Ne pas cibler :

- classes CSS ;
- chemins DOM ;
- sélecteurs XPath ;
- identifiants générés ;
- structure interne d’un composant.

Un test difficile à écrire avec les rôles accessibles peut révéler un problème
de sémantique dans l’interface.

---

## 6. Tests unitaires
Réserver les tests unitaires à la logique déterministe, par exemple :

- construction d’une URL WhatsApp ;
- encodage d’un message ;
- normalisation du numéro de téléphone ;
- validation d’une configuration de navigation ;
- transformation d’une liste de services ;
- génération de métadonnées structurées ;
- utilitaires de classes conditionnelles si une logique réelle existe.

Pour chaque fonction :

- cas nominal ;
- limite utile ;
- entrée invalide si elle est acceptée par l’API ;
- caractères spéciaux et accents lorsque pertinents ;
- résultat observable, pas étapes internes.

Ne pas tester isolément un composant purement statique si un test de page couvre
déjà le risque.

---

## 7. Tests de composants
Tester les composants interactifs :

- menu mobile ;
- FAQ accordéon ;
- boutons de contact ;
- galerie si elle comporte navigation ou lightbox ;
- tout composant conditionnel futur.

Pour la FAQ, vérifier au minimum :

- libellé accessible ;
- état fermé initial si c’est le choix produit ;
- ouverture au clic ;
- fermeture selon le comportement prévu ;
- navigation clavier ;
- relation correcte entre déclencheur et panneau.

Pour le menu mobile :

- ouverture et fermeture ;
- focus utilisable ;
- fermeture après sélection d’une ancre ;
- attribut `aria-expanded` cohérent ;
- absence de contenu interactif inaccessible.

---

## 8. Parcours end-to-end obligatoires
### Page d’accueil
- `/` répond et affiche le contenu principal ;
- un seul `h1` décrit l’activité ;
- les sections attendues sont présentes ;
- les images importantes se chargent ;
- aucun écran vide ou erreur d’hydratation ;
- aucune erreur console inattendue.

### Navigation
- les liens du header ciblent des identifiants existants ;
- chaque ancre amène à la bonne section ;
- le logo ou lien d’accueil revient au début ;
- la navigation reste utilisable au clavier ;
- le menu mobile n’empêche pas le scroll après fermeture.

### Conversion
- tous les CTA WhatsApp pointent vers `https://wa.me/33749616582` ;
- le message prérempli est correctement encodé lorsqu’il existe ;
- tous les liens d’appel utilisent `tel:+33749616582` ;
- le libellé visible permet de comprendre l’action ;
- les CTA principaux restent accessibles sur petit écran.

Ne pas ouvrir WhatsApp ou déclencher réellement un appel dans les tests.

Vérifier le `href` produit : le service externe n’est pas sous notre contrôle.

---

## 9. Contrat de contenu
Les tests doivent détecter une régression sur les faits validés :

```ts
const expectedServices = [
  "Tresses & coiffure femme et homme",
  "Traitement de perruque",
  "Pose perruque",
  "Look & twist",
  "Vente et pose de perruques",
  "Tissage",
];
```

Vérifier également :

- nom `Chez PRiMiE Coiffure` ;
- téléphone `+33 7 49 61 65 82` ;
- absence de texte provisoire ;
- absence d’adresse, tarif, horaire ou avis inventé ;
- cohérence entre contenu affiché et configuration centrale.

Préférer un test de schéma ou de configuration à six assertions répétées dans
plusieurs composants.

---

## 10. Responsive et appareils
Tester au minimum :

| Profil | Viewport indicatif | Risque visé |
| --- | --- | --- |
| Petit mobile | `320 × 568` | Débordement et CTA |
| Mobile courant | `390 × 844` | Parcours principal |
| Tablette | `768 × 1024` | Grille et navigation |
| Desktop | `1440 × 900` | Composition complète |

Les valeurs servent de points de contrôle, pas de liste exhaustive de téléphones.

À chaque viewport, vérifier :

- aucun scroll horizontal ;
- texte sans coupure ;
- boutons tactiles utilisables ;
- galerie sans chevauchement ;
- navigation ou menu mobile adapté au breakpoint ;
- CTA non masqué ;
- zoom navigateur à `200 %` lors de la revue manuelle.

Utiliser les projets et appareils Playwright pour les parcours critiques.

Ne pas dupliquer toute la suite sur chaque viewport si quelques tests paramétrés
couvrent le risque.

Chromium suffit pour la boucle rapide.

Avant livraison, exécuter les parcours critiques sur Chromium, Firefox, WebKit
et un profil mobile tactile.

---

## 11. Accessibilité automatisée
Scanner avec `@axe-core/playwright` :

- page d’accueil chargée ;
- menu mobile ouvert ;
- FAQ ouverte ;
- galerie ou lightbox dans chaque état interactif ;
- composants ajoutés ultérieurement.

Exemple :

```ts
const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();

expect(results.violations).toEqual([]);
```

Ne pas désactiver globalement une règle axe.

Toute exclusion est :

- ciblée ;
- expliquée ;
- liée à une dette suivie ;
- retirée dès correction.

Un scan automatisé ne remplace jamais la revue manuelle.

---

## 12. Accessibilité manuelle
Avant livraison, vérifier :

- parcours complet au clavier ;
- ordre de focus logique ;
- focus visible ;
- lien d’évitement ;
- annonce correcte des boutons et liens ;
- structure des titres ;
- alternatives des images ;
- contraste des textes et contrôles ;
- contenu utilisable avec zoom `200 %` ;
- mode paysage mobile ;
- préférence `prefers-reduced-motion: reduce` ;
- compréhension sans dépendre uniquement de la couleur.

Tester au moins une fois avec un lecteur d’écran disponible sur le système de
validation.

---

## 13. Régression visuelle
Les captures de référence sont réservées aux zones à forte valeur visuelle :

- page complète mobile ;
- page complète desktop ;
- Hero ;
- galerie ;
- menu mobile ouvert ;
- FAQ ouverte si son rendu est significatif.

Pour rendre les captures stables :

- utiliser la même plateforme en local et en CI ;
- attendre les polices et images ;
- désactiver ou figer les animations ;
- utiliser des données fixes ;
- masquer uniquement les zones réellement non déterministes ;
- fixer viewport et thème.

Ne jamais mettre à jour automatiquement les références après un échec.

Examiner le diff puis accepter la nouvelle capture uniquement si le changement
est volontaire.

Une capture ne remplace pas une assertion fonctionnelle.

---

## 14. Erreurs réseau et console
Un test de smoke doit collecter :

- erreurs JavaScript non gérées ;
- erreurs console de niveau `error` ;
- requêtes internes échouées ;
- images non chargées ;
- erreurs d’hydratation.

Filtrer uniquement les messages tiers connus et justifiés.

Une liste d’exclusion générique masque les régressions.

Ne pas faire échouer la suite à cause d’une navigation réelle vers WhatsApp.

Vérifier la destination sans tester le serveur tiers.

---

## 15. Isolation et stabilité
Chaque test doit :

- fonctionner seul ;
- partir d’un état propre ;
- ne pas dépendre de l’ordre d’exécution ;
- utiliser des données déterministes ;
- éviter l’heure, le réseau externe et les valeurs aléatoires non contrôlées ;
- nettoyer les mocks et timers ;
- produire le même résultat localement et en CI.

Interdictions :

- sommeil arbitraire ;
- retry utilisé pour cacher un test instable ;
- dépendance à WhatsApp, Google Fonts ou un autre serveur tiers ;
- partage d’état mutable entre tests ;
- assertion conditionnelle qui peut ne jamais s’exécuter.

Utiliser l’auto-attente et les assertions web-first de Playwright.

Un test flaky est un défaut à corriger, pas une gêne à relancer jusqu’au vert.

---

## 16. Couverture
La couverture sert à repérer les zones oubliées, pas à obtenir un badge.

Règles :

- définir explicitement les fichiers inclus dans la couverture ;
- inclure `lib/`, les helpers et la logique de contenu ;
- exclure les fichiers générés et de configuration ;
- ne pas imposer `100 %` à la landing page ;
- examiner branches non couvertes et fonctions critiques ;
- refuser les tests sans assertion ajoutés uniquement pour augmenter le score.

Objectif initial pour la logique testable :

| Mesure | Seuil indicatif |
| --- | --- |
| Lignes | `80 %` |
| Fonctions | `80 %` |
| Instructions | `80 %` |
| Branches | `75 %` |

Ces seuils ne dispensent pas des parcours E2E ni de la QA manuelle.

---

## 17. CI et artefacts
À chaque pull request ou changement équivalent :

1. installation avec lockfile figé ;
2. lint ;
3. typecheck ;
4. tests Vitest ;
5. build Next.js ;
6. smoke E2E Chromium.

Avant mise en production :

1. suite E2E multi-navigateurs ;
2. accessibilité automatisée ;
3. comparaison visuelle ;
4. revue manuelle ;
5. contrôle des liens, contenus et médias.

Conserver en cas d’échec :

- trace Playwright ;
- capture ;
- vidéo si utile ;
- rapport HTML ;
- message d’erreur complet sans secret.

Ne pas publier systématiquement des artefacts lourds lorsque tout passe.

---

## 18. Checklist QA de livraison
### Automatique
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` et
      `pnpm test:e2e`
- [ ] aucun test ignoré sans justification
- [ ] aucun snapshot mis à jour sans revue

### Fonctionnel
- [ ] toutes les sections attendues sont présentes
- [ ] navigation desktop et mobile
- [ ] FAQ utilisable
- [ ] galerie utilisable
- [ ] téléphone exact
- [ ] WhatsApp exact
- [ ] aucun contenu inventé

### Visuel et responsive
- [ ] viewports `320 × 568`, `390 × 844`, `768 × 1024` et `1440 × 900`
- [ ] zoom `200 %` et mode paysage mobile
- [ ] aucun débordement horizontal

### Accessibilité
- [ ] clavier, ordre et visibilité du focus
- [ ] titres, alternatives et contraste
- [ ] zoom et mouvement réduit
- [ ] axe sans violation non acceptée

### Technique
- [ ] aucune erreur console, ressource interne ou image cassée
- [ ] aucun secret ni traceur inattendu

---

## 19. Definition of Done
Une fonctionnalité est terminée lorsque :

- ses critères d’acceptation, cas critiques et limites sont explicites ;
- le niveau de test correspond au risque ;
- les tests vérifient un comportement utilisateur ;
- lint, types, tests et build passent ;
- les parcours téléphone, WhatsApp et responsive restent corrects ;
- l’accessibilité automatisée et manuelle pertinente est validée ;
- aucune régression visuelle non voulue n’est acceptée ;
- aucune erreur console ou réseau interne ne subsiste.

---

## 20. Références officielles
- Next.js — Testing : https://nextjs.org/docs/app/guides/testing
- Testing Library — About Queries : https://testing-library.com/docs/queries/about
- Playwright — Best Practices : https://playwright.dev/docs/best-practices
- Playwright — Accessibility Testing : https://playwright.dev/docs/accessibility-testing
- Vitest — Coverage : https://vitest.dev/guide/coverage
