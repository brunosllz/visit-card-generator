import { useForm } from 'react-hook-form'
import { invert } from 'polished'
import { z } from 'zod'

import { Button } from '../Button'
import { MultiStep } from '../MultiStep'
import { TextInput } from '../TextInput'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ArrowRight, UploadSimple } from 'phosphor-react'
import QrCodeImage from '../../assets/qr-code.svg'
import Image from 'next/image'

interface CustomStepProps {
  navigateTo: (step: 'describeStep' | 'socialStep' | 'customStep') => void
}

export function CustomStep({ navigateTo }: CustomStepProps) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      color: '#000000',
    },
  })

  function handleSubmitSocial(data: any) {
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
    navigateTo('socialStep')
  }

  const colorInput: string = watch('color')
  // console.log(invert(colorInput))

  console.log(colorInput)

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
                    {...register('color')}
                  />
                </TextInput.Root>
                <div className="min-w-[130px] flex justify-center">
                  <span className="uppercase">{colorInput}</span>
                </div>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              Text color
              <ToggleGroup.Root
                type="single"
                className="bg-zinc-900 flex items-center gap-1 rounded-md"
              >
                <ToggleGroup.Item
                  value="#000000"
                  className="p-2 w-full data-[state=on]:bg-zinc-500 rounded-md transition-colors"
                >
                  Black
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="#FFFFFF"
                  defaultChecked={true}
                  className="p-2 w-full  data-[state=on]:bg-zinc-500 rounded-md transition-colors"
                >
                  White
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </label>
          </div>
          <div
            className="flex flex-col items-center justify-between w-full h-[297px] p-6 rounded-md"
            style={{ backgroundColor: colorInput }}
          >
            <div className="flex flex-col gap-3 items-center">
              <div
                className="p-3 rounded-md"
                style={{ backgroundColor: invert(colorInput) }}
              >
                😊
              </div>
              <span className="text-lg">Your name</span>
            </div>

            <Image src={QrCodeImage} width={80} height={80} alt="qrcode" />
          </div>
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
