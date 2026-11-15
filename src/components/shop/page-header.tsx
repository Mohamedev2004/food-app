import * as React from "react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export type Crumb = { label: string; href?: string }

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((c, i) => (
          <React.Fragment key={c.label}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {c.href && i < items.length - 1 ? <BreadcrumbLink render={<a href={c.href} />}>{c.label}</BreadcrumbLink> : <BreadcrumbPage>{c.label}</BreadcrumbPage>}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        {eyebrow && <p className="text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>}
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}
