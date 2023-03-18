import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { TextareaControl } from './TextareaControl'

describe('Textarea component', () => {
  it('Should be render correctly', () => {
    const RenderDemo = () => {
      const { control } = useForm<{
        textareaExample: string
      }>()

      return (
        <TextareaControl control={control as any} name="textarea-example" />
      )
    }

    render(<RenderDemo />)

    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
