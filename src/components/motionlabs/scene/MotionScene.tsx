import { animated, useSpring } from '@react-spring/web'
import type { FC, ReactNode } from 'react'
import { useId } from 'react'
import type { MotionMeasurement } from '../../../types/motion'
import { SceneDefinitions } from './SceneDefinitions'
import { MotionSceneContext } from './MotionSceneContext'
import { SceneMeasurements } from '../motion-graphics/motion-scene/SceneMeasurements'
import { sceneTokens } from './scene-tokens'
import { useTheme } from '@mui/material/styles'

export const MotionScene: FC<{
  time: number
  measurements: readonly MotionMeasurement[]
  children: ReactNode
}> = (props) => {
  const instanceId = useId().replace(/:/g, '')
  const arrowMarkerId = `motion-arrow-${instanceId}`
  const glowFilterId = `motion-glow-${instanceId}`
  const t = useTheme()
  const entrance = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 180 },
  })

  return (
    <MotionSceneContext.Provider value={{ arrowMarkerId, glowFilterId }}>
      <svg
        viewBox={`0 0 ${sceneTokens.width} ${sceneTokens.height}`}
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
          arrowColor={t.palette.primary.dark}
        />
        <rect
          width={sceneTokens.width}
          height={sceneTokens.height}
          fill={`url(#motion-grid-${instanceId})`}
        />
        <animated.g style={entrance}>{props.children}</animated.g>
        <SceneMeasurements
          color={t.palette.primary.dark}
          time={props.time}
          measurements={props.measurements}
        />
      </svg>
    </MotionSceneContext.Provider>
  )
}
