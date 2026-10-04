import "./lib/error-capture";
import { setSecurityHeaders } from "./lib/security-headers";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server").then(
      ({ createStartHandler, defaultStreamHandler }) => ({
        fetch: createStartHandler((context) => {
          if (import.meta.env.PROD) {
            const nonce = context.router.options.ssr?.nonce;
            setSecurityHeaders(context.responseHeaders, context.request.url, nonce);
            // Nonces must not be replayed from shared HTML caches.
            context.responseHeaders.set("Cache-Control", "private, no-store");
          }
          return defaultStreamHandler(context);
        }),
      }),
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      if (!import.meta.env.PROD) return normalized;
      const headers = new Headers(normalized.headers);
      setSecurityHeaders(headers, request.url);
      return new Response(normalized.body, {
        status: normalized.status,
        statusText: normalized.statusText,
        headers,
      });
    } catch (error) {
      console.error(error);
      const headers = new Headers({
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      });
      if (import.meta.env.PROD) setSecurityHeaders(headers, request.url);
      return new Response(renderErrorPage(), { status: 500, headers });
    }
  },
};
