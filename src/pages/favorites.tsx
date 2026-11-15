import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getProduct } from "@/data/catalog"
import { href } from "@/lib/router"
import { useStore } from "@/lib/store"
import { Crumbs } from "@/components/shop/page-header"
import { ProductCard } from "@/components/shop/product-card"
import { Grid } from "./home"

export function FavoritesPage() {
  const ids = useStore((s) => s.favorites)
  const items = ids.map(getProduct).filter((p) => !!p)
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: "Home", href: href.home }, { label: "Favorites" }]} />
      <h1 className="mt-4 mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">Your favorites</h1>
      {items.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon"><HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} /></EmptyMedia>
            <EmptyTitle>Nothing saved yet</EmptyTitle>
            <EmptyDescription>Tap the heart on any dish to keep it here for later.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button render={<a href={href.menu} />}>Explore the menu</Button></EmptyContent>
        </Empty>
      ) : (
        <Grid>{items.map((p) => <ProductCard key={p!.id} product={p!} />)}</Grid>
      )}
    </div>
  )
}
