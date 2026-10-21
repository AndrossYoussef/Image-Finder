# Image Finder — free Google Drive connection

This package connects the existing Image Finder website to the public image folder you shared. It uses **Google Apps Script + its built-in Drive service**; there is no paid hosting, API key, Cloud Run service, or manually enabled Google Drive API. Since this is a script endpoint, it is not literally “no API,” but it is a free Apps Script web app.

## Files

- `Code.gs` — paste this into a new Google Apps Script project.
- `index.html`, `drive-config.js`, `sw.js` — replace the matching files in the root of your GitHub Pages repository.
- The other copied site files can remain unchanged; they are included only to make the package self-contained.

## 1. Create and deploy the Google Script

1. Sign into the Google account that owns or can read the folder. Open [script.google.com](https://script.google.com/) and create a **New project**.
2. Replace the starter code in `Code.gs` with the supplied `Code.gs`, then save.
3. Choose **Deploy → New deployment → Select type → Web app**.
4. Set **Execute as** to **Me** and **Who has access** to **Anyone**. Deploy and approve the Google permission request. The project needs permission to read Drive files.
5. Copy the deployed web-app URL ending in `/exec`. Do not use the `/dev` test URL.

The script is read-only: it only lists images under the configured folder and returns image bytes when the app requests an image. It rejects requests for files outside that folder. Anyone who can use the public site will be able to see/download these folder images, so only use a folder you intend to make public.

## 2. Add the URL to the site

Open `drive-config.js` and replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with your deployed `/exec` URL. Keep the URL inside the quotes. Do not add passwords or tokens.

## 3. Publish on GitHub Pages

Upload/replace `index.html`, `drive-config.js`, and `sw.js` in the repository root and commit to the branch GitHub Pages uses (usually `main`). Leave the remaining assets/config files in place. The service-worker version was bumped so visitors can receive the update. Then open the published site in a fresh tab and click **Load / refresh shared library** if it has not loaded automatically.

## Updating an already deployed version

If you already deployed the earlier script version, replace its code with the revised `Code.gs`, save, then go to **Deploy → Manage deployments**, select the web app, click the pencil icon, choose **New version**, and click **Deploy**. The `/exec` URL normally stays the same. Replace the GitHub Pages `index.html` and `sw.js` with the revised package files as well; keep your already-filled-in `drive-config.js` URL.

## Notes and troubleshooting

- The configured folder ID is `19MQRXfFORhtffu2oZn-XfkXGaI1J5btv` and matches the link you provided. The folder is publicly viewable at setup time.
- The script recursively includes image files in subfolders and excludes non-images.
- If you change the Apps Script code later, create a new deployment version or edit the deployment to serve the latest version. Keep the same `/exec` URL if possible.
- If the app says it cannot connect, verify deployment access is **Anyone**, the URL ends in `/exec`, and the Apps Script owner still has access to the Drive folder.
- The provided folder currently contains about 8,147 images. The script uses a compact metadata index and the site waits up to three minutes for the initial scan. Large folders can still take longer to enumerate, and Apps Script has Google account execution quotas. ZIP creation downloads image bytes through JSONP one selected image at a time; very large selected batches may take a while.
- This is a static-hosted app connected to a free script endpoint; it does not incur a hosting bill by itself, but Google quotas and policies apply.
