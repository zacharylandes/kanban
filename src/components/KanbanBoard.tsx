import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'
import { COLUMN_ORDER, type BoardState } from '../types/kanban'
import { applyDrag } from '../utils/boardDrag'
import { findBoardItem } from '../utils/boardItems'
import { DroppableKanbanColumn } from './DroppableKanbanColumn'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'

type KanbanBoardProps = {
  board: BoardState
  onBoardChange?: (board: BoardState) => void
  onMovedToDone?: () => void
}

export function KanbanBoard({ board, onBoardChange, onMovedToDone }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const isDraggable = Boolean(onBoardChange)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    if (!onBoardChange) {
      return
    }

    const { active, over } = event
    if (!over) {
      return
    }

    const result = applyDrag(board, String(active.id), String(over.id))
    onBoardChange(result.board)
    if (result.movedToDone) {
      onMovedToDone?.()
    }
  }

  const activeItem = activeId ? findBoardItem(board, activeId) : null

  const columns = COLUMN_ORDER.map((columnId) =>
    isDraggable ? (
      <DroppableKanbanColumn key={columnId} columnId={columnId} items={board[columnId]} />
    ) : (
      <KanbanColumn key={columnId} columnId={columnId} items={board[columnId]} />
    ),
  )

  const grid = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-testid="kanban-board">
      {columns}
    </div>
  )

  if (!isDraggable) {
    return grid
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {grid}
      <DragOverlay>{activeItem ? <KanbanCard item={activeItem} /> : null}</DragOverlay>
    </DndContext>
  )
}
