import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { actions, useStore } from "@/lib/store"
import { getProduct } from "@/data/catalog"

export function FavoriteButton({ productId, className, variant = "secondary", size = "icon" }: { productId: string; className?: string; variant?: "secondary" | "outline" | "ghost"; size?: "icon" | "icon-sm" | "icon-lg" }) {
  const { t } = useTranslation()
  const active = useStore((s) => s.favorites.includes(productId))
  const name = getProduct(productId)?.name ?? ""
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-pressed={active}
      aria-label={active ? t("favorites.removeAria", { name }) : t("favorites.saveAria", { name })}
      className={cn("rounded-full shadow-sm backdrop-blur", className)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        actions.toggleFavorite(productId)
        if (!active) toast.add({ title: t("favorites.addedToFavorites"), description: name, type: "success" })
      }}
    >
      <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} className={cn("transition-all", active && "scale-110 fill-rose-500 text-rose-500")} />
    </Button>
  )
}
