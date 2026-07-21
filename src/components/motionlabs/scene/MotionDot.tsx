import { animated, useSpring } from '@react-spring/web'
import type { FC } from 'react'
import { useMotionSceneContext } from './MotionSceneContext'
import { useTheme } from '@mui/material/styles'

export const MotionDot: FC<{ x: number; y: number }> = (props) => {
  const { glowFilterId } = useMotionSceneContext()
  const t = useTheme()
  const position = useSpring({
    to: { cx: props.x, cy: props.y },
    immediate: true,
  })

  return (
    <animated.circle
      cx={position.cx}
      cy={position.cy}
      r="13"
      fill={t.palette.primary.main}
      stroke={t.palette.primary.dark}
      strokeWidth="3"
      filter={`url(#${glowFilterId})`}
    />
  )
}
