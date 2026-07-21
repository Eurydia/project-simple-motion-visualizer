import type { FC } from 'react'
import { LinearMotionScene } from '../../components/linear-motion/LinearMotionScene'
import { MotionLabLayout } from '../../components/layout/MotionLabLayout'
import { useLinearMotion } from '../../hooks/use-linear-motion'
import { linearAppearance } from './config'
import { LinearMotionForm } from './LinearMotionForm'

export const LinearMotionLab: FC = () => {
  const controller = useLinearMotion()
  return (
    <MotionLabLayout
      appearance={linearAppearance}
      parameterForm={<LinearMotionForm controller={controller} />}
      visualization={
        <LinearMotionScene
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
