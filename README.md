# Shubham Mookim — portfolio

One world on a signed vertical axis. A single WebGL fragment shader draws every
page: `−1` is high above water, `0` is the waterline, `+1` is the abyss. The
professional/personal toggle in the header just animates that number, so the
horizon physically travels through the screen when you switch sides.

- **Below the line — professional.** `/work` and a page per system, `/research`
  (independent work, with a live model of the market it studies), `/descent`
  (the career), `/toolbox` (how I work), `/abyss` (contact).
- **Above the line — personal.** `/about` (the portrait), `/atlas` and a photo
  essay per city grouped by trip, `/now` (this month).
- **Neither.** `/colophon` (how the site is built), `/404`.

## Structure

```
src/
  layouts/World.astro     the shell: shader canvas, chrome, depth per page
  components/             Axis (header + toggle), Readout (live depth)
  data/                   site · projects · research · experience · places — edit here
  pages/                  routes
  scripts/water.js        the shader and its tiny WebGL runtime
  scripts/negotiation.js  the live bilateral-market model on /research
  styles/global.css       one stylesheet, two worlds via [data-world]
public/photos/            pre-resized WebP, ~3 MB for 27 frames
host/                     the phone-hosting control layer (see host/README.md)
```

All copy and content live in `src/data/*.ts`. Adding a project or a city is a
new entry in an array — the index page, the detail route and the prev/next
pager all follow from it.

## Running locally

```bash
npm install
npm run dev
```

Then <http://localhost:4321>. `npm run build` writes static HTML to `dist/`.

## Deploying

Push to `main`. GitHub Actions builds and publishes `dist/` to the **`live`**
branch. The phone pulls `live` and serves it — it never runs a build. See
[host/README.md](host/README.md) for the phone side.

## Notes

- No client-side framework ships. The only JavaScript is the shader plus a
  couple of `IntersectionObserver`s.
- `prefers-reduced-motion` freezes the shader's time uniform.
- Without WebGL the canvas falls back to a CSS gradient and everything still reads.
