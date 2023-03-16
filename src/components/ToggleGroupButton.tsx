import { Control, FieldValues, Path, useController } from 'react-hook-form'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { forwardRef, Ref } from 'react'

interface ToggleGroupButtonProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
}

export const ToggleGroupButton = forwardRef<
  HTMLDivElement,
  ToggleGroupButtonProps
>(
  <T extends FieldValues = FieldValues>(
    { control, name }: ToggleGroupButtonProps<T>,
    ref: Ref<HTMLDivElement> | undefined,
  ) => {
    const {
      fieldState: { error },
      field: { value, onChange },
    } = useController({ name, control })

    return (
      <div className="flex flex-col gap-1" ref={ref}>
        <label htmlFor={name} className="flex flex-col gap-2">
          Text color
          <ToggleGroup.Root
            id={name}
            type="single"
            className="flex flex-col items-center gap-1 rounded-md overflow-hidden"
            defaultValue="#FFFFFF"
            value={value}
            onValueChange={onChange}
          >
            <div className="flex w-full">
              <ToggleGroup.Item
                value="#000000"
                className="p-2 w-full data-[state=on]:bg-zinc-500  transition-colors bg-zinc-900"
              >
                Black
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="#FFFFFF"
                defaultChecked={true}
                className="p-2 w-full  data-[state=on]:bg-zinc-500  transition-colors bg-zinc-900"
              >
                White
              </ToggleGroup.Item>
            </div>
          </ToggleGroup.Root>
        </label>

        {!!error && (
          <span className="text-red-500 text-xs">{error.message}</span>
        )}
      </div>
    )
  },
)

ToggleGroupButton.displayName = 'ToggleGroupButton'
