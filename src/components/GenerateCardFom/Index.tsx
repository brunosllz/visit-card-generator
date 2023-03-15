import { useState } from 'react'
import { CustomStep } from './CustomStep'
import { DescribeStep } from './DescribeStep'
import { SocialStep } from './SocialStep'

export function GenerateCardForm() {
  const [navigateToStep, setNavigateToStep] = useState<
    'describeStep' | 'socialStep' | 'customStep' | undefined
  >('describeStep')

  function handleNavigateToStep(
    step: 'describeStep' | 'socialStep' | 'customStep',
  ) {
    setNavigateToStep(step)
  }

  return (
    <>
      {navigateToStep === 'describeStep' ? (
        <DescribeStep navigateTo={handleNavigateToStep} />
      ) : navigateToStep === 'socialStep' ? (
        <SocialStep navigateTo={handleNavigateToStep} />
      ) : (
        <CustomStep navigateTo={handleNavigateToStep} />
      )}
    </>
  )
}
