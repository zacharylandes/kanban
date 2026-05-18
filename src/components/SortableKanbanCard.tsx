import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ColumnId, KanbanItem } from '../types/kanban'
import { KanbanCard } from './KanbanCard'

type SortableKanbanCardProps = {
  item: KanbanItem
  columnId: ColumnId
}

export function SortableKanbanCard({ item, columnId }: SortableKanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      data: { columnId, item },
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`touch-none ${isDragging ? 'z-10 cursor-grabbing' : 'cursor-grab'}`}
      {...attributes}
      {...listeners}
    >
      <KanbanCard item={item} />
    </div>
  )
}
