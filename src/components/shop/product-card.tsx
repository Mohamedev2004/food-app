import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Clock01Icon, ThumbsUpIcon, ViewIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { flyToCart } from "@/lib/fly-to-cart"
import { notifyAdded } from "@/lib/notify"
import { getCategory, type Product } from "@/data/catalog"
import { formatPrice } from "@/lib/format"
import { actions, useLikes, useRating } from "@/lib/store"
import { href } from "@/lib/router"
import { FavoriteButton } from "./favorite-button"
import { LazyImage } from "./lazy-image"
import { Stars } from "./rating"
import { TagBadge } from "./tag-badge"
import { QuickView } from "./quick-view"

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { avg, count } = useRating(product.id)
  const { count: likes, liked } = useLikes(product.id)
  const shown = product.tags.slice(0, 2)
  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0

  return (
    <Card className="group/card relative gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <a href={href.product(product.id)} aria-label={`View ${product.name}`} className="block">
          <LazyImage photoId={product.image} alt={product.name} ratio={4 / 3} priority={priority} imgClassName="group-hover/card:scale-105" />
        </a>
        <div className="pointer-events-none absolute start-3 top-3 flex flex-wrap gap-1.5">
          {save > 0 && <span className="rounded-md bg-destructive px-1.5 py-0.5 text-xs font-semibold text-white">-{save}%</span>}
          {shown.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        <FavoriteButton productId={product.id} className="absolute end-3 top-3 bg-background/80" size="icon-sm" />
        <QuickView product={product}>
          <Button size="sm" variant="secondary" className="absolute inset-x-3 bottom-3 opacity-0 shadow-md backdrop-blur transition-opacity group-focus-within/card:opacity-100 group-hover/card:opacity-100 max-md:hidden">
            <HugeiconsIcon icon={ViewIcon} data-icon="inline-start" strokeWidth={2} />
            Quick view
          </Button>
        </QuickView>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{getCategory(product.category)?.name}</p>
        <a href={href.product(product.id)} className="outline-none after:absolute after:inset-x-0 after:top-0 after:h-[calc(100%-5.25rem)] after:content-[''] focus-visible:underline">
          <h3 className="line-clamp-1 font-heading text-base leading-snug font-semibold">{product.name}</h3>
        </a>
        <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">{product.summary}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Stars value={avg} className="[&_span]:size-3.5 [&_svg]:size-3.5" />
          <span className="font-medium text-foreground">{avg.toFixed(1)}</span>
          <span>({count})</span>
          <span className="ms-auto inline-flex items-center gap-1">
            <HugeiconsIcon icon={ThumbsUpIcon} className={liked ? "size-3.5 fill-primary/20 text-primary" : "size-3.5"} strokeWidth={2} />
            {likes}
          </span>
        </div>

        <div className="relative z-10 mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon icon={Clock01Icon} className="size-3.5" strokeWidth={2} />
              {product.prepMinutes} min
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tabular-nums">{formatPrice(product.price)}</span>
              {product.compareAt && <span className="text-sm text-muted-foreground tabular-nums line-through">{formatPrice(product.compareAt)}</span>}
            </div>
          </div>
          <Button
            size="icon-lg"
            className="rounded-full"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              flyToCart(e.currentTarget.closest("[data-slot=card]")?.querySelector("img"))
              actions.addToCart(product.id, product.sizes[0].id)
              notifyAdded(product.name)
            }}
          >
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-8 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  )
}
