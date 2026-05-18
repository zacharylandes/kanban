# Rick & Morty Kanban

A frontend-only Kanban board built with React and TypeScript. Tasks are assigned to characters from the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) and can be dragged between **To Do**, **Doing**, and **Done**.

## Features

- Create tasks with title, optional description, and a real API character
- Drag tasks between columns and reorder within a column (`@dnd-kit`)
- Subtle confetti when a task moves into **Done**
- Notion-inspired UI with Tailwind CSS
- Vitest + React Testing Library coverage
- Production Docker image (nginx) for Coolify

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once (CI) |
| `npm run typecheck` | TypeScript project check |

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

## Testing

```bash
npm run test:run
npm run typecheck
```

## Architecture

```
src/
  api/           Rick and Morty GraphQL client
  components/    Board UI, form, drag/drop, celebration
  hooks/         Board state and character loading
  types/         Shared Kanban types
  utils/         Pure drag/reorder helpers (unit tested)
```

**State:** React `useState` in `useBoardState` — no external store. Drag logic lives in `boardDrag.ts` so components stay thin.

**Drag and drop:** `@dnd-kit` with per-column `SortableContext` and `applyDrag()` for immutable board updates.

**API:** Characters load once on mount via `fetch` POST to the public GraphQL endpoint. Tests mock `fetch`.

## Tradeoffs

- No persistence — board state resets on refresh (frontend-only challenge scope)
- Characters load from page 1 only (keeps the form simple; pagination can be added later)
- Docker not verified in this environment when the daemon is unavailable; Dockerfile follows standard Vite + nginx pattern

## Docker

Build and run locally:

```bash
docker build -t kanban-rick-morty .
docker run --rm -p 8080:80 kanban-rick-morty
```

Visit `http://localhost:8080`.

## Coolify deployment

1. Create a new application in Coolify and connect this repository.
2. Choose **Dockerfile** deployment (not Nixpacks).
3. Set the container port to **80** (or **3000** — nginx listens on both). Do not use a Node dev-server port unless you change the image.
4. **Domains:** enter hostnames only, e.g. `kanban.zacharylandes.com` — not full URLs with `https://`.
5. No backend service or runtime environment variables are required.
6. Deploy — Coolify builds the multi-stage image (Node build → nginx static serve).

The nginx config serves the Vite `dist` output and falls back to `index.html` for client-side routing.

### Bad gateway (502)

Usually means the reverse proxy is hitting the wrong container port. This app serves static files with **nginx on port 80** (also 3000 for misconfigured proxies). In Coolify → your app → **Configuration** → set **Ports Exposes** / **Port** to `80`, save, and redeploy.

If **Domains** contains `https://kanban.example.com`, remove the scheme and use `kanban.example.com` only.

## License

MIT
