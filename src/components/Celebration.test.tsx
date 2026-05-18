import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { shouldCelebrateDoneMove } from '../utils/boardDrag'
import { Celebration } from './Celebration'

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}))

import confetti from 'canvas-confetti'

describe('shouldCelebrateDoneMove', () => {
  it('only celebrates entering Done from another column', () => {
    expect(shouldCelebrateDoneMove('todo', 'done')).toBe(true)
    expect(shouldCelebrateDoneMove('done', 'done')).toBe(false)
    expect(shouldCelebrateDoneMove('done', 'todo')).toBe(false)
  })
})

describe('Celebration', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('does not fire confetti on initial render', () => {
    render(<Celebration trigger={0} />)
    expect(confetti).not.toHaveBeenCalled()
  })

  it('fires confetti when trigger increments', () => {
    const { rerender } = render(<Celebration trigger={0} />)
    rerender(<Celebration trigger={1} />)
    expect(confetti).toHaveBeenCalledTimes(1)
  })

  it('does not repeat for the same trigger value', () => {
    const { rerender } = render(<Celebration trigger={1} />)
    rerender(<Celebration trigger={1} />)
    expect(confetti).toHaveBeenCalledTimes(1)
  })
})
