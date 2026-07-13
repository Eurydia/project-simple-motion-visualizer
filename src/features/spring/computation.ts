import type { MotionMeasurement } from '../../types/motion'
import type { SpringFormValues, SpringParameterSetId } from './config'

export type SpringSimulation = {
  amplitude: number
  stiffness: number
  damping: number
  mass: number
}

export const createSpringSimulation = (
  setId: SpringParameterSetId,
  values: SpringFormValues,
): SpringSimulation => {
  if (setId === 'physical') {
    return {
      amplitude: values.amplitude,
      stiffness: values.stiffness,
      damping: values.damping,
      mass: values.mass,
    }
  }
  const omega =
    setId === 'period' ? (Math.PI * 2) / values.period : values.omega
  return {
    amplitude: values.amplitude,
    stiffness: omega ** 2,
    damping: values.damping,
    mass: 1,
  }
}

export const getSpringPosition = (
  simulation: SpringSimulation,
  time: number,
) => {
  const omega = Math.sqrt(simulation.stiffness / simulation.mass)
  return (
    simulation.amplitude *
    Math.exp(-simulation.damping * time) *
    Math.cos(omega * time)
  )
}

export const getSpringVelocity = (
  simulation: SpringSimulation,
  time: number,
) => {
  const omega = Math.sqrt(simulation.stiffness / simulation.mass)
  return (
    simulation.amplitude *
    Math.exp(-simulation.damping * time) *
    (-simulation.damping * Math.cos(omega * time) -
      omega * Math.sin(omega * time))
  )
}

const integrateDistance = (simulation: SpringSimulation, endTime: number) => {
  if (endTime <= 0) return 0
  const steps = 180
  const step = endTime / steps
  let distance = 0
  for (let index = 0; index < steps; index += 1) {
    const start = index * step
    distance +=
      ((Math.abs(getSpringVelocity(simulation, start)) +
        Math.abs(getSpringVelocity(simulation, start + step))) *
        step) /
      2
  }
  return distance
}

export const getSpringMeasurements = (
  simulation: SpringSimulation,
  time: number,
): readonly MotionMeasurement[] => [
  { symbol: 'v_x', value: getSpringVelocity(simulation, time), unit: 'm/s' },
  { symbol: 'v_y', value: 0, unit: 'm/s' },
  { symbol: 's', value: integrateDistance(simulation, time), unit: 'm' },
  {
    symbol: '\\Delta r',
    value:
      getSpringPosition(simulation, time) - getSpringPosition(simulation, 0),
    unit: 'm',
  },
]

export const getSpringDuration = (simulation: SpringSimulation) => {
  const omega = Math.sqrt(simulation.stiffness / simulation.mass)
  const period = (Math.PI * 2) / omega
  if (simulation.damping === 0) return Math.min(period * 4, 3600)
  const settlingTime = Math.log(100) / simulation.damping
  return Math.min(period * Math.max(4, Math.ceil(settlingTime / period)), 3600)
}
