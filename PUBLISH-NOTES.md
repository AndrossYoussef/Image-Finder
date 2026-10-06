# Image-Finder — Covers section replaced with the ToolsTest Cover Images Library

**Date:** 2026-10-06
**What changed:** The "Covers" card (old simple drop-zone + flat thumbnail browser) was
replaced with the full **Cover Images Library (750 × 300)** section from ToolsTest.
Nothing else in the app was modified.

---

## Files to publish

| File | Action |
|---|---|
| `index.html` | **Replace** the whole file in the `Image-Finder` repo |
| `sw.js` | **Replace** — only the `VERSION` constant was bumped (`finder-v26-…` → `finder-v27-covers-library-20261006`). This is required by the service worker's own documented release step ("Bump VERSION every time you publish a new index.html") so returning visitors immediately get the new page instead of the cached one. |

All other repo files (`manifest-finder.webmanifest`, `shared-config.json`, icons) are unchanged.

---

## Exactly what changed inside index.html (6 surgical edits)

1. **CSS** — removed the old covers styles (`.covers-drop-icon`, `.covers-category-summary`,
   `.covers-cat-btn`, `.covers-browser`, `.covers-search-row`, `.covers-browser-head`,
   `.cover-tile`, `.covers-empty`, old `.covers-grid`) and inserted the ToolsTest covers CSS
   block (`.covers-toolbar`, `.covers-filter-pill`, `.cover-cats-grid`, `.cover-cat-card`,
   `.cover-card`, `.cover-thumb-wrap`, `.cover-check`, `.cover-dl-box`, new `.covers-grid`, …).
   The neighbouring `.shared-config-note` rule was left untouched.
2. **HTML** — the old covers card was replaced by the ToolsTest card: drop-zone, toolbar
   (search / change-add folder / clear library), category filter pills, category-folder grid,
   per-category view, multi-select download box with progress + log, and the cover preview
   lightbox. The card keeps its original id `coversStep` (and its place between step 1 and
   step 2) so the existing rail navigation keeps working with zero changes.
3. **JS** — the old covers engine was replaced by the ToolsTest engine verbatim
   (folder/sub-folder reading, category detection from folder & file names, name cleaning,
   750×300 JPG generation, single direct download, multi-select ZIP `Cover-Images.zip`,
   preview modal, per-category select/deselect, remove, rename, search).
   Two deliberate adaptations:
   - the global ESC listener is scoped to the cover preview modal only, so the existing
     results-modal and category-lightbox ESC behaviour is untouched;
   - a silent `resetCovers()` was added so the app's own "New session" reset keeps working
     unchanged (it calls `resetCovers(true)`).
4. **Removed** the now-dead old `coverLightbox()` function (the new preview modal replaces it).
5. **Rail spy** — added `coversStep` to the observed section ids so the "Covers" nav button
   highlights when the covers card is on screen (same as ToolsTest's nav behaviour).
6. Everything else — search, matching, auto-categorization, results, ZIP export, workspaces,
   session restore, shared config, theme, offline mode — is byte-identical to before.

Note: the old shared-config `covers.types` option no longer has an effect (ToolsTest's covers
don't use a fixed type list — categories come from the folder/file names). The loader code was
left in place; it is safely inert.

---

## Testing performed (all automated, headless Chromium)

- **Covers flow suite: 53/53 passed** on the modified page, and the identical suite passes on
  the live ToolsTest site (51/51 behavioural checks identical; the only 2 differing checks are
  the section-id selector, which differs by design).
  Verified: load folder with sub-folders → category folders overview (counts, pills, nav badge
  `0/N`), search filtering, category open, export-name cleaning ("cover" word stripped),
  per-card selection states and counters, preview modal + ESC, single direct download
  (verified a real **750×300 JPEG** on disk), rename → download uses the new name,
  multi-select ZIP (verified a real `Cover-Images.zip` containing `Cover Images/<name>.jpg`,
  each exactly 750×300), deselect-all, select-all-in-category, remove card, add-more-folders
  accumulation, clear library, drag & drop fallback, zero console/page errors.
- **Regression suite: 27/27 passed** — library load, menu paste + search, results, results
  modal + ESC (unchanged), export card, theme toggle, New-session reset (including its covers
  reset), shared-config note, rail nav. The original page was run through the same suite for
  comparison — behaviour is identical.
- **Layout parity** — computed styles of every covers element match ToolsTest's (same grid,
  750/300 aspect, pill/card styling); the only differences are the app's own theme tokens
  (Image-Finder's dark palette and its `--or` accent), which the covers CSS correctly inherits.
- **Mobile (390 px)** — no horizontal overflow, cards stack correctly, no errors.
- All inline scripts pass `node --check`; no duplicate element ids introduced.

---

## How to publish

1. Commit `index.html` and `sw.js` from this folder to the `Image-Finder` repository
   (repo root, replacing the existing files).
2. Push / deploy as usual (GitHub Pages).
3. Returning visitors get the update immediately thanks to the SW version bump;
   a hard refresh is not needed.
