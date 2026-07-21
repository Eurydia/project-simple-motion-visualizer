import type { MotionMeasurement } from '../../../types/motion'

const symbols: { [Symbol in MotionMeasurement['symbol']]: string } = {
  v_x: 'vₓ',
  v_y: 'vᵧ',
  s: 's',
  '\\Delta r': 'Δr',
}

export const formatMeasurement = (value: number) => {
  if (!Number.isFinite(value)) return '—'
  const normalized = Math.abs(value) < 0.0005 ? 0 : value
  if (
    Math.abs(normalized) >= 10000 ||
    (Math.abs(normalized) > 0 && Math.abs(normalized) < 0.001)
  )
    return normalized.toExponential(2)
  return normalized.toFixed(2)
}

export const formatMeasurementLabel = (measurement: MotionMeasurement) =>
  `${symbols[measurement.symbol]} = ${formatMeasurement(measurement.value)} ${measurement.unit}`
