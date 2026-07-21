import type { FC } from 'react'
import type { MotionMeasurement } from '../../../types/motion'
import { formatMeasurementLabel } from './format-measurement'

export const SceneMeasurements: FC<{
  color: string
  time: number
  measurements: readonly MotionMeasurement[]
}> = ({ color, time, measurements }) => (
  <>
    <text
      x="22"
      y="28"
      fill="#607d8b"
      fontFamily="monospace"
      fontSize="12"
    >{`t = ${time.toFixed(2)} s`}</text>
    <g fill={color} fontFamily="monospace" fontSize="12" textAnchor="end">
      {measurements.map((measurement, index) => (
        <text key={measurement.symbol} x="778" y={28 + index * 20}>
          {formatMeasurementLabel(measurement)}
        </text>
      ))}
    </g>
  </>
)
