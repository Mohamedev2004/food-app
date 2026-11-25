import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Clock01Icon, DeliveryTruck01Icon, Leaf01Icon, SecurityCheckIcon, StarIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { CATEGORIES, getProduct, HERO_PHOTOS, PRODUCTS } from "@/data/catalog"
import { href } from "@/lib/router"
import { DELIVERY_FEE_MOHAMMEDIA, DELIVERY_FEE_OUTSIDE, useStore } from "@/lib/store"
import { LazyImage } from "@/components/shop/lazy-image"
import { ProductCard } from "@/components/shop/product-card"
import { SectionHeading } from "@/components/shop/page-header"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"

export function HomePage() {
  const { t } = useTranslation()
  const recent = useStore((s) => s.recent)
  const bestsellers = PRODUCTS.filter((p) => p.tags.includes("bestseller")).slice(0, 4)
  const picks = PRODUCTS.filter((p) => p.tags.includes("chefs-pick")).slice(0, 4)
  const newest = [...PRODUCTS].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)
  const recentProducts = recent.map(getProduct).filter(Boolean).slice(0, 4)

  const [heroMain, heroSecondary, heroAccent] = HERO_PHOTOS

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-6">
            <Badge variant="secondary" className="gap-1.5 py-3 ps-2 pe-3">
              <HugeiconsIcon icon={StarIcon} className="size-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
              {t("home.ratedBadge")}
            </Badge>
            <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")}
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="h-12 px-6 text-base" render={<a href={href.menu} />}>
                {t("home.orderNow")}
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base"
                render={<a href="#bestsellers" />}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t("home.seeBestsellers")}
              </Button>
            </div>
            <dl className="mt-2 flex gap-8">
              {[
                ["30 min", t("home.avgDelivery")],
                [`${PRODUCTS.length}+`, t("home.dishes")],
                [`${formatPrice(DELIVERY_FEE_MOHAMMEDIA)}–${formatPrice(DELIVERY_FEE_OUTSIDE)}`, t("home.deliveryFee")],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-heading text-2xl font-bold">{v}</dt>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Balanced Hero Image Showcase */}
          <div className="relative mx-auto w-full max-w-xl pb-6 sm:pb-0 lg:col-span-6 lg:max-w-none">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="group relative overflow-hidden rounded-3xl border bg-card shadow-xl sm:col-span-7">
                <LazyImage
                  photoId={heroMain.image}
                  alt={heroMain.title}
                  ratio={4 / 4}
                  priority
                  sizes="(min-width: 1024px) 340px, 100vw"
                  imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 pt-10 text-white">
                  <p className="font-heading text-base font-semibold">{heroMain.title}</p>
                  <p className="line-clamp-1 text-xs text-white/85">{heroMain.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:col-span-5">
                <div className="group relative overflow-hidden rounded-3xl border bg-card shadow-xl">
                  <LazyImage
                    photoId={heroSecondary.image}
                    alt={heroSecondary.title}
                    ratio={4 / 3}
                    priority
                    sizes="(min-width: 1024px) 240px, 100vw"
                    imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white">
                    <p className="font-heading text-sm font-semibold">Bouri Crispy</p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-3xl border bg-card shadow-xl">
                  <LazyImage
                    photoId={heroAccent.image}
                    alt={heroAccent.title}
                    ratio={4 / 3}
                    sizes="(min-width: 1024px) 240px, 100vw"
                    imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white">
                    <p className="font-heading text-sm font-semibold">{heroAccent.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur sm:absolute sm:end-4 sm:-bottom-5 sm:mt-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} />
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold">{t("home.hotIn30")}</p>
                <p className="text-muted-foreground">{t("home.orItsOnUs")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6" aria-labelledby="cats">
        <SectionHeading eyebrow={t("home.browse")} title={t("home.whatCraving")} />
        <h2 id="cats" className="sr-only">{t("home.categories")}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="group/cat">
              <a
                href={href.category(c.id)}
                className="relative block overflow-hidden rounded-2xl border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring"
              >
                <LazyImage
                  photoId={c.image}
                  alt={t(`catalog.categories.${c.id}.name`)}
                  ratio={4 / 4}
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover/cat:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-3 text-white sm:p-4">
                  <span className="font-heading text-base font-semibold sm:text-lg">{t(`catalog.categories.${c.id}.name`)}</span>
                  <span className="text-xs text-white/80">{t("home.dishesCount", { count: PRODUCTS.filter((p) => p.category === c.id).length })}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="bestsellers" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 sm:px-6">
        <SectionHeading
          eyebrow={t("home.mostLoved")}
          title={t("home.bestsellers")}
          action={
            <Button variant="ghost" render={<a href={href.menu} />}>
              {t("home.viewAll")}
              <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
            </Button>
          }
        />
        <Grid>
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </Grid>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <div className="grid items-center md:grid-cols-2">
            <div className="flex flex-col items-start gap-4 p-8 sm:p-12">
              <Badge className="bg-primary-foreground/15 text-primary-foreground">{t("home.firstOrder")}</Badge>
              <h2 className="font-heading text-3xl font-bold text-balance sm:text-4xl">{t("home.take10Off")}</h2>
              <p className="max-w-md text-primary-foreground/80">
                {t("home.promoText")}
              </p>
              <Button size="lg" variant="secondary" className="h-11 px-6" render={<a href={href.menu} />}>
                {t("home.startOrdering")}
              </Button>
            </div>
            <div className="max-md:hidden md:h-full">
              <LazyImage
                photoId="family-feast-pack.png"
                alt={t("catalog.hero.familyPack.title")}
                ratio={16 / 10}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow={t("home.staffFavourites")} title={t("home.chefsPicks")} />
        <Grid>
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading
          eyebrow={t("home.justLanded")}
          title={t("home.newOnMenu")}
          action={
            <Button variant="ghost" render={<a href={href.menu} />}>
              {t("home.seeFullMenu")}
              <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
            </Button>
          }
        />
        <Grid>
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </section>

      {recentProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <SectionHeading title={t("home.pickUpWhereLeft")} />
          <Grid>
            {recentProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </Grid>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            [Leaf01Icon, t("home.freshDaily"), t("home.freshDailyDesc")],
            [DeliveryTruck01Icon, t("home.fastTracked"), t("home.fastTrackedDesc")],
            [SecurityCheckIcon, t("home.payWhenArrives"), t("home.payWhenArrivesDesc")],
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