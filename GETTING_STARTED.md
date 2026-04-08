# Getting started with this codebase

A short guide if you are new to **Doodler** and this repo.

## What this project is

This repository is really **two things in one**:

1. **A React + TypeScript UI kit** — reusable components (buttons, activities table, gallery, etc.). It is built as an npm-style **library** (`npm run build` → output in `dist/`).
2. **A runnable prototype app** — the full “cliëntoverzicht / doodle flow” you see when you run the dev server. That lives under `src/pages/` and `src/components/`, and is wired up from **`src/demo.tsx`**.

You usually explore the prototype first; you touch the library when you export or document a component for reuse.

## Prerequisites

- **Node.js** (LTS is fine; the project uses Vite 5 and React 18).
- **npm** (comes with Node).

## First steps

```bash
cd Doodler
npm install
npm run dev
```

Open the URL Vite prints (often `http://localhost:5173`). You should see a **prototype selector** screen.

### Useful URLs

- **Selector (default):** no hash, or clear the hash.
- **Showcase / cliëntoverzicht:** add `#clientoverzicht` or `#cliëntoverzicht` to the URL. The wrapper reads the hash and switches views — see `src/pages/PrototypeWrapper.tsx`.

## Commands you will use

| Command | Purpose |
|--------|---------|
| `npm run dev` | Run the **prototype app** (entry: `index.html` → `src/demo.tsx`). |
| `npm run build` | Build the **library** (`dist/doodler-ui.*`, types, `dist/style.css`). |
| `npm run build:app` | Production build of the **app** into `dist-app/` (separate Vite config). |
| `npm run storybook` | Component gallery / stories (if you are working on isolated UI pieces). |
| `npm run lint` | ESLint on `.ts` / `.tsx`. |

## Where the important code lives

| Path | What it is |
|------|------------|
| `src/demo.tsx` | App bootstrap: mounts `PrototypeWrapper`. |
| `src/pages/PrototypeWrapper.tsx` | Chooses which screen to show (selector, widget demo, showcase). |
| `src/pages/Prototype.tsx` | Main **showcase** flow: activities table, doodle steps, summary, gallery. Large file — search for handlers like `handleNavigateToDoodle`. |
| `src/components/` | Most UI: each folder is usually `ComponentName.tsx`, `ComponentName.css`, sometimes `.stories.tsx`. |
| `src/components/ActivitiesOverview/` | Client **activities grid** (rows = zorgtraject, columns = Krachten … Aanpak). Default rows live in `DEFAULT_ACTIVITIES_TABLE`. |
| `src/styles/` | Global CSS and design **tokens** (`tokens.css`, `index.css`). |
| `src/index.ts` | **Library** public exports (what consumers import from `doodler-ui`). Not everything in `components/` is exported here yet. |
| `vite.config.ts` | Library build. |
| `vite.config.app.ts` | Standalone app build to `dist-app/`. |

The **README.md** in the repo root lists design tokens (colors, spacing, fonts). Use that when matching visual specs.

## Patterns to expect

- **Co-located CSS:** Component styles are often in a sibling `.css` file with BEM-like class names (e.g. `doodler-activities-overview__...`).
- **TypeScript:** Prop types and shared shapes (e.g. `Activity`, `CellState`) live next to the components that own them.
- **Assets:** Images live under `src/assets/` (often `img/`). They are imported in TSX so Vite can bundle them.

## Suggested learning order

1. Run `npm run dev`, click through the **selector** and **showcase** flows.
2. Skim `PrototypeWrapper.tsx` to see how views switch.
3. Open `ActivitiesOverview.tsx` — small enough to read end-to-end — to see how the grid and modals work.
4. Use your editor’s “find references” on a handler from `Prototype.tsx` when you need to follow navigation or state updates.

## If something fails

- After cloning, **`npm install`** must succeed before `dev` or `build`.
- If types or imports look wrong, run **`npm run build`** once; the library uses `tsc` + `vite-plugin-dts` for declarations.

Welcome aboard — when in doubt, start at `demo.tsx` and follow the React tree downward.
