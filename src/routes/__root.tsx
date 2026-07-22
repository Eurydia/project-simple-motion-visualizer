import { NotebookAnnotation } from '#/components/ui/NotebookAnnotation'
import { RouterLink } from '#/components/router/RouterLink'
import { m } from '#/lib/paraglide/messages'
import { getLocale, setLocale } from '#/lib/paraglide/runtime'
import type { FileRouteTypes } from '#/routeTree.gen'
import { APP_THEME } from '#/theme/app'
import TranslateIcon from '@mui/icons-material/Translate'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import ThemeProvider from '@mui/system/ThemeProvider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

const NAV_ITEMS: ReadonlyArray<
  Readonly<{ label: string; to: FileRouteTypes['to'] }>
> = [
  { label: m.nav_spring(), to: '/motionlabs/spring' },
  { label: m.nav_parabola(), to: '/motionlabs/parabola' },
  { label: m.nav_linear(), to: '/motionlabs/linear' },
  { label: m.nav_circular(), to: '/motionlabs/circular' },
]

const RootComponent: FC = () => {
  document.documentElement.lang = getLocale()
  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'rgba(255, 254, 249, 0.84)',
            border: '1px dashed rgba(36, 66, 87, 0.36)',
            boxShadow: '2px 3px 0 rgba(36, 66, 87, 0.1)',
            px: { xs: 2, md: 3 },
            py: 1.25,
          }}
        >
          <Stack
            divider={<Divider flexItem orientation="vertical" />}
            direction="row"
            useFlexGap
            spacing={2}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              useFlexGap
              spacing={2}
              sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}
            >
              <NotebookAnnotation
                color="#e95f62"
                padding={[1, 2]}
                type="underline"
              >
                <RouterLink
                  sx={{ cursor: 'pointer', fontWeight: 700 }}
                  color="textPrimary"
                  to="/"
                >
                  {m.nav_home()}
                </RouterLink>
              </NotebookAnnotation>
              {NAV_ITEMS.map(({ label, to }) => (
                <RouterLink
                  key={to}
                  to={to}
                  color="textPrimary"
                  sx={{ cursor: 'pointer' }}
                >
                  {label}
                </RouterLink>
              ))}
            </Stack>
            <Button
              disableElevation
              disableRipple
              variant="text"
              color="inherit"
              size="large"
              startIcon={<TranslateIcon />}
              onClick={() => setLocale(getLocale() === 'en' ? 'th' : 'en')}
            >
              {getLocale() === 'en' ? m.thai() : m.english()}
            </Button>
          </Stack>
        </Paper>
      </Container>
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootComponent })
