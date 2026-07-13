import { m } from '../../paraglide/messages'
import type { FC } from 'react'
import { SpringMotionScene } from '../../components/spring-motion/SpringMotionScene'
import { MotionLabLayout } from '../../components/MotionLabLayout'
import { useSpringMotion } from '../../hooks/use-spring-motion'
import { SpringMotionForm } from './SpringMotionForm'

export const SpringMotionLab: FC = () => {
  const controller = useSpringMotion()
  return (
    <MotionLabLayout
      appearance={{
        title: 'wdfas',
        formula: 'x(t) = A e^{-bt} \\cos(\\omega t)',
        color: '#80cbc4',
        light: '#b2dfdb',
        dark: '#004d40',
      }}
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
