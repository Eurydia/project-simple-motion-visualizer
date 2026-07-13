import type { MotionMeasurement } from '../../types/motion'
import type { ParabolaFormValues, ParabolaParameterSetId } from './config'

export type ParabolaSimulation = {
  velocity: number
  angle: number
  gravity: number
  height: number
}
export const createParabolaSimulation = (
  setId: ParabolaParameterSetId,
  values: ParabolaFormValues,
): ParabolaSimulation => {
  if (setId === 'polar')
    return {
      velocity: values.velocity,
      angle: values.angle,
      gravity: values.gravity,
      height: values.height,
    }
  const velocityY =
    setId === 'apex' ? values.gravity * values.apexTime : values.velocityY
  return {
    velocity: Math.hypot(values.velocityX, velocityY),
    angle: (Math.atan2(velocityY, values.velocityX) * 180) / Math.PI,
    gravity: values.gravity,
    height: values.height,
  }
}
export const getParabolaFlightTime = (simulation: ParabolaSimulation) => {
  const velocityY =
    simulation.velocity * Math.sin((simulation.angle * Math.PI) / 180)
  const discriminant =
    velocityY ** 2 + 2 * simulation.gravity * simulation.height
  return discriminant < 0
    ? 0
    : Math.max(0, (velocityY + Math.sqrt(discriminant)) / simulation.gravity)
}
export const getParabolaPosition = (
  simulation: ParabolaSimulation,
  time: number,
) => {
  const angle = (simulation.angle * Math.PI) / 180
  return {
    x: simulation.velocity * Math.cos(angle) * time,
    y:
      simulation.height +
      simulation.velocity * Math.sin(angle) * time -
      0.5 * simulation.gravity * time ** 2,
  }
}
const integrateDistance = (simulation: ParabolaSimulation, endTime: number) => {
  const angle = (simulation.angle * Math.PI) / 180
  const velocityX = simulation.velocity * Math.cos(angle)
  const velocityY = simulation.velocity * Math.sin(angle)
  const steps = 180
  const step = endTime / steps
  let distance = 0
  for (let index = 0; index < steps; index += 1) {
    const speed = (time: number) =>
      Math.hypot(velocityX, velocityY - simulation.gravity * time)
    const start = index * step
    distance += ((speed(start) + speed(start + step)) * step) / 2
  }
  return distance
}
export const getParabolaMeasurements = (
  simulation: ParabolaSimulation,
  time: number,
): readonly MotionMeasurement[] => {
  const activeTime = Math.min(time, getParabolaFlightTime(simulation))
  const angle = (simulation.angle * Math.PI) / 180
  const velocityX = simulation.velocity * Math.cos(angle)
  const velocityY =
    simulation.velocity * Math.sin(angle) - simulation.gravity * activeTime
  const position = getParabolaPosition(simulation, activeTime)
  return [
    { symbol: 'v_x', value: velocityX, unit: 'm/s' },
    { symbol: 'v_y', value: velocityY, unit: 'm/s' },
    {
      symbol: 's',
      value: integrateDistance(simulation, activeTime),
      unit: 'm',
    },
    {
      symbol: '\\Delta r',
      value: Math.hypot(position.x, position.y - simulation.height),
      unit: 'm',
    },
  ]
}
export const getParabolaDuration = (simulation: ParabolaSimulation) =>
  getParabolaFlightTime(simulation) + 0.7
