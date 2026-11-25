import i18n from "@/i18n"
import { formatPrice } from "@/lib/format"
import { WHATSAPP_NUMBER, type Order } from "@/lib/store"

/** Pre-filled WhatsApp message with everything the delivery guy needs. */
export function buildOrderMessage(order: Order): string {
  const t = i18n.t
  const c = order.customer
  const zoneLabel = c.deliveryZone === "outside" ? t("checkout.outside") : t("checkout.mohammedia")
  return [
    `*${t("whatsapp.newOrder", { id: order.id })}*`,
    ``,
    `*${t("whatsapp.customer")}*: ${c.name}`,
    `*${t("whatsapp.phone")}*: ${c.phone}`,
    `*${t("whatsapp.location")}*: ${c.address}\n*${t("checkout.deliveryZone")}*: ${zoneLabel}`,
    ``,
    `*${t("whatsapp.items")}*:`,
    ...order.lines.map((l) => `• ${l.qty} × ${l.name} (${l.sizeLabel}) — ${formatPrice(l.unit * l.qty)}`),
    ``,
    `*${t("cart.subtotal")}*: ${formatPrice(order.subtotal)}`,
    ...(order.discount > 0 ? [`*${t("checkout.discount")}*: -${formatPrice(order.discount)}`] : []),
    `*${t("checkout.delivery")}*: ${order.delivery === 0 ? t("checkout.free") : formatPrice(order.delivery)}`,
    `*${t("checkout.total")}*: ${formatPrice(order.total)}`,
  ].join("\n")
}

export function whatsappUrl(order: Order): string | null {
  if (!WHATSAPP_NUMBER) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(order))}`
}
