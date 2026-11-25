import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getProduct } from "@/data/catalog"
import { href } from "@/lib/router"
import { useStore } from "@/lib/store"
import { Crumbs } from "@/components/shop/page-header"
import { ProductCard } from "@/components/shop/product-card"
import { Grid } from "./home"

export function FavoritesPage() {
  const { t } = useTranslation()
  const ids = useStore((s) => s.favorites)
  const items = ids.map(getProduct).filter((p) => !!p)
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: t("nav.home"), href: href.home }, { label: t("nav.favorites") }]} />
      <h1 className="mt-4 mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("favorites.yourFavorites")}</h1>
      {items.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon"><HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} /></EmptyMedia>
            <EmptyTitle>{t("favorites.nothingSaved")}</EmptyTitle>
            <EmptyDescription>{t("favorites.tapHeart")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button render={<a href={href.menu} />}>{t("favorites.exploreMenu")}</Button></EmptyContent>
        </Empty>
      ) : (
        <Grid>{items.map((p) => <ProductCard key={p!.id} product={p!} />)}</Grid>
      )}
    </div>
  )
}
