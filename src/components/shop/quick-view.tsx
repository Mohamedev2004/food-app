import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Clock01Icon, FireIcon, ShoppingBag01Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { flyToCart } from "@/lib/fly-to-cart"
import { notifyAdded } from "@/lib/notify"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/data/catalog"
import { formatPrice } from "@/lib/format"
import { actions, useRating } from "@/lib/store"
import { href } from "@/lib/router"
import { FavoriteButton } from "./favorite-button"
import { LazyImage } from "./lazy-image"
import { QuantityStepper } from "./quantity-stepper"
import { Stars } from "./rating"
import { TagBadge } from "./tag-badge"

export function QuickView({ product, children }: { product: Product; children: React.ReactElement }) {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const [size, setSize] = React.useState(product.sizes[0].id)
  const [qty, setQty] = React.useState(1)
  const imgBox = React.useRef<HTMLDivElement>(null)
  const { avg, count } = useRating(product.id)
  const extra = product.sizes.find((s) => s.id === size)?.extra ?? 0
  const total = (product.price + extra) * qty

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          <div ref={imgBox} className="contents">
            <LazyImage photoId={product.image} alt={product.name} ratio={1} sizes="(min-width: 768px) 384px, 100vw" className="max-md:aspect-4/3!" />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-wrap gap-1.5 pe-8">
              {product.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <DialogTitle className="font-heading text-xl font-semibold">{product.name}</DialogTitle>
              <DialogDescription>{product.summary}</DialogDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Stars value={avg} />
              <span className="font-medium">{avg.toFixed(1)}</span>
              <span className="text-muted-foreground">({count} {t("product.reviews")})</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <HugeiconsIcon icon={Clock01Icon} className="size-4" strokeWidth={2} />
                {product.prepMinutes} {t("product.min")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HugeiconsIcon icon={FireIcon} className="size-4" strokeWidth={2} />
                {product.calories} {t("product.kcal")}
              </span>
            </div>
            {product.sizes.length > 1 && (
              <ToggleGroup value={[size]} onValueChange={(v) => v[0] && setSize(v[0])} variant="outline" aria-label={t("product.size")}>
                {product.sizes.map((s) => (
                  <ToggleGroupItem key={s.id} value={s.id} className="px-3 aria-pressed:border-primary aria-pressed:bg-primary/10">
                    {s.label}
                    {s.extra > 0 && <span className="text-muted-foreground"> +{formatPrice(s.extra)}</span>}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <span className="text-xl font-semibold tabular-nums">{formatPrice(total)}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                className="h-11 flex-1"
                onClick={() => {
                  flyToCart(imgBox.current?.querySelector("img"))
                  actions.addToCart(product.id, size, qty)
                  notifyAdded(product.name, qty)
                  setOpen(false)
                }}
              >
                <HugeiconsIcon icon={ShoppingBag01Icon} data-icon="inline-start" strokeWidth={2} />
                {t("common.addToCart")}
              </Button>
              <FavoriteButton productId={product.id} variant="outline" size="icon-lg" className="h-11 w-11" />
            </div>
            <a href={href.product(product.id)} onClick={() => setOpen(false)} className="inline-flex items-center gap-1 self-start text-sm font-medium text-primary underline-offset-4 hover:underline">
              {t("product.details")}
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
