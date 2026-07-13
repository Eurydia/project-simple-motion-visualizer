import { m } from '../../paraglide/messages.js'
import type { MotionAppearance, MotionParameterSet } from '../../types/motion'

export type LinearFormValues = {
  position: number
  velocity: number
  endPosition: number
  travelTime: number
}
export type LinearField = keyof LinearFormValues
export type LinearParameterSetId = 'velocity' | 'endpoints'
export const linearAppearance: MotionAppearance = {
  title: m.linear_title,
  description: m.linear_description,
  formula: 'x(t) = x_0 + vt',
  color: '#9fa8da',
  light: '#c5cae9',
  dark: '#283593',
}
export const linearParameterSets: readonly MotionParameterSet<
  LinearParameterSetId,
  LinearField
>[] = [
  {
    id: 'velocity',
    label: m.position_velocity,
    description: m.use_initial_velocity,
    parameters: [
      {
        key: 'position',
        label: m.start_position,
        symbol: 'x_0',
        hint: m.hint_start_position,
        unit: 'm',
        step: 1,
      },
      {
        key: 'velocity',
        label: m.velocity,
        symbol: 'v',
        hint: m.hint_velocity_signed,
        unit: 'm/s',
        step: 0.5,
      },
    ],
  },
  {
    id: 'endpoints',
    label: m.two_positions,
    description: m.use_positions_time,
    parameters: [
      {
        key: 'position',
        label: m.start_position,
        symbol: 'x_0',
        hint: m.hint_start_position,
        unit: 'm',
        step: 1,
      },
      {
        key: 'endPosition',
        label: m.end_position,
        symbol: 'x_1',
        hint: m.hint_end_position,
        unit: 'm',
        step: 1,
      },
      {
        key: 'travelTime',
        label: m.travel_time,
        symbol: '\\Delta t',
        hint: m.hint_travel_time,
        unit: 's',
        step: 0.1,
      },
    ],
  },
]
export const linearDefaults: LinearFormValues = {
  position: -6,
  velocity: 4,
  endPosition: 8,
  travelTime: 4,
}
