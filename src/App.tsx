import * as React from "react"

import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CartDrawer } from "@/components/shop/cart-drawer"
import { CheckoutDialog } from "@/components/shop/checkout-dialog"
import { Footer } from "@/components/shop/footer"
import { Header } from "@/components/shop/header"
import { FavoritesPage } from "@/pages/favorites"
import { HomePage } from "@/pages/home"
import { MenuPage } from "@/pages/menu"
import { MenusPage } from "@/pages/menus"
import { OrdersPage } from "@/pages/orders"
import { ProductPage } from "@/pages/product"
import { usePath, parse } from "@/lib/router"

export function App() {
  const path = usePath()
  const route = parse(path)
  const key = path.split("?")[0]

  // Reset scroll on page change (product page also scrolls itself).
  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [key])

  return (
    <Toaster>
      <TooltipProvider>
        <div className="flex min-h-svh flex-col">
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow-lg">Skip to content</a>
          <Header />
          <main id="main" className="flex-1">
            {route.name === "home" && <HomePage />}
            {route.name === "menu" && <MenuPage key={route.category ?? "all"} category={route.category} />}
            {route.name === "product" && <ProductPage id={route.id} />}
            {route.name === "favorites" && <FavoritesPage />}
            {route.name === "orders" && <OrdersPage />}
            {route.name === "menus" && <MenusPage />}
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <CheckoutDialog />
      </TooltipProvider>
    </Toaster>
  )
}

export default App
