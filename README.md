# Quantus

React 18 + Vite + TypeScript frontend with a Lexical editor.

## Setup

```bash
npm install
npm run dev
```

## Structure

- **`src/editor`** — Lexical: config, theme, plugins, table/math modules. Single config source.
- **`src/store`** — Zustand: editor store (serialized content, hydration), UI store (toolbar format).
- **`src/components`** — Shared UI. Toolbar calls editor actions only.
- **`src/persistence`** — Load/save adapter; swap in `index` for API.
- **`src/utils`** — Pure helpers only; no editor or store deps.

Imports use the `@/` alias (e.g. `import { Editor } from '@/editor'`).

## Scripts

- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — ESLint
