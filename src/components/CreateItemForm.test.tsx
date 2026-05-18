import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import { CreateItemForm } from './CreateItemForm'

const characters = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://example.com/rick.png',
    species: 'Human',
    status: 'Alive',
  },
]

describe('CreateItemForm', () => {
  it('shows validation when title is missing', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()

    renderWithProviders(
      <CreateItemForm
        characters={characters}
        loadingCharacters={false}
        charactersError={null}
        onCreate={onCreate}
      />,
    )

    await user.selectOptions(screen.getByLabelText(/character/i), '1')
    await user.click(screen.getByRole('button', { name: /add to to do/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/title is required/i)
    expect(onCreate).not.toHaveBeenCalled()
  })

  it('shows validation when character is missing', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()

    renderWithProviders(
      <CreateItemForm
        characters={characters}
        loadingCharacters={false}
        charactersError={null}
        onCreate={onCreate}
      />,
    )

    await user.type(screen.getByLabelText(/title/i), 'Fix portal')
    await user.click(screen.getByRole('button', { name: /add to to do/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/character is required/i)
    expect(onCreate).not.toHaveBeenCalled()
  })

  it('creates an item and resets the form', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()

    renderWithProviders(
      <CreateItemForm
        characters={characters}
        loadingCharacters={false}
        charactersError={null}
        onCreate={onCreate}
      />,
    )

    await user.type(screen.getByLabelText(/title/i), 'Fix portal')
    await user.type(screen.getByLabelText(/description/i), 'Urgent')
    await user.selectOptions(screen.getByLabelText(/character/i), '1')
    await user.click(screen.getByRole('button', { name: /add to to do/i }))

    expect(onCreate).toHaveBeenCalledWith({
      title: 'Fix portal',
      description: 'Urgent',
      character: characters[0],
    })
    expect(screen.getByLabelText(/title/i)).toHaveValue('')
    expect(screen.getByLabelText(/description/i)).toHaveValue('')
    expect(screen.getByLabelText(/character/i)).toHaveValue('')
  })

  it('disables submit while characters are loading', () => {
    renderWithProviders(
      <CreateItemForm
        characters={[]}
        loadingCharacters
        charactersError={null}
        onCreate={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /add to to do/i })).toBeDisabled()
    expect(screen.getByText(/loading characters/i)).toBeInTheDocument()
  })
})
