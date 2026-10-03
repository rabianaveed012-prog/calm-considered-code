import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const base = process.argv[2] || "http://127.0.0.1:4175";
const code = ts.transpileModule(fs.readFileSync("src/lib/security-headers.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { setSecurityHeaders } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);
const httpsHeaders = new Headers();
setSecurityHeaders(httpsHeaders, "https://portfolio.example/");
assert.equal(httpsHeaders.get("strict-transport-security"), "max-age=31536000");
assert.match(httpsHeaders.get("content-security-policy"), /object-src 'none'/);
assert(!httpsHeaders.get("content-security-policy").includes("unsafe-eval"));
const routes = fs
  .readdirSync("src/routes")
  .filter((f) => f.endsWith(".tsx"))
  .flatMap((f) => {
    const text = fs.readFileSync("src/routes/" + f, "utf8");
    return [...text.matchAll(/createFileRoute\(["']([^"']+)["']\)/g)].map((m) => m[1]);
  });
let previousNonce;
for (const route of [...routes, "/"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route + " status");
  const policy = response.headers.get("content-security-policy") || "";
  const nonce = policy.match(/nonce-([^']+)/)?.[1];
  assert(nonce, route + " nonce");
  assert.notEqual(nonce, previousNonce);
  previousNonce = nonce;
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.match(policy, /script-src-attr 'none'/);
  const html = await response.text();
  for (const m of html.matchAll(/<script\b([^>]*)>/g))
    assert(m[1].includes(nonce), route + " script nonce mismatch");
  assert(!/\son[a-z]+=["']/.test(html), route + " inline event handler");
}
for (const path of [
  "/.env",
  "/.env.production",
  "/.git/config",
  "/src/server.ts",
  "/package.json",
  "/missing-page",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path + " exposed");
  assert(response.headers.has("content-security-policy"));
}
const asset = await fetch(base + "/favicon.ico");
assert.equal(asset.headers.get("x-content-type-options"), "nosniff");
const built = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + "/" + e.name;
    if (e.isDirectory()) walk(p);
    else built.push(p);
  }
}
walk(".output/public");
assert(
  !built.some((p) => /\.map$|\/\.env(?:\.|$)|\.(?:sqlite|pem|key|bak)$/.test(p)),
  "private/build files in public output",
);
console.log(
  "PASS: " +
    routes.length +
    " routes, unique CSP nonces, script coverage, HTTPS headers, private-path 404s, static headers and public output checks.",
);
