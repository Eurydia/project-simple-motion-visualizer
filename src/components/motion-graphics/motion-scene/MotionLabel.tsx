import type { FC } from 'react'
import { sceneTokens } from './scene-tokens'

export const MotionLabel: FC<{
  x: number
  y: number
  text: string
  centered?: boolean
}> = ({ x, y, text, centered = false }) => (
  <text
    x={x}
    y={y}
    fill={sceneTokens.ink}
    fontFamily="monospace"
    fontSize="12"
    textAnchor={centered ? 'middle' : 'start'}
  >
    {text}
  </text>
)
