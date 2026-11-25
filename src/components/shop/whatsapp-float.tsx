import { HugeiconsIcon } from "@hugeicons/react"
import { WhatsappIcon } from "@hugeicons/core-free-icons"

import { WHATSAPP_NUMBER } from "@/lib/store"

/** Floating WhatsApp button — always visible, opens a chat with the shop. */
export function WhatsappFloat() {
  if (!WHATSAPP_NUMBER) return null
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <HugeiconsIcon icon={WhatsappIcon} className="size-7" strokeWidth={2} />
    </a>
  )
}
