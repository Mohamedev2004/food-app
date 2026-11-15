import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { actions, useStore } from "@/lib/store"
import { getProduct } from "@/data/catalog"

export function FavoriteButton({ productId, className, variant = "secondary", size = "icon" }: { productId: string; className?: string; variant?: "secondary" | "outline" | "ghost"; size?: "icon" | "icon-sm" | "icon-lg" }) {
  const active = useStore((s) => s.favorites.includes(productId))
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      className={cn("rounded-full shadow-sm backdrop-blur", className)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        actions.toggleFavorite(productId)
        if (!active) toast.add({ title: "Saved to favorites", description: getProduct(productId)?.name, type: "success" })
      }}
    >
      <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} className={cn("transition-all", active && "scale-110 fill-rose-500 text-rose-500")} />
    </Button>
  )
}
