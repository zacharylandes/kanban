import type { Character } from '../types/kanban'

type CharacterSelectProps = {
  characters: Character[]
  value: string
  onChange: (characterId: string) => void
  disabled?: boolean
  error?: string | null
}

export function CharacterSelect({
  characters,
  value,
  onChange,
  disabled,
  error,
}: CharacterSelectProps) {
  return (
    <div>
      <label htmlFor="character" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
        Character
      </label>
      <select
        id="character"
        name="character"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] shadow-sm outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 disabled:opacity-60"
      >
        <option value="">Select a character</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1.5 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      ) : null}
    </div>
  )
}
