import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useCheckInStore } from '../contexts/useCheckInStore'
import { useMoodStore } from '../contexts/useMoodStore'
import MoodEntry from './MoodEntry'

// eslint-disable-next-line @typescript-eslint/no-empty-function
HTMLCanvasElement.prototype.getContext = () => null

// initialize stores for rendering
beforeEach(() => {
  useCheckInStore.setState({ lastPrompt: 0, reminderTime: '09:00' })
  useMoodStore.setState({
    addEntry: () => Promise.resolve(),
    getEntries: () => [],
    getStreak: () => 0,
  } as any)
})

describe('MoodEntry accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <MoodEntry />
      </MemoryRouter>,
    )
    const results = await axe(container)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (results as any).timestamp
    expect(results).toMatchSnapshot()
  })
})
