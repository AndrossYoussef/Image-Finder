# Image Finder Team Configuration Guide

This guide explains what the team shares through the published Image Finder and what each person keeps locally in their own browser.

## The simple rule

> **`shared-config.json` is the team baseline. Browser storage is personal.**

Team members use the same published categories and defaults, but their uploaded folders, menu text, review decisions, custom changes, and workspaces remain on their own device.

## What everyone shares

The published `shared-config.json` can provide:

- Shared category definitions and keyword aliases
- Shared folder-category definitions
- Shared auto-confirm rules
- The default auto-categorization setting, when the user has not already changed it locally
- Shared Covers type labels, such as Burger Covers or Chicken Covers

The file is read from the same GitHub Pages site when the app is online. The app shows a green message similar to:

> **Shared configuration loaded — local changes stay on this device.**

If the file cannot be reached, the app continues using the locally available configuration and shows a local/offline status instead.

## What stays local to each team member

The following information is stored in that person’s browser and is not uploaded to GitHub or shared with other users:

- Image Library folders selected on that device
- Covers folders selected on that device
- Menu items pasted or imported by that person
- Image-to-category assignments and manual corrections
- Learned matching decisions
- Selected images for ZIP download
- Search filters, sorting, review state, and preview state
- Saved workspaces
- Custom categories created in the interface
- Personal dictionary aliases
- Personal auto-categorization and auto-confirm changes
- Theme and other browser preferences

This is intentional: the tool is **100% local for user files**. A team member can work with confidential images without uploading them to a server.

## How configuration precedence works

The app starts with its built-in configuration, then adds shared configuration when available.

- A shared category is added only when that category key does not already exist locally.
- A local category or local manual definition takes precedence over a shared category with the same key.
- A shared auto-confirm rule is used only when the user does not already have a local rule for that key.
- The shared default for auto-categorization is used only when that user has not previously saved a local auto-categorization preference.
- Shared Covers types are refreshed from the published baseline when the app loads.

Therefore, publishing a change does not erase someone’s local work or personal decisions.

## Recommended team workflow

### For everyday users

1. Open the published link in a normal browser tab: <https://androssyoussef.github.io/Image-Finder/>.
2. Wait until the shared configuration message appears.
3. Load your local Image Library folder and, if needed, your separate Covers folder.
4. Use the shared categories as the common vocabulary for the team.
5. Keep personal corrections and review decisions locally.
6. Use workspace export/import only when you intentionally want to transfer a personal working state to another browser.

### For the configuration owner

1. Agree on category names and keywords with the team before changing the baseline.
2. Edit `shared-config.json` in the GitHub repository.
3. Keep category keys stable. Change labels or keywords instead of renaming keys unless a migration is planned.
4. Commit the change to the `main` branch.
5. Wait for GitHub Pages to publish the update.
6. Tell the team to reload the app while online.
7. Ask users to hard-refresh once if their browser appears to show an older baseline.

## Important limitation

GitHub Pages is a static, read-only website. The browser cannot safely write shared settings back to the repository.

That means:

- Two users cannot simultaneously edit one shared configuration from inside the app.
- A user’s local category or correction does not automatically become a team-wide rule.
- Team-wide changes must be reviewed and published by the configuration owner.
- A real shared live-editing system would require a writable backend, database, or API.

## Avoiding conflicts

- Prefer stable category keys such as `burger`, `chicken`, or `fld_main_meals`.
- Avoid creating personal custom categories with the same key that the team plans to publish later.
- Use descriptive keyword aliases in both English and Arabic where needed.
- Do not treat a personal workspace as the team baseline; workspaces are user-specific snapshots.
- If a local setting is unexpectedly taking precedence, use the app’s local reset/clear controls or clear the site’s local storage only after preserving any workspaces that matter.

## Privacy and data handling

Images are processed locally in the browser. The app does not upload the Image Library or Covers images to GitHub Pages. GitHub Pages only serves the application files and the published shared configuration baseline.

## Quick troubleshooting

| Situation | What it means | Recommended action |
| --- | --- | --- |
| “Shared configuration loaded” | The current online baseline was read successfully. | Continue normally. |
| “Local configuration only” | The shared file was unavailable, usually because of offline use or a temporary network issue. | Go online and reload when you need the latest team baseline. |
| A new shared category is not visible | A local category with the same key already exists, or the browser is using an old page cache. | Reload online; check for a local override before changing data. |
| My colleague cannot see my corrections | Corrections are intentionally browser-local. | Publish a reviewed rule to `shared-config.json`, or export/import a workspace for a one-time transfer. |
| The app shows preview sandbox errors | The embedded preview restricts service workers and cross-origin access. | Open the GitHub Pages URL directly in a normal browser tab. |
