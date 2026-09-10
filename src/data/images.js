/**
 * Build-time image pipeline.
 *
 * Every JPG under src/assets/images is compiled by vite-imagetools into AVIF,
 * WebP and a JPEG fallback at three widths, with content-hashed filenames.
 * Derivatives are generated at build time and never committed.
 *
 * Lookups keep the original public-style path ("/assets/images/...") so the
 * data arrays in the components did not have to change shape.
 */
const modules = import.meta.glob('../assets/images/**/*.jpg', {
  eager: true,
  query: '?w=480;960;1440&format=avif;webp;jpg&as=picture',
  import: 'default',
})

const pictures = {}
for (const [key, value] of Object.entries(modules)) {
  // '../assets/images/x.jpg' -> '/assets/images/x.jpg'
  pictures[key.replace(/^\.\./, '')] = value
}

/**
 * @param {string} path e.g. '/assets/images/products/case-quest.jpg'
 * @returns {{sources: Record<string,string>, img: {src: string, w: number, h: number}}|undefined}
 */
export function getPicture(path) {
  return pictures[String(path).split('?')[0]]
}

/** Single URL for contexts that cannot take a srcset, such as a video poster. */
export function getImageUrl(path) {
  return getPicture(path)?.img?.src
}

/** Every generated picture — used by the hero preload to build its srcset. */
export { pictures }
