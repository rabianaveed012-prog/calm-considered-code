// Google Fonts is the only external runtime asset service in this portfolio.
// Inline styles are used by React, carousels and existing case-study layouts.
export function contentSecurityPolicy(nonce?: string): string {
  return [
    "default-src 'self'",
    "script-src 'self'" + (nonce ? " 'nonce-" + nonce + "'" : ""),
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
    // The owner intentionally uses the Lovable editor's embedded preview.
    "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev",
  ].join("; ");
}
export function setSecurityHeaders(headers: Headers, url: string, nonce?: string): void {
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  if (!headers.has("Content-Security-Policy"))
    headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
  if (new URL(url).protocol === "https:")
    headers.set("Strict-Transport-Security", "max-age=31536000");
}
