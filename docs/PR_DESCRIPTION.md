## What changes

The portfolio now gives visitors an immediate engineering focus and a four-project index, with Local AI Workbench as a featured product and an independent bilingual product page. Real software captures, a five-step interactive architecture guide and linked implementation boundaries explain what the workbench does without presenting the concept flow as an actual execution.

- Six bilingual static pages, warm-paper/blue visual system, responsive layouts, résumé and existing contact facts.
- Workbench product chapter: real hero, on-demand film slot, node inputs/outputs/boundaries, keyboard navigation, guided tour, six architecture modules and source/setup links.
- Video player and future media configuration with deferred source/caption loading and retry behavior. Public film source remains empty pending voice-rights review; no MP4 is committed.
- Node-only generation and preview, no runtime library dependency, read-only build/test CI and no deployment automation.

## Validation

- `npm run build` and `npm test`: pass; 6 bilingual pages, 126 local references/anchors and 6 unit/lifecycle tests.
- Initial redesign: 36 real-browser page/language/viewport combinations. Product supplement: 12 additional home/product combinations, plus a 320px narrow-screen check; no horizontal overflow.
- Actual browser: step selection, ArrowRight/Home/End, previous/next bounds, reset, language switch, disclosure Enter and image dialog Escape/focus return.
- Reduced-motion preference respected in browser; controlled-clock tests cover the shipped tour handlers, stopping/restarting and timer cleanup.
- Existing 60-second film played in an ignored local QA fixture. Play/pause, seeking, native fullscreen, mute and missing-media/retry states checked. No public voice distribution implied.
- 13 unique public GitHub targets: HTTP 200. Local preview MIME/HEAD/range/416/hidden-path checks pass.
- Lighthouse 13.5.0, four configurations: Performance/Accessibility/Best practices/SEO all 100; CLS 0 and TBT 0. Local lab results, not field guarantees or WCAG certification.
- Two additional visual modification/reinspection rounds for mobile node density and tablet typography. See `docs/WORKBENCH_SHOWCASE_REPORT.md`, `docs/MEDIA.md` and the original `docs/DESIGN.md` / `docs/ACCEPTANCE.md`.

## Preview and evidence

```sh
npm run preview
```

Open `http://127.0.0.1:4173`, or `/projects/workbench.html?lang=en`. Product path: explore workflow → Classify records → inspect candidate/verified distinction → Output results → Governance & permissions → source/setup.

![Product desktop](https://raw.githubusercontent.com/David7583/David7583.github.io/feature/portfolio-redesign/docs/screenshots/showcase/final-product-desktop-en.webp)

![Interactive guide](https://raw.githubusercontent.com/David7583/David7583.github.io/feature/portfolio-redesign/docs/screenshots/showcase/final-flow-desktop-en.webp)

![Mobile node details](https://raw.githubusercontent.com/David7583/David7583.github.io/feature/portfolio-redesign/docs/screenshots/showcase/final-detail-mobile-zh.webp)

## Review boundaries and outstanding decisions

Draft only: owner approval is required before merge or production deployment. Pages remains sourced from `main`. No new Release, Zenodo upload, account authorization, credentials, local databases, real family records or large video assets are included. Existing public biography/contact facts are preserved.

The film must remain pending until its voice publication rights are confirmed or the voice is replaced, and the owner approves a hosted media URL. The public site does not simulate successful backend execution. Physical iOS/Android, Safari and screen-reader acceptance remain additional checks before a broad production rollout.
