---
paths:
  - "app/**/*.{ts,tsx}"
  - "components/**/*.tsx"
  - "lib/**/*.ts"
  - "content/**/*.ts"
  - "tests/**/*"
  - "e2e/**/*"
---

# WhatsApp

## 1. Objectif

WhatsApp est le canal principal de prise de contact de la landing page PRiMiE.

Le parcours doit :

- utiliser le bon numéro ;
- expliquer clairement l’action ;
- ouvrir une conversation sans envoyer automatiquement de message ;
- fonctionner sur mobile et desktop ;
- rester accessible au clavier et aux technologies d’assistance ;
- ne pas collecter de donnée sur le site ;
- ne pas dépendre d’un SDK tiers.

Un CTA WhatsApp défaillant est une régression critique de conversion.

---

## 2. Périmètre V1

La V1 utilise uniquement « Click to Chat » :

```text
site PRiMiE → lien wa.me → WhatsApp
```

Elle n’utilise :

- ni WhatsApp Cloud API ;
- ni webhook ;
- ni chatbot ;
- ni template de message ;
- ni envoi serveur ;
- ni synchronisation de conversations ;
- ni CRM ;
- ni formulaire intermédiaire ;
- ni stockage du message.

Ne pas ajouter une intégration Business Platform sous couvert d’un simple bouton.

---

## 3. Coordonnées canoniques

Source unique dans `content/site-config.ts` :

```ts
export const PHONE_DISPLAY = "+33 7 49 61 65 82";
export const PHONE_E164 = "+33749616582";
export const WHATSAPP_NUMBER = "33749616582";
export const WHATSAPP_BASE_URL = "https://wa.me/33749616582";
```

Usages :

| Valeur | Usage |
| --- | --- |
| `PHONE_DISPLAY` | Texte lisible |
| `PHONE_E164` | Lien `tel:` |
| `WHATSAPP_NUMBER` | Construction de lien WhatsApp |
| `WHATSAPP_BASE_URL` | Destination directe |

Ne pas recopier le numéro dans chaque composant.

---

## 4. Format du numéro

Dans `wa.me`, utiliser le numéro international complet :

```text
33749616582
```

Ne jamais inclure :

- `+` ;
- espace ;
- parenthèse ;
- tiret ;
- point ;
- zéro national initial.

Valide :

```text
https://wa.me/33749616582
```

Invalides :

```text
https://wa.me/+33749616582
https://wa.me/33 7 49 61 65 82
https://wa.me/07-49-61-65-82
```

---

## 5. Construction du lien

Utiliser une seule fonction pour les liens avec ou sans message validé :

```ts
export function createWhatsAppUrl(message?: string): string {
  const url = new URL(WHATSAPP_BASE_URL);

  if (message?.trim()) {
    url.searchParams.set("text", message.trim());
  }

  return url.toString();
}
```

Utiliser `URL` et `URLSearchParams`.

Ne pas concaténer une saisie brute.

---

## 6. Encodage

Le message peut contenir :

- accents ;
- apostrophes ;
- esperluette ;
- saut de ligne ;
- emoji approuvé.

`URLSearchParams` doit produire un encodage valide.

Ne pas :

- encoder deux fois ;
- remplacer manuellement chaque espace ;
- construire une query string par interpolation non contrôlée ;
- décoder puis réinjecter une valeur utilisateur ;
- ajouter du HTML.

Tester au minimum :

```text
Bonjour, je souhaite des informations.
Tresses & coiffure
```

Ces textes servent d’exemples techniques.

Ils ne deviennent pas automatiquement la copy de Production.

---

## 7. Messages préremplis

Un message de Production doit être :

- validé par la propriétaire ;
- court ;
- poli ;
- compréhensible sans contexte caché ;
- modifiable par l’utilisatrice avant envoi ;
- sans donnée personnelle préinsérée ;
- cohérent avec le CTA.

Si aucun message n’est validé, utiliser le lien sans `text`.

Ne jamais préremplir :

- nom de cliente ;
- téléphone de cliente ;
- adresse ;
- date ou horaire supposé ;
- service non choisi ;
- identifiant de session ;
- URL de page avec tracking ;
- promesse de disponibilité ;
- tarif non validé.

---

## 8. CTA et libellés

Le libellé doit décrire l’action :

```text
Réserver sur WhatsApp
Contacter Prisca sur WhatsApp
Demander des informations sur WhatsApp
```

Choisir la formulation validée dans la règle de contenu.

Éviter :

```text
Cliquez ici
Envoyer
Continuer
Go
```

Ne pas promettre « réservation confirmée ».

Le lien ouvre une conversation, il ne confirme aucun créneau.

---

## 9. Sémantique HTML

Utiliser un lien réel :

```tsx
<a href={whatsAppUrl}>
  Réserver sur WhatsApp
</a>
```

Ne pas utiliser :

- `<div onClick>` ;
- bouton qui modifie `window.location` sans nécessité ;
- gestionnaire JavaScript pour une navigation simple ;
- lien sans `href`.

Le parcours doit rester disponible même si une animation ou un script décoratif
échoue.

---

## 10. Nouvel onglet

L’ouverture dans un nouvel onglet est un choix UX, pas une obligation.

Si `target="_blank"` est utilisé :

```tsx
target="_blank"
rel="noopener noreferrer"
```

Le comportement doit rester cohérent entre les CTA.

Ne pas ouvrir plusieurs onglets ni déclencher l’ouverture au chargement.

---

## 11. Accessibilité

Chaque CTA doit :

- être atteignable au clavier ;
- avoir un focus visible ;
- exposer un nom accessible explicite ;
- avoir un contraste suffisant ;
- offrir une cible tactile correcte ;
- ne pas dépendre uniquement de l’icône ou de la couleur ;
- annoncer WhatsApp dans son texte accessible.

Pour une icône décorative :

```tsx
<WhatsAppIcon aria-hidden="true" focusable="false" />
```

Ne pas répéter « WhatsApp WhatsApp » entre l’icône et le libellé accessible.

---

## 12. Fallback

Si WhatsApp ne peut pas s’ouvrir, le site ne peut pas détecter de manière fiable
tous les cas.

Fournir visuellement le numéro :

```text
+33 7 49 61 65 82
```

et un lien d’appel :

```text
tel:+33749616582
```

Ne pas implémenter un détecteur complexe d’application installée.

---

## 13. Vie privée

Le clic quitte PRiMiE pour un service tiers.

Règles :

- aucune donnée saisie sur PRiMiE ;
- aucun contenu de message journalisé ;
- aucun identifiant visiteur dans l’URL ;
- aucun `utm_*` ajouté au message ;
- aucun pixel déclenché spécialement par le CTA sans revue ;
- transition compréhensible vers WhatsApp.

Un message prérempli est visible dans l’URL avant ouverture.

Il ne doit contenir aucune donnée sensible.

---

## 14. Sécurité

Autoriser uniquement :

```text
https://wa.me/33749616582
```

La destination ne doit pas venir directement d’une entrée utilisateur.

Interdictions :

- redirection ouverte ;
- domaine ressemblant à WhatsApp ;
- schéma `javascript:` ;
- message injecté dans du HTML ;
- numéro fourni par une query string ;
- SDK ou script copié depuis une source non vérifiée.

Valider la destination par configuration, pas par une regex permissive sur une
URL arbitraire.

---

## 15. Performance

Le CTA doit fonctionner sans :

- SDK WhatsApp ;
- iframe ;
- widget tiers ;
- script de détection ;
- image distante ;
- dépendance runtime dédiée.

Un lien HTML et un asset local suffisent.

Ne pas charger la WhatsApp Business Platform pour une simple redirection.

---

## 16. Tests unitaires

Tester le constructeur d’URL :

- sans message ;
- message vide ;
- espaces autour du message ;
- accents ;
- `&` ;
- saut de ligne ;
- service validé ;
- absence de double encodage.

Assertions principales :

```ts
expect(url.origin).toBe("https://wa.me");
expect(url.pathname).toBe("/33749616582");
expect(url.searchParams.get("text")).toBe(message);
```

Ne pas comparer une URL encodée entière si `URLSearchParams` permet une
assertion plus lisible.

---

## 17. Tests end-to-end

Vérifier :

- tous les CTA WhatsApp ;
- même numéro sur toutes les sections ;
- message correctement décodé ;
- CTA visible sur mobile ;
- aucun élément ne bloque le clic ;
- pas d’erreur console ;
- lien téléphone de fallback ;
- navigation clavier.

Ne pas ouvrir réellement WhatsApp dans la suite.

Lire et analyser le `href`, ou intercepter la navigation.

Ne pas faire dépendre la CI de la disponibilité de `wa.me`.

---

## 18. Gestion d’une modification du numéro

Un changement de numéro exige :

1. confirmation explicite de la propriétaire ;
2. mise à jour de la source unique ;
3. recherche des anciennes occurrences ;
4. mise à jour du téléphone affiché ;
5. mise à jour des liens `tel:` ;
6. tests unitaires et E2E ;
7. contrôle du QR code externe s’il en existe un ;
8. validation Preview ;
9. smoke test Production.

Ne jamais déduire le nouveau numéro d’une capture ou d’un profil social.

---

## 19. Anti-patterns interdits

- Numéro écrit en dur dans plusieurs composants.
- `wa.me/+33...`.
- Message concaténé sans encodage.
- Message inventant une réservation ou un tarif.
- Donnée cliente placée dans l’URL.
- CTA implémenté avec un `<div>`.
- Icône seule sans nom accessible.
- Widget WhatsApp tiers.
- SDK Cloud API pour un simple lien.
- Tracking silencieux.
- Dépendance à `wa.me` dans la CI.
- Envoi automatique de message.
- Mauvais numéro corrigé dans une seule section.
- Lien testé en envoyant un vrai message sans accord.

---

## 20. Definition of Done

Le parcours WhatsApp est terminé lorsque :

- le numéro canonique est `33749616582` ;
- toutes les occurrences viennent de la même source ;
- l’URL utilise `https://wa.me/33749616582` ;
- le message est absent ou explicitement validé ;
- l’encodage est testé ;
- les CTA décrivent clairement l’action ;
- la sémantique et le focus sont corrects ;
- le fallback téléphone fonctionne ;
- aucune donnée personnelle ni tracking implicite n’est ajouté ;
- aucun SDK ou widget inutile n’est chargé ;
- les tests unitaires, composants et E2E pertinents passent ;
- mobile et desktop ont été vérifiés ;
- le site n’annonce pas une réservation confirmée.

---

## 21. Références officielles

- WhatsApp — How to use Click to Chat : https://faq.whatsapp.com/5913398998672934
- WhatsApp — Link from another app : https://faq.whatsapp.com/425247423114725
- MDN — URL : https://developer.mozilla.org/en-US/docs/Web/API/URL
- MDN — URLSearchParams : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
