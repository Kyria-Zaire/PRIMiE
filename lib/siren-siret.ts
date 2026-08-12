/**
 * Validation pure SIREN / SIRET (France) — LEGAL-PAGES-01C-R1.
 * Aucune valeur métier n’est stockée ici. Un identifiant ne peut passer
 * à `confirmed` qu’après copie exacte depuis une attestation officielle
 * (INSEE, INPI ou URSSAF) et contrôle Annuaire des entreprises.
 */

const DIGITS_ONLY = /^\d+$/;

/** Algorithme de Luhn (variante utilisée pour SIREN / SIRET). */
export function passesLuhnCheck(digits: string): boolean {
  if (!DIGITS_ONLY.test(digits) || digits.length === 0) {
    return false;
  }

  let sum = 0;
  let doubleDigit = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

export function isValidSiren(value: string): boolean {
  return DIGITS_ONLY.test(value) && value.length === 9 && passesLuhnCheck(value);
}

export function isValidSiret(value: string): boolean {
  return DIGITS_ONLY.test(value) && value.length === 14 && passesLuhnCheck(value);
}

/**
 * Cohérence SIREN ↔ SIRET : le SIRET commence par le SIREN, et les deux
 * passent le contrôle Luhn.
 */
export function isConsistentSirenSiretPair(siren: string, siret: string): boolean {
  return isValidSiren(siren) && isValidSiret(siret) && siret.startsWith(siren);
}

/**
 * Garde avant confirmation métier : refuse tout identifiant non strictement valide.
 * Ne remplace pas la vérification Annuaire des entreprises.
 */
export function canConfirmFrenchBusinessIdentifier(
  kind: "siren" | "siret",
  value: string,
): boolean {
  return kind === "siren" ? isValidSiren(value) : isValidSiret(value);
}
