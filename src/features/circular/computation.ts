import type { MotionMeasurement } from '../../types/motion'
import type { CircularFormValues, CircularParameterSetId } from './config'

export type CircularSimulation = {
  radius: number
  speed: number
  angle: number
}
export const createCircularSimulation = (
  setId: CircularParameterSetId,
  values: CircularFormValues,
): CircularSimulation => ({
  radius: values.radius,
  speed:
    setId === 'angular'
      ? values.speed
      : setId === 'period'
        ? (Math.PI * 2) / values.period
        : values.tangentialVelocity / values.radius,
  angle: values.angle,
})
export const getCircularPosition = (
  simulation: CircularSimulation,
  time: number,
) => {
  const theta = (simulation.angle * Math.PI) / 180 + simulation.speed * time
  return {
    theta,
    x: simulation.radius * Math.cos(theta),
    y: simulation.radius * Math.sin(theta),
  }
}
export const getCircularMeasurements = (
  simulation: CircularSimulation,
  time: number,
): readonly MotionMeasurement[] => {
  const position = getCircularPosition(simulation, time)
  return [
    {
      symbol: 'v_x',
      value: -simulation.radius * simulation.speed * Math.sin(position.theta),
      unit: 'm/s',
    },
    {
      symbol: 'v_y',
      value: simulation.radius * simulation.speed * Math.cos(position.theta),
      unit: 'm/s',
    },
    {
      symbol: 's',
      value: simulation.radius * Math.abs(simulation.speed) * time,
      unit: 'm',
    },
    {
      symbol: '\\Delta r',
      value:
        2 *
        simulation.radius *
        Math.abs(Math.sin((simulation.speed * time) / 2)),
      unit: 'm',
    },
  ]
}
export const getCircularDuration = (simulation: CircularSimulation) =>
  simulation.speed === 0 ? 8 : (Math.PI * 2) / Math.abs(simulation.speed)
