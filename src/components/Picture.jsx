/**
 * Renders an imagetools "picture" object as a <picture> with type-ordered
 * <source> elements (AVIF, then WebP) and a JPEG <img> fallback.
 *
 * The <picture> element itself is display:contents (see index.css), so it
 * creates no box and the existing layout and CSS selectors are unaffected —
 * class names stay on the <img>, exactly where the stylesheets expect them.
 *
 * width/height come from imagetools, so every image reserves its correct box
 * before it loads.
 */
export default function Picture({ image, alt, className, sizes, ...imgProps }) {
  if (!image) return null

  const { sources, img } = image

  return (
    <picture>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        sizes={sizes}
        alt={alt}
        className={className}
        {...imgProps}
      />
    </picture>
  )
}
