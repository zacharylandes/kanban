import { COLUMN_ORDER, type BoardState, type KanbanItem } from '../types/kanban'

export function findBoardItem(board: BoardState, itemId: string): KanbanItem | null {
  for (const columnId of COLUMN_ORDER) {
    const item = board[columnId].find((entry) => entry.id === itemId)
    if (item) {
      return item
    }
  }
  return null
}
