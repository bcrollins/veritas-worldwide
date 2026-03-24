/**
 * Cloudflare CDN media utility
 *
 * All external media (images, videos, PDFs) should be routed through
 * Cloudflare for reliable delivery, caching, and image optimization.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Cloudflare account at https://dash.cloudflare.com
 * 2. Add your domain (veritasworldwidepress.com) to Cloudflare
 * 3. Enable Cloudflare R2 Storage for hosting large files (PDFs, videos)
 * 4. Enable Cloudflare Images for image optimization (WebP, resize)
 * 5. Configure cache rules: /media/* → cache 30 days, /the-record.pdf → cache 7 days
 *
 * For R2 bucket setup:
 *   - Bucket name: veritas-media
 *   - Custom domain: cdn.veritasworldwidepress.com
 *   - Upload the PDF: wrangler r2 object put veritas-media/the-record.pdf --file=public/the-record.pdf
 *
 * Once configured, update CDN_BASE below to your Cloudflare CDN domain.
 */

// Change this to your Cloudflare CDN domain once configured
const CDN_BASE = '' // e.g., 'https://cdn.veritasworldwidepress.com'

/**
 * Get CDN URL for a media asset.
 * Falls back to the original URL if CDN is not configured.
 */
export function cdnUrl(path: string): string {
  if (!CDN_BASE) return path
  // If it's already an absolute URL (Wikimedia, YouTube, etc.), proxy through Cloudflare
  if (path.startsWith('http')) {
    // For external images, use Cloudflare Image Resizing
    return `${CDN_BASE}/cdn-cgi/image/format=auto,quality=85/${path}`
  }
  // Local assets — serve from R2
  return `${CDN_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

/**
 * Get optimized image URL with Cloudflare Image Resizing.
 * Automatically converts to WebP and resizes.
 */
export function cdnImage(src: string, opts?: { width?: number; height?: number; quality?: number }): string {
  if (!CDN_BASE) return src
  const params = [
    'format=auto',
    opts?.width ? `width=${opts.width}` : '',
    opts?.height ? `height=${opts.height}` : '',
    `quality=${opts?.quality || 80}`,
  ].filter(Boolean).join(',')
  return `${CDN_BASE}/cdn-cgi/image/${params}/${src}`
}

/**
 * YouTube embed URL — using youtube-nocookie.com for privacy.
 * Cloudflare caches the embed page but YouTube serves the video.
 */
export function youtubeEmbed(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`
}

/**
 * PDF download URL — served from R2 or fallback to local
 */
export const PDF_DOWNLOAD_URL = CDN_BASE ? `${CDN_BASE}/the-record.pdf` : '/the-record.pdf'

/**
 * EPUB download URL (once generated)
 */
export const EPUB_DOWNLOAD_URL = CDN_BASE ? `${CDN_BASE}/the-record.epub` : '/the-record.epub'
