import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { useTranslation } from "react-i18next"

import "./index.css"
import "./i18n"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

function AppWithI18n() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return <App />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWithI18n />
    </ThemeProvider>
  </StrictMode>
)
