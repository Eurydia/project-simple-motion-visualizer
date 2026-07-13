import type { FC, ReactNode } from 'react'
import { useId } from 'react'
import { motion } from 'motion/react'
import type { MotionAppearance, MotionMeasurement } from '../../../types/motion'
import { SceneDefinitions } from './SceneDefinitions'
import { MotionSceneContext } from './MotionSceneContext'
import { SceneMeasurements } from './SceneMeasurements'
import { sceneTokens } from './scene-tokens'

export const MotionScene: FC<{
  appearance: MotionAppearance
  time: number
  measurements: readonly MotionMeasurement[]
  children: ReactNode
}> = ({ appearance, time, measurements, children }) => {
  const instanceId = useId().replace(/:/g, '')
  const arrowMarkerId = `motion-arrow-${instanceId}`
  const glowFilterId = `motion-glow-${instanceId}`
  return (
    <MotionSceneContext.Provider
      value={{ appearance, arrowMarkerId, glowFilterId }}
    >
      <svg
        viewBox={`0 0 ${sceneTokens.width} ${sceneTokens.height}`}
        role="img"
        style={{
          display: 'block',
          width: '100%',
          minHeight: 300,
          background: '#ffffff',
        }}
      >
        <SceneDefinitions
          instanceId={instanceId}
          arrowMarkerId={arrowMarkerId}
          glowFilterId={glowFilterId}
          arrowColor={appearance.dark}
        />
        <rect
          width={sceneTokens.width}
          height={sceneTokens.height}
          fill={`url(#motion-grid-${instanceId})`}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
        >
          {children}
        </motion.g>
        <SceneMeasurements
          color={appearance.dark}
          time={time}
          measurements={measurements}
        />
      </svg>
    </MotionSceneContext.Provider>
  )
}
