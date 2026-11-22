import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FilterHorizontalIcon, Search01Icon } from "@hugeicons/core-free-icons"

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
const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Most liked" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
]
const PRICES = [{ id: "any", label: "Any", max: Infinity }, { id: "10", label: "Under 10 DH", max: 10 }, { id: "15", label: "Under 15 DH", max: 15 }, { id: "20", label: "Under 20 DH", max: 20 }]

export function MenuPage({ category }: { category?: string }) {
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
        (!q || [p.name, p.summary, p.description, ...p.tags.map((t) => TAGS[t].label), getCategory(p.category)?.name ?? ""].join(" ").toLowerCase().includes(q))
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
  }, [cat, q, sort, tags, price])

  const activeFilters = tags.length + (price !== "any" ? 1 : 0)
  const reset = () => (setTags([]), setPrice("any"))
  const title = q ? `Results for “${q}”` : (cat?.name ?? "Full menu")

  const filters = <Filters tags={tags} setTags={setTags} price={price} setPrice={setPrice} category={cat?.id} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: "Home", href: href.home }, { label: "Menu", href: href.menu }, ...(cat ? [{ label: cat.name }] : q ? [{ label: "Search" }] : [])]} />

      <div className="mt-4 mb-6 flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-muted-foreground">{cat?.blurb ?? "Everything we cook, in one place."}</p>
      </div>

      {/* Category pills */}
      <div className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="navigation" aria-label="Categories">
        <div className="flex w-max gap-2 pb-1">
          <Button size="sm" className="rounded-full" variant={!cat ? "default" : "outline"} render={<a href={href.menu} />}>All</Button>
          {CATEGORIES.map((c) => (
            <Button key={c.id} size="sm" className="rounded-full" variant={cat?.id === c.id ? "default" : "outline"} render={<a href={href.category(c.id)} />}>{c.name}</Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Filters</h2>
              {activeFilters > 0 && <Button variant="link" size="xs" onClick={reset}>Clear all</Button>}
            </div>
            {filters}
          </div>
        </aside>

        <section aria-label="Products">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">{results.length} dish{results.length === 1 ? "" : "es"}</p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" className="lg:hidden" />}>
                  <HugeiconsIcon icon={FilterHorizontalIcon} data-icon="inline-start" strokeWidth={2} />
                  Filters
                  {activeFilters > 0 && <Badge className="ms-1 size-5 justify-center rounded-full p-0">{activeFilters}</Badge>}
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down the menu.</SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto px-4">{filters}</div>
                  <SheetFooter className="flex-row border-t">
                    <Button variant="outline" className="flex-1" onClick={reset}>Clear</Button>
                    <Button className="flex-1" render={<span />} nativeButton={false}>Show {results.length} dishes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={(v) => setSort(v as Sort)} items={SORTS}>
                <SelectTrigger className="w-48" aria-label="Sort by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SORTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
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
                <EmptyTitle>No dishes match</EmptyTitle>
                <EmptyDescription>Try removing a filter or searching for something else.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={() => { reset(); window.location.hash = cat ? href.category(cat.id) : href.menu }}>Reset filters</Button>
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
  const available = (Object.keys(TAGS) as TagId[]).filter((t) => PRODUCTS.some((p) => (!category || p.category === category) && p.tags.includes(t)))
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Dietary & labels</h3>
        <ToggleGroup multiple value={tags} onValueChange={(v) => setTags(v as TagId[])} variant="outline" spacing={1} className="flex-wrap" aria-label="Tags">
          {available.map((t) => (
            <ToggleGroupItem key={t} value={t} size="sm" className="rounded-full aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary">{TAGS[t].label}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Price</h3>
        <ToggleGroup value={[price]} onValueChange={(v) => setPrice(v[0] ?? "any")} variant="outline" spacing={1} className="flex-wrap" aria-label="Price">
          {PRICES.map((p) => (
            <ToggleGroupItem key={p.id} value={p.id} size="sm" className="rounded-full aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary">{p.label}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}
