FILES FOR THE ROOT OF THE EXISTING GITHUB PAGES REPOSITORY

- index.html: replace the existing file
- sw.js: replace the existing file
- drive-config.js: add this new file, but FIRST replace the Cloud Run URL placeholder with the deployed API URL

IMPORTANT: These files are not connected to Google Drive by themselves. The backend in drive-backend/ must be deployed to Google Cloud Run, and its service account must be given Viewer access to the Drive image subfolder. Then set the Cloud Run URL in drive-config.js and publish these files. See DEPLOY-DRIVE.md in the full integration bundle.
