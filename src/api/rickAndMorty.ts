const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql'

export type ApiCharacter = {
  id: string
  name: string
  image: string
  species?: string
  status?: string
}

type CharactersQueryResponse = {
  data?: {
    characters?: {
      results?: Array<{
        id: string
        name: string
        image: string
        species: string
        status: string
      } | null> | null
    } | null
  }
  errors?: Array<{ message: string }>
}

const CHARACTERS_QUERY = `
  query Characters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        status
      }
    }
  }
`

export class RickAndMortyApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RickAndMortyApiError'
  }
}

function parseCharacters(payload: CharactersQueryResponse): ApiCharacter[] {
  const results = payload.data?.characters?.results
  if (!Array.isArray(results)) {
    throw new RickAndMortyApiError('Unexpected API response shape')
  }

  return results
    .filter((item): item is NonNullable<typeof item> => item != null)
    .map((item) => ({
      id: String(item.id),
      name: item.name,
      image: item.image,
      species: item.species,
      status: item.status,
    }))
}

export async function fetchCharacters(page = 1): Promise<ApiCharacter[]> {
  let response: Response

  try {
    response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: CHARACTERS_QUERY,
        variables: { page },
      }),
    })
  } catch {
    throw new RickAndMortyApiError('Network request failed')
  }

  if (!response.ok) {
    throw new RickAndMortyApiError(`Request failed with status ${response.status}`)
  }

  let payload: CharactersQueryResponse

  try {
    payload = (await response.json()) as CharactersQueryResponse
  } catch {
    throw new RickAndMortyApiError('Invalid JSON response')
  }

  if (payload.errors?.length) {
    throw new RickAndMortyApiError(payload.errors[0]?.message ?? 'GraphQL error')
  }

  return parseCharacters(payload)
}
