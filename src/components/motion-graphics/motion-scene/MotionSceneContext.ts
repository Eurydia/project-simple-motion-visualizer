import { createContext, useContext } from 'react'
import type { MotionAppearance } from '../../../types/motion'

export const MotionSceneContext = createContext<{
  appearance: MotionAppearance
  arrowMarkerId: string
  glowFilterId: string
} | null>(null)

export const useMotionSceneContext = () => {
  const context = useContext(MotionSceneContext)
  if (context === null)
    throw new Error('Motion-scene primitives must render inside MotionScene.')
  return context
}
