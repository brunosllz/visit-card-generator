import { describe, it, expect, vitest } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button component', () => {
  it('Should be render correctly', () => {
    render(<Button title="example button title" />)

    expect(screen.getByText('example button title')).toBeInTheDocument()
  })

  it('Should be called when the button is clicked', () => {
    const handleMockedFn = vitest.fn()

    render(<Button title="example button title" onClick={handleMockedFn} />)

    const button = screen.getByText('example button title')

    fireEvent.click(button)

    expect(handleMockedFn).toBeCalled()
  })
})
