import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { ColumnId, KanbanItem } from '../types/kanban'
import { KanbanColumn } from './KanbanColumn'
import { SortableKanbanCard } from './SortableKanbanCard'

type DroppableKanbanColumnProps = {
  columnId: ColumnId
  items: KanbanItem[]
}

export function DroppableKanbanColumn({ columnId, items }: DroppableKanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })

  const content =
    items.length === 0 ? null : (
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableKanbanCard key={item.id} item={item} columnId={columnId} />
          ))}
        </div>
      </SortableContext>
    )

  return (
    <div
      ref={setNodeRef}
      className={isOver ? 'rounded-xl ring-2 ring-[var(--color-accent)]/30' : undefined}
    >
      <KanbanColumn columnId={columnId} items={items}>
        {content}
      </KanbanColumn>
    </div>
  )
}
