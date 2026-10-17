import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
const pages = [
  "index.html",
  "resume.html",
  ...readdirSync("projects")
    .filter((n) => n.endsWith(".html"))
    .map((n) => "projects/" + n),
];
let references = 0;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page}: single h1`);
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /class="t en" lang="en"/);
  assert.match(html, /<main id="main"/);
  for (const tag of html.matchAll(
    /<(?:a|link|script|img)\b[^>]*?(?:href|src)="([^"]+)"[^>]*>/g,
  )) {
    const target = tag[1];
    if (/^(https?:|mailto:|data:)/.test(target)) continue;
    const [path, hash] = target.split("#");
    const file = path
      ? resolve(dirname(page), path.split("?")[0])
      : resolve(page);
    assert.ok(existsSync(file), `${page}: missing ${target}`);
    if (hash) {
      assert.ok(
        readFileSync(file, "utf8").includes(`id="${hash}"`),
        `${page}: missing anchor ${target}`,
      );
    }
    references++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(img[0], /alt="[^"]*"/, `${page}: image alt`);
    if (!img[0].includes("src=")) continue; // modal image populated after click
    assert.match(img[0], /width="\d+"/);
    assert.match(img[0], /height="\d+"/);
  }
  assert.ok(
    !/sk-[A-Za-z0-9]{20}|ghp_[A-Za-z0-9]+|[A-Z]:\\Users\\|localhost:/.test(
      html,
    ),
    `${page}: private/local data`,
  );
}
const css = readFileSync("assets/styles.css", "utf8");
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.ok(css.includes(":focus-visible"));
const workflow = readFileSync(".github/workflows/check.yml", "utf8");
assert.ok(
  !/deploy-pages|pages: write|contents: write/.test(workflow),
  "Checks must not deploy",
);
console.log(
  `PASS: ${pages.length} bilingual pages, ${references} local references/anchors, image dimensions, keyboard/reduced-motion styles and no-deploy workflow.`,
);
