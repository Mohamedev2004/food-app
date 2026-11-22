export const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "MAD" })
export const formatPrice = (n: number) => `${n.toFixed(2)} DH`
export const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
export const compact = (n: number) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(n)