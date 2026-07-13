import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import type { FC, ReactNode } from 'react'
import type { MotionAppearance } from '../types/motion'
import { BaseLayout } from './BaseLayout'
import { FormulaPanel } from './FormulaPanel'
import { PlaybackPanel } from './PlaybackPanel'

export const MotionLabLayout: FC<{
  appearance: MotionAppearance
  parameterForm: ReactNode
  visualization: ReactNode
  currentTime: number
  duration: number
  playing: boolean
  onPlayingChange: (playing: boolean) => void
  onTimeChange: (time: number) => void
  onStepFrame: (direction: -1 | 1) => void
  onReset: () => void
}> = ({
  appearance,
  parameterForm,
  visualization,
  currentTime,
  duration,
  playing,
  onPlayingChange,
  onTimeChange,
  onStepFrame,
  onReset,
}) => {
  return (
    <BaseLayout title={appearance.title} color={appearance.color}>
      <Stack spacing={4}>
        <Grid container spacing={4} sx={{ display: 'flex' }}>
          <Grid size={{ xs: 12, md: 4 }}>{parameterForm}</Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              <PlaybackPanel
                appearance={appearance}
                visualization={visualization}
                currentTime={currentTime}
                duration={duration}
                playing={playing}
                onPlayingChange={onPlayingChange}
                onTimeChange={onTimeChange}
                onStepFrame={onStepFrame}
                onReset={onReset}
              />
              <FormulaPanel appearance={appearance} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </BaseLayout>
  )
}
