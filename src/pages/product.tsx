import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, DeliveryTruck01Icon, FireIcon, Leaf01Icon, ShoppingBag01Icon, ThumbsUpIcon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getCategory, getProduct, PRODUCTS } from "@/data/catalog"
import { formatPrice } from "@/lib/format"
import { flyToCart } from "@/lib/fly-to-cart"
import { notifyAdded } from "@/lib/notify"
import { href } from "@/lib/router"
import { actions, useLikes, useRating } from "@/lib/store"
import { FavoriteButton } from "@/components/shop/favorite-button"
import { LazyImage } from "@/components/shop/lazy-image"
import { Crumbs, SectionHeading } from "@/components/shop/page-header"
import { ProductCard } from "@/components/shop/product-card"
import { QuantityStepper } from "@/components/shop/quantity-stepper"
import { Stars } from "@/components/shop/rating"
import { Reviews } from "@/components/shop/reviews"
import { TagBadge } from "@/components/shop/tag-badge"
import { Grid } from "./home"

export function ProductPage({ id }: { id: string }) {
  const product = getProduct(id)
  if (!product) {
    return (
      <Empty className="mx-auto my-24 max-w-md">
        <EmptyHeader>
          <EmptyTitle>Dish not found</EmptyTitle>
          <EmptyDescription>This item may have been removed from the menu.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button render={<a href={href.menu} />}>Back to menu</Button></EmptyContent>
      </Empty>
    )
  }
  return <Detail key={product.id} id={product.id} />
}

function Detail({ id }: { id: string }) {
  const product = getProduct(id)!
  const cat = getCategory(product.category)!
  const [size, setSize] = React.useState(product.sizes[0].id)
  const [qty, setQty] = React.useState(1)
  const [tab, setTab] = React.useState("about")
  const { avg, count } = useRating(id)
  const { liked, count: likes } = useLikes(id)
  const extra = product.sizes.find((s) => s.id === size)?.extra ?? 0
  const unit = product.price + extra
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== id).concat(PRODUCTS.filter((p) => p.category !== product.category && p.tags.some((t) => product.tags.includes(t)))).slice(0, 4)
  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0

  React.useEffect(() => {
    window.scrollTo({ top: 0 })
    actions.viewed(id)
  }, [id])

  const add = () => {
    flyToCart(document.querySelector("[data-hero-image] img"))
    actions.addToCart(id, size, qty)
    notifyAdded(product.name, qty)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:pb-8">
      <Crumbs items={[{ label: "Home", href: href.home }, { label: cat.name, href: href.category(cat.id) }, { label: product.name }]} />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div data-hero-image className="lg:sticky lg:top-24 lg:self-start">
          <LazyImage photoId={product.image} alt={product.name} ratio={1} priority sizes="(min-width: 1024px) 600px, 100vw" className="rounded-3xl shadow-lg" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            {[[Clock01Icon, `${product.prepMinutes} min`, "Prep time"], [FireIcon, `${product.calories}`, "Calories"], [DeliveryTruck01Icon, "30–40 min", "Delivery"]].map(([icon, v, l]) => (
              <div key={l as string} className="flex flex-col items-center gap-0.5 rounded-xl border bg-card p-3">
                <HugeiconsIcon icon={icon as typeof Clock01Icon} className="size-5 text-primary" strokeWidth={2} />
                <span className="font-semibold">{v as string}</span>
                <span className="text-xs text-muted-foreground">{l as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <a href={href.category(cat.id)} className="text-xs font-semibold tracking-widest text-primary uppercase hover:underline">{cat.name}</a>
            {product.tags.map((t) => <TagBadge key={t} tag={t} />)}
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <button type="button" onClick={() => { setTab("reviews"); document.getElementById("details")?.scrollIntoView({ behavior: "smooth" }) }} className="inline-flex items-center gap-2 hover:underline">
              <Stars value={avg} />
              <span className="font-medium">{avg.toFixed(1)}</span>
              <span className="text-muted-foreground">({count} reviews)</span>
            </button>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <HugeiconsIcon icon={ThumbsUpIcon} className="size-4" strokeWidth={2} />
              {likes} likes
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold tabular-nums">{formatPrice(unit)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground tabular-nums line-through">{formatPrice(product.compareAt + extra)}</span>
                <Badge variant="destructive">Save {save}%</Badge>
              </>
            )}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{product.summary} {product.description.split(". ")[0]}.</p>

          <Separator />

          {product.sizes.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Size</p>
              <ToggleGroup value={[size]} onValueChange={(v) => v[0] && setSize(v[0])} variant="outline" aria-label="Size">
                {product.sizes.map((s) => (
                  <ToggleGroupItem key={s.id} value={s.id} className="h-11 px-5 aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary">
                    {s.label}{s.extra > 0 && <span className="text-xs text-muted-foreground">+{formatPrice(s.extra)}</span>}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button size="lg" className="h-12 flex-1 rounded-full text-base max-sm:hidden" onClick={add}>
              <HugeiconsIcon icon={ShoppingBag01Icon} data-icon="inline-start" strokeWidth={2} />
              Add to cart · {formatPrice(unit * qty)}
            </Button>
            <FavoriteButton productId={id} variant="outline" size="icon-lg" className="size-12" />
            <Button variant="outline" aria-pressed={liked} aria-label={liked ? "Unlike" : "Like"} className={cn("h-12 rounded-full px-4", liked && "border-primary/50 bg-primary/10 text-primary")} onClick={() => actions.toggleLike(id)}>
              <HugeiconsIcon icon={ThumbsUpIcon} data-icon="inline-start" strokeWidth={2} className={liked ? "fill-primary/30" : ""} />
              {liked ? "Liked" : "Like"}
            </Button>
          </div>

          <ul className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4 text-sm">
            <li className="flex items-center gap-2"><HugeiconsIcon icon={DeliveryTruck01Icon} className="size-4 text-primary" strokeWidth={2} />Free delivery on orders over $35</li>
            <li className="flex items-center gap-2"><HugeiconsIcon icon={Leaf01Icon} className="size-4 text-primary" strokeWidth={2} />Cooked fresh to order — never reheated</li>
          </ul>

          <div id="details" className="scroll-mt-24 pt-2">
            <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
              <TabsList variant="line">
                <TabsTrigger value="about">Details</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({count})</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="pt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</TabsContent>
              <TabsContent value="ingredients" className="flex flex-wrap gap-2 pt-4">
                {product.ingredients.map((i) => <Badge key={i} variant="outline">{i}</Badge>)}
                <p className="w-full pt-2 text-xs text-muted-foreground">Please tell us about allergies in the delivery notes.</p>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4 text-sm text-muted-foreground">
                {count} verified review{count === 1 ? "" : "s"} · {avg.toFixed(1)} average. Scroll down to read them all.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t pt-12" aria-labelledby="rev-title">
        <SectionHeading eyebrow="Community" title="Reviews & comments" />
        <h2 id="rev-title" className="sr-only">Reviews</h2>
        <Reviews productId={id} productName={product.name} />
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t pt-12">
          <SectionHeading eyebrow="You might also like" title="Pairs well with" />
          <Grid>{related.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
        </section>
      )}

      {/* Sticky mobile add-to-cart */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur sm:hidden">
        <Button size="lg" className="h-12 w-full rounded-full text-base" onClick={add}>
          <HugeiconsIcon icon={ShoppingBag01Icon} data-icon="inline-start" strokeWidth={2} />
          Add to cart · {formatPrice(unit * qty)}
        </Button>
      </div>
    </div>
  )
}
