import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { type TagId } from "@/data/catalog"

export function TagBadge({ tag }: { tag: TagId }) {
  const { t } = useTranslation()
  const variant = tag === "bestseller" || tag === "new" ? "default" : "secondary"
  return <Badge variant={variant}>{t(`catalog.tags.${tag}`)}</Badge>
}
