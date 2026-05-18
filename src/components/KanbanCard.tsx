import type { KanbanItem } from '../types/kanban'

type KanbanCardProps = {
  item: KanbanItem
}

export function KanbanCard({ item }: KanbanCardProps) {
  return (
    <article
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5 shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(15,15,15,0.06)]"
      data-testid={`card-${item.id}`}
    >
      <h3 className="text-sm font-semibold leading-snug text-[var(--color-ink)]">{item.title}</h3>
      {item.description ? (
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
          {item.description}
        </p>
      ) : null}
      <div className="mt-3 flex items-center gap-2.5 border-t border-[var(--color-border)] pt-3">
        <img
          src={item.character.image}
          alt={item.character.name}
          className="h-9 w-9 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] object-cover"
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
