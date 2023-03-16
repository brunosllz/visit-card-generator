import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import { CircleNotch } from 'phosphor-react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'sm'
  isLoading?: Boolean
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title,
      children,
      isLoading,
      variant = 'primary',
      size = 'default',
      className,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          `${className} text-sm rounded-md py-4 flex h-12 gap-2 justify-center items-center w-full min-w-[120px] transition-colors`,
          {
            'bg-green-700  hover:bg-green-600 disabled:bg-green-800 disabled:opacity-85 disabled:cursor-not-allowed':
              variant === 'primary',

            'bg-transparent hover:bg-gray-600': variant === 'secondary',
            'h-[38px]': size === 'sm',
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
