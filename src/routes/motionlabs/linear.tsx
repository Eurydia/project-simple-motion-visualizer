import { createFileRoute } from '@tanstack/react-router'
import { LinearMotionLab } from '../../features/linear/LinearMotionLab'
import { ThemeProvider } from '@mui/system'
import { LINEAR_THEME } from '#/theme/motionlabs/linear'

export const Route = createFileRoute('/motionlabs/linear')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ThemeProvider theme={LINEAR_THEME}>
      <LinearMotionLab />
    </ThemeProvider>
  )
}
