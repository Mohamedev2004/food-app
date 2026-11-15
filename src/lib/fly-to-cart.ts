/**
 * "Fly to cart": clones the product image, arcs it across the screen to the
 * header cart button (lift → spin → shrink), trails ghosts behind it, then
 * bursts and bounces the cart on landing. Pure Web Animations API.
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

type P = { x: number; y: number }

function ghost(src: string, w: number, h: number, radius: number, shadow: string) {
  const el = document.createElement("img")
  el.src = src
  el.alt = ""
  el.setAttribute("aria-hidden", "true")
  Object.assign(el.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${w}px`,
    height: `${h}px`,
    objectFit: "cover",
    borderRadius: `${radius}px`,
    pointerEvents: "none",
    zIndex: "2147483000",
    willChange: "transform, opacity",
    boxShadow: shadow,
    opacity: "0",
  } as CSSStyleDeclaration)
  document.body.appendChild(el)
  return el
}

function flight(el: HTMLElement, from: P, to: P, w: number, h: number, opts: { duration: number; delay: number; spin: number; endScale: number; peak: number; opacity: number }) {
  // Quadratic bezier arc: control point lifted high and pushed toward the side.
  const lift = Math.max(60, Math.abs(from.y - to.y) * 0.2 + 40)
  const ctrl: P = { x: lerp(from.x, to.x, 0.4), y: Math.max(-10, Math.min(from.y, to.y) - lift) }
  const N = 48
  const frames: Keyframe[] = []
  for (let i = 0; i <= N; i++) {
    const lin = i / N
    const t = easeInOut(lin)
    const x = (1 - t) ** 2 * from.x + 2 * (1 - t) * t * ctrl.x + t * t * to.x
    const y = (1 - t) ** 2 * from.y + 2 * (1 - t) * t * ctrl.y + t * t * to.y
    // Anticipation pop at start, then a long shrink.
    const pop = lerp(1, opts.endScale, t)
    const radius = lerp(14, Math.min(w, h) / 2, Math.min(1, lin * 1.3))
    const fade = lin > 0.8 ? opts.opacity * (1 - (lin - 0.8) / 0.2) : opts.opacity
    frames.push({
      offset: lin,
      transform: `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) scale(${pop})`,
      borderRadius: `${radius}px`,
      opacity: lin === 0 ? 0 : Math.min(fade, lin < 0.06 ? lin / 0.06 : 1),
    })
  }
  return el.animate(frames, { duration: opts.duration, delay: opts.delay, easing: "linear", fill: "both" })
}

function ripple(at: P) {
  const ring = document.createElement("div")
  Object.assign(ring.style, {
    position: "fixed",
    left: `${at.x - 20}px`,
    top: `${at.y - 20}px`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1.5px solid var(--primary)",
    pointerEvents: "none",
    zIndex: "2147483000",
  } as CSSStyleDeclaration)
  document.body.appendChild(ring)
  ring
    .animate([{ transform: "scale(0.6)", opacity: 0.5 }, { transform: "scale(1.8)", opacity: 0 }], { duration: 600, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" })
    .finished.then(() => ring.remove())
}

function bounceCart(target: HTMLElement) {
  target.animate([{ transform: "scale(1)" }, { transform: "scale(1.1)", offset: 0.35 }, { transform: "scale(0.98)", offset: 0.65 }, { transform: "scale(1)" }], { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" })
}

export function flyToCart(source: Element | null | undefined) {
  if (typeof document === "undefined") return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const targets = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")].filter((t) => t.getBoundingClientRect().width > 0)
  const target = targets[0]
  if (!target) return
  const tr = target.getBoundingClientRect()
  const to: P = { x: tr.left + tr.width / 2, y: tr.top + tr.height / 2 }

  if (reduce || !source) {
    bounceCart(target)
    return
  }

  const sr = source.getBoundingClientRect()
  if (sr.width === 0) return bounceCart(target)
  const src = (source as HTMLImageElement).currentSrc || (source as HTMLImageElement).src
  // Small, light image: capped to ~96px.
  const k = Math.min(1, 96 / Math.max(sr.width, sr.height))
  const w = sr.width * k
  const h = sr.height * k
  const from: P = { x: sr.left + sr.width / 2, y: sr.top + sr.height / 2 }

  const main = ghost(src, w, h, 14, "0 8px 20px -6px rgb(0 0 0 / .25)")
  const anim = flight(main, from, to, w, h, { duration: 850, delay: 0, spin: 0, endScale: 0.2, peak: 1, opacity: 0.95 })
  anim.finished.then(() => {
    main.remove()
    ripple(to)
    bounceCart(target)
  })
}
