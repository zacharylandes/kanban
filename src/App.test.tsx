import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { renderWithProviders } from './test/test-utils'

describe('App', () => {
  it('renders the kanban board', () => {
    renderWithProviders(<App />)
    expect(screen.getByTestId('kanban-board')).toBeInTheDocument()
    expect(screen.getByText(/rick & morty kanban/i)).toBeInTheDocument()
  })
})
