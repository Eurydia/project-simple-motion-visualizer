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
import { RouterCardActions } from '#/components/RouterCardAction.js'
import type { FileRouteTypes } from '#/routeTree.gen.js'

const motionCards: readonly {
  id: MotionKind
  route: FileRouteTypes['to']
  appearance: MotionAppearance
  icon: ReactNode
}[] = [
  {
    id: 'spring',
    route: '/spring',
    appearance: springAppearance,
    icon: <WavesRounded fontSize="inherit" />,
  },
  {
    id: 'parabola',
    route: '/parabola',
    appearance: parabolaAppearance,
    icon: <ShowChartRounded fontSize="inherit" />,
  },
  {
    id: 'linear',
    route: '/linear',
    appearance: linearAppearance,
    icon: (
      <HeightRounded fontSize="inherit" sx={{ transform: 'rotate(90deg)' }} />
    ),
  },
  {
    id: 'circular',
    route: '/circular',
    appearance: circularAppearance,
    icon: <RotateRightRounded fontSize="inherit" />,
  },
]
export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <BaseLayout title={m.app_title()} color="#81d4fa">
      <Grid container spacing={4}>
        {motionCards.map(({ id, route, appearance, icon }) => (
          <Grid key={id} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                bgcolor: appearance.light,
                color: appearance.dark,
                ':hover': {
                  boxShadow: (t) => t.shadows[8],
                },
              }}
            >
              <RouterCardActions
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
              </RouterCardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </BaseLayout>
  )
}
