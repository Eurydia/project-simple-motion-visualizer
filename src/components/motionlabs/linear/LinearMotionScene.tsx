import type { FC } from 'react'
import {
  getLinearMeasurements,
  getLinearPosition,
} from '../../features/linear/computation'
import type { LinearSimulation } from '../../features/linear/computation'
import { m } from '../../lib/paraglide/messages.js'
import { formatMeasurement } from '../scene/format-measurement.js'
import { MotionArrow } from '../scene/MotionArrow.js'
import { MotionDot } from '../scene/MotionDot.js'
import { MotionLabel } from '../scene/MotionLabel.js'
import { MotionLine } from '../scene/MotionLine.js'
import { MotionScene } from '../scene/MotionScene.js'

export const LinearMotionScene: FC<{
  simulation: LinearSimulation
  time: number
}> = ({ simulation, time }) => {
  const startX = 80
  const endX = 720
  const centerX = 400
  const y = 210
  const halfSpan = simulation.windowHalfSpan ?? 10
  const pixelsPerMeter = (endX - startX) / (halfSpan * 2)
  const x = centerX + simulation.velocity * time * pixelsPerMeter
  const direction = Math.sign(simulation.velocity)
  return (
    <MotionScene
      time={time}
      measurements={getLinearMeasurements(simulation, time)}
    >
      <MotionArrow
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        label={m.annotation_position_axis()}
      />
      {Array.from({ length: 11 }, (_, index) => (
        <MotionLine
          key={index}
          x1={startX + ((endX - startX) * index) / 10}
          y1={y - 7}
          x2={startX + ((endX - startX) * index) / 10}
          y2={y + 7}
          color="#90a4ae"
          width={2}
        />
      ))}
      <MotionLabel
        x={startX}
        y={y + 36}
        text={formatMeasurement(simulation.position - halfSpan)}
        centered
      />
      <MotionLabel
        x={centerX}
        y={y + 36}
        text={formatMeasurement(simulation.position)}
        centered
      />
      <MotionLabel
        x={endX}
        y={y + 36}
        text={formatMeasurement(simulation.position + halfSpan)}
        centered
      />
      <MotionDot x={x} y={y} />
      <MotionLabel
        x={x}
        y={y - 32}
        text={`x(t) = ${formatMeasurement(getLinearPosition(simulation, time))} m`}
        centered
      />
      {direction === 0 ? null : (
        <MotionArrow
          x1={x + direction * 13}
          y1={y}
          x2={x + direction * 85}
          y2={y}
          label="v"
        />
      )}
      <MotionLabel x={centerX} y={y + 58} text="x₀" centered />
      <MotionLine x1={centerX} y1={y - 20} x2={centerX} y2={y + 20} dotted />
    </MotionScene>
  )
}
