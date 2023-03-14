import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import { CircleNotch } from 'phosphor-react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string
  children?: ReactNode
  isLoading?: Boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, children, isLoading, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        className="text-sm rounded-md py-4 flex h-12 gap-2 justify-center items-center w-full transition-color bg-green-700 hover:bg-green-600 disabled:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed "
        {...props}
      >
        {isLoading ? (
          <CircleNotch size={16} weight="bold" className="animate-spin" />
        ) : (
          <>
            {title}
            {children}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
