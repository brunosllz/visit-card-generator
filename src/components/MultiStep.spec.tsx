import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { MultiStep } from './MultiStep'

describe('Multi step component', () => {
  it('Should be render correctly', () => {
    const CURRENT_STEP = 1
    const SIZE = 5

    render(<MultiStep currentStep={1} size={5} />)

    expect(screen.getByText(`${CURRENT_STEP} of ${SIZE}`)).toBeInTheDocument()
  })
})
