import { useSelector } from '@tanstack/react-form'
import { useMemo, useRef, useState } from 'react'
import {
  createSpringSimulation,
  getSpringDuration,
} from '../features/spring/computation'
import { springDefaults, springParameterSets } from '../features/spring/config'
import type { SpringParameterSetId } from '../features/spring/config'
import { createSpringSchema } from '../features/spring/schema'
import { useMotionPlayback } from './use-motion-playback'
import { useMotionForm } from '#/lib/form-hooks'

export const useSpringMotion = () => {
  const [parameterSetId, setParameterSetId] =
    useState<SpringParameterSetId>('physical')
  const schema = useMemo(
    () => createSpringSchema(parameterSetId),
    [parameterSetId],
  )
  const form = useMotionForm({
    defaultValues: springDefaults,
    validators: { onChange: schema },
  })
  const values = useSelector(form.store, (state) => state.values)
  const isValid = useSelector(form.store, (state) => state.isValid)
  const lastValid = useRef(createSpringSimulation('physical', springDefaults))
  if (isValid) {
    lastValid.current = createSpringSimulation(parameterSetId, values)
  }
  const simulation = lastValid.current
  const playback = useMotionPlayback(getSpringDuration(simulation))

  const selectParameterSet = (nextId: SpringParameterSetId) => {
    setParameterSetId(nextId)
    form.reset(springDefaults)
    lastValid.current = createSpringSimulation(nextId, springDefaults)
    playback.resetPlayback()
  }

  const reset = () => {
    form.reset(springDefaults)
    lastValid.current = createSpringSimulation(parameterSetId, springDefaults)
    playback.resetPlayback()
  }

  return {
    form,
    parameterSetId,
    parameterSets: springParameterSets,
    selectParameterSet,
    simulation,
    duration: getSpringDuration(simulation),
    reset,
    ...playback,
  }
}
