import type { FC } from 'react'
import { SpringMotionScene } from '../../components/spring-motion/SpringMotionScene'
import { MotionLabLayout } from '../../components/MotionLabLayout'
import { useSpringMotion } from '../../hooks/use-spring-motion'
import { SpringMotionForm } from './SpringMotionForm'
import { springAppearance } from './config'

export const SpringMotionLab: FC = () => {
  const controller = useSpringMotion()
  return (
    <MotionLabLayout
      appearance={springAppearance}
      parameterForm={<SpringMotionForm controller={controller} />}
      visualization={
        <SpringMotionScene
          simulation={controller.simulation}
          time={controller.currentTime}
        />
      }
      currentTime={controller.currentTime}
      duration={controller.duration}
      playing={controller.playing}
      onPlayingChange={controller.setPlaying}
      onTimeChange={controller.setCurrentTime}
      onStepFrame={controller.stepFrame}
      onReset={controller.reset}
    />
  )
}
