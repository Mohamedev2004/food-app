import { toast } from "@/components/ui/toast"
import { openCart } from "@/lib/ui-state"
import i18n from "@/i18n"

export function notifyAdded(name: string, qty = 1) {
  toast.add({
    title: i18n.t("common.addedToCart"),
    description: qty > 1 ? `${qty} × ${name}` : name,
    type: "success",
    actionProps: { children: i18n.t("common.viewCart"), onClick: openCart },
  })
}
