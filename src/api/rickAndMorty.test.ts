import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchCharacters, RickAndMortyApiError } from './rickAndMorty'

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
}

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchCharacters', () => {
  it('returns characters on successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResponse({
        data: { characters: { results: [mockCharacter] } },
      }),
    )

    const characters = await fetchCharacters()
    expect(characters).toEqual([
      {
        id: '1',
        name: 'Rick Sanchez',
        image: mockCharacter.image,
        species: 'Human',
        status: 'Alive',
      },
    ])
  })

  it('throws on failed fetch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    await expect(fetchCharacters()).rejects.toThrow(RickAndMortyApiError)
    await expect(fetchCharacters()).rejects.toThrow(/network/i)
  })

  it('throws on non-ok HTTP response', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({}, false, 500))

    await expect(fetchCharacters()).rejects.toThrow(/status 500/i)
  })

  it('throws on malformed response shape', async () => {
    vi.stubGlobal('fetch', mockFetchResponse({ data: {} }))

    await expect(fetchCharacters()).rejects.toThrow(/unexpected/i)
  })

  it('throws on GraphQL errors', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResponse({ errors: [{ message: 'Bad query' }] }),
    )

    await expect(fetchCharacters()).rejects.toThrow(/bad query/i)
  })

  it('throws on invalid JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError('invalid')
        },
      }),
    )

    await expect(fetchCharacters()).rejects.toThrow(/invalid json/i)
  })
})
