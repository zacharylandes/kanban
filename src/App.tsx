import { useState } from 'react'
import { Celebration } from './components/Celebration'
import { CreateItemForm } from './components/CreateItemForm'
import { KanbanBoard } from './components/KanbanBoard'
import { useBoardState } from './hooks/useBoardState'
import { useCharacters } from './hooks/useCharacters'

function App() {
  const { board, addItem, setBoardState } = useBoardState()
  const { characters, loading, error } = useCharacters()
  const [celebrationTrigger, setCelebrationTrigger] = useState(0)

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <Celebration trigger={celebrationTrigger} />
      <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)]/90 px-6 py-6 shadow-[0_1px_0_rgba(15,15,15,0.04)] backdrop-blur-sm lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Internal workspace
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
            Rick & Morty Kanban
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
            Plan work in To Do, focus in Doing, and finish in Done. Drag cards to
            reorder or move columns—dropping into Done triggers a small celebration.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr] lg:gap-8 lg:px-10">
        <CreateItemForm
          characters={characters}
          loadingCharacters={loading}
          charactersError={error}
          onCreate={addItem}
        />
        <KanbanBoard
          board={board}
          onBoardChange={setBoardState}
          onMovedToDone={() => setCelebrationTrigger((value) => value + 1)}
        />
      </main>
    </div>
  )
}

export default App
