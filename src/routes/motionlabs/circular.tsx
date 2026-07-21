import { createFileRoute } from '@tanstack/react-router'
import { CircularMotionLab } from '../../features/circular/CircularMotionLab'
import { CIRCULAR_THEME } from '#/theme/motionlabs/circular'
import { ThemeProvider } from '@mui/material/styles'

export const Route = createFileRoute('/motionlabs/circular')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ThemeProvider theme={CIRCULAR_THEME}>
      <CircularMotionLab />
    </ThemeProvider>
  )
}
