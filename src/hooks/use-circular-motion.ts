import { useStore } from '@tanstack/react-form'
import { useMemo, useRef, useState } from 'react'
import {
  createCircularSimulation,
  getCircularDuration,
} from '../features/circular/computation'
import {
  circularDefaults,
  circularParameterSets,
} from '../features/circular/config'
import type { CircularParameterSetId } from '../features/circular/config'
import { createCircularSchema } from '../features/circular/schema'
import { useMotionForm } from '../components/forms/motion-form-context'
import { useMotionPlayback } from './use-motion-playback'

export const useCircularMotion = () => {
  const [parameterSetId, setParameterSetId] =
    useState<CircularParameterSetId>('angular')
  const schema = useMemo(
    () => createCircularSchema(parameterSetId),
    [parameterSetId],
  )
  const form = useMotionForm({
    defaultValues: circularDefaults,
    validators: { onChange: schema },
    onSubmit: () => undefined,
  })
  const values = useStore(form.store, (state) => state.values)
  const isValid = useStore(form.store, (state) => state.isValid)
  const lastValid = useRef(
    createCircularSimulation('angular', circularDefaults),
  )
  if (isValid)
    lastValid.current = createCircularSimulation(parameterSetId, values)
  const simulation = lastValid.current
  const playback = useMotionPlayback(getCircularDuration(simulation))
  const selectParameterSet = (nextId: CircularParameterSetId) => {
    setParameterSetId(nextId)
    form.reset(circularDefaults)
    lastValid.current = createCircularSimulation(nextId, circularDefaults)
    playback.resetPlayback()
  }
  const reset = () => {
    form.reset(circularDefaults)
    lastValid.current = createCircularSimulation(
      parameterSetId,
      circularDefaults,
    )
    playback.resetPlayback()
  }
  return {
    form,
    parameterSetId,
    parameterSets: circularParameterSets,
    selectParameterSet,
    simulation,
    duration: getCircularDuration(simulation),
    reset,
    ...playback,
  }
}
