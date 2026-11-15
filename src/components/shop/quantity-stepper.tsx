import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

export function QuantityStepper({ value, onChange, min = 1, max = 20, size = "default", label = "Quantity" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; size?: "sm" | "default"; label?: string }) {
  const btn = size === "sm" ? "icon-sm" : "icon"
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center rounded-full border bg-background", size === "sm" ? "gap-0.5 p-0.5" : "gap-1 p-1")}>
      <Button type="button" variant="ghost" size={btn} className="rounded-full" aria-label="Decrease quantity" disabled={value <= min && min > 0} onClick={() => onChange(value - 1)}>
        <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
      </Button>
      <span className={cn("text-center font-medium tabular-nums", size === "sm" ? "min-w-6 text-sm" : "min-w-8")} aria-live="polite">
        {value}
      </span>
      <Button type="button" variant="ghost" size={btn} className="rounded-full" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
