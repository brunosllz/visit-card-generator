import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { TextInput } from './TextInput'

describe('Text input component', () => {
  it('Should be render correctly', () => {
    render(
      <TextInput.Root>
        <TextInput.Input placeholder="TextInput placeholder example" />
      </TextInput.Root>,
    )

    expect(
      screen.getByPlaceholderText('TextInput placeholder example'),
    ).toBeInTheDocument()
  })

  it('Should be show a message error', () => {
    const error = { message: 'example message error' }

    render(
      <TextInput.Root>
        <TextInput.Input
          placeholder="TextInput placeholder example"
          hasError={!!error}
        />
        <TextInput.MessageError message={error.message} />
      </TextInput.Root>,
    )

    expect(
      screen.getByPlaceholderText('TextInput placeholder example'),
    ).toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
  })
})
