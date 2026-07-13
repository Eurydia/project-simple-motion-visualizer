import { m } from '../../paraglide/messages.js'
import type {
  MotionAppearance,
  MotionParameter,
  MotionParameterSet,
} from '../../types/motion'

export type CircularFormValues = {
  radius: number
  speed: number
  angle: number
  period: number
  tangentialVelocity: number
}
export type CircularField = keyof CircularFormValues
export type CircularParameterSetId = 'angular' | 'period' | 'tangential'
export const circularAppearance: MotionAppearance = {
  title: m.circular_title,
  description: m.circular_description,
  formula: '\\theta(t) = \\theta_0 + \\omega t',
  color: '#f48fb1',
  light: '#f8bbd0',
  dark: '#880e4f',
}
const radius: MotionParameter<CircularField> = {
  key: 'radius',
  label: m.radius,
  symbol: 'r',
  hint: m.hint_radius,
  unit: 'm',
  step: 0.5,
}
const angle: MotionParameter<CircularField> = {
  key: 'angle',
  label: m.start_angle,
  symbol: '\\theta_0',
  hint: m.hint_start_angle,
  unit: '°',
  step: 5,
}
export const circularParameterSets: readonly MotionParameterSet<
  CircularParameterSetId,
  CircularField
>[] = [
  {
    id: 'angular',
    label: m.angular_velocity,
    description: m.use_rotation_rate,
    parameters: [
      radius,
      {
        key: 'speed',
        label: m.angular_velocity,
        symbol: '\\omega',
        hint: m.hint_angular_velocity,
        unit: 'rad/s',
        step: 0.1,
      },
      angle,
    ],
  },
  {
    id: 'period',
    label: m.period,
    description: m.use_revolution_time,
    parameters: [
      radius,
      {
        key: 'period',
        label: m.orbital_period,
        symbol: 'T',
        hint: m.hint_orbital_period,
        unit: 's',
        step: 0.1,
      },
      angle,
    ],
  },
  {
    id: 'tangential',
    label: m.tangential_speed,
    description: m.use_path_speed,
    parameters: [
      radius,
      {
        key: 'tangentialVelocity',
        label: m.tangential_velocity,
        symbol: 'v_t',
        hint: m.hint_tangential_velocity,
        unit: 'm/s',
        step: 0.5,
      },
      angle,
    ],
  },
]
export const circularDefaults: CircularFormValues = {
  radius: 5,
  speed: 1.2,
  angle: 0,
  period: 5.2,
  tangentialVelocity: 6,
}
