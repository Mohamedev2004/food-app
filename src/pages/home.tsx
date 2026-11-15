import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Clock01Icon, DeliveryTruck01Icon, Leaf01Icon, SecurityCheckIcon, StarIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { CATEGORIES, getProduct, PRODUCTS } from "@/data/catalog"
import { href } from "@/lib/router"
import { useStore } from "@/lib/store"
import { LazyImage } from "@/components/shop/lazy-image"
import { ProductCard } from "@/components/shop/product-card"
import { SectionHeading } from "@/components/shop/page-header"
import { Badge } from "@/components/ui/badge"

export function HomePage() {
  const recent = useStore((s) => s.recent)
  const bestsellers = PRODUCTS.filter((p) => p.tags.includes("bestseller")).slice(0, 4)
  const picks = PRODUCTS.filter((p) => p.tags.includes("chefs-pick")).slice(0, 4)
  const newest = [...PRODUCTS].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)
  const recentProducts = recent.map(getProduct).filter(Boolean).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="gap-1.5 py-3 ps-2 pe-3">
              <HugeiconsIcon icon={StarIcon} className="size-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
              Rated 4.8 by 12,000+ hungry neighbours
            </Badge>
            <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Real food, <span className="text-primary">made fresh</span>, at your door.
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">Chef-crafted pizzas, burgers, bowls and desserts from our open kitchen — cooked to order and delivered in about 30 minutes.</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="h-12 px-6 text-base" render={<a href={href.menu} />}>
                Order now
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" render={<a href="#bestsellers" />} onClick={(e) => { e.preventDefault(); document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" }) }}>
                See bestsellers
              </Button>
            </div>
            <dl className="mt-2 flex gap-8">
              {[["30 min", "Avg. delivery"], [`${PRODUCTS.length}+`, "Dishes"], ["Free", "Over $35"]].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-heading text-2xl font-bold">{v}</dt>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto grid w-full max-w-xl grid-cols-5 grid-rows-5 gap-3 sm:gap-4">
            <LazyImage photoId="1565299624946-b28f40a0ae38" alt="Wood-fired pizza" ratio={1} priority sizes="(min-width: 1024px) 360px, 60vw" className="col-span-3 row-span-5 aspect-auto! rounded-3xl shadow-xl" imgClassName="h-full" />
            <LazyImage photoId="1568901346375-23c9450c58cd" alt="Smash burger" ratio={1} priority sizes="(min-width: 1024px) 240px, 40vw" className="col-span-2 row-span-3 aspect-auto! rounded-3xl shadow-xl" imgClassName="h-full" />
            <LazyImage photoId="1578985545062-69928b1d9587" alt="Chocolate cake" ratio={1} sizes="(min-width: 1024px) 240px, 40vw" className="col-span-2 row-span-2 aspect-auto! rounded-3xl shadow-xl" imgClassName="h-full" />
            <div className="absolute start-2 bottom-6 flex items-center gap-3 rounded-2xl border bg-background/95 px-4 py-3 shadow-xl backdrop-blur sm:-start-4">
              <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} />
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold">Hot in 30 min</p>
                <p className="text-muted-foreground">or it's on us</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6" aria-labelledby="cats">
        <SectionHeading eyebrow="Browse" title="What are you craving?" />
        <h2 id="cats" className="sr-only">Categories</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="group/cat">
              <a href={href.category(c.id)} className="relative block overflow-hidden rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring">
                <LazyImage photoId={c.image} alt="" ratio={1} sizes="(min-width: 1024px) 20vw, 33vw" imgClassName="group-hover/cat:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-3 text-white sm:p-4">
                  <span className="font-heading text-base font-semibold sm:text-lg">{c.name}</span>
                  <span className="text-xs text-white/80">{PRODUCTS.filter((p) => p.category === c.id).length} dishes</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="bestsellers" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Most loved" title="Bestsellers" action={<Button variant="ghost" render={<a href={href.menu} />}>View all<HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} /></Button>} />
        <Grid>{bestsellers.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 2} />)}</Grid>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <div className="grid items-center md:grid-cols-2">
            <div className="flex flex-col items-start gap-4 p-8 sm:p-12">
              <Badge className="bg-primary-foreground/15 text-primary-foreground">First order</Badge>
              <h2 className="font-heading text-3xl font-bold text-balance sm:text-4xl">Take 10% off your first order</h2>
              <p className="max-w-md text-primary-foreground/80">Use code <strong>WELCOME10</strong> at checkout. Want more? <strong>FOODIE15</strong> gives you 15% off.</p>
              <Button size="lg" variant="secondary" className="h-11 px-6" render={<a href={href.menu} />}>Start ordering</Button>
            </div>
            <LazyImage photoId="1493770348161-369560ae357d" alt="Brunch spread" ratio={16 / 10} sizes="(min-width: 768px) 50vw, 100vw" className="max-md:hidden md:h-full md:aspect-auto!" imgClassName="h-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Staff favourites" title="Chef's picks" />
        <Grid>{picks.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Just landed" title="New on the menu" action={<Button variant="ghost" render={<a href={href.menu} />}>See the full menu<HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} /></Button>} />
        <Grid>{newest.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
      </section>

      {recentProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <SectionHeading title="Pick up where you left off" />
          <Grid>{recentProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}</Grid>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            [Leaf01Icon, "Fresh every day", "Ingredients delivered each morning from local growers."],
            [DeliveryTruck01Icon, "Fast & tracked", "Cooked to order and at your door in about 30 minutes."],
            [SecurityCheckIcon, "Pay when it arrives", "No card needed. Pay on delivery or at pickup."],
          ].map(([icon, t, d]) => (
            <li key={t as string} className="flex gap-4 rounded-2xl border bg-card p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <HugeiconsIcon icon={icon as typeof Leaf01Icon} strokeWidth={2} />
              </span>
              <div>
                <p className="font-semibold">{t as string}</p>
                <p className="text-sm text-muted-foreground">{d as string}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
}
