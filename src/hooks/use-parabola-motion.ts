import { useStore } from '@tanstack/react-form'
import { useMemo, useRef, useState } from 'react'
import {
  createParabolaSimulation,
  getParabolaDuration,
} from '../features/parabola/computation'
import {
  parabolaDefaults,
  parabolaParameterSets,
} from '../features/parabola/config'
import type { ParabolaParameterSetId } from '../features/parabola/config'
import { createParabolaSchema } from '../features/parabola/schema'
import { useMotionPlayback } from './use-motion-playback'
import { useMotionForm } from '#/lib/form/form-hooks'

export const useParabolaMotion = () => {
  const [parameterSetId, setParameterSetId] =
    useState<ParabolaParameterSetId>('polar')
  const schema = useMemo(
    () => createParabolaSchema(parameterSetId),
    [parameterSetId],
  )
  const form = useMotionForm({
    defaultValues: parabolaDefaults,
    validators: { onChange: schema },
  })
  const values = useStore(form.store, (state) => state.values)
  const isValid = useStore(form.store, (state) => state.isValid)
  const lastValid = useRef(createParabolaSimulation('polar', parabolaDefaults))
  if (isValid)
    lastValid.current = createParabolaSimulation(parameterSetId, values)
  const simulation = lastValid.current
  const playback = useMotionPlayback(getParabolaDuration(simulation))
  const selectParameterSet = (nextId: ParabolaParameterSetId) => {
    setParameterSetId(nextId)
    form.reset(parabolaDefaults)
    lastValid.current = createParabolaSimulation(nextId, parabolaDefaults)
    playback.resetPlayback()
  }
  const reset = () => {
    form.reset(parabolaDefaults)
    lastValid.current = createParabolaSimulation(
      parameterSetId,
      parabolaDefaults,
    )
    playback.resetPlayback()
  }
  return {
    form,
    parameterSetId,
    parameterSets: parabolaParameterSets,
    selectParameterSet,
    simulation,
    duration: getParabolaDuration(simulation),
    reset,
    ...playback,
  }
}
