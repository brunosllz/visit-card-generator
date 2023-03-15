import { useForm } from 'react-hook-form'

import { Button } from '../Button'
import { MultiStep } from '../MultiStep'
import { TextInput } from '../TextInput'

import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

const socialStepSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.trim().length > 0, {
      message: 'Você deve informar o email.',
    }),
  github: z.string().refine((github) => github.trim().length > 0, {
    message: 'Você deve informar o nome completo.',
  }),
  linkedin: z.string().refine((linkedin) => linkedin.trim().length > 0, {
    message: 'Você deve informar a descrição.',
  }),
})

type SocialStepInput = z.infer<typeof socialStepSchema>

interface SocialStepProps {
  navigateTo: (step: 'describeStep' | 'socialStep' | 'customStep') => void
}

export function SocialStep({ navigateTo }: SocialStepProps) {
  const { register, handleSubmit } = useForm<SocialStepInput>({})

  function handleSubmitSocial(data: SocialStepInput) {
    const describeInfo = localStorage.getItem('@generateCard:register')

    const { email, github, linkedin } = data

    if (describeInfo) {
      const describeInfoParse: {
        username: string
        name: string
        description: string
      } = JSON.parse(describeInfo)

      const card = {
        email,
        github,
        linkedin,
        ...describeInfoParse,
      }

      localStorage.setItem('@generateCard:register', JSON.stringify(card))

      navigateTo('customStep')
    }
  }

  function handleGoBack() {
    navigateTo('describeStep')
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSocial)}
      className="bg-zinc-800 max-w-[546px] w-full mx-auto p-9 rounded-md flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <strong className="font-bold text-2xl">
          Welcome to Generate Card!
        </strong>
        <span className="text-gray-200">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In unde quae
          nisi tempore labore earum.
        </span>
      </div>

      <MultiStep currentStep={2} size={3} />
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Email
          <TextInput.Root>
            <TextInput.Input
              placeholder="johndoe@email.com"
              {...register('email')}
            />
          </TextInput.Root>
        </label>

        <label className="flex flex-col gap-2">
          Github
          <TextInput.Root>
            <TextInput.Input placeholder="your-user" {...register('github')}>
              <TextInput.Prefix prefix="https://github.com/" />
            </TextInput.Input>
          </TextInput.Root>
        </label>

        <label className="flex flex-col gap-2">
          Linkedin
          <TextInput.Root>
            <TextInput.Input placeholder="your-user" {...register('linkedin')}>
              <TextInput.Prefix prefix="https://www.linkedin.com/in/" />
            </TextInput.Input>
          </TextInput.Root>
        </label>

        <div className="flex gap-2">
          <Button
            title="Back"
            type="button"
            variant="secondary"
            onClick={handleGoBack}
          />

          <Button title="Next" type="submit">
            <ArrowRight weight="bold" />
          </Button>
        </div>
      </div>
    </form>
  )
}
