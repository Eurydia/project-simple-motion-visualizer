import { animated, useSpring } from '@react-spring/web'
import type { FC } from 'react'
import {
  getParabolaFlightTime,
  getParabolaMeasurements,
  getParabolaPosition,
} from '../../../features/parabola/computation'
import type { ParabolaSimulation } from '../../../features/parabola/computation'
import { MotionArrow } from '../../motion-graphics/motion-scene/MotionArrow'
import { MotionDot } from '../../motion-graphics/motion-scene/MotionDot'
import { MotionLabel } from '../../motion-graphics/motion-scene/MotionLabel'
import { MotionLine } from '../../motion-graphics/motion-scene/MotionLine'
import { MotionScene } from '../../motion-graphics/motion-scene/MotionScene'
import { useTheme } from '@mui/material/styles'

export const ParabolaMotionScene: FC<{
  simulation: ParabolaSimulation
  time: number
}> = ({ simulation, time }) => {
  const flight = getParabolaFlightTime(simulation)
  const distance = getParabolaPosition(simulation, flight).x
  const scale = Math.min(600 / Math.max(Math.abs(distance), 1), 14)
  const originX = 96
  const groundY = 344
  const angle = (simulation.angle * Math.PI) / 180
  const trajectory = Array.from({ length: 81 }, (_, index) => {
    const point = getParabolaPosition(simulation, (flight * index) / 80)
    return `${originX + point.x * scale},${groundY - point.y * scale}`
  }).join(' ')
  const activeTime = Math.min(time % Math.max(flight + 0.7, 1), flight)
  const point = getParabolaPosition(simulation, activeTime)
  const x = originX + point.x * scale
  const y = groundY - point.y * scale
  const vectorLength = Math.min(90, simulation.velocity * 3)

  const t = useTheme()
  const trajectoryEntrance = useSpring({
    from: { pathLength: 0 },
    to: { pathLength: 1 },
    config: { duration: 450 },
  })

  return (
    <MotionScene
      time={time}
      measurements={getParabolaMeasurements(simulation, time)}
    >
      <MotionArrow x1={originX} y1={groundY} x2={744} y2={groundY} label="x" />
      <MotionArrow x1={originX} y1={groundY} x2={originX} y2={56} label="y" />
      <animated.polyline
        pathLength={trajectoryEntrance.pathLength}
        fill="none"
        stroke={t.palette.primary.dark}
        strokeWidth="2"
        strokeDasharray="7 7"
        points={trajectory}
      />
      <MotionArrow
        x1={originX}
        y1={groundY - simulation.height * scale}
        x2={originX + Math.cos(angle) * vectorLength}
        y2={
          groundY - simulation.height * scale - Math.sin(angle) * vectorLength
        }
        label="v₀"
      />
      <MotionLine x1={x} y1={y} x2={x} y2={groundY} dotted />
      <MotionArrow x1={x} y1={y + 13} x2={x} y2={y + 68} label="g" />
      <MotionDot x={x} y={y} />
      <MotionLabel
        x={x + 18}
        y={y - 14}
        text={`(${point.x.toFixed(1)}, ${point.y.toFixed(1)}) m`}
      />
    </MotionScene>
  )
}
