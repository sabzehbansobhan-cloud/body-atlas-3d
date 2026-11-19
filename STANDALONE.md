# Running Body Atlas 3D as a standalone app

Needs Node.js 20+ and an internet connection for the first `npm ci`.

```bash
npm ci
npm run build      # creates dist/
npm run check      # verifies every model/asset is in dist/ with the right size
npm run serve      # serves dist/ at http://localhost:4173 (also prints a LAN address for your phone)
```

- `dist/` is a normal static site (index.html + assets/ + models/ + organs/). It uses relative paths, so it works from
  any folder, any static host, and from GitHub Pages at `https://<user>.github.io/<repo>/` with no extra setting.
- It cannot be opened by double-clicking index.html (browsers block module scripts and model loading on `file://`);
  use `npm run serve` or any static server.
- GitHub Pages: publish the contents of `dist/` (e.g. `gh-pages` branch or a Pages workflow). Optionally set
  `SITE_URL=https://<user>.github.io/<repo>` when building to get canonical links, sitemap.xml and robots.txt.
- Fonts (Inter, Newsreader) still load from Google Fonts as in the original; without internet the app falls back to
  system fonts. Service worker (offline cache) needs HTTPS or localhost.
