# Shubham Mookim — Portfolio

A fast, dependency-free personal portfolio site. Built from a Claude-designed
layout into a hand-tuned static site: warm-paper palette in `oklch`, Manrope +
Fraunces type, and a set of smooth micro-interactions.

## Features

- **Hero** with a rotating role word, floating gradient orbs that respond to
  mouse position (3D tilt + depth parallax) and fade on scroll.
- **Custom cursor dot** that grows over interactive elements (pointer devices only).
- **Scroll-reveal** animations and **count-up stats** via `IntersectionObserver`.
- **Section-spy** dot navigation that tracks the active section.
- **Horizontally-scrollable project cards** with an accessible detail modal
  (keyboard + Escape support, focus management).
- Fully **responsive** and **`prefers-reduced-motion`** aware.

## Structure

```
index.html         # markup + content containers
assets/styles.css  # all styling, palette tokens, responsive + reduced-motion rules
assets/script.js   # content data + all interactions (vanilla JS, no build step)
```

All content lives in the `DATA` object at the top of `assets/script.js` — edit
there to update experience, projects, skills, etc.

## Running locally

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

The site is fully static. To host on **GitHub Pages**, enable Pages for this
repository (Settings → Pages) with the `main` branch and `/ (root)` as the
source. The included `.nojekyll` file ensures assets are served as-is.
