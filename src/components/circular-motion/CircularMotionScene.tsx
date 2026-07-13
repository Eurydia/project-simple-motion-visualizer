import type { FC } from 'react'
import {
  getCircularMeasurements,
  getCircularPosition,
} from '../../features/circular/computation'
import type { CircularSimulation } from '../../features/circular/computation'
import { circularAppearance } from '../../features/circular/config'
import { MotionArrow } from '../motion-graphics/motion-scene/MotionArrow'
import { MotionDot } from '../motion-graphics/motion-scene/MotionDot'
import { MotionLabel } from '../motion-graphics/motion-scene/MotionLabel'
import { MotionScene } from '../motion-graphics/motion-scene/MotionScene'

export const CircularMotionScene: FC<{
  simulation: CircularSimulation
  time: number
}> = ({ simulation, time }) => {
  const centerX = 400
  const centerY = 210
  const radius = Math.min(300, 60 + simulation.radius * 12)
  const position = getCircularPosition(simulation, time)
  const x = centerX + Math.cos(position.theta) * radius
  const y = centerY + Math.sin(position.theta) * radius
  const direction = simulation.speed >= 0 ? 1 : -1
  return (
    <MotionScene
      time={time}
      measurements={getCircularMeasurements(simulation, time)}
    >
      <MotionArrow
        x1={centerX - radius - 40}
        y1={centerY}
        x2={centerX + radius + 40}
        y2={centerY}
        label="x"
      />
      <MotionArrow
        x1={centerX}
        y1={centerY + radius + 40}
        x2={centerX}
        y2={centerY - radius - 40}
        label="y"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#90a4ae"
        strokeWidth="2"
      />
      <circle cx={centerX} cy={centerY} r="4" fill={circularAppearance.dark} />
      <MotionArrow x1={centerX} y1={centerY} x2={x} y2={y} label="r" />
      <MotionArrow
        x1={x}
        y1={y}
        x2={x - Math.sin(position.theta) * 62 * direction}
        y2={y + Math.cos(position.theta) * 62 * direction}
        label="v"
      />
      <MotionDot x={x} y={y} />
      <MotionLabel
        x={centerX + 18}
        y={centerY + 24}
        text={`θ = ${(((position.theta * 180) / Math.PI) % 360).toFixed(0)}°`}
      />
    </MotionScene>
  )
}
