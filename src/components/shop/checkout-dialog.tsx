import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { formatPrice } from "@/lib/format"
import { href } from "@/lib/router"
import { actions, DELIVERY_FEE, useCartSummary, type Order } from "@/lib/store"
import { setUI, useUI } from "@/lib/ui-state"

type Errors = Partial<Record<"name" | "phone" | "address", string>>

export function CheckoutDialog() {
  const { checkoutOpen } = useUI()
  const cart = useCartSummary()
  const [mode, setMode] = React.useState<"delivery" | "pickup">("delivery")
  const [form, setForm] = React.useState({ name: "", phone: "", address: "" })
  const [errors, setErrors] = React.useState<Errors>({})
  const [busy, setBusy] = React.useState(false)
  const [done, setDone] = React.useState<Order | null>(null)

  const delivery = mode === "pickup" ? 0 : cart.delivery
  const total = cart.subtotal - cart.discount + delivery

  const onOpenChange = (o: boolean) => {
    setUI({ checkoutOpen: o })
    if (!o) setTimeout(() => setDone(null), 200)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = "Please enter your name."
    if (!/^[+\d][\d\s().-]{6,}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number."
    if (mode === "delivery" && form.address.trim().length < 6) next.address = "We need an address to deliver to."
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    setTimeout(() => {
      const order: Order = {
        id: `SV-${Math.floor(10000 + Math.random() * 89999)}`,
        date: Date.now(),
        lines: cart.lines.map((l) => ({ productId: l.productId, name: l.product.name, sizeLabel: l.size.label, qty: l.qty, unit: l.unit })),
        subtotal: cart.subtotal,
        delivery,
        discount: cart.discount,
        total,
        customer: { ...form, mode },
      }
      actions.placeOrder(order)
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
              <DialogTitle className="font-heading text-xl">Order confirmed!</DialogTitle>
              <DialogDescription>
                Thanks {done.customer.name.split(" ")[0]}. Order <strong>{done.id}</strong> is being prepared —{" "}
                {done.customer.mode === "delivery" ? "expect it in about 30–40 minutes." : "it'll be ready for pickup in about 20 minutes."}
              </DialogDescription>
            </DialogHeader>
            <div className="w-full rounded-lg bg-muted/50 p-4 text-sm">
              <div className="flex justify-between font-semibold">
                <span>Total paid on {done.customer.mode === "delivery" ? "delivery" : "pickup"}</span>
                <span className="tabular-nums">{formatPrice(done.total)}</span>
              </div>
            </div>
            <DialogFooter className="w-full sm:justify-center">
              <Button variant="outline" render={<a href={href.orders} />} onClick={() => onOpenChange(false)}>
                View my orders
              </Button>
              <Button onClick={() => onOpenChange(false)}>Keep browsing</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Checkout</DialogTitle>
              <DialogDescription>Pay on {mode === "delivery" ? "delivery" : "pickup"} — no card needed.</DialogDescription>
            </DialogHeader>

            <ToggleGroup value={[mode]} onValueChange={(v) => v[0] && setMode(v[0] as "delivery" | "pickup")} variant="outline" spacing={0} className="w-full" aria-label="Fulfilment">
              <ToggleGroupItem value="delivery" className="h-10 flex-1 aria-pressed:bg-primary/10 aria-pressed:text-primary">Delivery</ToggleGroupItem>
              <ToggleGroupItem value="pickup" className="h-10 flex-1 aria-pressed:bg-primary/10 aria-pressed:text-primary">Pickup</ToggleGroupItem>
            </ToggleGroup>

            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="co-name">Full name</FieldLabel>
                <Input id="co-name" autoComplete="name" value={form.name} aria-invalid={!!errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="co-phone">Phone</FieldLabel>
                <Input id="co-phone" type="tel" autoComplete="tel" value={form.phone} aria-invalid={!!errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                {errors.phone && <FieldError>{errors.phone}</FieldError>}
              </Field>
              {mode === "delivery" && (
                <Field data-invalid={!!errors.address}>
                  <FieldLabel htmlFor="co-address">Delivery address</FieldLabel>
                  <Input id="co-address" autoComplete="street-address" value={form.address} aria-invalid={!!errors.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  {errors.address && <FieldError>{errors.address}</FieldError>}
                </Field>
              )}
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
              {cart.discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span className="tabular-nums">-{formatPrice(cart.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>{mode === "delivery" ? "Delivery" : "Pickup"}</span>
                <span className="tabular-nums">{delivery === 0 ? "Free" : formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="h-12 text-base" disabled={busy || cart.lines.length === 0}>
              {busy && <Spinner data-icon="inline-start" />}
              {busy ? "Placing order…" : `Place order · ${formatPrice(total)}`}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
