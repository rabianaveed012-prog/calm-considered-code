<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio projects, testimonials, socials and contact info are read from Lovable Cloud tables (with the old static lists as fallback); edit content through /admin, not source. Why: the owner manages content without code.
- Admin writes go straight from the browser client and are enforced by RLS + `has_role(…,'admin')`; the first account created is auto-granted admin. Why: server-side authorization without extra endpoints.
- Uploaded images live in the private `media` bucket and are served via the `/media/$` route; built-in images are referenced as `asset:<key>` (see `src/lib/public-content.ts`). Why: public buckets are blocked in this workspace.
