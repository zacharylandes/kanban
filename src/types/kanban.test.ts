import { describe, expect, it } from 'vitest'
import { COLUMN_LABELS, COLUMN_ORDER, createEmptyBoard } from './kanban'

describe('kanban types', () => {
  it('defines column labels', () => {
    expect(COLUMN_LABELS.todo).toBe('To Do')
    expect(COLUMN_LABELS.doing).toBe('Doing')
    expect(COLUMN_LABELS.done).toBe('Done')
  })

  it('orders columns left to right', () => {
    expect(COLUMN_ORDER).toEqual(['todo', 'doing', 'done'])
  })

  it('creates an empty board', () => {
    expect(createEmptyBoard()).toEqual({ todo: [], doing: [], done: [] })
  })
})
