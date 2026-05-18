import { arrayMove } from '@dnd-kit/sortable'
import {
  COLUMN_ORDER,
  type BoardState,
  type ColumnId,
  type KanbanItem,
} from '../types/kanban'

export function shouldCelebrateDoneMove(from: ColumnId, to: ColumnId): boolean {
  return from !== 'done' && to === 'done'
}

export function getItemColumn(board: BoardState, itemId: string): ColumnId | null {
  for (const columnId of COLUMN_ORDER) {
    if (board[columnId].some((item) => item.id === itemId)) {
      return columnId
    }
  }
  return null
}

export function isColumnId(value: string): value is ColumnId {
  return COLUMN_ORDER.includes(value as ColumnId)
}

function cloneBoard(board: BoardState): BoardState {
  return {
    todo: [...board.todo],
    doing: [...board.doing],
    done: [...board.done],
  }
}

export function moveBetweenColumns(
  board: BoardState,
  itemId: string,
  toColumnId: ColumnId,
  toIndex: number,
): BoardState {
  const fromColumnId = getItemColumn(board, itemId)
  if (!fromColumnId) {
    return board
  }

  if (fromColumnId === toColumnId) {
    return board
  }

  const next = cloneBoard(board)
  const fromItems = next[fromColumnId]
  const itemIndex = fromItems.findIndex((item) => item.id === itemId)
  if (itemIndex === -1) {
    return board
  }

  const [item] = fromItems.splice(itemIndex, 1)
  const toItems = next[toColumnId]
  const safeIndex = Math.max(0, Math.min(toIndex, toItems.length))
  toItems.splice(safeIndex, 0, item)

  return next
}

export function reorderWithinColumn(
  board: BoardState,
  columnId: ColumnId,
  fromIndex: number,
  toIndex: number,
): BoardState {
  if (fromIndex === toIndex) {
    return board
  }

  const next = cloneBoard(board)
  next[columnId] = arrayMove(next[columnId], fromIndex, toIndex)
  return next
}

export type DragTarget =
  | { type: 'item'; columnId: ColumnId; itemId: string }
  | { type: 'column'; columnId: ColumnId }

export function resolveDragTarget(
  board: BoardState,
  overId: string,
): DragTarget | null {
  if (isColumnId(overId)) {
    return { type: 'column', columnId: overId }
  }

  const columnId = getItemColumn(board, overId)
  if (!columnId) {
    return null
  }

  return { type: 'item', columnId, itemId: overId }
}

export type DragApplyResult = {
  board: BoardState
  movedToDone: boolean
}

export function applyDrag(
  board: BoardState,
  activeId: string,
  overId: string | null,
): DragApplyResult {
  if (!overId || activeId === overId) {
    return { board, movedToDone: false }
  }

  const fromColumnId = getItemColumn(board, activeId)
  if (!fromColumnId) {
    return { board, movedToDone: false }
  }

  const target = resolveDragTarget(board, overId)
  if (!target) {
    return { board, movedToDone: false }
  }

  const toColumnId = target.columnId
  const fromIndex = board[fromColumnId].findIndex((item) => item.id === activeId)
  if (fromIndex === -1) {
    return { board, movedToDone: false }
  }

  if (fromColumnId === toColumnId) {
    if (target.type === 'column') {
      return { board, movedToDone: false }
    }

    const toIndex = board[toColumnId].findIndex((item) => item.id === target.itemId)
    if (toIndex === -1) {
      return { board, movedToDone: false }
    }

    return {
      board: reorderWithinColumn(board, fromColumnId, fromIndex, toIndex),
      movedToDone: false,
    }
  }

  const toIndex =
    target.type === 'column'
      ? board[toColumnId].length
      : board[toColumnId].findIndex((item) => item.id === target.itemId)

  if (toIndex === -1) {
    return { board, movedToDone: false }
  }

  const nextBoard = moveBetweenColumns(board, activeId, toColumnId, toIndex)

  return {
    board: nextBoard,
    movedToDone: shouldCelebrateDoneMove(fromColumnId, toColumnId),
  }
}

export function createBoardWithItem(
  item: KanbanItem,
  columnId: ColumnId = 'todo',
): BoardState {
  return {
    todo: columnId === 'todo' ? [item] : [],
    doing: columnId === 'doing' ? [item] : [],
    done: columnId === 'done' ? [item] : [],
  }
}
