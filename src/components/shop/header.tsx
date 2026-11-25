import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, FavouriteIcon, Moon02Icon, Search01Icon, ShoppingBag01Icon, Sun03Icon, Menu01Icon, Cancel01Icon, LanguagesIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "@/components/theme-provider"
import { CATEGORIES } from "@/data/catalog"
import { href, parse, usePath } from "@/lib/router"
import { useCartSummary, useStore } from "@/lib/store"
import { openCart } from "@/lib/ui-state"
import { formatPrice } from "@/lib/format"

export function Logo({ className }: { className?: string }) {
  return (
    <a href={href.home} className={"inline-flex items-center gap-2 font-heading text-xl font-bold tracking-tight " + (className ?? "")} aria-label="Borito Crispy — home">
      <img src="/borito-crispy-logo.svg" alt="Borito Crispy" className="size-8 object-contain" />
      Borito Crispy
    </a>
  )
}

function SearchBox({ className, onDone }: { className?: string; onDone?: () => void }) {
  const { t } = useTranslation()
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
        <InputGroupInput type="search" placeholder={t("nav.searchPlaceholder")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("nav.searchAria")} />
      </InputGroup>
    </form>
  )
}

export function Header() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const cart = useCartSummary()
  const favs = useStore((s) => s.favorites.length)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const dark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("nav.openMenu")} />}>
              <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="left" showCloseButton={false} className="w-[min(100%,20rem)] gap-0">
              <SheetHeader className="flex-row items-center justify-between border-b">
                <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
                <SheetDescription className="sr-only">{t("nav.browseCategories")}</SheetDescription>
                <Logo />
                <Button variant="ghost" size="icon-sm" aria-label={t("nav.closeMenu")} onClick={() => setMenuOpen(false)}>
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                </Button>
              </SheetHeader>
              <div className="flex flex-col gap-4 overflow-y-auto p-4">
                <SearchBox onDone={() => setMenuOpen(false)} />
                <nav className="flex flex-col" aria-label={t("nav.mobile")}>
                  {[{ l: t("nav.home"), h: href.home }, { l: t("nav.fullMenu"), h: href.menu }, { l: t("nav.menus"), h: href.menus }, { l: t("nav.favorites"), h: href.favorites }, { l: t("nav.myOrders"), h: href.orders }].map((i) => (
                    <a key={i.h} href={i.h} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                      {i.l}
                    </a>
                  ))}
                  <p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("nav.categories")}</p>
                  {CATEGORIES.map((c) => (
                    <a key={c.id} href={href.category(c.id)} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-muted">
                      {t(`catalog.categories.${c.id}.name`)}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Logo />

          <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label={t("nav.primary")}>
            <Button variant="ghost" render={<a href={href.home} />}>{t("nav.home")}</Button>
            <Button variant="ghost" render={<a href={href.menu} />}>{t("nav.menu")}</Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" />}>
                {t("nav.categories")}
                <HugeiconsIcon icon={ArrowDown01Icon} data-icon="inline-end" strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuGroup>
                  {CATEGORIES.map((c) => (
                    <DropdownMenuItem key={c.id} render={<a href={href.category(c.id)} />}>
                      {t(`catalog.categories.${c.id}.name`)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" render={<a href={href.orders} />}>{t("nav.orders")}</Button>
            <Button variant="ghost" render={<a href={href.menus} />}>{t("nav.menus")}</Button>
          </nav>

          <SearchBox className="ms-auto hidden max-w-sm flex-1 md:block" />

          <div className="ms-auto flex items-center gap-1 md:ms-0">
            <LanguageSwitcher />
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={t("header.toggleTheme")} onClick={() => setTheme(dark ? "light" : "dark")} />}>
                <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} strokeWidth={2} />
              </TooltipTrigger>
              <TooltipContent>{dark ? t("header.lightMode") : t("header.darkMode")}</TooltipContent>
            </Tooltip>

            <Button variant="ghost" size="icon" className="relative" render={<a href={href.favorites} />} aria-label={t("header.favoritesAria", { count: favs })}>
              <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} />
              {favs > 0 && <Badge className="absolute -inset-e-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full px-1 text-[10px]">{favs}</Badge>}
            </Button>

            <Button variant="default" data-cart-target className="relative ms-1 gap-2 rounded-full ps-3 pe-3.5" onClick={openCart} aria-label={t("header.cartAria", { count: cart.count })}>
              <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} />
              <span className="hidden text-sm sm:inline">{cart.count > 0 ? formatPrice(cart.total) : t("header.cart")}</span>
              {cart.count > 0 && <span className="grid size-5 place-items-center rounded-full bg-primary-foreground text-[11px] font-bold text-primary">{cart.count}</span>}
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const languages = [
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
    { code: "ar", label: "AR", name: "العربية" },
    { code: "es", label: "ES", name: "Español" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Change language" />}>
        <HugeiconsIcon icon={LanguagesIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={currentLang === lang.code ? "bg-muted" : ""}
            >
              <span className="font-medium">{lang.label}</span>
              <span className="ms-2 text-sm text-muted-foreground">{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
