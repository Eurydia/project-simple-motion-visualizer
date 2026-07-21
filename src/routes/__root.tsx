import { RouterLink } from '#/components/router/RouterLink.js'
import { m } from '#/lib/paraglide/messages.js'
import { getLocale, setLocale } from '#/lib/paraglide/runtime.js'
import type { FileRouteTypes } from '#/routeTree.gen.js'
import { APP_THEME } from '#/theme/app.js'
import TranslateIcon from '@mui/icons-material/Translate'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          divider={<Divider flexItem orientation="vertical" />}
          direction="row"
          useFlexGap
          spacing={2}
          sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}
        >
          <Stack
            direction="row"
            useFlexGap
            spacing={2}
            sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}
          >
            <RouterLink sx={{ cursor: 'pointer' }} color="textPrimary" to="/">
              {m.nav_home()}
            </RouterLink>
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
            startIcon={<TranslateIcon />}
            onClick={() => setLocale(getLocale() === 'en' ? 'th' : 'en')}
          >
            {getLocale() === 'en' ? m.thai() : m.english()}
          </Button>
        </Stack>
      </Container>
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
