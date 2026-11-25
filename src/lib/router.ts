import { useSyncExternalStore } from "react"

/** Minimal history router: /  /menu  /category/:id  /product/:id  /favorites  /orders  /menus */
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb)
  return () => window.removeEventListener("popstate", cb)
}
const read = () => window.location.pathname + window.location.search

export function usePath() {
  return useSyncExternalStore(subscribe, read, () => "/")
}

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.search) return
  window.history.pushState(null, "", to)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

// Intercept clicks on internal links so they use client-side navigation.
if (typeof window !== "undefined") {
  window.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const anchor = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null
    if (!anchor || anchor.target || anchor.hasAttribute("download")) return
    const raw = anchor.getAttribute("href") ?? ""
    if (!raw || raw.startsWith("#")) return
    const url = new URL(anchor.href)
    if (url.origin !== window.location.origin) return
    if (url.pathname.startsWith("/api/")) return
    e.preventDefault()
    navigate(url.pathname + url.search + url.hash)
  })
}

export type Route =
  | { name: "home" }
  | { name: "menu"; category?: string }
  | { name: "product"; id: string }
  | { name: "favorites" }
  | { name: "orders" }
  | { name: "menus" }

export function parse(path: string): Route {
  const [p] = path.split("?")
  const seg = p.split("/").filter(Boolean)
  if (seg[0] === "menu") return { name: "menu" }
  if (seg[0] === "category" && seg[1]) return { name: "menu", category: seg[1] }
  if (seg[0] === "product" && seg[1]) return { name: "product", id: seg[1] }
  if (seg[0] === "favorites") return { name: "favorites" }
  if (seg[0] === "orders") return { name: "orders" }
  if (seg[0] === "menus") return { name: "menus" }
  return { name: "home" }
}

export const href = {
  home: "/",
  menu: "/menu",
  category: (id: string) => `/category/${id}`,
  product: (id: string) => `/product/${id}`,
  favorites: "/favorites",
  orders: "/orders",
  menus: "/menus",
}

export function useRoute(): Route {
  return parse(usePath())
}
