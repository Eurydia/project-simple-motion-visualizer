export type MotionKind = 'spring' | 'parabola' | 'linear' | 'circular'

export type LocalizedText = () => string

export type MotionAppearance = {
  title: string
  formula: string
  color: string
  light: string
  dark: string
}

export type MotionParameter<TFieldName extends string> = {
  key: TFieldName
  label: LocalizedText
  symbol: string
  hint: LocalizedText
  unit: string
  step: number
}

export type MotionParameterSet<
  TSetId extends string,
  TFieldName extends string,
> = {
  id: TSetId
  label: LocalizedText
  description: LocalizedText
  parameters: readonly MotionParameter<TFieldName>[]
}

export type MotionMeasurement = {
  symbol: 'v_x' | 'v_y' | 's' | '\\Delta r'
  value: number
  unit: 'm/s' | 'm'
}
