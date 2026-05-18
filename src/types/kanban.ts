export type ColumnId = 'todo' | 'doing' | 'done'

export type Character = {
  id: string
  name: string
  image: string
  species?: string
  status?: string
}

export type KanbanItem = {
  id: string
  title: string
  description?: string
  character: Character
}

export type BoardState = Record<ColumnId, KanbanItem[]>

export const COLUMN_ORDER: ColumnId[] = ['todo', 'doing', 'done']

export const COLUMN_LABELS: Record<ColumnId, string> = {
  todo: 'To Do',
  doing: 'Doing',
  done: 'Done',
}

export function createEmptyBoard(): BoardState {
  return { todo: [], doing: [], done: [] }
}
