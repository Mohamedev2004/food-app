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
      <section className="relative overflow-hidden border-b bg-linear-to-b from-primary/10 via-background to-background">
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
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-stretch">
              {/* Main Featured Card */}
              <div className="group relative h-85 overflow-hidden rounded-3xl border bg-card shadow-xl sm:col-span-7 sm:h-105">
                <LazyImage
                  photoId={heroMain.image}
                  alt={heroMain.title}
                  priority
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Top-left delivery pill */}
                <div className="absolute start-3.5 top-3.5 z-10 flex items-center gap-2.5 rounded-2xl border bg-background/95 px-3.5 py-2 shadow-md backdrop-blur">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-4" />
                  </span>
                  <p className="text-xs font-semibold leading-tight sm:text-sm">
                    {t("home.hotIn")}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-5 pt-12 text-white">
                  <p className="font-heading text-lg font-semibold">{heroMain.title}</p>
                  <p className="line-clamp-2 text-xs text-white/85">{heroMain.subtitle}</p>
                </div>
              </div>

              {/* Right Stacked Cards */}
              <div className="grid grid-cols-2 gap-4 sm:col-span-5 sm:grid-cols-1">
                <div className="group relative h-[180px] overflow-hidden rounded-3xl border bg-card shadow-xl sm:h-[202px]">
                  <LazyImage
                    photoId={heroSecondary.image}
                    alt="Burrito Crispy"
                    priority
                    sizes="(min-width: 1024px) 240px, 50vw"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-3.5 pt-8 text-white">
                    <p className="truncate font-heading text-sm font-semibold">Burrito Crispy</p>
                  </div>
                </div>

                <div className="group relative h-[180px] overflow-hidden rounded-3xl border bg-card shadow-xl sm:h-[202px]">
                  <LazyImage
                    photoId={heroAccent.image}
                    alt="Bowl Crispy"
                    sizes="(min-width: 1024px) 240px, 50vw"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-3.5 pt-8 text-white">
                    <p className="truncate font-heading text-sm font-semibold">Bowl Crispy</p>
                  </div>
                </div>
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
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-3 text-white sm:p-4">
                  <span className="font-heading text-base font-semibold sm:text-lg">{t(`catalog.categories.${c.id}.name`)}</span>
                  <span className="text-xs text-white/80">{t("home.dishesCount", { count: PRODUCTS.filter((p) => p.category === c.id).length })}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Menu cards */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading
          eyebrow={t("nav.menus")}
          title={t("home.menuCards")}
          action={
            <Button variant="ghost" render={<a href={href.menus} />}>
              {t("home.viewAll")}
              <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {["/menu1.jpeg", "/menu2.jpeg"].map((src, i) => (
            <a
              key={src}
              href={href.menus}
              className="group relative block overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={src}
                alt={t(`menus.menu${i + 1}Alt`)}
                loading="lazy"
                className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pt-10 pb-3 text-sm font-semibold text-white">
                {t(`menus.menu${i + 1}`)}
              </span>
            </a>
          ))}
        </div>
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