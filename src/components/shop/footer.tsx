import { HugeiconsIcon } from "@hugeicons/react"
import { DeliveryTruck01Icon, Leaf01Icon, SecurityCheckIcon, Clock01Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"
import { CATEGORIES } from "@/data/catalog"
import { href } from "@/lib/router"
import { Logo } from "./header"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <nav aria-label={t("nav.categories")} className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">{t("footer.menu")}</p>
          {CATEGORIES.slice(0, 6).map((c) => (
            <a key={c.id} href={href.category(c.id)} className="text-muted-foreground hover:text-foreground">{t(`catalog.categories.${c.id}.name`)}</a>
          ))}
        </nav>
        <nav aria-label={t("footer.yourAccount")} className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">{t("footer.yourAccount")}</p>
          <a href={href.favorites} className="text-muted-foreground hover:text-foreground">{t("footer.favorites")}</a>
          <a href={href.orders} className="text-muted-foreground hover:text-foreground">{t("footer.orderHistory")}</a>
          <a href={href.menu} className="text-muted-foreground hover:text-foreground">{t("footer.fullMenu")}</a>
          <a href={href.menus} className="text-muted-foreground hover:text-foreground">{t("nav.menus")}</a>
        </nav>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            [DeliveryTruck01Icon, t("footer.freeDelivery")],
            [Clock01Icon, t("footer.avgDelivery")],
            [Leaf01Icon, t("footer.freshDaily")],
            [SecurityCheckIcon, t("footer.payOnDelivery")],
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
