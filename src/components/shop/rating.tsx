import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)))
        return (
          <span key={i} className="relative inline-block size-4">
            <HugeiconsIcon icon={StarIcon} className="absolute inset-0 size-4 text-border" strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <HugeiconsIcon icon={StarIcon} className="size-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function RatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onClick={() => onChange(i)}
          className="rounded-md p-0.5 outline-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <HugeiconsIcon icon={StarIcon} className={cn("size-6", i <= value ? "fill-amber-400 text-amber-400" : "text-border")} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  )
}
