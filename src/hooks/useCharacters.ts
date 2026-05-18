import { useEffect, useState } from 'react'
import { fetchCharacters, type ApiCharacter } from '../api/rickAndMorty'

export function useCharacters() {
  const [characters, setCharacters] = useState<ApiCharacter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const results = await fetchCharacters()
        if (!cancelled) {
          setCharacters(results)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load characters')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { characters, loading, error }
}
