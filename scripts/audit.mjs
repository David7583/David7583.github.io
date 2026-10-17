import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import * as chromeLauncher from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless", "--disable-gpu"],
  chromePath: process.env.CHROME_PATH,
});
const folder = ".audit/lighthouse";
await mkdir(folder, { recursive: true });
const results = [];
try {
  for (const [name, path, desktop] of [
    ["home-mobile", "/?lang=zh", false],
    ["home-desktop", "/?lang=en", true],
    ["workbench", "/projects/workbench.html?lang=en", false],
    ["resume", "/resume.html?lang=zh", false],
  ]) {
    const options = {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(desktop
        ? {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 1000,
              deviceScaleFactor: 1,
              disabled: false,
            },
          }
        : {}),
    };
    const result = await lighthouse(
      base + path,
      options,
      desktop ? desktopConfig : undefined,
    );
    await writeFile(`${folder}/${name}.json`, result.report[0]);
    await writeFile(`${folder}/${name}.html`, result.report[1]);
    const lhr = result.lhr;
    const summary = {
      name,
      url: lhr.finalDisplayedUrl,
      version: lhr.lighthouseVersion,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "cumulative-layout-shift",
          "total-blocking-time",
        ].map((k) => [k, lhr.audits[k]?.displayValue]),
      ),
      issues: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            a.scoreDisplayMode !== "informative",
        )
        .map((a) => ({
          id: a.id,
          title: a.title,
          score: a.score,
          details: a.details,
        })),
    };
    results.push(summary);
    console.log(
      JSON.stringify({ ...summary, issues: summary.issues.map((i) => i.id) }),
    );
  }
  await writeFile(`${folder}/summary.json`, JSON.stringify(results, null, 2));
} finally {
  await chrome.kill();
}
