import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  steps,
  nextStep,
  panelContent,
  architecture,
} from "../assets/workbench-data.mjs";
import { validateMedia, renderFilm } from "../scripts/workbench.mjs";
test("guide terminates at either end and provides every bilingual contract", () => {
  let current = 0;
  for (let i = 0; i < 20; i++) current = nextStep(current, 1);
  assert.equal(current, 4);
  assert.equal(nextStep(0, -1), 0);
  assert.equal(steps.length, 5);
  for (let i = 0; i < 5; i++) {
    for (const key of [
      "name",
      "description",
      "input",
      "output",
      "sample",
      "boundary",
    ])
      assert.equal(steps[i][key].filter(Boolean).length, 2);
    assert.match(panelContent(i), /FICTIONAL SAMPLE/);
  }
  assert.equal(architecture.length, 6);
});
test("video publication fails closed for unsafe or unreviewed assets", () => {
  const base = {
    src: "",
    type: "video/mp4",
    durationSeconds: 60,
    rightsReviewed: false,
    captions: [],
  };
  assert.equal(validateMedia(base).src, "");
  for (const src of [
    "javascript:alert(1)",
    "http://example.com/film.mp4",
    "../secret.mp4",
    "https://example.com/film.mp4",
  ])
    assert.throws(() => validateMedia({ ...base, src }));
  assert.equal(
    validateMedia({ ...base, src: "media/product.mp4", rightsReviewed: true })
      .src,
    "media/product.mp4",
  );
  assert.throws(() =>
    validateMedia({
      ...base,
      src: "media/product.mp4",
      rightsReviewed: true,
      captions: [{ src: "../private.vtt", lang: "en" }],
    }),
  );
});
test("pending film stays honest and cannot download video on first load", () => {
  const media = JSON.parse(
    readFileSync("content/workbench-media.json", "utf8"),
  );
  const html = readFileSync("projects/workbench.html", "utf8");
  assert.match(html, /Interactive architecture · Not an actual execution/);
  assert.match(html, /NO BACKEND CALLS/);
  assert.equal((html.match(/data-node="/g) || []).length, 5);
  if (!media.src) {
    assert.doesNotMatch(html, /<video/);
    assert.match(html, /Film awaiting publication/);
  } else {
    assert.match(html, /preload="none"/);
    assert.match(html, /<video hidden controls playsinline/);
    assert.doesNotMatch(html, /<video[^>]*\ssrc=/);
  }
});

test("approved film markup exposes controls and defers both media and captions", () => {
  const html = renderFilm({
    src: "https://example.com/product.mp4?edition=1&format=mp4",
    type: "video/mp4",
    durationSeconds: 60,
    rightsReviewed: true,
    captions: [{ src: "https://example.com/product.en.vtt", lang: "en" }],
  });
  assert.match(
    html,
    /<video hidden controls playsinline crossorigin="anonymous" preload="none"/,
  );
  assert.match(
    html,
    /data-source="https:\/\/example.com\/product.mp4\?edition=1&amp;format=mp4"/,
  );
  assert.match(html, /<track kind="captions" srclang="en"/);
  assert.doesNotMatch(html, /<(video|track)[^>]*\ssrc=/);
  assert.match(html, /class="film-error" hidden role="alert"/);
  assert.match(html, /class="film-retry"/);
});
