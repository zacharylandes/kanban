import { KanbanBoard } from './components/KanbanBoard'
import { useBoardState } from './hooks/useBoardState'

function App() {
  const { board } = useBoardState()

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
          Rick & Morty Kanban
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Track tasks across To Do, Doing, and Done.
        </p>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <KanbanBoard board={board} />
      </main>
    </div>
  )
}

export default App
