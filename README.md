# Talabat Images Finder — GitHub Pages deployment

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

## Updating
When publishing a future version, change `VERSION` near the top of `sw.js` so returning users receive the new cache. Do not reuse an old service-worker version string.
