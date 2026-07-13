import type { LocalizedString } from '#/paraglide/runtime'

export type MotionKind = 'spring' | 'parabola' | 'linear' | 'circular'

export type MotionAppearance = {
  title: LocalizedString
  formula: string
  color: string
  light: string
  dark: string
}

export type MotionParameter<TFieldName extends string> = {
  key: TFieldName
  label: LocalizedString
  symbol: string
  hint: LocalizedString
  unit: string
  step: number
}

export type MotionParameterSet<
  TSetId extends string,
  TFieldName extends string,
> = {
  id: TSetId
  label: LocalizedString
  description: LocalizedString
  parameters: readonly MotionParameter<TFieldName>[]
}

export type MotionMeasurement = {
  symbol: 'v_x' | 'v_y' | 's' | '\\Delta r'
  value: number
  unit: 'm/s' | 'm'
}
