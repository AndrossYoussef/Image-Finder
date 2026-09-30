# Talabat Images Finder

Match menu item names (Arabic, English or mixed) to the right images in your library, review the matches, and export a **renamed ZIP** — all in the browser.

**100% local · No API · No uploads.** Your images never leave your device.

## Run it

- **Online (GitHub Pages):** open `https://<your-username>.github.io/<repo-name>/`
- **Offline:** download `index.html` and double-click it (works in Chrome / Edge).

## How to use

1. **Load folder** – drag your image folder (sub-folders included) onto the drop zone.
2. **Add items** – paste menu item names (one per line) or import a CSV / Excel file.
3. **Search Images** – every item is scored against every image name.
4. **Review** – preview each match, switch to an alternative, confirm or remove.
5. **Download ZIP** – confirmed images are packed into `Menu-Images.zip`, renamed to the menu item names.

## Features

| Feature | What it does |
|---|---|
| Arabic + English matching | Translation, phonetic, synonyms and typo tolerance |
| Score tiers | T1 Exact ≥95% · T2 High 78–94% · T3 Medium 55–77% · T4 Low · No match |
| Search scope | All library, Auto-detect category, or Selected categories only |
| Priority rules | Editable trigger words (e.g. iced / مثلج → Cold drinks); lower number runs first |
| Editable dictionary | Your own shorthand, e.g. `chk = chicken` |
| Preview before confirm | Forces a visual check before a match is accepted |
| Learned matches | Confirmed choices are remembered for next time |
| Rename on export | Use menu name as filename; duplicate names are flagged and block the ZIP |
| Memory backup (CSV) | Export / import categories, learned matches, rules and dictionary |
| Results CSV | Item, image, score, tier, status, method, export name |
| Light / dark mode | Remembered between visits |

Supported image formats: JPG, PNG, WEBP, GIF, BMP, HEIC (also AVIF, TIFF).

## Good to know

- Your corrections, dictionary and rules are stored **in the browser** (local storage). A new browser, PC or URL starts empty — use **Export memory CSV** to back up and **Import memory CSV** to restore.
- Clear, descriptive image filenames give the best matches. Review T3/T4 matches by eye.

## Documentation

A visual step-by-step guide is in [`docs/Talabat_Images_Finder_Guide.pptx`](docs/Talabat_Images_Finder_Guide.pptx).

## Repository contents

```
index.html      the whole tool (single file, works offline)
docs/           user guide (PowerPoint)
.nojekyll       tells GitHub Pages to serve the file as-is
README.md       this file
```

## Credits

Built by Andro Youssef for Talabat catalog operations.
