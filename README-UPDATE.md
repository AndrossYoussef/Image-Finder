# Image Finder update — keep the Drive library between menus

This update is for your existing GitHub Pages repository. It keeps the loaded Drive image library during **New Session**, caches the compact image catalogue in the same browser for seven days, and folds optional/advanced panels to reduce clutter.

## Upload

1. In the GitHub repository root, replace these three files with the matching files in this package: `index.html`, `sw.js`, and `drive-config.js`.
2. The included `drive-config.js` already contains the deployed `/exec` URL currently published on your site. If you prefer to edit only two files, keep your existing working `drive-config.js` instead.
3. Do not delete the other repository files. Commit the changes to the branch GitHub Pages publishes (usually `main`).
4. Reload Image Finder after Pages finishes publishing. Accept the site's update/reload prompt if it appears. If your browser still shows an older version, unregister the Image Finder service worker and reload.

## How it behaves

- First visit in a browser: fetches the Drive catalogue and stores the compact index locally. The first scan can still take time.
- Pressing the rail's **New session** button: clears the current menu/results but keeps the already loaded image library in memory, so it does not rescan Drive.
- Reloading or reopening in the same browser: restores the catalogue from IndexedDB (up to seven days old) rather than fetching the full index again.
- To discover images added to Drive, choose **Refresh library**. That explicitly fetches a fresh index and refreshes the local cache.
- Each browser/device has its own local cache. Clearing the website's storage removes that cache and may also remove other browser-saved work.
- The Drive library is not copied/uploaded to GitHub; only its lightweight file index is cached locally.

## Layout changes

The Drive library and Menu Search sections remain visible by default. **Cover Images** and **Auto Categories & Data** start collapsed as dropdowns; click their headings or use the sidebar navigation to open them. The optional tools remain available inside the collapsed sections; no working features were removed.
