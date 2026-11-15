import { HugeiconsIcon } from "@hugeicons/react"
import { DeliveryTruck01Icon, Leaf01Icon, SecurityCheckIcon, Clock01Icon } from "@hugeicons/core-free-icons"

import { Separator } from "@/components/ui/separator"
import { CATEGORIES } from "@/data/catalog"
import { href } from "@/lib/router"
import { Logo } from "./header"

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">Chef-made food from a neighbourhood kitchen. Fresh ingredients, honest portions, delivered hot.</p>
        </div>
        <nav aria-label="Categories" className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">Menu</p>
          {CATEGORIES.slice(0, 6).map((c) => (
            <a key={c.id} href={href.category(c.id)} className="text-muted-foreground hover:text-foreground">{c.name}</a>
          ))}
        </nav>
        <nav aria-label="Account" className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">Your account</p>
          <a href={href.favorites} className="text-muted-foreground hover:text-foreground">Favorites</a>
          <a href={href.orders} className="text-muted-foreground hover:text-foreground">Order history</a>
          <a href={href.menu} className="text-muted-foreground hover:text-foreground">Full menu</a>
        </nav>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row">
        <p>© {new Date().getFullYear()} Saveur. Photos by Unsplash contributors. Demo shop — data is saved in your browser.</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            [DeliveryTruck01Icon, "Free delivery over $35"],
            [Clock01Icon, "30-min average"],
            [Leaf01Icon, "Fresh daily"],
            [SecurityCheckIcon, "Pay on delivery"],
          ].map(([icon, label]) => (
            <li key={label as string} className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={icon as typeof Clock01Icon} className="size-4" strokeWidth={2} />
              {label as string}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
