import { useSelector } from '@tanstack/react-form'
import { useEffect, useMemo, useRef, useState } from 'react'
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
import { useMotionPlayback } from './use-motion-playback'
import { useMotionForm } from '#/lib/form-hooks'

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
  })
  const values = useSelector(form.store, (state) => state.values)
  const isValid = useSelector(form.store, (state) => state.isValid)
  const lastValid = useRef(
    createCircularSimulation('angular', circularDefaults),
  )
  useEffect(() => {
    if (isValid) {
      lastValid.current = createCircularSimulation(parameterSetId, values)
    }
  }, [isValid])

  const playback = useMotionPlayback(getCircularDuration(lastValid.current))
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
    simulation: lastValid.current,
    duration: getCircularDuration(lastValid.current),
    reset,
    ...playback,
  }
}
