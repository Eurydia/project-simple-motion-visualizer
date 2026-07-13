import { useSelector } from '@tanstack/react-form'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createLinearSimulation,
  getLinearDuration,
} from '../features/linear/computation'
import { linearDefaults, linearParameterSets } from '../features/linear/config'
import type { LinearParameterSetId } from '../features/linear/config'
import { createLinearSchema } from '../features/linear/schema'
import { useMotionPlayback } from './use-motion-playback'
import { useMotionForm } from '#/lib/form-hooks'

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

  const values = useSelector(form.store, (state) => state.values)
  const isValid = useSelector(form.store, (state) => state.isValid)
  const lastValid = useRef(createLinearSimulation('velocity', linearDefaults))

  useEffect(() => {
    if (isValid) {
      lastValid.current = createLinearSimulation(parameterSetId, values)
    }
  }, [isValid])

  const playback = useMotionPlayback(getLinearDuration(lastValid.current))
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
    simulation: lastValid.current,
    duration: getLinearDuration(lastValid.current),
    reset,
    ...playback,
  }
}
