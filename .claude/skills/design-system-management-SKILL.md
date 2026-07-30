---
name: design-system-management
description: Concevoir, maintenir, auditer ou faire évoluer le design system PRIMiE. Utiliser cette skill pour les tokens de couleur, typographie, espacement, grille, rayon, bordure, ombre, surface et mouvement, les variables CSS, le thème Tailwind, les variantes shadcn/ui ou Radix, la cohérence des composants, les contrastes, la gouvernance visuelle, les migrations de tokens et la détection des dérives d’interface.
---
# Design System Management PRIMiE
Maintenir une identité premium, chaleureuse, accessible et reproductible.
Transformer toute décision visuelle récurrente en règle ou token, sans créer une
bibliothèque générique disproportionnée pour une landing page.

## 1. Charger le contexte
Avant toute action :
1. lire `CLAUDE.md` ;
2. lire `04-design-system.mdc`, `05-ui-components.mdc`,
   `06-responsive.mdc`, `09-accessibility.mdc` et `do-not-break.mdc` ;
3. lire le brief, les critères d’acceptation et la maquette concernée ;
4. inspecter les styles globaux, le thème Tailwind et `components.json` ;
5. chercher les tokens, utilitaires, variantes et valeurs arbitraires existants ;
6. vérifier les composants consommateurs et leurs états ;
7. préserver le travail local inconnu.
Utiliser `rg --files` et `rg` pour inventorier les usages avant toute évolution.
Ne jamais déduire la source de vérité à partir d’un seul composant.

## 2. Respecter le mode demandé
Distinguer :
- **conception** : proposer une architecture de tokens sans modifier le code ;
- **création** : ajouter un token ou une famille confirmée ;
- **évolution** : changer une valeur avec analyse d’impact ;
- **migration** : remplacer progressivement un ancien contrat ;
- **audit** : relever les dérives sans les corriger ;
- **correction** : appliquer le plus petit changement cohérent ;
- **documentation** : aligner règles, exemples et noms sans refonte implicite.
Une demande de palette n’autorise pas une refonte complète. Une demande d’audit
n’autorise ni écriture, ni dépendance, ni déploiement.

## 3. Protéger le produit
Préserver :

```text
Marque : Chez PRIMiE Coiffure
Graphie courte : PRIMiE
Porteuse : Prisca
Téléphone : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
La V1 reste une landing page sans formulaire, calendrier, authentification,
dashboard, paiement, backend, CMS, chatbot ou tracking.
Conserver l’ordre officiel :
1. Header ;
2. Hero ;
3. Services ;
4. Galerie — Nos réalisations ;
5. Pourquoi me choisir ? ;
6. Avis clientes ;
7. FAQ ;
8. Réserver ;
9. Contact ;
10. Footer.

## 4. Défendre la direction artistique
PRIMiE doit évoquer :
- élégance ;
- soin ;
- féminité ;
- confiance ;
- savoir-faire afro ;
- service premium mais accessible.
Le luxe vient de la composition, de la photographie, de la typographie et de
l’espace. Le doré reste un accent. Éviter le template SaaS, le luxe froid, le
flyer surchargé et l’accumulation d’effets.
Toute décision visuelle doit être :
- lisible ;
- accessible ;
- responsive ;
- réutilisable ;
- nommée par son rôle ;
- vérifiable dans le code.

## 5. Définir une source de vérité
Avant de modifier un token, identifier :

```text
Règle de marque
  → primitive
  → token sémantique
  → variante de composant
  → usage dans une section
```
Une valeur ne doit pas être déclarée simultanément dans plusieurs thèmes,
fichiers CSS et composants. Choisir une source canonique adaptée à
l’implémentation réelle, puis faire consommer cette source.
Si le projet utilise les variables CSS de shadcn/ui, étendre ce système au lieu
d’ajouter un second thème parallèle. Si Tailwind lit les variables, ne pas
recopier les hexadécimaux dans chaque classe.

## 6. Structurer les tokens
Utiliser trois niveaux lorsque leur utilité est réelle :

```text
Primitif
  gold-500, ink-950, space-6
Sémantique
  background, foreground, primary, border
Composant
  button-primary-background, card-radius
```
Règles :
- le primitif exprime une valeur stable ;
- le sémantique exprime une intention ;
- le composant n’existe que si le rôle partagé ne suffit pas ;
- un composant consomme d’abord un rôle sémantique ;
- ne pas créer de niveau supplémentaire sans besoin démontré.
Éviter les noms comme `light-brown-2`, `new-gold`, `special-card-color` ou
`homepage-padding`.

## 7. Palette officielle
### Couleurs de marque

| Token | Valeur | Usage principal |
| --- | --- | --- |
| `ink` | `#0B0908` | Fond sombre principal |
| `charcoal` | `#191512` | Surface sombre secondaire |
| `espresso` | `#2A211B` | Hover et détails sombres |
| `gold` | `#C9A45C` | CTA et accents |
| `gold-light` | `#E5CC98` | Accent sur fond sombre |
| `cream` | `#F7F0E6` | Fond clair principal |
| `beige` | `#E8D8C3` | Surface claire secondaire |
| `sand` | `#D2B895` | Décor et surface chaude |
| `paper` | `#FFFDF8` | Surface la plus claire |
### Couleurs fonctionnelles

| Token | Valeur | Usage principal |
| --- | --- | --- |
| `text-dark` | `#17120F` | Texte sur fond clair |
| `text-light` | `#FFF9EF` | Texte sur fond sombre |
| `text-muted-dark` | `#6E6258` | Secondaire sur clair |
| `text-muted-light` | `#C9BDB0` | Secondaire sur sombre |
| `border-light` | `#D9C6AD` | Bordure sur clair |
| `border-dark` | `#493A2E` | Bordure sur sombre |
| `success` | `#356B4F` | Retour positif |
| `danger` | `#A5413E` | Erreur |
Avant d’ajouter une couleur :
1. décrire le rôle manquant ;
2. vérifier les tokens existants ;
3. tester les deux thèmes concernés ;
4. mesurer les contrastes ;
5. chercher les usages futurs réels ;
6. documenter la décision.

## 8. Utiliser des rôles sémantiques
Base recommandée :

```css
:root {
  --color-background: #fffdf8;
  --color-foreground: #17120f;
  --color-surface: #f7f0e6;
  --color-surface-muted: #e8d8c3;
  --color-primary: #c9a45c;
  --color-primary-foreground: #0b0908;
  --color-border: #d9c6ad;
  --color-muted-foreground: #6e6258;
}
.dark-section {
  --color-background: #0b0908;
  --color-foreground: #fff9ef;
  --color-surface: #191512;
  --color-surface-muted: #2a211b;
  --color-border: #493a2e;
  --color-muted-foreground: #c9bdb0;
}
```
Adapter les noms au thème installé. Ne pas dupliquer ces variables si un contrat
équivalent existe déjà.

## 9. Garantir les contrastes
Respecter WCAG 2.2 AA :
- texte standard : ratio minimal `4.5:1` ;
- grand texte : ratio minimal `3:1` ;
- composants et états graphiques essentiels : ratio minimal `3:1` ;
- `text-light` sur `ink`, `charcoal` ou `espresso` ;
- `text-dark` sur `cream`, `beige`, `sand` ou `paper` ;
- CTA doré avec texte `ink` ;
- CTA sombre avec texte `text-light`.
Ne pas utiliser `gold` pour un petit texte sur fond clair. Ne jamais transmettre
une information uniquement par la couleur. Vérifier hover, focus, active,
disabled, sélection et erreur, pas seulement l’état par défaut.

## 10. Gouverner la typographie
Familles validées :

| Rôle | Police |
| --- | --- |
| Titres éditoriaux | `Cormorant Garamond` |
| Texte et interface | `Manrope` |
| Accent décoratif occasionnel | `Allura` |
Charger les polices avec `next/font/google` et uniquement les graisses utiles.
Utiliser `Allura` pour un mot court ou une signature non essentielle, jamais
pour paragraphe, bouton, navigation ou information indispensable.
Échelle de référence :

| Rôle | Mobile | Desktop | Interligne |
| --- | --- | --- | --- |
| Display hero | `3rem` | `6rem` | `0.9–0.98` |
| `h1` alternatif | `2.75rem` | `5rem` | `0.95–1` |
| `h2` | `2.25rem` | `4rem` | `1–1.05` |
| `h3` | `1.5rem` | `2rem` | `1.1–1.2` |
| Lead | `1.125rem` | `1.25rem` | `1.6` |
| Body | `1rem` | `1rem` | `1.65–1.75` |
| Small | `0.875rem` | `0.875rem` | `1.5` |
| Eyebrow | `0.75rem` | `0.8125rem` | `1.2` |
Utiliser `clamp()` si la progression entre viewports reste contrôlée. Limiter
les paragraphes à `60–70ch`, les descriptions à `40–55ch` et le body à au
moins `1rem`.

## 11. Maintenir la grille
Conteneur principal :
- largeur maximale `1280px` ;
- marge horizontale automatique ;
- padding mobile `20px` ;
- padding tablette `32px` ;
- padding desktop `48px`.
Conteneur éditorial étroit : largeur maximale `760px`.
Grille :
- mobile : une colonne ;
- tablette : deux colonnes si le contenu le permet ;
- desktop : douze colonnes conceptuelles ;
- galerie : deux colonnes mobile, trois ou quatre sur grand écran.
Ne pas compresser le contenu pour préserver artificiellement un nombre de
colonnes.

## 12. Maintenir l’échelle d’espacement
Base : multiples de `4px`.

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128
```
Références :
- sections mobile : `72–88px` ;
- sections tablette : `88–104px` ;
- sections desktop : `112–144px` ;
- cartes mobile : `20–24px` ;
- cartes desktop : `24–32px`.
Ajouter une étape uniquement si un besoin récurrent ne peut pas être résolu par
l’échelle. Ne pas employer des valeurs arbitraires pour corriger localement une
composition mal structurée.

## 13. Maintenir les rayons

| Token | Valeur | Usage |
| --- | --- | --- |
| `radius-sm` | `8px` | Petits éléments |
| `radius-md` | `14px` | Champs et boutons secondaires |
| `radius-lg` | `20px` | Cartes |
| `radius-xl` | `28px` | Grandes cartes et médias |
| `radius-pill` | `999px` | Badges et certains CTA |
Une famille conserve un rayon cohérent. Ne pas transformer chaque élément en
pilule et ne pas inventer un rayon différent par section.

## 14. Maintenir bordures et ombres
Tokens d’ombre :

```css
--shadow-soft: 0 12px 40px rgb(11 9 8 / 0.08);
--shadow-card: 0 20px 60px rgb(11 9 8 / 0.12);
--shadow-elevated: 0 28px 80px rgb(11 9 8 / 0.18);
```
Règles :
- carte standard : au maximum `shadow-soft` ;
- média flottant ou lightbox : `shadow-elevated` possible ;
- bordures claires et sombres utilisent les tokens dédiés ;
- éviter les ombres noires opaques ;
- ne pas cumuler bordure forte, ombre forte et gradient.
Une élévation doit traduire une relation de profondeur ou d’interaction, pas
simplement « faire premium ».

## 15. Gérer surfaces et rythmes
Construire l’alternance à partir de `paper`, `cream`, `beige`, `ink`,
`charcoal` et `espresso`. Préserver une hiérarchie claire entre arrière-plan,
surface, surface atténuée et élément élevé.
Ne pas rendre tout le site sombre. Une section sombre doit créer un rythme
éditorial et définir ses rôles locaux sans forcer chaque enfant à connaître la
couleur brute du parent.

## 16. Gouverner les composants
Un composant consomme :
1. les rôles sémantiques ;
2. une variante nommée ;
3. exceptionnellement un token composant documenté.
Une variante doit correspondre à une intention stable telle que `primary`,
`secondary`, `tertiary`, `dark` ou `light`. Éviter les variantes nommées
d’après leur emplacement, comme `heroGold` ou `footerButton`.
Toute famille interactive couvre :
- default ;
- hover ;
- focus visible ;
- active ;
- disabled si pertinent ;
- selected, expanded ou open si pertinent.
Les cibles tactiles mesurent au moins `44 × 44px`.

## 17. Encadrer boutons et liens
CTA principal :
- fond `gold` ;
- texte `ink` ;
- graisse `600` ;
- hauteur minimale `44px` ;
- rayon `radius-pill` ou `radius-md` ;
- libellé explicite même avec icône WhatsApp.
CTA secondaire : fond `ink` ou `charcoal`, texte `text-light` et bordure
discrète. CTA tertiaire : fond transparent avec soulignement, flèche ou bordure
basse explicite.
Ne pas utiliser un CTA doré pour chaque action. Un lien reste un lien et un
bouton reste un bouton.

## 18. Encadrer icônes et médias
Utiliser Lucide pour les icônes d’interface. Garder épaisseur, taille et
alignement cohérents. Une icône seule interactive reçoit un nom accessible.
Pour les photographies :
- privilégier modèles noirs et coiffures afro lisibles ;
- préserver une lumière chaude et naturelle ;
- utiliser `object-fit: cover` avec point focal maîtrisé ;
- contrôler le cadrage mobile ;
- ne pas déformer l’image ;
- ne pas présenter une illustration comme une réalisation réelle ;
- appliquer un overlay seulement pour la lisibilité.
Ratios de référence : services `4 / 5`, galerie `3 / 4`, `4 / 5` ou `4 / 3`.

## 19. Maintenir le responsive
Le design system est mobile-first. Vérifier au minimum :

```text
320px
390px
768px
1440px
zoom 200 %
```
Un token fluide doit avoir des bornes explicites. Ne pas réduire texte, cible
tactile ou espace vital pour faire rentrer une maquette. Préférer reflow,
empilement et adaptation des médias.

## 20. Maintenir le mouvement
Durées :
- micro-interaction : `160–220ms` ;
- transition de composant : `240–360ms` ;
- révélation de section : `450–650ms`.
Préférer opacité et translation légère de `8–24px`. Respecter
`prefers-reduced-motion`. Ne pas bloquer l’interaction, animer chaque enfant,
ajouter une parallaxe lourde, un curseur personnalisé ou du scroll hijacking.
Centraliser les durées et courbes réellement partagées. Ne pas créer une
variante Framer Motion unique pour chaque section.

## 21. Intégrer Tailwind proprement
Utiliser les utilitaires reliés aux tokens. Réserver une valeur arbitraire à un
cas isolé, justifié et non récurrent.
Lors d’un audit, chercher notamment :

```text
#[0-9a-fA-F]{3,8}
rgb(
hsl(
text-[
bg-[
rounded-[
shadow-[
```
Classer chaque résultat :
- valeur légitime et unique ;
- token existant ignoré ;
- nouveau token potentiel ;
- dette à migrer ;
- faux positif.
Ne pas lancer un remplacement global avant d’avoir vérifié le contexte de
chaque famille d’usage.

## 22. Intégrer shadcn/ui et Radix
Conserver les primitives accessibles et adapter leur apparence via le thème,
les variantes et la composition. Ne pas forker une primitive uniquement pour
changer couleur ou rayon.
Préserver :
- états `data-*` ;
- focus visible ;
- navigation clavier ;
- annonces accessibles ;
- contraste des overlays ;
- zones tactiles ;
- fermeture et retour du focus des dialogs.
Une personnalisation visuelle ne doit pas dégrader le contrat comportemental.

## 23. Décider d’un nouveau token
Créer un token seulement si :
- le rôle est explicite ;
- au moins deux usages actuels ou imminents sont identifiés ;
- aucun token existant ne convient ;
- le nom reste valable si la valeur change ;
- le contraste et le responsive sont vérifiés ;
- le coût de migration est acceptable.
Sinon, utiliser le token sémantique le plus proche ou garder une valeur locale
documentée pour confirmer le pattern.

## 24. Faire évoluer un token
Avant modification :
1. relever définition et aliases ;
2. inventorier tous les consommateurs ;
3. capturer les états et viewports critiques ;
4. identifier les contrastes affectés ;
5. vérifier les composants tiers et variantes ;
6. prévoir migration et retour arrière.
Après modification :
1. migrer les usages dans un ordre contrôlé ;
2. supprimer les aliases obsolètes seulement après vérification ;
3. actualiser documentation et exemples ;
4. exécuter les tests pertinents ;
5. comparer visuellement avant et après ;
6. signaler toute déviation volontaire.
Ne jamais changer la valeur d’un token partagé pour corriger un seul composant.

## 25. Auditer les dérives
Chercher :
- hexadécimaux répétés ;
- valeurs arbitraires récurrentes ;
- doublons de variables ;
- noms liés à une page ;
- contrastes insuffisants ;
- rayons ou ombres isolés ;
- tailles de texte trop petites ;
- espacements hors échelle ;
- variantes jamais utilisées ;
- états interactifs incomplets ;
- styles différents pour une même intention ;
- tokens définis mais non consommés.
Pour chaque constat, fournir emplacement, impact, règle concernée, correction
minimale, risque et preuve attendue.

## 26. Vérifier visuellement
Contrôler :
- palette et surfaces ;
- hiérarchie typographique ;
- rythme vertical ;
- cohérence des cartes ;
- contrastes de tous les états ;
- cadrage des photos ;
- hover, focus et active ;
- clavier et toucher ;
- réduction des animations ;
- viewports de référence ;
- zoom `200 %`.
Comparer des parcours réels, pas seulement une planche de composants isolés.
Une capture visuelle ne remplace pas les tests de contraste et d’accessibilité.

## 27. Tester sans élargir
Exécuter les contrôles disponibles et proportionnés :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Ajouter contrôle de contraste, tests de composants ou comparaison visuelle si
le changement le justifie. Ne pas installer une dépendance d’audit sans
autorisation. Signaler clairement ce qui n’a pas pu être vérifié.

## 28. Définition de terminé
Une évolution du design system est terminée lorsque :
- la source de vérité est unique ;
- le nom décrit une intention stable ;
- consommateurs et aliases sont connus ;
- contraste WCAG 2.2 AA est vérifié ;
- états interactifs sont couverts ;
- responsive et zoom sont contrôlés ;
- documentation et implémentation concordent ;
- anciennes valeurs sont migrées ou explicitement conservées ;
- tests pertinents passent ;
- aucune dérive collatérale n’est connue.

## 29. Interdictions absolues
Ne jamais :
- remplacer la palette par un noir et blanc générique ;
- ajouter violet, rose ou bleu sans validation ;
- utiliser jaune vif à la place du doré ;
- multiplier les polices ;
- mettre `Allura` sur du contenu fonctionnel ;
- ajouter du glassmorphism partout ;
- employer gradient arc-en-ciel ou métal animé ;
- accumuler ombre, bordure, gradient et glow ;
- créer un token pour chaque valeur isolée ;
- dupliquer une source de vérité ;
- renommer des tokens sans migration ;
- affaiblir le focus ou les contrastes ;
- réduire le body sous `1rem` ;
- masquer une information derrière le hover ;
- sacrifier la lisibilité pour une maquette statique ;
- déployer sans autorisation.
Dans le compte rendu, séparer changements de tokens, consommateurs migrés,
contrastes, viewports, tests, dérogations et éléments non vérifiés.
