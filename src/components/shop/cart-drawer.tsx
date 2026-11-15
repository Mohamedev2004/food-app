import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Delete02Icon, DeliveryTruck01Icon, GiftIcon, ShoppingBag01Icon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { formatPrice } from "@/lib/format"
import { href } from "@/lib/router"
import { actions, COUPONS, FREE_DELIVERY_AT, useCartSummary } from "@/lib/store"
import { setUI, useUI } from "@/lib/ui-state"
import { LazyImage } from "./lazy-image"
import { QuantityStepper } from "./quantity-stepper"

export function CartDrawer() {
  const { cartOpen } = useUI()
  const isDesktop = useMediaQuery("(min-width: 640px)")
  const cart = useCartSummary()
  const close = () => setUI({ cartOpen: false })

  return (
    <Drawer open={cartOpen} onOpenChange={(o) => setUI({ cartOpen: o })} swipeDirection={isDesktop ? "right" : "down"} showSwipeHandle={!isDesktop}>
      <DrawerContent className="[--drawer-inset:0.5rem] sm:[--drawer-inset:1rem] rounded-3xl! border! shadow-2xl ring-1 ring-foreground/10 after:hidden data-[swipe-axis=x]:h-[calc(100dvh-1rem)] data-[swipe-axis=x]:[--drawer-content-width:min(calc(100%-1rem),28rem)]! sm:data-[swipe-axis=x]:h-[calc(100dvh-2rem)] sm:data-[swipe-axis=x]:[--drawer-content-width:28rem]!">
        <DrawerHeader className="flex-row items-start justify-between gap-4 border-b p-5">
          <div className="flex flex-col gap-1 text-start">
            <DrawerTitle className="flex items-center gap-2 font-heading text-lg font-semibold">
              Your cart
              {cart.count > 0 && <Badge variant="secondary">{cart.count} item{cart.count > 1 ? "s" : ""}</Badge>}
            </DrawerTitle>
            <DrawerDescription>Review your order before checkout.</DrawerDescription>
          </div>
          <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close cart" />}>
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </DrawerClose>
        </DrawerHeader>

        {cart.lines.length === 0 ? (
          <Empty className="flex-1">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} />
              </EmptyMedia>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <EmptyDescription>Hungry? Browse the menu and add something delicious.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                render={<a href={href.menu} />}
                onClick={close}
              >
                Browse the menu
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <>
            <div className="flex flex-col gap-2 border-b bg-muted/40 px-5 py-3 text-sm">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={DeliveryTruck01Icon} className="size-4 text-primary" strokeWidth={2} />
                {cart.remaining > 0 ? (
                  <span>
                    Add <strong>{formatPrice(cart.remaining)}</strong> more for <strong>free delivery</strong>
                  </span>
                ) : (
                  <span className="font-medium text-primary">You've unlocked free delivery 🎉</span>
                )}
              </div>
              <Progress value={Math.min(100, ((FREE_DELIVERY_AT - cart.remaining) / FREE_DELIVERY_AT) * 100)} aria-label="Progress to free delivery" />
            </div>

            <div className="min-h-[min(11rem,28dvh)] flex-1 overflow-y-auto overscroll-contain">
              <ul className="flex flex-col divide-y px-5">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex gap-4 py-4">
                    <a href={href.product(l.product.id)} onClick={close} className="shrink-0">
                      <LazyImage photoId={l.product.image} alt={l.product.name} ratio={1} sizes="88px" className="size-22 rounded-lg" />
                    </a>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <a href={href.product(l.product.id)} onClick={close} className="line-clamp-1 font-medium hover:underline">
                            {l.product.name}
                          </a>
                          <p className="text-xs text-muted-foreground">{l.size.label} · {formatPrice(l.unit)} each</p>
                        </div>
                        <span className="font-semibold tabular-nums">{formatPrice(l.total)}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <QuantityStepper size="sm" min={0} value={l.qty} label={`Quantity of ${l.product.name}`} onChange={(q) => actions.setQty(l.key, q)} />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${l.product.name}`}
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const line = { key: l.key, productId: l.productId, sizeId: l.sizeId, qty: l.qty, note: l.note }
                            actions.removeLine(l.key)
                            toast.add({ title: "Removed from cart", description: l.product.name, actionProps: { children: "Undo", onClick: () => actions.restoreLine(line) } })
                          }}
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t bg-background p-5">
              <CouponField />
              <dl className="flex flex-col gap-2 text-sm">
                <Row label="Subtotal" value={formatPrice(cart.subtotal)} />
                {cart.discount > 0 && <Row label={`Discount (${cart.coupon})`} value={`-${formatPrice(cart.discount)}`} accent />}
                <Row label="Delivery" value={cart.delivery === 0 ? "Free" : formatPrice(cart.delivery)} />
                <Separator />
                <div className="flex items-baseline justify-between text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="text-xl tabular-nums">{formatPrice(cart.total)}</dd>
                </div>
              </dl>
              <Button size="lg" className="h-12 text-base" onClick={() => setUI({ cartOpen: false, checkoutOpen: true })}>
                Checkout · {formatPrice(cart.total)}
              </Button>
              <Button variant="ghost" size="sm" className="self-center text-muted-foreground" onClick={() => actions.clearCart()}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("flex justify-between", accent && "text-primary")}>
      <dt className={accent ? "" : "text-muted-foreground"}>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )
}

function CouponField() {
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState("")
  const applied = useCartSummary().coupon

  if (applied) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed border-primary/50 bg-primary/5 px-3 py-2 text-sm">
        <span className="inline-flex items-center gap-2">
          <HugeiconsIcon icon={GiftIcon} className="size-4 text-primary" strokeWidth={2} />
          <strong>{applied}</strong> · {COUPONS[applied]?.label}
        </span>
        <Button variant="ghost" size="xs" onClick={() => actions.setCoupon(null)}>
          Remove
        </Button>
      </div>
    )
  }

  const apply = () => {
    const c = code.trim().toUpperCase()
    if (COUPONS[c]) {
      actions.setCoupon(c)
      setCode("")
      setError("")
      toast.add({ title: "Promo applied", description: COUPONS[c].label, type: "success" })
    } else setError("That code isn't valid. Try WELCOME10.")
  }

  return (
    <div className="flex flex-col gap-1.5">
      <InputGroup>
        <InputGroupInput
          placeholder="Promo code"
          value={code}
          aria-invalid={!!error}
          aria-label="Promo code"
          onChange={(e) => (setCode(e.target.value), setError(""))}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" onClick={apply} disabled={!code.trim()}>
            Apply
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
