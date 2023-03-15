import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'

import { ArrowRight } from 'phosphor-react'
import { CustomPreviewCardForm } from './CustomPreviewCardForm'

interface CustomStepProps {
  navigateTo: (step: 'describeStep' | 'socialStep' | 'customStep') => void
}

const customStepSchema = z.object({
  cardColor: z.string(),
  textColor: z.string(),
})

export type CustomStepInput = z.infer<typeof customStepSchema>

export function CustomStep({ navigateTo }: CustomStepProps) {
  const customStepForm = useForm<CustomStepInput>({
    resolver: zodResolver(customStepSchema),
    defaultValues: {
      cardColor: '#000000',
      textColor: '#FFFFFF',
    },
  })

  const { handleSubmit } = customStepForm

  function handleSubmitSocial(data: any) {
    console.log(data)
    // const describeInfo = localStorage.getItem('@generateCard:register')
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

            <Button title="Next" type="submit">
              <ArrowRight weight="bold" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
