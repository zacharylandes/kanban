import type { ReactNode } from 'react'
import { COLUMN_ORDER, type BoardState, type ColumnId } from '../types/kanban'
import { KanbanColumn } from './KanbanColumn'

type KanbanBoardProps = {
  board: BoardState
  columnContent?: Partial<Record<ColumnId, ReactNode>>
}

export function KanbanBoard({ board, columnContent }: KanbanBoardProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
      data-testid="kanban-board"
    >
      {COLUMN_ORDER.map((columnId) => (
        <KanbanColumn key={columnId} columnId={columnId} items={board[columnId]}>
          {columnContent?.[columnId]}
        </KanbanColumn>
      ))}
    </div>
  )
}
