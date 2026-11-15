import { toast } from "@/components/ui/toast"
import { openCart } from "@/lib/ui-state"

export function notifyAdded(name: string, qty = 1) {
  toast.add({
    title: "Added to cart",
    description: qty > 1 ? `${qty} × ${name}` : name,
    type: "success",
    actionProps: { children: "View cart", onClick: openCart },
  })
}
