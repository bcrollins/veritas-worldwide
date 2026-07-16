/**
 * Same-origin relative path guard for post-auth navigation.
 * Blocks open redirects via protocol-relative (//), absolute URLs, and backslashes.
 */
export function sanitizeReturnTo(returnTo: string): string | null {
  if (typeof returnTo !== 'string') return null
  const path = returnTo.trim()
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return null
  if (path.includes('://')) return null
  return path
}
