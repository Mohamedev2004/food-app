import { Badge } from "@/components/ui/badge"
import { TAGS, type TagId } from "@/data/catalog"

export function TagBadge({ tag }: { tag: TagId }) {
  const variant = tag === "bestseller" || tag === "new" ? "default" : "secondary"
  return <Badge variant={variant}>{TAGS[tag].label}</Badge>
}
