import type { SpringSimulation } from '#/features/spring/computation'
import {
  getSpringMeasurements,
  getSpringPosition,
} from '#/features/spring/computation'
import { m } from '#/lib/paraglide/messages'
import { useTheme } from '@mui/material/styles'
import { animated, useSpring } from '@react-spring/web'
import type { FC } from 'react'
import { MotionArrow } from '../scene-elements/MotionArrow'
import { MotionDot } from '../scene-elements/MotionDot'
import { MotionLabel } from '../scene-elements/MotionLabel'
import { MotionLine } from '../scene-elements/MotionLine'
import { MotionScene } from '../scene-elements/MotionScene'

export const SpringMotionScene: FC<{
  simulation: SpringSimulation
  time: number
}> = ({ simulation, time }) => {
  const equilibrium = 400
  const y = 210
  const amplitude = Math.min(240, simulation.amplitude * 42)
  const x =
    equilibrium +
    (getSpringPosition(simulation, time) / simulation.amplitude) * amplitude
  const wall = 80
  const points = Array.from({ length: 19 }, (_, index) => {
    const px = wall + ((x - wall) * index) / 18
    const py = y + (index === 0 || index === 18 ? 0 : index % 2 ? -13 : 13)
    return `${px},${py}`
  }).join(' ')

  const springShape = useSpring({
    to: { points },
    immediate: true,
  })

  const t = useTheme()
  return (
    <MotionScene
      time={time}
      measurements={getSpringMeasurements(simulation, time)}
    >
      <MotionLine x1={equilibrium} y1={76} x2={equilibrium} y2={344} dashed />
      <MotionLabel
        x={equilibrium + 8}
        y={84}
        text={m.annotation_equilibrium()}
      />
      <MotionLine
        x1={equilibrium - amplitude}
        y1={162}
        x2={equilibrium + amplitude}
        y2={162}
        dotted
      />
      <MotionLine
        x1={equilibrium - amplitude}
        y1={162}
        x2={equilibrium - amplitude}
        y2={y}
        dotted
      />
      <MotionLine
        x1={equilibrium + amplitude}
        y1={162}
        x2={equilibrium + amplitude}
        y2={y}
        dotted
      />
      <MotionLabel
        x={equilibrium}
        y={152}
        text={m.annotation_amplitude_envelope()}
        centered
      />
      <rect x={wall - 8} y={y - 70} width="8" height="140" fill="#cfd8dc" />
      <animated.polyline
        points={springShape.points}
        fill="none"
        stroke={t.palette.primary.dark}
        strokeWidth="3"
      />
      <MotionLine x1={equilibrium} y1={y} x2={equilibrium} y2={y + 54} dotted />
      <MotionLine x1={x} y1={y + 13} x2={x} y2={y + 54} dotted />
      <MotionArrow
        x1={equilibrium}
        y1={y + 54}
        x2={x}
        y2={y + 54}
        label="x(t)"
      />
      <MotionDot x={x} y={y} />
    </MotionScene>
  )
}
