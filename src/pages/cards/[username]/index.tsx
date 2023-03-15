import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import QRCode from 'react-qr-code'

interface CardProps {
  user: {
    id: string
    name: string
    email: string
    username: string
    linkedin: string
    github: string
    image_url: string
    description: string
  }
}

export default function Card({ user }: CardProps) {
  return (
    <div className="bg-gradient-radial from-zinc-900/95 to-zinc-900 w-full h-screen flex justify-center items-center">
      <div
        className={`bg-gradient-radial w-[400px] h-[600px] bg-black justify-between items-center mx-auto p-10 rounded-md flex flex-col gap-6 shadow-lg shadow-black/40`}
      >
        <div className="flex flex-col gap-6 items-center">
          <Image
            src={user.image_url}
            alt={user.username}
            width={90}
            height={90}
          />

          <span className="text-2xl capitalize">{user.name}</span>
        </div>

        <div className="w-[180px] h-[180px] bg-white p-2 rounded-md">
          <QRCode
            value={`localhost:3000/${user.id}/${user.name.replace(' ', '-')}`}
            className="w-full h-full"
          />
        </div>
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
