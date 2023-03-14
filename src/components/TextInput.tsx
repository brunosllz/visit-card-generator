import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

export interface TextInputRootProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

const TextInputRoot = forwardRef<HTMLDivElement, TextInputRootProps>(
  ({ children }: TextInputRootProps, ref) => {
    return (
      <div ref={ref} className="w-full flex flex-col gap-1">
        {children}
      </div>
    )
  },
)

TextInputRoot.displayName = 'TextInput.Root'

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  children?: ReactNode
  hasError?: boolean
}

const TextInputInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, hasError, ...props }: TextInputProps, ref) => {
    return (
      <div
        className={clsx(
          'flex items-baseline bg-zinc-900 h-12 rounded-md px-4 py-3 min-w-full',
          {
            'ring-1 ring-red-500 focus-within:ring-red-500': hasError,
          },
        )}
      >
        {children}
        <input
          ref={ref}
          className="w-full h-full bg-transparent focus:outline-none placeholder:text-gray-500 "
          {...props}
        />
      </div>
    )
  },
)

TextInputInput.displayName = 'TextInput.Input'

interface TextInputMessageErrorProps {
  message: string | undefined
}

function TextInputMessageError({ message }: TextInputMessageErrorProps) {
  return <span className="text-red-500 text-xs">{message}</span>
}

TextInputMessageError.displayName = 'TextInput.MessageError'

interface TextInputIconProps {
  prefix: string
}

function TextInputPrefix({ prefix }: TextInputIconProps) {
  return (
    <span className="text-zinc-400 flex items-center justify-center">
      {prefix}
    </span>
  )
}

TextInputPrefix.displayName = 'TextInput.Prefix'

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Prefix: TextInputPrefix,
  MessageError: TextInputMessageError,
}
