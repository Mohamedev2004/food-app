import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, FavouriteIcon, Moon02Icon, Search01Icon, ShoppingBag01Icon, Sun03Icon, Menu01Icon, Cancel01Icon, DeliveryTruck01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "@/components/theme-provider"
import { CATEGORIES } from "@/data/catalog"
import { href, parse, usePath } from "@/lib/router"
import { FREE_DELIVERY_AT, useCartSummary, useStore } from "@/lib/store"
import { openCart } from "@/lib/ui-state"
import { formatPrice } from "@/lib/format"

export function Logo({ className }: { className?: string }) {
  return (
    <a href={href.home} className={"inline-flex items-center gap-2 font-heading text-xl font-bold tracking-tight " + (className ?? "")} aria-label="Saveur home">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8a2 2 0 0 1-2 2M17 21V3c-2.5 1.5-3.5 4.5-3.5 8 0 1.5 1.5 2 3.5 2" />
        </svg>
      </span>
      Saveur
    </a>
  )
}

function SearchBox({ className, onDone }: { className?: string; onDone?: () => void }) {
  const path = usePath()
  const current = React.useMemo(() => new URLSearchParams(path.split("?")[1] ?? "").get("q") ?? "", [path])
  const [draft, setDraft] = React.useState<{ from: string; value: string } | null>(null)
  // Show the URL's query unless the user has typed since it last changed.
  const q = draft && draft.from === current ? draft.value : current
  const setQ = (value: string) => setDraft({ from: current, value })
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        const cat = parse(path.split("?")[0])
        const base = cat.name === "menu" && cat.category ? href.category(cat.category) : href.menu
        window.location.hash = q.trim() ? `${base}?q=${encodeURIComponent(q.trim())}` : base
        onDone?.()
      }}
    >
      <InputGroup className="h-10 rounded-full bg-muted/60">
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupInput type="search" placeholder="Search dishes, tags…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the menu" />
      </InputGroup>
    </form>
  )
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const cart = useCartSummary()
  const favs = useStore((s) => s.favorites.length)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const dark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
          <HugeiconsIcon icon={DeliveryTruck01Icon} className="size-4 shrink-0" strokeWidth={2} />
          Free delivery over {formatPrice(FREE_DELIVERY_AT)} · Use code <strong className="rounded bg-primary-foreground/15 px-1.5 py-0.5">WELCOME10</strong> for 10% off
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}>
              <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="left" showCloseButton={false} className="w-[min(100%,20rem)] gap-0">
              <SheetHeader className="flex-row items-center justify-between border-b">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Browse categories</SheetDescription>
                <Logo />
                <Button variant="ghost" size="icon-sm" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                </Button>
              </SheetHeader>
              <div className="flex flex-col gap-4 overflow-y-auto p-4">
                <SearchBox onDone={() => setMenuOpen(false)} />
                <nav className="flex flex-col" aria-label="Mobile">
                  {[{ l: "Home", h: href.home }, { l: "Full menu", h: href.menu }, { l: "Favorites", h: href.favorites }, { l: "My orders", h: href.orders }].map((i) => (
                    <a key={i.h} href={i.h} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                      {i.l}
                    </a>
                  ))}
                  <p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Categories</p>
                  {CATEGORIES.map((c) => (
                    <a key={c.id} href={href.category(c.id)} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-muted">
                      {c.name}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Logo />

          <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Button variant="ghost" render={<a href={href.home} />}>Home</Button>
            <Button variant="ghost" render={<a href={href.menu} />}>Menu</Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" />}>
                Categories
                <HugeiconsIcon icon={ArrowDown01Icon} data-icon="inline-end" strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuGroup>
                  {CATEGORIES.map((c) => (
                    <DropdownMenuItem key={c.id} render={<a href={href.category(c.id)} />}>
                      {c.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" render={<a href={href.orders} />}>Orders</Button>
          </nav>

          <SearchBox className="ms-auto hidden max-w-sm flex-1 md:block" />

          <div className="ms-auto flex items-center gap-1 md:ms-0">
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")} />}>
                <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} strokeWidth={2} />
              </TooltipTrigger>
              <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
            </Tooltip>

            <Button variant="ghost" size="icon" className="relative" render={<a href={href.favorites} />} aria-label={`Favorites (${favs})`}>
              <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} />
              {favs > 0 && <Badge className="absolute -end-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full px-1 text-[10px]">{favs}</Badge>}
            </Button>

            <Button variant="default" data-cart-target className="relative ms-1 gap-2 rounded-full ps-3 pe-3.5" onClick={openCart} aria-label={`Open cart, ${cart.count} items`}>
              <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} />
              <span className="hidden text-sm sm:inline">{cart.count > 0 ? formatPrice(cart.total) : "Cart"}</span>
              {cart.count > 0 && <span className="grid size-5 place-items-center rounded-full bg-primary-foreground text-[11px] font-bold text-primary">{cart.count}</span>}
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
