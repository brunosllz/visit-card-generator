import { Control, FieldValues, Path, useController } from 'react-hook-form'
import clsx from 'clsx'

interface TextareaProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
}

export function Textarea<T extends FieldValues = FieldValues>({
  control,
  name,
}: TextareaProps<T>) {
  const {
    fieldState: { error },
    field: { value, onChange },
  } = useController({ name, control })

  const MAX_LENGTH = 277

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="flex flex-col gap-2">
        Description
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Description example"
          className={clsx(
            'bg-zinc-900 w-full min-h-[108px] max-h-[200px] px-4 py-3 outline-none resize-y rounded-md placeholder:text-zinc-500 focus:ring-1',
            {
              'focus:ring-green-600': !error?.message,
              'focus:ring-red-500': error?.message,
            },
          )}
        />
      </label>
      <span className="text-sm self-end">
        <span
          className={clsx({
            'text-red-500': String(value).length > MAX_LENGTH,
          })}
        >
          {value === undefined ? 0 : String(value).length}
        </span>{' '}
        / {MAX_LENGTH}
      </span>

      <span className="text-red-500 text-xs absolute bottom-0">
        {error?.message}
      </span>
    </div>
  )
}
