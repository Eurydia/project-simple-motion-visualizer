import type { MotionMeasurement } from '../../types/motion'
import type { LinearFormValues, LinearParameterSetId } from './config'

export type LinearSimulation = {
  position: number
  velocity: number
  playbackDuration?: number
  windowHalfSpan?: number
}
export const createLinearSimulation = (
  setId: LinearParameterSetId,
  values: LinearFormValues,
): LinearSimulation => {
  if (setId === 'velocity')
    return { position: values.position, velocity: values.velocity }
  return {
    position: values.position,
    velocity: (values.endPosition - values.position) / values.travelTime,
    playbackDuration: values.travelTime,
    windowHalfSpan: Math.max(
      Math.abs(values.endPosition - values.position) * 1.15,
      1,
    ),
  }
}
export const getLinearPosition = (simulation: LinearSimulation, time: number) =>
  simulation.position + simulation.velocity * time
export const getLinearMeasurements = (
  simulation: LinearSimulation,
  time: number,
): readonly MotionMeasurement[] => {
  const displacement = simulation.velocity * time
  return [
    { symbol: 'v_x', value: simulation.velocity, unit: 'm/s' },
    { symbol: 'v_y', value: 0, unit: 'm/s' },
    { symbol: 's', value: Math.abs(displacement), unit: 'm' },
    { symbol: '\\Delta r', value: displacement, unit: 'm' },
  ]
}
export const getLinearDuration = (simulation: LinearSimulation) =>
  simulation.playbackDuration ??
  (simulation.velocity === 0 ? 8 : 10 / Math.abs(simulation.velocity))
