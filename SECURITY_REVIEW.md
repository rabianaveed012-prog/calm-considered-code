# Repository security review

Reviewed 2026-10-03. Scope: tracked application/configuration, reachable UI, dependencies and lockfile, available Git history (known credential-pattern scan), public files, and the local production Cloudflare worker. No secret values are recorded here.

## Actual architecture

React 19, TanStack Start 1.168.32 / Router 1.170.18, Vite 8.1.5 and Nitro's Cloudflare worker target through the existing Lovable configuration. Eighteen routes serve a public portfolio and case studies. Contact uses a fixed mailto link. There are no application contact submissions, mail-provider integrations, database calls, uploads, authentication, user-controlled HTML, server functions or sensitive CORS endpoints.

Google Fonts (fonts.googleapis.com and fonts.gstatic.com) is the only external runtime asset service found in source. Project images and fonts otherwise come from local public assets. External social/certificate links are navigation, not script dependencies.

## Fixed / configured

- Patched brace-expansion from vulnerable 1.1.18 and 5.0.9 versions via compatible dependency updates. The affected paths were ESLint and typescript-eslint build/lint tooling, not the browser or application request path. No force upgrade was used. Full and production-only npm audits now report zero vulnerabilities.
- Removed direct @hookform/resolvers, date-fns and zod dependencies after confirming no source/config imports. Packages required transitively remain managed by their dependents. Retained the existing component-library dependencies referenced by checked-in components.
- Ignored .env and .env.* (except .env.example), plus environment-specific Wrangler variable files. Added a comment-only example: this app requires no secrets. Disabled Lovable's automatic VITE_* define expansion. Explicitly referenced VITE_* values would still be public and must never contain secrets.
- Added production SSR CSP using a new nonce for each response and TanStack's native nonce support. No unsafe-eval or unsafe-inline script permission. Inline event handlers are disallowed; the static error-page retry action is now an ordinary same-page link.
- Restricted scripts/connections to self; fonts/styles to the actual Google Fonts hosts; images to self/data/blob; disabled objects, base URLs, form submission and child frames. Inline styles remain permitted because existing React styles, carousel positioning and case-study layouts depend on them.
- Added nosniff, strict-origin-when-cross-origin, and a Permissions-Policy disabling unused device/payment capabilities. HSTS is set for HTTPS responses without assuming control of subdomains or opting into preload.
- CSP frame-ancestors permits self and the trusted Lovable editor origins. This is intentional editor embedding; X-Frame-Options was not added because it cannot express that allowlist.
- Added static-asset headers via public/_headers, keeping Nitro's immutable asset-cache rule. SSR headers are attached to Worker responses, because static _headers rules do not secure SSR responses.
- Nonced HTML is private/no-store to prevent shared caches replaying a nonce. Production browser source maps are explicitly disabled.
- Made noopener explicit alongside existing noreferrer on external links. Existing noreferrer already protected against opener access; this is clarity/defense in depth, not a claimed exploitable finding.

## Reviewed and intentionally unchanged

- No reachable XSS sink or untrusted dynamic URL was found. The unused chart component contains style generation through dangerouslySetInnerHTML, but it is not imported into any route and does not receive user input. No sanitizer/library was added to dormant code.
- No sensitive local/session storage or application cookies were found. The unused sidebar component's preference cookie is not an auth token. No authentication or cookie system was introduced.
- No contact endpoint means server validation, honeypots, CAPTCHA, upload restrictions, CORS rules and rate limiting do not apply. Adding them would invent infrastructure.
- /hero-preview is a public, noindex visual preview of the same public hero, with no admin controls, credentials or diagnostic output. Kept the existing URL and design.
- Existing public certificates are intentionally linked portfolio PDFs. Public images include prototype account/payment/contact fields; no live integration uses them. Visual assets were not exhaustively OCR-audited, and ownership/NDA status cannot be verified from code.
- Generic user-facing 404/500 pages do not print stacks. Detailed server logging remains server-side. Existing Lovable editor error reporting was retained.
- Pattern scans found no candidate credentials in tracked text, available history or browser bundles. This is not proof that every possible secret format or image-embedded value is absent. No confirmed credential rotation is required by this audit.

## Validation

- Production build and TypeScript passed after changes.
- node scripts/security-check.mjs against the production worker passed: 18 routes, per-response nonce uniqueness and inline-script coverage, headers, HTTPS HSTS behavior, private-path 404s and public-output checks.
- Browser checks loaded all 18 routes with a verified CSP event listener: no CSP violations observed and no broken visible images. Hydrated project filters and the mailto contact link worked. External links all include noopener noreferrer. An injected script without a nonce was blocked.
- Homepage layout fits 320, 360, 375, 390, 412 and 430px in browser emulation. No physical-phone claim is made.
- Production .env, .git/config, source and package.json requests returned 404. No public source maps, environment files, private keys or database files were found.
- git check-ignore confirms private environment patterns are ignored.

## Requires owner / hosting verification

- The exact published URL is still unavailable. Verify the deployed headers, HTTP-to-HTTPS redirect, Google Fonts, and Lovable editor preview after publishing. Hosting-injected scripts and CDN behavior cannot be verified solely from the local build. Use a specific documented origin if the host injects an essential script; do not weaken CSP to wildcard or unsafe-inline scripts.
- Keep prototype screenshots only if their account/contact/payment examples are fictional or approved for publication. If any depicted credential is real, rotate it and replace the affected asset; no such credential was confirmed here.
- No new environment variables or CAPTCHA account are required. No unresolved npm advisories remain at the time of this review.

References: [Cloudflare SSR and static headers](https://developers.cloudflare.com/workers/static-assets/headers/), installed TanStack server/SSR nonce implementation, and npm's advisory report. This reduces the risks found; it is not a guarantee of complete security.
