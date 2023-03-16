import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'

import QRCode from 'react-qr-code'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  user: {
    id: string
    name: string
    email: string
    username: string
    linkedin: string
    github: string
    image_url: string | null
    description: string
    card_background_color: string
    card_text_color: string
  }
}

export default function Card({ user }: CardProps) {
  const BACKGROUND_COLOR = user.card_background_color
  const TEXT_COLOR = user.card_text_color

  return (
    <div className="bg-gradient-radial from-zinc-900/95 to-zinc-900 w-full h-screen flex justify-center items-center">
      <div
        className={`w-[400px] h-[600px] justify-between items-center mx-auto p-11 rounded-md flex flex-col gap-6 shadow-lg shadow-black/40`}
        style={{ backgroundColor: BACKGROUND_COLOR }}
      >
        <div className="flex flex-col gap-6 items-center">
          {user.image_url && (
            <Image
              className="rounded-md"
              src={user.image_url}
              alt={user.username}
              width={90}
              height={90}
              quality={100}
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/dhexs29hy/image/upload/v1678970237/image_4_rv8dpo.png"
            />
          )}

          <span
            className="text-2xl capitalize font-medium"
            style={{ color: TEXT_COLOR }}
          >
            {user.name}
          </span>
        </div>

        <Link
          target="_blank"
          href={`http://localhost:3000/${user.id}/${user.name.replace(
            /\s/g,
            '-',
          )}`}
          className="w-[180px] h-[180px] bg-white p-2 rounded-md"
        >
          <QRCode
            value={`http://localhost:3000/${user.id}/${user.name.replace(
              /\s/g,
              '-',
            )}`}
            className="w-full h-full"
          />
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      github: true,
      linkedin: true,
      description: true,
      image_url: true,
      card_background_color: true,
      card_text_color: true,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: { user },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
