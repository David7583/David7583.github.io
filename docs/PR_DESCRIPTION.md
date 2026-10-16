## What changes

The existing single-page portfolio gave similar weight to long project descriptions and treated Local AI Workbench as a supporting prototype. This redesign gives visitors a clear engineering focus, an immediate four-project index, a flagship Workbench feature and separate bilingual case studies with explicit implementation boundaries.

- Warm-paper / blue engineering identity, asymmetric desktop layout and purposeful mobile ordering.
- Six static pages; shared Chinese/English selection, résumé print styles, keyboard-friendly disclosures and image dialogs.
- Real software captures, responsive WebP images and labeled concept graphics. No invented biography, results or product scope.
- Node-only generator / preview; optional Lighthouse and Prettier development tools; GitHub Pages compatible.
- Read-only CI for build consistency and reference tests. No deployment automation.

## Validation

- `npm run build` and `npm test`: pass; 6 bilingual pages and 111 local references/anchors.
- 36 real browser page/language/viewport combinations: no horizontal overflow or completed-but-broken visible images.
- 8 external GitHub links: HTTP 200.
- Keyboard language switching, disclosure expansion, dialog Escape/focus return and language persistence verified.
- Lighthouse 13.5.0: four tested configurations score 100 for performance, accessibility, best practices and SEO; CLS 0, TBT 0. Local lab results, not field metrics or full WCAG certification.
- Two visual modification/reinspection rounds completed. Screenshots and scope limitations are recorded in `docs/ACCEPTANCE.md` and `docs/DESIGN.md`.

## Preview

```sh
npm run preview
```

Visit `http://127.0.0.1:4173`. Use `?lang=zh` or `?lang=en`.

![Desktop](https://raw.githubusercontent.com/David7583/David7583.github.io/feature/portfolio-redesign/docs/screenshots/final-desktop-en.webp)

![Mobile](https://raw.githubusercontent.com/David7583/David7583.github.io/feature/portfolio-redesign/docs/screenshots/final-mobile-zh.webp)

## Review boundaries

Draft only. Do not merge or deploy without owner approval. Production remains sourced from `main`; this branch does not change Pages settings. No credentials, private databases, real family records or large video assets are included. Existing public biography/contact facts are preserved. The earlier product video is not embedded because voice-use rights remain unresolved; this PR uses actual UI stills instead.
