import { useState, type FormEvent } from 'react'
import type { Character, KanbanItem } from '../types/kanban'
import { CharacterSelect } from './CharacterSelect'

type CreateItemFormProps = {
  characters: Character[]
  loadingCharacters: boolean
  charactersError: string | null
  onCreate: (item: Omit<KanbanItem, 'id'>) => void
}

export function CreateItemForm({
  characters,
  loadingCharacters,
  charactersError,
  onCreate,
}: CreateItemFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [characterId, setCharacterId] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setValidationError('Title is required')
      return
    }

    if (!characterId) {
      setValidationError('Character is required')
      return
    }

    const character = characters.find((item) => item.id === characterId)
    if (!character) {
      setValidationError('Select a valid character')
      return
    }

    onCreate({
      title: trimmedTitle,
      description: description.trim() || undefined,
      character,
    })

    setTitle('')
    setDescription('')
    setCharacterId('')
    setValidationError(null)
  }

  const disabled = loadingCharacters

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
      data-testid="create-item-form"
    >
      <h2 className="text-sm font-semibold text-[var(--color-ink)]">New task</h2>
      <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
        Every task needs a Rick and Morty character owner.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={disabled}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 disabled:opacity-60"
            placeholder="What needs doing?"
          />
        </div>

        <motion></motion>
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
          >
            Description <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={disabled}
            rows={3}
            className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 disabled:opacity-60"
            placeholder="Add context"
          />
        </div>

        <CharacterSelect
          characters={characters}
          value={characterId}
          onChange={setCharacterId}
          disabled={disabled}
          error={charactersError}
        />

        {validationError ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
            {validationError}
          </p>
        ) : null}

        {loadingCharacters ? (
          <p className="text-xs text-[var(--color-muted)]">Loading characters from the API…</p>
        ) : null}

        <button
          type="submit"
          disabled={disabled}
          className="w-full rounded-lg bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2f2d28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to To Do
        </button>
      </div>
    </form>
  )
}
