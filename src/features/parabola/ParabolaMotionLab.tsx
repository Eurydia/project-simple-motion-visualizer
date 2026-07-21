import type { FC } from 'react'
import { ParabolaMotionScene } from '../../components/motionlabs/scenes/ParabolaMotionScene'
import { MotionLabLayout } from '../../components/layout/MotionLabLayout'
import { useParabolaMotion } from '../../hooks/use-parabola-motion'
import { parabolaAppearance } from './config'
import { ParabolaMotionForm } from './ParabolaMotionForm'

export const ParabolaMotionLab: FC = () => {
  const controller = useParabolaMotion()
  return (
    <MotionLabLayout
      appearance={parabolaAppearance}
      parameterForm={<ParabolaMotionForm controller={controller} />}
      visualization={
        <ParabolaMotionScene
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
