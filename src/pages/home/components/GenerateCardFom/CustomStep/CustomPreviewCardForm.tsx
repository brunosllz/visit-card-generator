import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'

import { CardPreview } from '@/components/CardPreview'
import { TextInput } from '@/components/TextInput'
import { ToggleGroupButton } from '@/components/ToggleGroupButton'

import { UploadSimple } from 'phosphor-react'

export function CustomPreviewCardForm() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext()

  const backgroundColor: string = watch('backgroundColor')
  const textColor: string = watch('textColor')
  const logoImage: string = watch('logoImage')
  let hasFileOnInput: boolean = false

  if (logoImage) {
    hasFileOnInput = logoImage.length > 0
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 relative ">
          Logo image
          <TextInput.Root
            className={clsx(
              'overflow-hidden relative rounded-md focus-within:ring-1 focus-within:ring-green-600',
              {
                'focus-within:ring-red-500': !!errors.logoImage,
              },
            )}
          >
            <TextInput.Input
              type="file"
              accept="image/*"
              className="opacity-0"
              {...register('logoImage')}
            />
            <div className="absolute bg-zinc-900 w-full h-full flex items-center justify-center gap-2 cursor-pointer">
              {hasFileOnInput ? (
                <>
                  <UploadSimple
                    size={20}
                    weight="bold"
                    className="text-green-600"
                  />
                  <span className="text-sm">Choice another image</span>
                </>
              ) : (
                <>
                  <UploadSimple size={20} weight="bold" />
                  <span className="text-sm">Choice our logo image</span>
                </>
              )}
            </div>
          </TextInput.Root>
          <TextInput.MessageError
            message={errors.logoImage?.message?.toString()}
          />
        </label>

        <label className="flex flex-col gap-2">
          Background color
          <div className="flex items-center hover:cursor-pointer bg-zinc-900 rounded-md focus-within:ring-1 focus-within:ring-green-600">
            <TextInput.Root className="flex">
              <TextInput.Input
                type="color"
                className="cursor-pointer focus-within:ring-transparent"
                {...register('backgroundColor')}
              />
            </TextInput.Root>
            <div className="min-w-[130px] flex justify-center">
              <span className="uppercase">{backgroundColor}</span>
            </div>
          </div>
        </label>

        <ToggleGroupButton control={control} {...register('textColor')} />
      </div>
      <CardPreview cardColor={backgroundColor} textColor={textColor} />
    </div>
  )
}
