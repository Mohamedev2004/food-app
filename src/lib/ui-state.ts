import { useSyncExternalStore } from "react"

/** Tiny non-persisted store for UI toggles (cart drawer, checkout dialog). */
type UI = { cartOpen: boolean; checkoutOpen: boolean }
let ui: UI = { cartOpen: false, checkoutOpen: false }
const listeners = new Set<() => void>()

export const setUI = (patch: Partial<UI>) => {
  ui = { ...ui, ...patch }
  listeners.forEach((l) => l())
}
export const useUI = () =>
  useSyncExternalStore(
    (l) => (listeners.add(l), () => void listeners.delete(l)),
    () => ui
  )
export const openCart = () => setUI({ cartOpen: true })
