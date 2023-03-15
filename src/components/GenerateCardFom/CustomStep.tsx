import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../Button'
import { MultiStep } from '../MultiStep'
import { TextInput } from '../TextInput'
import { ToggleGroupButton } from '../ToggleGroupButton'
import { CardPreview } from '../CardPreview'

import { ArrowRight, UploadSimple } from 'phosphor-react'

interface CustomStepProps {
  navigateTo: (step: 'describeStep' | 'socialStep' | 'customStep') => void
}

const customStepSchema = z.object({
  cardColor: z.string(),
  textColor: z.string(),
})

type CustomStepInput = z.infer<typeof customStepSchema>

export function CustomStep({ navigateTo }: CustomStepProps) {
  const { register, handleSubmit, watch, control } = useForm<CustomStepInput>({
    resolver: zodResolver(customStepSchema),
    defaultValues: {
      cardColor: '#000000',
    },
  })

  function handleSubmitSocial(data: CustomStepInput) {
    const describeInfo = localStorage.getItem('@generateCard:register')
  }

  function handleGoBack() {
    navigateTo('socialStep')
  }

  const cardColor: string = watch('cardColor')
  const textColor: string = watch('textColor')

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

      <MultiStep currentStep={3} size={3} />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 relative">
              Logo image
              <TextInput.Root>
                <TextInput.Input type="file" className="opacity-0" />
              </TextInput.Root>
              <div className="absolute flex items-center gap-2 bottom-3 left-5 cursor-pointer">
                <UploadSimple size={20} weight="bold" />
                <span>Choice our logo image</span>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              Background color
              <div className="flex items-center bg-zinc-900 rounded-md">
                <TextInput.Root className="flex">
                  <TextInput.Input
                    type="color"
                    className="cursor-pointer focus:outline-none bg-transparent"
                    {...register('cardColor')}
                  />
                </TextInput.Root>
                <div className="min-w-[130px] flex justify-center">
                  <span className="uppercase">{cardColor}</span>
                </div>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              Text color
              <ToggleGroupButton control={control} {...register('textColor')} />
            </label>
          </div>
          <CardPreview cardColor={cardColor} textColor={textColor} />
        </div>

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
