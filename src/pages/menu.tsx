import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FilterHorizontalIcon, Search01Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CATEGORIES, getCategory, PRODUCTS, TAGS, type TagId } from "@/data/catalog"
import { href, usePath } from "@/lib/router"
import { Crumbs } from "@/components/shop/page-header"
import { ProductCard } from "@/components/shop/product-card"
import { Grid } from "./home"
import { Badge } from "@/components/ui/badge"

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "popular" | "newest"
const SORTS: { value: Sort; labelKey: string }[] = [
  { value: "featured", labelKey: "menu.featured" },
  { value: "popular", labelKey: "menu.mostLiked" },
  { value: "price-asc", labelKey: "menu.priceLowHigh" },
  { value: "price-desc", labelKey: "menu.priceHighLow" },
  { value: "newest", labelKey: "menu.newest" },
]
const PRICES = [{ id: "any", labelKey: "common.any", max: Infinity }, { id: "10", labelKey: "menu.under10", max: 10 }, { id: "15", labelKey: "menu.under15", max: 15 }, { id: "20", labelKey: "menu.under20", max: 20 }]

export function MenuPage({ category }: { category?: string }) {
  const { t } = useTranslation()
  const path = usePath()
  const q = (new URLSearchParams(path.split("?")[1] ?? "").get("q") ?? "").trim().toLowerCase()
  const cat = category ? getCategory(category as never) : undefined
  const [sort, setSort] = React.useState<Sort>("featured")
  const [tags, setTags] = React.useState<TagId[]>([])
  const [price, setPrice] = React.useState("any")

  const results = React.useMemo(() => {
    const max = PRICES.find((p) => p.id === price)?.max ?? Infinity
    const list = PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat.id) &&
        p.price <= max &&
        tags.every((t) => p.tags.includes(t)) &&
        (!q || [p.name, p.summary, p.description, ...p.tags.map((tag) => TAGS[tag].label), t(`catalog.categories.${p.category}.name`)].join(" ").toLowerCase().includes(q))
    )
    const by: Record<Sort, (a: (typeof list)[0], b: (typeof list)[0]) => number> = {
      featured: (a, b) => Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller")) || b.likes - a.likes,
      popular: (a, b) => b.likes - a.likes,
      rating: (a, b) => b.rating - a.rating,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      newest: (a, b) => b.createdAt - a.createdAt,
    }
    return [...list].sort(by[sort])
  }, [cat, q, sort, tags, price, t])

  const activeFilters = tags.length + (price !== "any" ? 1 : 0)
  const reset = () => (setTags([]), setPrice("any"))
  const title = q ? t("menu.resultsFor", { query: q }) : (cat ? t(`catalog.categories.${cat.id}.name`) : t("menu.fullMenu"))

  const filters = <Filters tags={tags} setTags={setTags} price={price} setPrice={setPrice} category={cat?.id} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: t("nav.home"), href: href.home }, { label: t("nav.menu"), href: href.menu }, ...(cat ? [{ label: t(`catalog.categories.${cat.id}.name`) }] : q ? [{ label: t("nav.searchAria") }] : [])]} />

      <div className="mt-4 mb-6 flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-muted-foreground">{cat ? t(`catalog.categories.${cat.id}.blurb`) : t("menu.everythingWeCook")}</p>
      </div>

      {/* Category pills */}
      <div className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="navigation" aria-label={t("nav.categories")}>
        <div className="flex w-max gap-2 pb-1">
          <Button size="sm" className="rounded-full" variant={!cat ? "default" : "outline"} render={<a href={href.menu} />}>{t("menu.all")}</Button>
          {CATEGORIES.map((c) => (
            <Button key={c.id} size="sm" className="rounded-full" variant={cat?.id === c.id ? "default" : "outline"} render={<a href={href.category(c.id)} />}>{t(`catalog.categories.${c.id}.name`)}</Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">{t("menu.filters")}</h2>
              {activeFilters > 0 && <Button variant="link" size="xs" onClick={reset}>{t("menu.clearAll")}</Button>}
            </div>
            {filters}
          </div>
        </aside>

        <section aria-label={t("product.dishNotFound")}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">{results.length === 1 ? t("menu.dishCount", { count: results.length }) : t("menu.dishesCount", { count: results.length })}</p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" className="lg:hidden" />}>
                  <HugeiconsIcon icon={FilterHorizontalIcon} data-icon="inline-start" strokeWidth={2} />
                  {t("menu.filters")}
                  {activeFilters > 0 && <Badge className="ms-1 size-5 justify-center rounded-full p-0">{activeFilters}</Badge>}
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle>{t("menu.filters")}</SheetTitle>
                    <SheetDescription>{t("menu.narrowDown")}</SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto px-4">{filters}</div>
                  <SheetFooter className="flex-row border-t">
                    <Button variant="outline" className="flex-1" onClick={reset}>{t("menu.clear")}</Button>
                    <Button className="flex-1" render={<span />} nativeButton={false}>{t("menu.showDishes", { count: results.length })}</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={(v) => setSort(v as Sort)} items={SORTS}>
                <SelectTrigger className="w-48" aria-label={t("menu.sortBy")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SORTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{t(s.labelKey)}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <Empty className="rounded-2xl border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon"><HugeiconsIcon icon={Search01Icon} strokeWidth={2} /></EmptyMedia>
                <EmptyTitle>{t("menu.noDishesMatch")}</EmptyTitle>
                <EmptyDescription>{t("menu.tryRemovingFilter")}</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={() => { reset(); window.location.hash = cat ? href.category(cat.id) : href.menu }}>{t("menu.resetFilters")}</Button>
              </EmptyContent>
            </Empty>
          ) : (
            <Grid>{results.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}</Grid>
          )}
        </section>
      </div>
    </div>
  )
}

function Filters({ tags, setTags, price, setPrice, category }: { tags: TagId[]; setTags: (t: TagId[]) => void; price: string; setPrice: (p: string) => void; category?: string }) {
  const { t } = useTranslation()
  const available = (Object.keys(TAGS) as TagId[]).filter((tag) => PRODUCTS.some((p) => (!category || p.category === category) && p.tags.includes(tag)))
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">{t("menu.dietaryLabels")}</h3>
        <ToggleGroup multiple value={tags} onValueChange={(v) => setTags(v as TagId[])} variant="outline" spacing={1} className="flex-wrap" aria-label={t("menu.tagsAria")}>
          {available.map((tag) => (
            <ToggleGroupItem key={tag} value={tag} size="sm" className="rounded-full aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary">{t(`catalog.tags.${tag}`)}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">{t("menu.price")}</h3>
        <ToggleGroup value={[price]} onValueChange={(v) => setPrice(v[0] ?? "any")} variant="outline" spacing={1} className="flex-wrap" aria-label={t("menu.priceAria")}>
          {PRICES.map((p) => (
            <ToggleGroupItem key={p.id} value={p.id} size="sm" className="rounded-full aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary">{t(p.labelKey)}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}
