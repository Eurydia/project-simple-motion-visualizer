import { motion } from 'motion/react'
import type { FC } from 'react'
import { useMotionSceneContext } from './MotionSceneContext'
import { useTheme } from '@mui/material/styles'

export const MotionDot: FC<{ x: number; y: number }> = (props) => {
  const { glowFilterId } = useMotionSceneContext()
  const t = useTheme()
  return (
    <motion.circle
      initial={false}
      animate={{ cx: props.x, cy: props.y }}
      transition={{ duration: 0 }}
      r="13"
      fill={t.palette.primary.main}
      stroke={t.palette.primary.dark}
      strokeWidth="3"
      filter={`url(#${glowFilterId})`}
    />
  )
}
