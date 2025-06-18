import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import WelcomeCarousel from './WelcomeCarousel'

// jsdom lacks canvas implementation used by axe
// eslint-disable-next-line @typescript-eslint/no-empty-function
HTMLCanvasElement.prototype.getContext = () => null

describe('WelcomeCarousel accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <WelcomeCarousel />
      </MemoryRouter>,
    )
    const results = await axe(container)
    // axe includes a timestamp that changes each run
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (results as any).timestamp
    expect(results).toMatchSnapshot()
  })
})
