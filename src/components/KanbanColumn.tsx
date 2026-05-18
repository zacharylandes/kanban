import type { ReactNode } from 'react'
import type { ColumnId, KanbanItem } from '../types/kanban'
import { COLUMN_LABELS } from '../types/kanban'
import { KanbanCard } from './KanbanCard'

type KanbanColumnProps = {
  columnId: ColumnId
  items: KanbanItem[]
  children?: ReactNode
}

export function KanbanColumn({ columnId, items, children }: KanbanColumnProps) {
  const label = COLUMN_LABELS[columnId]

  return (
    <section
      className="flex min-h-[280px] flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/60 p-3 shadow-sm"
      data-testid={`column-${columnId}`}
      aria-label={label}
    >
      <header className="mb-3 flex items-center justify-between gap-2 px-1">
        <h2 className="text-sm font-semibold text-[var(--color-ink)]">{label}</h2>
        <span
          className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-muted)]"
          data-testid={`count-${columnId}`}
        >
          {items.length}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-2">
        {items.length === 0 ? (
          <p
            className="rounded-lg border border-dashed border-[var(--color-border)] px-3 py-8 text-center text-sm text-[var(--color-muted)]"
            data-testid={`empty-${columnId}`}
          >
            No tasks yet
          </p>
        ) : (
          children ?? items.map((item) => <KanbanCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}
