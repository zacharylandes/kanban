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
      className="flex min-h-[320px] flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)]/80 p-3.5 shadow-[0_1px_2px_rgba(15,15,15,0.04)] backdrop-blur-sm"
      data-testid={`column-${columnId}`}
      aria-label={label}
    >
      <header className="mb-3 flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <h2 className="text-sm font-semibold tracking-tight text-[var(--color-ink)]">{label}</h2>
        <span
          className="rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-xs font-medium text-[var(--color-muted)]"
          data-testid={`count-${columnId}`}
        >
          {items.length}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-2.5">
        {items.length === 0 ? (
          <p
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50 px-3 py-10 text-center text-sm text-[var(--color-muted)]"
            data-testid={`empty-${columnId}`}
          >
            Drop tasks here
          </p>
        ) : (
          children ?? items.map((item) => <KanbanCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}
