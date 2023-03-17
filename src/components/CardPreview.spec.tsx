import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CardPreview } from './CardPreview'

describe('Card preview component', () => {
  it('Should be render correctly', () => {
    render(<CardPreview cardColor="#000000" textColor="#FFFFFF" />)

    expect(screen.getByText('Your name')).toBeInTheDocument()
  })
})
