import { useFormContext } from 'react-hook-form'

import { CardPreview } from '@/components/CardPreview'
import { TextInput } from '@/components/TextInput'
import { ToggleGroupButton } from '@/components/ToggleGroupButton'

import { UploadSimple } from 'phosphor-react'

export function CustomPreviewCardForm() {
  const { register, watch, control } = useFormContext()

  const cardColor: string = watch('cardColor')
  const textColor: string = watch('textColor')

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 relative">
          Logo image
          <TextInput.Root>
            <TextInput.Input
              type="file"
              accept="image/*"
              className="opacity-0"
              {...register('logoImage')}
            />
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
  )
}
