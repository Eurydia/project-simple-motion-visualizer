import HeightRounded from '@mui/icons-material/HeightRounded'
import RotateRightRounded from '@mui/icons-material/RotateRightRounded'
import ShowChartRounded from '@mui/icons-material/ShowChartRounded'
import WavesRounded from '@mui/icons-material/WavesRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material/styles'
import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { BaseLayout } from '../components/layout/base-layout.js'
import { circularAppearance } from '../features/circular/config'
import { linearAppearance } from '../features/linear/config'
import { parabolaAppearance } from '../features/parabola/config'
import { springAppearance } from '../features/spring/config'
import { m } from '../lib/paraglide/messages.js'
import type { MotionAppearance, MotionKind } from '../types/motion'
import { NotebookAnnotation } from '#/components/ui/NotebookAnnotation.js'
import { RouterCardAction } from '#/components/router/RouterCardAction.js'
import type { FileRouteTypes } from '#/routeTree.gen.js'
import { CIRCULAR_THEME } from '#/theme/motionlabs/circular.js'
import { LINEAR_THEME } from '#/theme/motionlabs/linear.js'
import { PARABOLA_THEME } from '#/theme/motionlabs/parabola.js'
import { SPRING_THEME } from '#/theme/motionlabs/spring.js'
import type { Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'

const MOTION_CARDS: readonly {
  id: MotionKind
  route: FileRouteTypes['to']
  appearance: MotionAppearance
  icon: ReactNode
  theme: Theme
}[] = [
  {
    id: 'spring',
    route: '/motionlabs/spring',
    appearance: springAppearance,
    icon: <WavesRounded fontSize="inherit" />,
    theme: SPRING_THEME,
  },
  {
    id: 'parabola',
    route: '/motionlabs/parabola',
    appearance: parabolaAppearance,
    icon: <ShowChartRounded fontSize="inherit" />,
    theme: PARABOLA_THEME,
  },
  {
    id: 'linear',
    route: '/motionlabs/linear',
    appearance: linearAppearance,
    icon: (
      <HeightRounded fontSize="inherit" sx={{ transform: 'rotate(90deg)' }} />
    ),
    theme: LINEAR_THEME,
  },
  {
    id: 'circular',
    route: '/motionlabs/circular',
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
        {MOTION_CARDS.map(({ theme, id, route, appearance, icon }) => (
          <Grid key={id} size={{ xs: 12, md: 6 }}>
            <ThemeProvider theme={theme}>
              <Card
                elevation={0}
                sx={(t) => ({
                  backgroundColor: t.palette.primary.light,
                  border: `1px solid ${t.palette.primary.dark}`,
                  transform: 'rotate(-0.35deg)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                  ':hover': {
                    boxShadow: t.shadows[8],
                    transform: 'translateY(-5px) rotate(0.25deg)',
                  },
                })}
              >
                <RouterCardAction
                  disableRipple
                  to={route}
                  sx={{ cursor: 'pointer' }}
                >
                  <Stack
                    sx={{ padding: 2 }}
                    direction={{ xs: 'column', md: 'row' }}
                  >
                    <CardContent
                      sx={(t) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: t.typography.h1.fontSize,
                      })}
                    >
                      {icon}
                    </CardContent>
                    <CardHeader
                      title={
                        <NotebookAnnotation
                          color={theme.palette.primary.dark}
                          type="underline"
                        >
                          {appearance.title}
                        </NotebookAnnotation>
                      }
                      slotProps={{
                        title: {
                          sx: {
                            fontWeight: 700,
                            textAlign: { xs: 'center', md: 'left' },
                          },
                        },
                      }}
                    />
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
