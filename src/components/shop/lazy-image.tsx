import * as React from "react"
import { cn } from "cn"

import { imageUrl } from "@/data/catalog"

type Props = {
  photoId: string
  alt: string
  /** Intrinsic width/height ratio of the crop, e.g. 4/3. */
  ratio?: number
  /** Responsive `sizes` attribute. */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  className?: string
  imgClassName?: string
}

const WIDTHS = [320, 480, 640, 960, 1280]

/**
 * Lazy-loaded Unsplash image: native `loading="lazy"`, responsive srcset,
 * a shimmering placeholder, and a graceful fade-in once decoded.
 */
export function LazyImage({ photoId, alt, ratio = 4 / 3, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw", priority, className, imgClassName }: Props) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)

  // Cached images can finish before React attaches onLoad.
  React.useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  const srcSet = WIDTHS.map((w) => `${imageUrl(photoId, w, Math.round(w / ratio))} ${w}w`).join(", ")

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ aspectRatio: ratio }}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-accent to-muted" aria-hidden />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">Image unavailable</div>
      ) : (
        <img
          ref={ref}
          src={imageUrl(photoId, 640, Math.round(640 / ratio))}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={640}
          height={Math.round(640 / ratio)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn("size-full object-cover transition-[opacity,transform] duration-700", loaded ? "opacity-100" : "opacity-0", imgClassName)}
        />
      )}
    </div>
  )
}
