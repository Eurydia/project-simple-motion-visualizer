import { m } from '../../paraglide/messages.js'
import type {
  MotionAppearance,
  MotionParameter,
  MotionParameterSet,
} from '../../types/motion'

export type ParabolaFormValues = {
  velocity: number
  angle: number
  gravity: number
  height: number
  velocityX: number
  velocityY: number
  apexTime: number
}
export type ParabolaField = keyof ParabolaFormValues
export type ParabolaParameterSetId = 'polar' | 'components' | 'apex'

export const parabolaAppearance: MotionAppearance = {
  title: m.parabola_title,
  description: m.parabola_description,
  formula: 'y(t) = y_0 + v_0 \\sin(\\theta)t - \\frac{1}{2}gt^2',
  color: '#ffcc80',
  light: '#ffe0b2',
  dark: '#7c2d12',
}
const gravity: MotionParameter<ParabolaField> = {
  key: 'gravity',
  label: m.gravity,
  symbol: 'g',
  hint: m.hint_gravity,
  unit: 'm/s²',
  step: 0.1,
}
const height: MotionParameter<ParabolaField> = {
  key: 'height',
  label: m.start_height,
  symbol: 'y_0',
  hint: m.hint_start_height,
  unit: 'm',
  step: 0.5,
}
const velocityX: MotionParameter<ParabolaField> = {
  key: 'velocityX',
  label: m.horizontal_velocity,
  symbol: 'v_{0x}',
  hint: m.hint_initial_vx,
  unit: 'm/s',
  step: 1,
}

export const parabolaParameterSets: readonly MotionParameterSet<
  ParabolaParameterSetId,
  ParabolaField
>[] = [
  {
    id: 'polar',
    label: m.speed_angle,
    description: m.use_launch_direction,
    parameters: [
      {
        key: 'velocity',
        label: m.initial_speed,
        symbol: 'v_0',
        hint: m.hint_initial_speed,
        unit: 'm/s',
        step: 1,
      },
      {
        key: 'angle',
        label: m.launch_angle,
        symbol: '\\theta',
        hint: m.hint_launch_angle,
        unit: '°',
        step: 1,
      },
      gravity,
      height,
    ],
  },
  {
    id: 'components',
    label: m.components,
    description: m.use_velocity_components,
    parameters: [
      velocityX,
      {
        key: 'velocityY',
        label: m.vertical_velocity,
        symbol: 'v_{0y}',
        hint: m.hint_initial_vy,
        unit: 'm/s',
        step: 1,
      },
      gravity,
      height,
    ],
  },
  {
    id: 'apex',
    label: m.time_apex,
    description: m.use_climb_time,
    parameters: [
      velocityX,
      {
        key: 'apexTime',
        label: m.time_apex,
        symbol: 't_{apex}',
        hint: m.hint_apex_time,
        unit: 's',
        step: 0.1,
      },
      gravity,
      height,
    ],
  },
]
export const parabolaDefaults: ParabolaFormValues = {
  velocity: 24,
  angle: 45,
  gravity: 9.8,
  height: 2,
  velocityX: 17,
  velocityY: 17,
  apexTime: 1.7,
}
