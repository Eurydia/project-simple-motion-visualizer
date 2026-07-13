import type { FC } from 'react'
import { CircularMotionScene } from '../../components/circular-motion/CircularMotionScene'
import { MotionLabLayout } from '../../components/MotionLabLayout'
import { useCircularMotion } from '../../hooks/use-circular-motion'
import { circularAppearance } from './config'
import { CircularMotionForm } from './CircularMotionForm'

export const CircularMotionLab: FC = () => {
  const controller = useCircularMotion()
  return (
    <MotionLabLayout
      appearance={circularAppearance}
      parameterForm={<CircularMotionForm controller={controller} />}
      visualization={
        <CircularMotionScene
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
