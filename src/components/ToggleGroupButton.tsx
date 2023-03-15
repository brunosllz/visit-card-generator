import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ToggleGroupButtonProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
}

export function ToggleGroupButton<T extends FieldValues = FieldValues>({
  control,
  name,
}: ToggleGroupButtonProps<T>) {
  const {
    field: { value, onChange, ref },
  } = useController({ name, control })

  return (
    <ToggleGroup.Root
      type="single"
      className="bg-zinc-900 flex items-center gap-1 rounded-md"
      defaultValue="#FFFFFF"
      value={value}
      onValueChange={onChange}
      ref={ref}
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
  )
}
