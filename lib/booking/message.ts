import type { Service, ServiceId } from "@/content/services";
import { services as canonicalServices } from "@/content/services";
import { formatBookingDateFr, formatBookingTimeFr } from "@/lib/booking/calendar";
import type { ValidBookingRequest } from "@/lib/booking/validation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function resolveServiceTitle(
  serviceId: ServiceId,
  catalog: readonly Service[] = canonicalServices,
): string {
  const match = catalog.find((service) => service.id === serviceId);
  if (!match) {
    throw new Error(`Unknown service id: ${serviceId}`);
  }
  return match.title;
}

/**
 * Message WhatsApp de demande de rendez-vous — fonction pure.
 * Ne confirme jamais une réservation.
 */
export function buildBookingWhatsAppMessage(
  request: ValidBookingRequest,
  catalog: readonly Service[] = canonicalServices,
): string {
  const serviceTitle = resolveServiceTitle(request.serviceId, catalog);
  const dateFr = formatBookingDateFr(request.date);
  const timeFr = formatBookingTimeFr(request.timeSlot);

  if (!dateFr || !timeFr) {
    throw new Error("Invalid booking date or time slot for WhatsApp message");
  }

  return [
    "Bonjour Prisca 👋",
    "",
    "Je souhaite faire une demande de rendez-vous chez PRiMiE Coiffure.",
    "",
    `Nom : ${request.name}`,
    `Téléphone : ${request.phone}`,
    `Prestation : ${serviceTitle}`,
    `Date souhaitée : ${dateFr}`,
    `Créneau souhaité : ${timeFr}`,
    "",
    "Je comprends que le rendez-vous sera confirmé selon vos disponibilités.",
    "",
    "Merci 😊",
  ].join("\n");
}

export function buildBookingWhatsAppUrl(
  request: ValidBookingRequest,
  catalog: readonly Service[] = canonicalServices,
): string {
  return buildWhatsAppUrl(buildBookingWhatsAppMessage(request, catalog));
}
