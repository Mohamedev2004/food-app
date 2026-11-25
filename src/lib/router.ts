import { useSyncExternalStore } from "react"

/** Minimal hash router: #/  #/menu  #/category/:id  #/product/:id  #/favorites  #/orders */
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb)
  return () => window.removeEventListener("hashchange", cb)
}
const read = () => window.location.hash.replace(/^#/, "") || "/"

export function usePath() {
  return useSyncExternalStore(subscribe, read, () => "/")
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
  home: "#/",
  menu: "#/menu",
  category: (id: string) => `#/category/${id}`,
  product: (id: string) => `#/product/${id}`,
  favorites: "#/favorites",
  orders: "#/orders",
  menus: "#/menus",
}

export function useRoute(): Route {
  return parse(usePath())
}
