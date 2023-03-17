import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/pages/home'

describe('Home page', () => {
  it('Should be render correctly', () => {
    render(<Home />)

    expect(
      screen.getByText('Welcome to Visit Card Generator!'),
    ).toBeInTheDocument()
  })
})
