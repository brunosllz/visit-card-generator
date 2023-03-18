import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserPage from '@/pages/[id]/[name]/index.page'

vi.mock('next/router', () => require('next-router-mock'))
describe('User page', () => {
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

    render(<UserPage user={user} />)

    expect(screen.getByText(`${user.name}`)).toBeInTheDocument()
  })
})
