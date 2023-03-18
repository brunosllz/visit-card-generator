import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserPage, { getStaticProps } from '@/pages/[id]/[name]/index.page'
import { User } from '@prisma/client'

vi.mock('next/router', () => require('next-router-mock'))
describe('User page', () => {
  let user: User

  beforeEach(async () => {
    user = {
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
      created_at: new Date(),
    }
  })

  it('Should be render correctly', () => {
    render(<UserPage user={user} />)

    expect(screen.getByText(`${user.name}`)).toBeInTheDocument()
  })

  it('Should be not return a initial props if user not exists', async () => {
    const response = await getStaticProps({
      params: { username: user.username },
    })

    expect(response).toEqual(expect.objectContaining({ notFound: true }))
  })
})
