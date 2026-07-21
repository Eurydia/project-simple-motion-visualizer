import { createFileRoute } from '@tanstack/react-router'
import { SpringMotionLab } from '../../features/spring/SpringMotionLab'
import { ThemeProvider } from '@mui/material/styles'
import { SPRING_THEME } from '#/theme/motionlabs/spring'

export const Route = createFileRoute('/motionlabs/spring')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ThemeProvider theme={SPRING_THEME}>
      <SpringMotionLab />
    </ThemeProvider>
  )
}
