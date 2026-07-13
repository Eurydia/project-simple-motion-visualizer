import { motion } from 'motion/react'
import type { FC } from 'react'
import { useMotionSceneContext } from './MotionSceneContext'

export const MotionDot: FC<{ x: number; y: number }> = ({ x, y }) => {
  const { appearance, glowFilterId } = useMotionSceneContext()
  return (
    <motion.circle
      initial={false}
      animate={{ cx: x, cy: y }}
      transition={{ duration: 0 }}
      r="13"
      fill={appearance.color}
      stroke={appearance.dark}
      strokeWidth="3"
      filter={`url(#${glowFilterId})`}
    />
  )
}
