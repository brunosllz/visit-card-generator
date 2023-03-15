import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import { CircleNotch } from 'phosphor-react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: Boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { title, children, isLoading, variant = 'primary', ...props }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'text-sm rounded-md py-4 flex h-12 gap-2 justify-center items-center w-full min-w-[120px] transition-colors text-white',
          {
            'bg-green-600  hover:bg-green-500 disabled:bg-green-700 disabled:cursor-not-allowed':
              variant === 'primary',

            'bg-transparent hover:bg-gray-600': variant === 'secondary',
          },
        )}
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
