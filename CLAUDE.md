# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

食光味道 (Food-Maker) is a pure client-side recipe browsing site — plain HTML/CSS/JS with no build step, no bundler, no dependencies, and no backend/fetch calls. All content is Chinese-language (recipe names, UI text, code comments).

## Running locally

No install step. Either:
- Open `index.html` directly in a browser, or
- Serve statically (recommended so relative paths behave normally): `python3 -m http.server 8080`, then visit `http://localhost:8080`.

There is no test suite, linter, or build/compile command in this repo.

## Architecture

Four files, loaded in this order by `index.html`: `data.js` → `app.js` → (styled by `style.css`).

- **`data.js`** — all content lives here as two globals:
  - `CUISINE_META`: maps each of the 8 cuisine names (川菜/粤菜/鲁菜/闽菜/浙菜/湘菜/徽菜/苏菜) to an emoji + CSS gradient, used as an image placeholder wherever a recipe is rendered.
  - `RECIPES`: flat array of 32 recipe objects (4 per cuisine), each with `id`, `name`, `cuisine`, `emoji`, `intro`, `featured` (bool, drives the homepage "精选食谱" section), `ingredients[]`, `steps[]`.
  - `CATEGORIES` is derived as `Object.keys(CUISINE_META)`.
  - Adding a recipe = appending an object to `RECIPES`; adding a cuisine = adding an entry to `CUISINE_META` (order there defines category display order everywhere).

- **`app.js`** — all rendering and interaction logic, no framework. Single-page app pattern: everything renders into `#main-content` by fully replacing `main.innerHTML` per view.
  - View functions: `showHome()`, `showCategories(cuisine)`, `showSearchResults(query)` — each rebuilds the whole main content string and calls `setActiveNav()` to sync the nav bar's active state.
  - `getDailyRecipe()` picks the "今日主厨推荐" (daily chef pick) **deterministically** from day-of-year modulo `RECIPES.length` — not random, and intentionally not persisted anywhere; don't change this to `Math.random()`.
  - Recipe detail is an overlay, not a route: `openDetail(id)` fills `#detail-panel` and toggles the `.open` class on `#detail-overlay`; the URL hash (`#recipe-<id>`) is updated via `history.replaceState` purely so a direct link/refresh can reopen the same recipe via `init()` at the bottom of `app.js`. There's no router — hash changes elsewhere don't trigger navigation.
  - Search (`showSearchResults`) does a naive case-insensitive substring match across `name`, `intro`, `ingredients[]`, and `cuisine` — no fuzzy matching or indexing.
  - All click handling is done via inline `onclick="..."` attributes generated in template strings (e.g. `cardHTML`, category chips), plus a couple of delegated listeners (`#nav-main`, `#detail-overlay`, `Escape` key). Keep this pattern consistent when adding new interactive elements rather than introducing a separate event-binding system.

- **`style.css`** — single stylesheet, responsive via media queries. No CSS framework or preprocessor.

## Conventions to preserve

- Keep new UI copy and recipe content in Chinese, consistent with the rest of the site.
- Don't introduce a build step, package.json, or external network calls (images are emoji + gradients by design, not fetched).
