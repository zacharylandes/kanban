import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { BoardState } from '../types/kanban'
import { renderWithProviders } from '../test/test-utils'
import { KanbanBoard } from './KanbanBoard'

const sampleBoard: BoardState = {
  todo: [
    {
      id: '1',
      title: 'Portal gun maintenance',
      character: {
        id: '1',
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
      },
    },
  ],
  doing: [],
  done: [
    {
      id: '2',
      title: 'Summer homework',
      character: {
        id: '2',
        name: 'Summer Smith',
        image: 'https://example.com/summer.png',
      },
    },
  ],
}

describe('KanbanBoard', () => {
  it('renders all columns', () => {
    renderWithProviders(<KanbanBoard board={sampleBoard} />)

    expect(screen.getByTestId('column-todo')).toBeInTheDocument()
    expect(screen.getByTestId('column-doing')).toBeInTheDocument()
    expect(screen.getByTestId('column-done')).toBeInTheDocument()
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('Doing')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders empty states for columns without items', () => {
    renderWithProviders(<KanbanBoard board={sampleBoard} />)
    expect(screen.getByTestId('empty-doing')).toBeInTheDocument()
  })

  it('renders counts correctly', () => {
    renderWithProviders(<KanbanBoard board={sampleBoard} />)
    expect(screen.getByTestId('count-todo')).toHaveTextContent('1')
    expect(screen.getByTestId('count-doing')).toHaveTextContent('0')
    expect(screen.getByTestId('count-done')).toHaveTextContent('1')
  })
})
