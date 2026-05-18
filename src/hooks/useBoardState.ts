import { useCallback, useState } from 'react'
import type { BoardState, ColumnId, KanbanItem } from '../types/kanban'
import { createEmptyBoard } from '../types/kanban'

export function useBoardState(initialState: BoardState = createEmptyBoard()) {
  const [board, setBoard] = useState<BoardState>(initialState)

  const addItem = useCallback((item: KanbanItem) => {
    setBoard((prev) => ({
      ...prev,
      todo: [...prev.todo, item],
    }))
  }, [])

  const setBoardState = useCallback((next: BoardState) => {
    setBoard(next)
  }, [])

  const itemCount = useCallback(
    (columnId: ColumnId) => board[columnId].length,
    [board],
  )

  return { board, addItem, setBoardState, itemCount }
}
