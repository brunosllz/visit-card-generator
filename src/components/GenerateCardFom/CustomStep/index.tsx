import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'

import { ArrowRight } from 'phosphor-react'
import { CustomPreviewCardForm } from './CustomPreviewCardForm'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

interface CustomStepProps {
  navigateTo: (step: 'describeStep' | 'socialStep' | 'customStep') => void
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
          .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max image size is 400KB.`,
          )
          .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            'Only .jpg, .jpeg and .png formats are supported.',
          ),
  backgroundColor: z.string(),
  textColor: z.string(),
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

      const describeUserInfo = localStorage.getItem('@generateCard:register')
      if (!describeUserInfo) {
        return
      }

      const describeUserInfoParsed = JSON.parse(describeUserInfo)
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
      const uploadedImage: UploadedImage = await response.json()

      await api.post('/users/register', {
        ...describeUserInfoParsed,
        imageUrl: uploadedImage.url,
        cardBackgroundColor: backgroundColor,
        cardTextColor: textColor,
      })

      router.push(`/cards/${describeUserInfoParsed.username}`)
    } catch (error) {
      console.log(error)
      // TODO: implement a toast component for report the error
    }
  }

  function handleGoBack() {
    navigateTo('socialStep')
  }
  return (
    <div className="bg-zinc-800 max-w-[546px] w-full mx-auto p-9 rounded-md flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <strong className="font-bold text-2xl">
          Welcome to Generate Card!
        </strong>
        <span className="text-gray-200">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In unde quae
          nisi tempore labore earum.
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
  )
}
