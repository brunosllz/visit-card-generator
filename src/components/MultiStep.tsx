import clsx from 'clsx'

interface MultiStepProps {
  size: number
  currentStep?: number
  className?: string
}

export function MultiStep({
  currentStep = 1,
  size,
  className,
}: MultiStepProps) {
  return (
    <div className={className}>
      <label className="text-xs">
        {currentStep} de {size}
      </label>

      <div className={`grid grid-cols-${size} gap-2 mt-1`}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              className={clsx('h-1 rounded', {
                'bg-gray-100': currentStep >= step,
                'bg-gray-600': !(currentStep >= step),
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
