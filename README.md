# Quantus

React 18 + Vite + TypeScript frontend with a Lexical editor.

## Setup

```bash
npm install
npm run dev
```

## Structure

- **`src/editor`** — Lexical editor: config, theme, and `Editor` component. Add plugins and nodes here.
- **`src/store`** — App state boundary. Add global state (e.g. Zustand, context) here.
- **`src/components`** — Shared UI components.
- **`src/utils`** — Pure helpers and shared logic.

Imports use the `@/` alias (e.g. `import { Editor } from '@/editor'`).

## Scripts

- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — ESLint
