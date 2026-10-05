# Talabat Images Finder — GitHub Pages deployment

## This build

- Treats `Crepe`, `Crêpe`, `Crêpes`, `كريب`, and `كريـب` as the same searchable term.
- Uses English/Arabic category keywords as query aliases for images that were manually assigned to that category.
- Keeps category assignment manual; it never auto-categorizes the whole library.
- Shows high-confidence suggestions from existing categories, but saves nothing until the user presses **Apply suggestion**.
- Can apply each selected card's own high-confidence suggestion; assigned, ambiguous, and conflicting selections remain unchanged.
- Recognizes `كريب` as Crepe for suggestion purposes while leaving opaque or unclear names for review.
- Activates custom dictionary aliases across menu items, filenames, folders, and category keywords.
- Keeps all direct relevant candidates while showing a compact, expandable result card.
- Uses one category selector on each result/preview to save the same category to both the menu item and its current image.
- Separates the primary product from descriptive tags and resolves category conflicts such as Iced Latte vs Hot Drinks.
- Understands concatenated food names such as `nutellacrepe`, `chickenburger`, and `icedlatte`.
- Supports an optional multi-card category mode, clear no-match recovery actions, and an on-demand library health/visual-duplicate scan.
- Keeps large galleries responsive with progressive candidate rendering and background duplicate hashing.
- Includes a tested large-library mode for up to 50,000 images: lazy preview URLs, throttled import progress, bounded typo rescue, batched visual hashing, and IndexedDB-backed category memory.

## Upload
Upload this folder's contents to the root of the GitHub repository:

- `index.html`
- `sw.js`
- `manifest-finder.webmanifest`
- `icons/`
- `.nojekyll`

In **Settings → Pages**, deploy from the branch containing these files (normally `main`, root folder).

## Offline use
1. Open the published GitHub Pages URL once while online.
2. Wait for the message: **Offline mode ready**.
3. The page can then reload without an internet connection.

Service workers require HTTPS or localhost. Offline caching does not activate if `index.html` is opened directly as a `file://` URL.

## Shared configuration (free, no API)

The app reads `shared-config.json` from the same GitHub Pages site when online. This gives every user the same published category definitions, folder categories, auto-confirm rules, settings, and Covers type labels without CSV import/export or a third-party API.

GitHub Pages is read-only from browser JavaScript. To change the shared baseline, edit `shared-config.json` in the repository and commit it to `main`; the next online visit receives the new configuration. Personal decisions and local edits remain in each user’s browser and are not uploaded.

For true simultaneous multi-user editing, a writable backend or API is required; a static GitHub Pages site cannot safely accept browser writes.

## Updating
When publishing a future version, change `VERSION` near the top of `sw.js` so returning users receive the new cache. Do not reuse an old service-worker version string.
