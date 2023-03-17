import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'
import { CustomPreviewCardForm } from './CustomPreviewCardForm'
import { toast } from 'react-toastify'

import { ArrowRight } from 'phosphor-react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

interface CustomStepProps {
  navigateTo: (step: 'describeStep' | 'contactsStep' | 'customStep') => void
}

interface UploadedImage {
  url: string
}

const MAX_FILE_SIZE = 400000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const customStepSchema = z.object({
  logoImage:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .nullable()
          .superRefine((files, ctx) => {
            if (files) {
              const hasFile = files?.length > 0

              if (!hasFile) {
                return null
              }

              const isValidSize = files?.[0]?.size <= MAX_FILE_SIZE
              const isValidFormat = ACCEPTED_IMAGE_TYPES.includes(
                files?.[0]?.type,
              )

              if (!isValidSize) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Max image size is 400KB.',
                  fatal: true,
                })
              }

              if (!isValidFormat) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Only .jpg, .jpeg and .png formats are supported.',
                  fatal: true,
                })
              }
            }
          }),
  backgroundColor: z
    .string()
    .transform((backgroundColor) => backgroundColor.toUpperCase()),
  textColor: z
    .string()
    .transform((textColor) => textColor.toUpperCase())
    .refine((description) => description.trim().length > 0, {
      message: 'You need to provide the text color.',
    }),
})

export type CustomStepInput = z.infer<typeof customStepSchema>

export function CustomStep({ navigateTo }: CustomStepProps) {
  const customStepForm = useForm<CustomStepInput>({
    resolver: zodResolver(customStepSchema),
    defaultValues: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = customStepForm
  const router = useRouter()

  async function handleSubmitSocial(data: CustomStepInput) {
    try {
      const { backgroundColor, textColor, logoImage } = data

      const describeUserInfo = sessionStorage.getItem('@generateCard:register')
      if (!describeUserInfo) {
        return
      }

      const hasImageFile = logoImage.length > 0
      const describeUserInfoParsed = JSON.parse(describeUserInfo)
      let uploadedImage: UploadedImage | null = null

      if (hasImageFile) {
        const formData = new FormData()
        formData.append('file', logoImage?.[0])
        formData.append('upload_preset', 'card-qrcode')

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dhexs29hy/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        )

        uploadedImage = await response.json()
      }

      await api.post('/users/register', {
        ...describeUserInfoParsed,
        imageUrl: uploadedImage ? uploadedImage.url : null,
        cardBackgroundColor: backgroundColor,
        cardTextColor: textColor,
      })

      sessionStorage.removeItem('@generateCard:register')
      await router.push(`/cards/${describeUserInfoParsed.username}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return toast('We had a problem proceeding, try again later!', {
            type: 'error',
          })
        }

        if (error.response?.status === 409) {
          toast('Username already registered.', {
            type: 'error',
          })
        }
      }

      toast('We have a problem, check your internet connection.', {
        type: 'error',
      })
    }
  }

  function handleGoBack() {
    navigateTo('contactsStep')
  }

  return (
    <>
      <NextSeo
        title="Custom visit card | Visit Card Generator"
        description="Customize your card, make it your own."
      />

      <div className="bg-zinc-800 max-w-[546px] w-full mx-auto p-9 rounded-md flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <strong className="font-bold text-2xl">Almost there</strong>
          <span className="text-gray-200">
            Customize your card, make it your own.
          </span>
        </div>

        <MultiStep currentStep={3} size={3} />

        <FormProvider {...customStepForm}>
          <form
            onSubmit={handleSubmit(handleSubmitSocial)}
            className="flex flex-col gap-4"
          >
            <CustomPreviewCardForm />

            <div className="flex gap-2">
              <Button
                title="Back"
                type="button"
                variant="secondary"
                onClick={handleGoBack}
              />

              <Button
                title="Next"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <ArrowRight weight="bold" />
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
