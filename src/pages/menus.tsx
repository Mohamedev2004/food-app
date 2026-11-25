import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { href } from "@/lib/router"
import { Crumbs } from "@/components/shop/page-header"

const MENUS = ["/menu1.jpeg", "/menu2.jpeg"]

export function MenusPage() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Crumbs items={[{ label: t("nav.home"), href: href.home }, { label: t("nav.menus") }]} />
      <div className="mt-4 mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("menus.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("menus.subtitle")}</p>
      </div>
      <div className="flex flex-col gap-12">
        {MENUS.map((src, i) => {
          const title = t(`menus.menu${i + 1}`)
          const alt = t(`menus.menu${i + 1}Alt`)
          return (
            <section key={src}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="font-heading text-xl font-bold">{title}</h2>
                <Button variant="outline" size="sm" render={<a href={src} target="_blank" rel="noreferrer" />}>
                  {t("menus.viewFullSize")}
                </Button>
              </div>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <img src={src} alt={alt} className="w-full" loading={i === 0 ? "eager" : "lazy"} />
              </a>
            </section>
          )
        })}
      </div>
    </div>
  )
}
