import { useRef } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import html2canvas from 'html2canvas'
import { useRouter } from 'next/router'
import { replaceSpaceToDash } from '@/utils/replace-space-to-dash'
import { findUserByUsername } from '@/lib/prisma/utils/find-user-by-username'
import { env } from '@/env'

import { NextSeo } from 'next-seo'
import { Button } from '@/components/Button'
import QRCode from 'react-qr-code'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { ArrowRight, Download } from 'phosphor-react'

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
  const router = useRouter()

  const cardRef = useRef<HTMLDivElement | null>(null)

  async function handleNavigateToUserPage() {
    await router.push(
      `${
        env.NODE_ENV === 'development'
          ? env.NEXT_PUBLIC_DEVELOPMENT_URL
          : env.NEXT_PUBLIC_PRODUCTION_URL
      }/${user.id}/${replaceSpaceToDash(user.name)}`,
    )
  }

  function handleDownloadCard() {
    if (!cardRef.current) {
      return
    }
    try {
      html2canvas(cardRef.current, {
        allowTaint: true,
        backgroundColor: BACKGROUND_COLOR,
        removeContainer: true,
      }).then((canvas) => {
        canvas.style.display = 'none'
        const image = canvas.toDataURL('png')
        const a = document.createElement('a')
        a.setAttribute('download', `${user.name}-card.png`)
        a.setAttribute('href', image)
        a.click()
      })
    } catch (_) {
      toast(
        'Ocorreu um problema ao fazer o download do cartão, tente novamente mais tarde!',
      )
    }
  }

  return (
    <>
      <NextSeo
        title={`${user.name} visit card | Visit Card Generator`}
        description={`Visit card of ${user.name}`}
      />

      <div className="bg-gradient-radial from-zinc-900/95 to-zinc-900 w-full h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-2 w-[400px]">
          <Button
            title="Download card"
            size="sm"
            onClick={handleDownloadCard}
            className="max-w-[200px]"
          >
            <Download weight="bold" size={18} />
          </Button>
          <Button
            title="Navigate to page"
            size="sm"
            variant="secondary"
            onClick={handleNavigateToUserPage}
            className="max-w-[200px]"
          >
            <ArrowRight weight="bold" size={18} />
          </Button>
        </div>

        <div
          className={`w-[400px] h-[600px] mx-auto rounded-md flex flex-col overflow-hidden shadow-lg shadow-black/40`}
          style={{ backgroundColor: BACKGROUND_COLOR }}
        >
          <div
            ref={cardRef}
            className="flex flex-col w-full h-full p-11 gap-6 justify-between items-center"
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
              href={`${
                env.NODE_ENV === 'development'
                  ? env.NEXT_PUBLIC_DEVELOPMENT_URL
                  : env.NEXT_PUBLIC_PRODUCTION_URL
              }/${user.id}/${replaceSpaceToDash(user.name)}`}
              className="w-[180px] h-[180px] bg-white p-2 rounded-md"
            >
              <QRCode
                value={`${
                  env.NODE_ENV === 'development'
                    ? env.NEXT_PUBLIC_DEVELOPMENT_URL
                    : env.NEXT_PUBLIC_PRODUCTION_URL
                }/${user.id}/${replaceSpaceToDash(user.name)}`}
                className="w-full h-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
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

  const foundUser = await findUserByUsername(username)

  if (!foundUser) {
    return {
      notFound: true,
    }
  }

  const user = {
    ...foundUser,
    created_at: new Date(foundUser.created_at).toISOString(),
  }

  return {
    props: { user },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
