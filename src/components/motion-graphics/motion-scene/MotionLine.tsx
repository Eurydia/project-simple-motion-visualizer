import type { FC } from 'react'
import { sceneTokens } from './scene-tokens'

export const MotionLine: FC<{
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  dashed?: boolean
  dotted?: boolean
  width?: number
}> = ({
  x1,
  y1,
  x2,
  y2,
  color = sceneTokens.guide,
  dashed = false,
  dotted = false,
  width = 1,
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={color}
    strokeWidth={width}
    strokeDasharray={dotted ? '1 6' : dashed ? '7 6' : undefined}
    strokeLinecap={dotted ? 'round' : 'butt'}
  />
)
