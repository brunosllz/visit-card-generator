import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { TextInput } from '@/components/TextInput'
import { MultiStep } from '@/components/MultiStep'
import { Button } from '@/components/Button'

import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

interface DescribeStepProps {
  navigateTo: (step: 'describeStep' | 'contactsStep' | 'customStep') => void
}

const describeStepSchema = z.object({
  username: z
    .string({
      required_error: 'You need to provide the username.',
    })
    .regex(/^([a-z\d\-]+)$/i, {
      message:
        "The username must contain only letters and numbers and separated by '-'.",
    })
    .refine((username) => username.trim().length > 0, {
      message: 'You need to provide the username.',
    }),
  name: z
    .string({
      required_error: 'You need to provide your full name.',
    })
    .refine((fullName) => fullName.trim().length > 0, {
      message: 'You need to provide your full name.',
    })
    .transform((name) => name.toLowerCase().replace(/\//g, '')),
  description: z
    .string({
      required_error: 'You need to provide the description.',
    })
    .refine((description) => description.trim().length > 0, {
      message: 'You need to provide the description.',
    }),
})

type DescribeStepInput = z.infer<typeof describeStepSchema>

export function DescribeStep({ navigateTo }: DescribeStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<DescribeStepInput>({
    resolver: zodResolver(describeStepSchema),
  })

  async function handleSubmitDescribe(data: DescribeStepInput) {
    try {
      await api.get(`/users/${data.username}`)

      const describeInfo = JSON.stringify(data)
      sessionStorage.setItem('@generateCard:register', describeInfo)

      navigateTo('contactsStep')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return toast('We had a problem proceeding, try again later!', {
            type: 'error',
          })
        }

        toast('Username already registered.', {
          type: 'error',
        })
        setFocus('username')
      }
    }
  }

  useEffect(() => {
    const hasDescribeInfo = sessionStorage.getItem('@generateCard:register')

    if (hasDescribeInfo) {
      const DescribeInfoParsed = JSON.parse(hasDescribeInfo)

      setValue('username', DescribeInfoParsed.username)
      setValue('name', DescribeInfoParsed.name)
      setValue('description', DescribeInfoParsed.description)
    }
  }, [setValue])

  return (
    <>
      <NextSeo
        title="Home | Visit Card Generator"
        description="Welcome to Visit Card Generator!"
      />

      <form
        onSubmit={handleSubmit(handleSubmitDescribe)}
        className="bg-zinc-800 max-w-[546px] w-full mx-auto p-9 rounded-md flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <strong className="font-bold text-2xl">
            Welcome to Visit Card Generator!
          </strong>
          <span className="text-gray-200">
            We need some information to create your visit card.
          </span>
        </div>

        <MultiStep currentStep={1} size={3} />
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            Username
            <TextInput.Root>
              <TextInput.Input
                placeholder="john-doe"
                hasError={!!errors.username}
                {...register('username')}
              />
              <TextInput.MessageError message={errors.username?.message} />
            </TextInput.Root>
          </label>

          <label className="flex flex-col gap-2">
            Full name
            <TextInput.Root>
              <TextInput.Input
                placeholder="John Doe"
                hasError={!!errors.name}
                {...register('name')}
              />
              <TextInput.MessageError message={errors.name?.message} />
            </TextInput.Root>
          </label>

          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-2">
              Description
              <textarea
                placeholder="Description example"
                className="bg-zinc-900 w-full min-h-[108px] max-h-[200px] px-4 py-3 outline-none resize-y rounded-md placeholder:text-zinc-500  focus:ring-1 focus:ring-green-600 focus:ring-offset-1 focus:ring-offset-zinc-800"
                {...register('description')}
              />
            </label>

            <span className="text-red-500 text-xs">
              {errors.description?.message}
            </span>
          </div>

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
    </>
  )
}
