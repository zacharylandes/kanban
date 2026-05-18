import { describe, expect, it } from 'vitest'
import type { BoardState, KanbanItem } from '../types/kanban'
import {
  applyDrag,
  createBoardWithItem,
  moveBetweenColumns,
  reorderWithinColumn,
  shouldCelebrateDoneMove,
} from './boardDrag'

const rick: KanbanItem = {
  id: 'a',
  title: 'Task A',
  character: { id: '1', name: 'Rick', image: 'https://example.com/rick.png' },
}

const morty: KanbanItem = {
  id: 'b',
  title: 'Task B',
  character: { id: '2', name: 'Morty', image: 'https://example.com/morty.png' },
}

const summer: KanbanItem = {
  id: 'c',
  title: 'Task C',
  character: { id: '3', name: 'Summer', image: 'https://example.com/summer.png' },
}

function board(items: Partial<BoardState>): BoardState {
  return {
    todo: items.todo ?? [],
    doing: items.doing ?? [],
    done: items.done ?? [],
  }
}

describe('shouldCelebrateDoneMove', () => {
  it('returns true when moving into Done', () => {
    expect(shouldCelebrateDoneMove('todo', 'done')).toBe(true)
    expect(shouldCelebrateDoneMove('doing', 'done')).toBe(true)
  })

  it('returns false when reordering inside Done', () => {
    expect(shouldCelebrateDoneMove('done', 'done')).toBe(false)
  })

  it('returns false when moving out of Done', () => {
    expect(shouldCelebrateDoneMove('done', 'todo')).toBe(false)
  })
})

describe('moveBetweenColumns', () => {
  it('moves an item to another column', () => {
    const initial = board({ todo: [rick], doing: [], done: [] })
    const next = moveBetweenColumns(initial, 'a', 'doing', 0)

    expect(next.todo).toHaveLength(0)
    expect(next.doing).toEqual([rick])
  })

  it('is a no-op when source and destination columns match', () => {
    const initial = board({ todo: [rick, morty] })
    const next = moveBetweenColumns(initial, 'a', 'todo', 1)
    expect(next).toEqual(initial)
  })
})

describe('reorderWithinColumn', () => {
  it('reorders items within the same column', () => {
    const initial = board({ todo: [rick, morty, summer] })
    const next = reorderWithinColumn(initial, 'todo', 0, 2)
    expect(next.todo.map((item) => item.id)).toEqual(['b', 'c', 'a'])
  })

  it('is a no-op when indexes match', () => {
    const initial = board({ todo: [rick, morty] })
    expect(reorderWithinColumn(initial, 'todo', 0, 0)).toEqual(initial)
  })
})

describe('applyDrag', () => {
  it('moves between columns via applyDrag', () => {
    const initial = board({ todo: [rick], doing: [morty], done: [] })
    const result = applyDrag(initial, 'a', 'b')

    expect(result.board.todo).toHaveLength(0)
    expect(result.board.doing.map((item) => item.id)).toEqual(['a', 'b'])
    expect(result.movedToDone).toBe(false)
  })

  it('reorders within a column', () => {
    const initial = board({ todo: [rick, morty] })
    const result = applyDrag(initial, 'a', 'b')

    expect(result.board.todo.map((item) => item.id)).toEqual(['b', 'a'])
    expect(result.movedToDone).toBe(false)
  })

  it('returns no-op when over is null', () => {
    const initial = createBoardWithItem(rick)
    const result = applyDrag(initial, 'a', null)
    expect(result.board).toEqual(initial)
    expect(result.movedToDone).toBe(false)
  })

  it('flags celebration when moving into Done', () => {
    const initial = board({ todo: [rick], done: [] })
    const result = applyDrag(initial, 'a', 'done')

    expect(result.board.done).toEqual([rick])
    expect(result.movedToDone).toBe(true)
  })

  it('does not celebrate when reordering inside Done', () => {
    const initial = board({ done: [rick, morty] })
    const result = applyDrag(initial, 'a', 'b')

    expect(result.board.done.map((item) => item.id)).toEqual(['b', 'a'])
    expect(result.movedToDone).toBe(false)
  })
})
