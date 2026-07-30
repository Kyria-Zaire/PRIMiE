import { siteConfig } from "@/content/site-config";

const WHATSAPP_BASE_URL = siteConfig.contact.whatsappUrl;

/**
 * Construit l’URL WhatsApp Click-to-Chat.
 * Sans message (ou message vide / espaces) : URL canonique seule.
 * Avec message : `?text=` encodé une seule fois via encodeURIComponent.
 */
export function buildWhatsAppUrl(message?: string): string {
  const trimmed = message?.trim() ?? "";

  if (trimmed.length === 0) {
    return WHATSAPP_BASE_URL;
  }

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(trimmed)}`;
}
