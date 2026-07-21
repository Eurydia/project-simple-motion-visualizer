import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import RestartAltRounded from '@mui/icons-material/RestartAltRounded'
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { FC, ReactNode } from 'react'
import { formatTimelineTime } from '../helpers/playback'
import { m } from '../lib/paraglide/messages.js'

export const PlaybackPanel: FC<{
  visualization: ReactNode
  currentTime: number
  duration: number
  playing: boolean
  onPlayingChange: (playing: boolean) => void
  onTimeChange: (time: number) => void
  onStepFrame: (direction: -1 | 1) => void
  onReset: () => void
}> = ({
  visualization,
  currentTime,
  duration,
  playing,
  onPlayingChange,
  onTimeChange,
  onStepFrame,
  onReset,
}) => (
  <Card variant="outlined" sx={{ padding: 2 }}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <Button
          variant="contained"
          disableElevation
          startIcon={playing ? <PauseRounded /> : <PlayArrowRounded />}
          onClick={() => onPlayingChange(!playing)}
          sx={{
            bgcolor: (t) => t.palette.primary.dark,
          }}
        >
          {playing ? m.pause() : m.play()}
        </Button>
        <IconButton
          onClick={() => {
            onPlayingChange(false)
            onTimeChange(0)
          }}
        >
          <SkipPreviousRounded />
        </IconButton>
        <IconButton onClick={() => onStepFrame(-1)}>
          <ChevronLeftRounded />
        </IconButton>
        <IconButton onClick={() => onStepFrame(1)}>
          <ChevronRightRounded />
        </IconButton>
        <IconButton onClick={onReset}>
          <RestartAltRounded />
        </IconButton>
      </Stack>
      <Box>
        <Slider
          min={0}
          max={duration}
          step={Math.max(duration / 600, 0.001)}
          value={Math.min(currentTime, duration)}
          onChange={(_, value) => {
            onPlayingChange(false)
            if (typeof value === 'number') {
              onTimeChange(value)
            }
          }}
          sx={{
            color: (t) => t.palette.primary.dark,
          }}
        />
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            {formatTimelineTime(currentTime)}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontFamily: 'monospace' }}
          >
            {formatTimelineTime(duration)}
          </Typography>
        </Stack>
      </Box>
      {visualization}
    </Stack>
  </Card>
)
