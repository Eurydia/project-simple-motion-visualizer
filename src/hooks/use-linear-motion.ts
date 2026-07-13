import { useStore } from '@tanstack/react-form'
import { useMemo, useRef, useState } from 'react'
import {
  createLinearSimulation,
  getLinearDuration,
} from '../features/linear/computation'
import { linearDefaults, linearParameterSets } from '../features/linear/config'
import type { LinearParameterSetId } from '../features/linear/config'
import { createLinearSchema } from '../features/linear/schema'
import { useMotionForm } from '../components/forms/motion-form-context'
import { useMotionPlayback } from './use-motion-playback'

export const useLinearMotion = () => {
  const [parameterSetId, setParameterSetId] =
    useState<LinearParameterSetId>('velocity')
  const schema = useMemo(
    () => createLinearSchema(parameterSetId),
    [parameterSetId],
  )
  const form = useMotionForm({
    defaultValues: linearDefaults,
    validators: { onChange: schema },
    onSubmit: () => undefined,
  })
  const values = useStore(form.store, (state) => state.values)
  const isValid = useStore(form.store, (state) => state.isValid)
  const lastValid = useRef(createLinearSimulation('velocity', linearDefaults))
  if (isValid)
    lastValid.current = createLinearSimulation(parameterSetId, values)
  const simulation = lastValid.current
  const playback = useMotionPlayback(getLinearDuration(simulation))
  const selectParameterSet = (nextId: LinearParameterSetId) => {
    setParameterSetId(nextId)
    form.reset(linearDefaults)
    lastValid.current = createLinearSimulation(nextId, linearDefaults)
    playback.resetPlayback()
  }
  const reset = () => {
    form.reset(linearDefaults)
    lastValid.current = createLinearSimulation(parameterSetId, linearDefaults)
    playback.resetPlayback()
  }
  return {
    form,
    parameterSetId,
    parameterSets: linearParameterSets,
    selectParameterSet,
    simulation,
    duration: getLinearDuration(simulation),
    reset,
    ...playback,
  }
}
