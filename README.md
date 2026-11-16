# uncommissioned

Website for *uncommissioned*, an international exhibition of public art made without permission, produced by Nōvo Collective. It records every work in the project, with its site and materials: Edition 01 (2025) and Edition 02, Curaçao (2026).

Static HTML, CSS and JavaScript. No build step: open `index.html` or serve the folder.

- `assets/data.js`: editions, works, texts and supporters. Pages are rendered from this file.
- `assets/site.js`: shared header, footer, footnotes, popups and maps.
- `assets/cur-dem.js`: Curaçao elevation grid (AWS Terrain Tiles) for the island map.
- `img/`: work photographs.

Pages: `index.html`, `edition.html?e=01|02`, `work.html?w=<id>`, `about.html`, `texts.html`, `support.html`.
