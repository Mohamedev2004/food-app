import { useSyncExternalStore } from "react"

import { getProduct, PRODUCTS, seedReviews, type Review } from "@/data/catalog"

/**
 * One tiny store, persisted to localStorage, shared across tabs.
 * Everything the shop remembers lives here so the app stays consistent.
 */
export type CartLine = { key: string; productId: string; sizeId: string; qty: number; note?: string }

export type Order = {
  id: string
  date: number
  lines: { productId?: string; name: string; sizeLabel: string; qty: number; unit: number }[]
  subtotal: number
  delivery: number
  discount: number
  total: number
  customer: { name: string; phone: string; address: string; mode: "delivery" | "pickup" }
}

type State = {
  cart: CartLine[]
  favorites: string[]
  liked: string[]
  helpful: string[]
  reviews: Review[]
  orders: Order[]
  coupon: string | null
  recent: string[]
}

const KEY = "saveur:v1"

const initial = (): State => ({
  cart: [],
  favorites: [],
  liked: [],
  helpful: [],
  reviews: [],
  orders: [],
  coupon: null,
  recent: [],
})

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initial()
    const parsed = JSON.parse(raw) as Partial<State>
    const base = initial()
    const state = { ...base, ...parsed }
    // Drop anything that no longer exists in the catalogue.
    state.cart = state.cart.filter((l) => getProduct(l.productId))
    state.favorites = state.favorites.filter((id) => getProduct(id))
    return state
  } catch {
    return initial()
  }
}

let state: State = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage full or blocked – keep working in memory */
  }
}

function set(updater: (s: State) => State) {
  state = updater(state)
  persist()
  listeners.forEach((l) => l())
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  })
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state))
}

const toggle = (arr: string[], id: string) =>
  arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]

/* ───────────── Actions ───────────── */

export const actions = {
  addToCart(productId: string, sizeId: string, qty = 1, note?: string) {
    const key = `${productId}:${sizeId}`
    set((s) => {
      const existing = s.cart.find((l) => l.key === key)
      const cart = existing
        ? s.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(20, l.qty + qty), note: note ?? l.note } : l))
        : [...s.cart, { key, productId, sizeId, qty, note }]
      return { ...s, cart }
    })
  },
  setQty(key: string, qty: number) {
    set((s) => ({
      ...s,
      cart: qty <= 0 ? s.cart.filter((l) => l.key !== key) : s.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l)),
    }))
  },
  removeLine(key: string) {
    set((s) => ({ ...s, cart: s.cart.filter((l) => l.key !== key) }))
  },
  restoreLine(line: CartLine) {
    set((s) => (s.cart.some((l) => l.key === line.key) ? s : { ...s, cart: [...s.cart, line] }))
  },
  clearCart() {
    set((s) => ({ ...s, cart: [], coupon: null }))
  },
  toggleFavorite(id: string) {
    set((s) => ({ ...s, favorites: toggle(s.favorites, id) }))
  },
  toggleLike(id: string) {
    set((s) => ({ ...s, liked: toggle(s.liked, id) }))
  },
  toggleHelpful(reviewId: string) {
    set((s) => ({ ...s, helpful: toggle(s.helpful, reviewId) }))
  },
  addReview(r: Omit<Review, "id" | "date" | "helpful">) {
    set((s) => ({
      ...s,
      reviews: [{ ...r, id: `u-${Date.now()}`, date: Date.now(), helpful: 0 }, ...s.reviews],
    }))
  },
  deleteReview(id: string) {
    set((s) => ({ ...s, reviews: s.reviews.filter((r) => r.id !== id) }))
  },
  setCoupon(code: string | null) {
    set((s) => ({ ...s, coupon: code }))
  },
  viewed(id: string) {
    set((s) => ({ ...s, recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 8) }))
  },
  placeOrder(order: Order) {
    set((s) => ({ ...s, orders: [order, ...s.orders].slice(0, 20), cart: [], coupon: null }))
  },
}

/* ───────────── Derived data ───────────── */

const SEED = seedReviews()

export function useReviews(productId: string) {
  const mine = useStore((s) => s.reviews)
  return [...mine.filter((r) => r.productId === productId), ...SEED.filter((r) => r.productId === productId)]
}

export function useRating(productId: string) {
  const reviews = useReviews(productId)
  const p = getProduct(productId)
  const count = reviews.length
  const avg = count ? reviews.reduce((a, r) => a + r.rating, 0) / count : (p?.rating ?? 0)
  return { avg, count }
}

export function useLikes(productId: string) {
  const liked = useStore((s) => s.liked.includes(productId))
  const base = getProduct(productId)?.likes ?? 0
  return { liked, count: base + (liked ? 1 : 0) }
}

export const COUPONS: Record<string, { label: string; percent: number }> = {
  WELCOME10: { label: "10% off your order", percent: 10 },
  FOODIE15: { label: "15% off your order", percent: 15 },
}
export const FREE_DELIVERY_AT = 35
export const DELIVERY_FEE = 3.9

export function useCartSummary() {
  const cart = useStore((s) => s.cart)
  const coupon = useStore((s) => s.coupon)
  const lines = cart.flatMap((l) => {
    const p = getProduct(l.productId)
    if (!p) return []
    const size = p.sizes.find((z) => z.id === l.sizeId) ?? p.sizes[0]
    const unit = p.price + size.extra
    return [{ ...l, product: p, size, unit, total: unit * l.qty }]
  })
  const count = lines.reduce((a, l) => a + l.qty, 0)
  const subtotal = lines.reduce((a, l) => a + l.total, 0)
  const percent = coupon ? (COUPONS[coupon]?.percent ?? 0) : 0
  const discount = +(subtotal * (percent / 100)).toFixed(2)
  const delivery = subtotal === 0 || subtotal - discount >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
  const total = subtotal - discount + delivery
  return { lines, count, subtotal, discount, delivery, total, coupon, remaining: Math.max(0, FREE_DELIVERY_AT - (subtotal - discount)) }
}

export { PRODUCTS }
