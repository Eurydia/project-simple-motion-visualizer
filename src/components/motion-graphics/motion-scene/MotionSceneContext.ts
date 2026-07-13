import { createContext, useContext } from 'react'

export const MotionSceneContext = createContext<{
  arrowMarkerId: string
  glowFilterId: string
} | null>(null)

export const useMotionSceneContext = () => {
  const context = useContext(MotionSceneContext)
  if (context === null)
    throw new Error('Motion-scene primitives must render inside MotionScene.')
  return context
}
