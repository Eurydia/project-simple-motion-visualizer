import type { FC } from 'react'
import { useMotionSceneContext } from './MotionSceneContext'
import { MotionLabel } from './MotionLabel'
import { useTheme } from '@mui/material/styles'

export const MotionArrow: FC<{
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
}> = ({ x1, y1, x2, y2, label }) => {
  const { arrowMarkerId } = useMotionSceneContext()
  const t = useTheme()
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={t.palette.primary.dark}
        strokeWidth="2"
        markerEnd={`url(#${arrowMarkerId})`}
      />
      {label === undefined ? null : (
        <MotionLabel
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 9}
          text={label}
          centered
        />
      )}
    </g>
  )
}
