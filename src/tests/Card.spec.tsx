import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '@/pages/cards/[username]/index.page'

vi.mock('next/router', () => require('next-router-mock'))

describe('Card page', () => {
  it('Should be render correctly', () => {
    const user = {
      id: 'fake-user-id',
      name: 'john doe',
      email: 'johndoe@email.com',
      username: 'john-doe',
      linkedin: 'john-doe',
      github: 'john-doe',
      image_url: 'http://www.fake-cdn.com/image.png',
      description: 'fake description',
      card_background_color: '#000000',
      card_text_color: '#FFFFFF',
    }

    render(<Card user={user} />)

    expect(screen.getByText(`${user.name}`)).toBeInTheDocument()
  })
})
