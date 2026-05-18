import type { KanbanItem } from '../types/kanban'

type KanbanCardProps = {
  item: KanbanItem
}

export function KanbanCard({ item }: KanbanCardProps) {
  return (
    <article
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3 shadow-sm"
      data-testid={`card-${item.id}`}
    >
      <h3 className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</h3>
      {item.description ? (
        <p className="mt-1 text-sm text-[var(--color-muted)]">{item.description}</p>
      ) : null}
      <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-border)] pt-3">
        <img
          src={item.character.image}
          alt=""
          className="h-8 w-8 rounded-full border border-[var(--color-border)] object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-[var(--color-ink)]">
            {item.character.name}
          </p>
          {item.character.species ? (
            <p className="truncate text-xs text-[var(--color-muted)]">
              {item.character.species}
              {item.character.status ? ` · ${item.character.status}` : ''}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
