import { useState } from 'react'
import { CustomStep } from './CustomStep'
import { DescribeStep } from './DescribeStep'
import { ContactsStep } from './ContactsStep'

export function GenerateCardForm() {
  const [navigateToStep, setNavigateToStep] = useState<
    'describeStep' | 'contactsStep' | 'customStep' | undefined
  >('describeStep')

  function handleNavigateToStep(
    step: 'describeStep' | 'contactsStep' | 'customStep',
  ) {
    setNavigateToStep(step)
  }

  return (
    <>
      {navigateToStep === 'describeStep' ? (
        <DescribeStep navigateTo={handleNavigateToStep} />
      ) : navigateToStep === 'contactsStep' ? (
        <ContactsStep navigateTo={handleNavigateToStep} />
      ) : (
        <CustomStep navigateTo={handleNavigateToStep} />
      )}
    </>
  )
}
