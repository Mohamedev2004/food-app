import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, ThumbsUpIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { formatDate } from "@/lib/format"
import { actions, useReviews, useStore } from "@/lib/store"
import { RatingInput, Stars } from "./rating"

export function Reviews({ productId, productName }: { productId: string; productName: string }) {
  const { t } = useTranslation()
  const reviews = useReviews(productId)
  const helpful = useStore((s) => s.helpful)
  const [sort, setSort] = React.useState<"recent" | "high" | "low">("recent")
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => r.rating === n).length }))
  const sorted = [...reviews].sort((a, b) => (sort === "recent" ? b.date - a.date : sort === "high" ? b.rating - a.rating : a.rating - b.rating))

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="font-heading text-5xl font-bold tabular-nums">{avg.toFixed(1)}</span>
          <div className="flex flex-col gap-1">
            <Stars value={avg} />
            <span className="text-sm text-muted-foreground">{reviews.length === 1 ? t("reviews.reviewsCount", { count: reviews.length }) : t("reviews.reviewsCountPlural", { count: reviews.length })}</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2" aria-label={t("reviews.ratingBreakdown")}>
          {dist.map(({ n, c }) => (
            <li key={n} className="flex items-center gap-3 text-sm">
              <span className="w-3 tabular-nums">{n}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-amber-400" style={{ width: reviews.length ? `${(c / reviews.length) * 100}%` : 0 }} />
              </div>
              <span className="w-5 text-end text-muted-foreground tabular-nums">{c}</span>
            </li>
          ))}
        </ul>
        <Separator />
        <ReviewForm productId={productId} productName={productName} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold">{t("reviews.whatPeopleSaying")}</h3>
          <div className="flex gap-1" role="group" aria-label={t("reviews.sortReviews")}>
            {([["recent", t("reviews.newest")], ["high", t("reviews.highest")], ["low", t("reviews.lowest")]] as const).map(([k, l]) => (
              <Button key={k} size="xs" variant={sort === k ? "secondary" : "ghost"} aria-pressed={sort === k} onClick={() => setSort(k)}>{l}</Button>
            ))}
          </div>
        </div>
        <ul className="flex flex-col divide-y">
          {sorted.map((r) => {
            const mine = !r.seed
            const marked = helpful.includes(r.id)
            return (
              <li key={r.id} className="flex gap-4 py-5">
                <Avatar>
                  <AvatarFallback>{r.author.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium">{r.author}</span>
                    {mine && <Badge variant="secondary">{t("reviews.you")}</Badge>}
                    <span className="text-xs text-muted-foreground">{formatDate(r.date)}</span>
                  </div>
                  <Stars value={r.rating} />
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Button size="xs" variant="outline" aria-pressed={marked} className={cn(marked && "border-primary/40 bg-primary/10 text-primary")} onClick={() => actions.toggleHelpful(r.id)}>
                      <HugeiconsIcon icon={ThumbsUpIcon} data-icon="inline-start" strokeWidth={2} />
                      {t("reviews.helpful", { count: r.helpful + (marked ? 1 : 0) })}
                    </Button>
                    {mine && (
                      <Button size="xs" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => (actions.deleteReview(r.id), toast.add({ title: t("reviews.reviewDeleted") }))}>
                        <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" strokeWidth={2} />
                        {t("reviews.delete")}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function ReviewForm({ productId, productName }: { productId: string; productName: string }) {
  const { t } = useTranslation()
  const [rating, setRating] = React.useState(0)
  const [author, setAuthor] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [err, setErr] = React.useState<Record<string, string>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!rating) next.rating = t("reviews.pickStarRating")
    if (author.trim().length < 2) next.author = t("reviews.tellUsName")
    if (body.trim().length < 10) next.body = t("reviews.shareMoreWords")
    setErr(next)
    if (Object.keys(next).length) return
    actions.addReview({ productId, author: author.trim(), rating, title: title.trim() || t("reviews.myReview"), body: body.trim() })
    setRating(0)
    setTitle("")
    setBody("")
    toast.add({ title: t("reviews.thanksReview"), description: productName, type: "success" })
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <h3 className="font-heading text-lg font-semibold">{t("reviews.writeReview")}</h3>
      <FieldGroup>
        <Field data-invalid={!!err.rating}>
          <FieldLabel>{t("reviews.yourRating")}</FieldLabel>
          <RatingInput value={rating} onChange={setRating} />
          {err.rating && <FieldError>{err.rating}</FieldError>}
        </Field>
        <Field data-invalid={!!err.author}>
          <FieldLabel htmlFor="rv-name">{t("reviews.name")}</FieldLabel>
          <Input id="rv-name" value={author} aria-invalid={!!err.author} onChange={(e) => setAuthor(e.target.value)} />
          {err.author && <FieldError>{err.author}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="rv-title">{t("reviews.headline")}</FieldLabel>
          <Input id="rv-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field data-invalid={!!err.body}>
          <FieldLabel htmlFor="rv-body">{t("reviews.comment")}</FieldLabel>
          <Textarea id="rv-body" rows={4} value={body} aria-invalid={!!err.body} onChange={(e) => setBody(e.target.value)} />
          {err.body && <FieldError>{err.body}</FieldError>}
        </Field>
      </FieldGroup>
      <Button type="submit">{t("reviews.submitReview")}</Button>
    </form>
  )
}
