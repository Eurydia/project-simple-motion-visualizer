import HeightRounded from '@mui/icons-material/HeightRounded'
import RotateRightRounded from '@mui/icons-material/RotateRightRounded'
import ShowChartRounded from '@mui/icons-material/ShowChartRounded'
import WavesRounded from '@mui/icons-material/WavesRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { BaseLayout } from '../components/BaseLayout'
import { circularAppearance } from '../features/circular/config'
import { linearAppearance } from '../features/linear/config'
import { parabolaAppearance } from '../features/parabola/config'
import { springAppearance } from '../features/spring/config'
import { m } from '../paraglide/messages.js'
import type { MotionAppearance, MotionKind } from '../types/motion'
import { RouterCardAction } from '#/components/RouterCardAction.js'
import type { FileRouteTypes } from '#/routeTree.gen.js'
import { ThemeProvider } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import { SPRING_THEME } from '#/theme/spring.js'
import { PARABOLA_THEME } from '#/theme/parabola.js'
import { LINEAR_THEME } from '#/theme/linear.js'
import { CIRCULAR_THEME } from '#/theme/circular.js'

const motionCards: readonly {
  id: MotionKind
  route: FileRouteTypes['to']
  appearance: MotionAppearance
  icon: ReactNode
  theme: Theme
}[] = [
  {
    id: 'spring',
    route: '/spring',
    appearance: springAppearance,
    icon: <WavesRounded fontSize="inherit" />,
    theme: SPRING_THEME,
  },
  {
    id: 'parabola',
    route: '/parabola',
    appearance: parabolaAppearance,
    icon: <ShowChartRounded fontSize="inherit" />,
    theme: PARABOLA_THEME,
  },
  {
    id: 'linear',
    route: '/linear',
    appearance: linearAppearance,
    icon: (
      <HeightRounded fontSize="inherit" sx={{ transform: 'rotate(90deg)' }} />
    ),
    theme: LINEAR_THEME,
  },
  {
    id: 'circular',
    route: '/circular',
    appearance: circularAppearance,
    icon: <RotateRightRounded fontSize="inherit" />,
    theme: CIRCULAR_THEME,
  },
]
export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <BaseLayout title={m.app_title()} color="#81d4fa">
      <Grid container spacing={4}>
        {motionCards.map(({ theme, id, route, appearance, icon }) => (
          <Grid key={id} size={{ xs: 12, md: 6 }}>
            <ThemeProvider theme={theme}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: (t) => t.palette.primary.light,
                  color: (t) => t.palette.primary.dark,
                  ':hover': {
                    boxShadow: (t) => t.shadows[8],
                  },
                }}
              >
                <RouterCardAction
                  to={route}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Stack
                    sx={{ padding: 2 }}
                    direction={{ xs: 'column', md: 'row' }}
                  >
                    <CardContent
                      sx={{
                        minHeight: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: { xs: 70, md: 92 },
                      }}
                    >
                      {icon}
                    </CardContent>
                    <CardHeader title={appearance.title} />
                  </Stack>
                </RouterCardAction>
              </Card>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    </BaseLayout>
  )
}
