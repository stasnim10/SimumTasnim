import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

/**
 * The hero portrait is the LCP element, but this is a client-rendered app, so
 * its <img> does not exist until React runs. Preloading it from static HTML
 * needs the content-hashed filenames, which only exist after bundling — hence
 * a post-bundle transform rather than a hand-written <link> in index.html.
 *
 * The imagesrcset/imagesizes here must match what <Picture> renders for the
 * hero, or the browser fetches the image twice.
 */
const HERO_BASENAME = 'first_image_top_page'
const HERO_SIZES = '(max-width: 992px) 100vw, 480px'

function heroPreload() {
  return {
    name: 'hero-preload',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        if (!ctx.bundle) return html

        // imagetools emits hash-only filenames with no width in them, so the
        // widths are read back from the encoded bytes rather than guessed.
        const sharp = (await import('sharp')).default

        const entries = []
        for (const [file, asset] of Object.entries(ctx.bundle)) {
          if (!file.includes(HERO_BASENAME) || !file.endsWith('.avif')) continue
          if (asset.type !== 'asset') continue
          const { width } = await sharp(asset.source).metadata()
          if (width) entries.push({ file, width })
        }

        if (!entries.length) return html.replace('<!--hero-preload-->', '')

        const srcset = entries
          .sort((a, b) => a.width - b.width)
          .map((e) => `/${e.file} ${e.width}w`)
          .join(', ')

        const tag =
          `<link rel="preload" as="image" type="image/avif" ` +
          `imagesrcset="${srcset}" imagesizes="${HERO_SIZES}" fetchpriority="high">`

        return html.replace('<!--hero-preload-->', tag)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // imagetools transforms images IMPORTED from source. Files in public/ are
  // copied verbatim and never reach a plugin, which is why the raster images
  // live in src/assets/images/ while CNAME, favicon.svg, icons.svg and the
  // video files stay in public/.
  plugins: [react(), imagetools(), heroPreload()],
})
