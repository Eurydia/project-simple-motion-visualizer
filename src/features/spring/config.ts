import { m } from '#/paraglide/messages'
import type {
  MotionAppearance,
  MotionParameter,
  MotionParameterSet,
} from '../../types/motion'

export const springAppearance: MotionAppearance = {
  title: m.spring_title(),
  formula: 'x(t) = A e^{-bt} \\cos(\\omega t)',
}

export type SpringFormValues = {
  amplitude: number
  stiffness: number
  damping: number
  mass: number
  omega: number
  period: number
}
export type SpringField = keyof SpringFormValues
export type SpringParameterSetId = 'physical' | 'frequency' | 'period'

const amplitude: MotionParameter<SpringField> = {
  key: 'amplitude',
  label: m.amplitude(),
  symbol: 'A',
  hint: m.hint_amplitude(),
  unit: 'm',
  step: 0.1,
}
const damping: MotionParameter<SpringField> = {
  key: 'damping',
  label: m.damping(),
  symbol: 'b',
  hint: m.hint_damping(),
  unit: 's⁻¹',
  step: 0.01,
}

export const springParameterSets: readonly MotionParameterSet<
  SpringParameterSetId,
  SpringField
>[] = [
  {
    id: 'physical',
    label: m.physical(),
    description: m.use_stiffness_mass(),
    parameters: [
      amplitude,
      {
        key: 'stiffness',
        label: m.stiffness(),
        symbol: 'k',
        hint: m.hint_stiffness(),
        unit: 'N/m',
        step: 0.5,
      },
      damping,
      {
        key: 'mass',
        label: m.mass(),
        symbol: 'm',
        hint: m.hint_mass(),
        unit: 'kg',
        step: 0.1,
      },
    ],
  },
  {
    id: 'frequency',
    label: m.frequency(),
    description: m.use_frequency(),
    parameters: [
      amplitude,
      {
        key: 'omega',
        label: m.angular_frequency(),
        symbol: '\\omega',
        hint: m.hint_angular_frequency(),
        unit: 'rad/s',
        step: 0.1,
      },
      damping,
    ],
  },
  {
    id: 'period',
    label: m.period(),
    description: m.use_period(),
    parameters: [
      amplitude,
      {
        key: 'period',
        label: m.period(),
        symbol: 'T',
        hint: m.hint_period_cycle(),
        unit: 's',
        step: 0.1,
      },
      damping,
    ],
  },
]

export const springDefaults: SpringFormValues = {
  amplitude: 3,
  stiffness: 8,
  damping: 0.08,
  mass: 1.5,
  omega: 2.3,
  period: 2.7,
}
