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
    <div className="min-h-screen">
      <Celebration trigger={celebrationTrigger} />
      <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)] px-6 py-5 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
          Rick & Morty Kanban
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Drag tasks across columns. Moving a task into Done triggers a small celebration.
        </p>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[300px_1fr] lg:px-8">
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
