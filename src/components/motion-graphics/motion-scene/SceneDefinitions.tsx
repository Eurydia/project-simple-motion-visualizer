import type { FC } from 'react'
import { sceneTokens } from './scene-tokens'

export const SceneDefinitions: FC<{
  instanceId: string
  arrowMarkerId: string
  glowFilterId: string
  arrowColor: string
}> = ({ instanceId, arrowMarkerId, glowFilterId, arrowColor }) => (
  <defs>
    <pattern
      id={`motion-grid-${instanceId}`}
      width="32"
      height="32"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M 32 0 L 0 0 0 32"
        fill="none"
        stroke={sceneTokens.grid}
        strokeDasharray="1 7"
        strokeLinecap="round"
      />
    </pattern>
    <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <marker
      id={arrowMarkerId}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} />
    </marker>
  </defs>
)
