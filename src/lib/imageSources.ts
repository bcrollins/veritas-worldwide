const WIKIMEDIA_THUMB_WIDTH_RE = /^(\d+)px-/;

export function getWikimediaFileName(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    if (!url.hostname.endsWith('wikimedia.org')) return null;

    if (url.hostname === 'commons.wikimedia.org') {
      const specialPathMarker = '/Special:FilePath/';
      if (url.pathname.includes(specialPathMarker)) {
        const encodedFileName = url.pathname.split(specialPathMarker)[1];
        return encodedFileName ? decodeURIComponent(encodedFileName) : null;
      }

      const redirectTarget = url.searchParams.get('title');
      if (redirectTarget?.startsWith('Special:Redirect/file/')) {
        return decodeURIComponent(redirectTarget.replace('Special:Redirect/file/', ''));
      }
    }

    const parts = url.pathname.split('/').filter(Boolean);
    const thumbIndex = parts.indexOf('thumb');
    if (thumbIndex !== -1 && parts[thumbIndex + 3]) {
      return decodeURIComponent(parts[thumbIndex + 3]);
    }

    const lastSegment = parts[parts.length - 1];
    return lastSegment ? decodeURIComponent(lastSegment.replace(WIKIMEDIA_THUMB_WIDTH_RE, '')) : null;
  } catch {
    return null;
  }
}

export function getWikimediaWidth(imageUrl: string): number | null {
  try {
    const url = new URL(imageUrl);
    const widthParam = url.searchParams.get('width');
    if (widthParam && /^\d+$/.test(widthParam)) {
      return Number(widthParam);
    }

    const pathParts = url.pathname.split('/').filter(Boolean);
    const lastSegment = decodeURIComponent(pathParts[pathParts.length - 1] || '');
    const match = lastSegment.match(WIKIMEDIA_THUMB_WIDTH_RE);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

export function isWikimediaHost(imageUrl: string): boolean {
  try {
    const url = new URL(imageUrl);
    return url.hostname === 'upload.wikimedia.org' || url.hostname.endsWith('wikimedia.org');
  } catch {
    return false;
  }
}

/**
 * Prefer first-party hosted assets (/, https://veritasworldwide.com/).
 * Wikimedia hotlinks are refused — they 400 in production and are blocked by CSP.
 * Callers should use /chapters/heroes, /news/heroes, /profiles, or ImageWithFallback placeholders.
 */
export function getPreferredImageSrc(imageUrl?: string): string | undefined {
  if (!imageUrl) return imageUrl;

  // First-party absolute or root-relative assets
  if (imageUrl.startsWith('/') || imageUrl.startsWith('https://veritasworldwide.com/')) {
    return imageUrl;
  }

  // Refuse Wikimedia hotlinks entirely (do not rewrite to another wiki URL).
  if (isWikimediaHost(imageUrl) || getWikimediaFileName(imageUrl)) {
    return undefined;
  }

  return imageUrl;
}
