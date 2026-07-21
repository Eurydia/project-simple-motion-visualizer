import { MotionNumberField } from '#/components/forms/MotionNumberField'
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-contexts'

export const { useAppForm: useMotionForm } = createFormHook({
  fieldComponents: { MotionNumberField },
  formComponents: {},
  fieldContext,
  formContext,
})
