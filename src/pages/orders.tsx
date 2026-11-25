import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { formatDate, formatPrice } from "@/lib/format"
import { href } from "@/lib/router"
import { useStore } from "@/lib/store"
import { PRODUCTS } from "@/data/catalog"
import { LazyImage } from "@/components/shop/lazy-image"
import { Crumbs } from "@/components/shop/page-header"

export function OrdersPage() {
  const { t } = useTranslation()
  const orders = useStore((s) => s.orders)
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: t("nav.home"), href: href.home }, { label: t("nav.orders") }]} />
      <h1 className="mt-4 mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("orders.yourOrders")}</h1>
      {orders.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon"><HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} /></EmptyMedia>
            <EmptyTitle>{t("orders.noOrdersYet")}</EmptyTitle>
            <EmptyDescription>{t("orders.whenPlaceOrder")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button render={<a href={href.menu} />}>{t("orders.startOrdering")}</Button></EmptyContent>
        </Empty>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">{o.id}<Badge variant="secondary">{o.customer.mode === "delivery" ? t("orders.delivery") : t("orders.pickup")}</Badge></CardTitle>
                  <CardDescription>{formatDate(o.date)} · {o.customer.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3 text-sm">
                    {o.lines.map((l, i) => {
                      const p = PRODUCTS.find((x) => x.id === l.productId || x.name === l.name)
                      return (
                        <li key={i} className="flex items-center gap-3">
                          {p && (
                            <a href={href.product(p.id)} className="shrink-0">
                              <LazyImage photoId={p.image} alt={l.name} ratio={1} sizes="64px" className="size-16 rounded-lg" />
                            </a>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.qty} × {formatPrice(l.unit)} · {l.sizeLabel}</p>
                          </div>
                          <span className="tabular-nums">{formatPrice(l.unit * l.qty)}</span>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
                <CardFooter className="justify-between font-semibold">
                  <span>{t("orders.total")}</span>
                  <span className="tabular-nums">{formatPrice(o.total)}</span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
