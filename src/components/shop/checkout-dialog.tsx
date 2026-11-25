import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { formatPrice } from "@/lib/format"
import { href } from "@/lib/router"
import { actions, DELIVERY_FEE_MOHAMMEDIA, DELIVERY_FEE_OUTSIDE, deliveryEta, useCartSummary, WHATSAPP_NUMBER, type Order } from "@/lib/store"
import { setUI, useUI } from "@/lib/ui-state"
import { whatsappUrl } from "@/lib/whatsapp"

type Errors = Partial<Record<"name" | "phone" | "address", string>>

export function CheckoutDialog() {
  const { t } = useTranslation()
  const { checkoutOpen } = useUI()
  const cart = useCartSummary()
  const [form, setForm] = React.useState({ name: "", phone: "", address: "" })
  const [errors, setErrors] = React.useState<Errors>({})
  const [busy, setBusy] = React.useState(false)
  const [done, setDone] = React.useState<Order | null>(null)

  const delivery = cart.delivery
  const total = cart.total
  const deliveryZone = cart.deliveryZone
  const waUrl = done ? whatsappUrl(done) : null
  const formatEta = (zone: "mohammedia" | "outside") => {
    const e = deliveryEta(zone)
    return `${e.min}–${e.max} ${t("common.minutes")}`
  }

  const onOpenChange = (o: boolean) => {
    setUI({ checkoutOpen: o })
    if (!o) setTimeout(() => setDone(null), 200)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = t("checkout.pleaseEnterName")
    if (!/^[+\d][\d\s().-]{6,}$/.test(form.phone.trim())) next.phone = t("checkout.enterValidPhone")
    if (form.address.trim().length < 6) next.address = t("checkout.needAddress")
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    // Open WhatsApp in a tab now (inside the click gesture) so popup blockers allow it;
    // we point it at the order message once the order is built.
    const waWin = WHATSAPP_NUMBER ? window.open("", "_blank") : null
    setTimeout(() => {
      const order: Order = {
        id: `SV-${Math.floor(10000 + Math.random() * 89999)}`,
        date: Date.now(),
        lines: cart.lines.map((l) => ({ productId: l.product.id, name: l.product.name, sizeLabel: l.size.label, qty: l.qty, unit: l.unit })),
        subtotal: cart.subtotal,
        delivery,
        discount: 0,
        total,
        customer: { ...form, mode: "delivery", deliveryZone },
      }
      actions.placeOrder(order)
      const url = whatsappUrl(order)
      if (url) {
        if (waWin) waWin.location.href = url
        else window.open(url, "_blank")
      } else {
        waWin?.close()
      }
      setDone(order)
      setBusy(false)
    }, 900)
  }

  return (
    <Dialog open={checkoutOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-9" strokeWidth={1.8} />
            </span>
            <DialogHeader className="items-center text-center">
              <DialogTitle className="font-heading text-xl">{t("checkout.orderConfirmed")}</DialogTitle>
              <DialogDescription>
                {t("checkout.thanksOrder", {
                  name: done.customer.name.split(" ")[0],
                  id: done.id,
                  message: t("checkout.deliveryMessage", { time: formatEta(done.customer.deliveryZone ?? "mohammedia") }),
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="w-full rounded-lg bg-muted/50 p-4 text-sm">
              <div className="flex justify-between font-semibold">
                <span>{t("checkout.totalPaid", { mode: t("checkout.delivery") })}</span>
                <span className="tabular-nums">{formatPrice(done.total)}</span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              {waUrl && (
                <Button variant="secondary" className="w-full" render={<a href={waUrl} target="_blank" rel="noreferrer" />} onClick={() => onOpenChange(false)}>
                  {t("checkout.sendWhatsApp")}
                </Button>
              )}
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1" render={<a href={href.orders} />} onClick={() => onOpenChange(false)}>
                  {t("checkout.viewMyOrders")}
                </Button>
                <Button className="flex-1" onClick={() => onOpenChange(false)}>{t("checkout.keepBrowsing")}</Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">{t("checkout.checkout")}</DialogTitle>
              <DialogDescription>{t("checkout.payOnMode", { mode: t("checkout.delivery") })}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">{t("checkout.deliveryZone")}</p>
              <ToggleGroup value={[deliveryZone]} onValueChange={(v) => v[0] && actions.setDeliveryZone(v[0] as "mohammedia" | "outside")} variant="outline" spacing={0} className="w-full" aria-label={t("checkout.deliveryZone")}>
                <ToggleGroupItem value="mohammedia" className="h-10 flex-1 aria-pressed:bg-primary/10 aria-pressed:text-primary">
                  {t("checkout.mohammedia")} · {formatPrice(DELIVERY_FEE_MOHAMMEDIA)}
                </ToggleGroupItem>
                <ToggleGroupItem value="outside" className="h-10 flex-1 aria-pressed:bg-primary/10 aria-pressed:text-primary">
                  {t("checkout.outside")} · {formatPrice(DELIVERY_FEE_OUTSIDE)}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="co-name">{t("checkout.fullName")}</FieldLabel>
                <Input id="co-name" autoComplete="name" value={form.name} aria-invalid={!!errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="co-phone">{t("checkout.phone")}</FieldLabel>
                <Input id="co-phone" type="tel" autoComplete="tel" value={form.phone} aria-invalid={!!errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                {errors.phone && <FieldError>{errors.phone}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.address}>
                <FieldLabel htmlFor="co-address">{t("checkout.deliveryAddress")}</FieldLabel>
                <Input id="co-address" autoComplete="street-address" value={form.address} aria-invalid={!!errors.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                {errors.address && <FieldError>{errors.address}</FieldError>}
              </Field>
            </FieldGroup>

            <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4 text-sm">
              <ul className="flex flex-col gap-1">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex justify-between gap-4">
                    <span className="truncate text-muted-foreground">{l.qty} × {l.product.name}</span>
                    <span className="tabular-nums">{formatPrice(l.total)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-1" />
              <div className="flex justify-between text-muted-foreground">
                <span>{t("checkout.delivery")}</span>
                <span className="tabular-nums">{formatPrice(delivery)}</span>
              </div>
              {cart.lines.length > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("checkout.estimatedTime")}</span>
                  <span className="tabular-nums">{formatEta(deliveryZone)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold">
                <span>{t("checkout.total")}</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="h-12 text-base" disabled={busy || cart.lines.length === 0}>
              {busy && <Spinner data-icon="inline-start" />}
              {busy ? t("checkout.placingOrder") : t("checkout.placeOrder", { amount: formatPrice(total) })}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
