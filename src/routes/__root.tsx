import { createRootRoute, Outlet } from '@tanstack/react-router'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/system/ThemeProvider'
import type { FC } from 'react'
import { getLocale, setLocale } from '../paraglide/runtime.js'
import { APP_THEME } from '../theme/app.js'
import { m } from '#/paraglide/messages.js'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { RouterLink } from '#/components/RouterLink.js'
import Divider from '@mui/material/Divider'

const NAV_ITEMS = [
  [m.nav_spring, '/spring'],
  [m.nav_parabola, '/parabola'],
  [m.nav_linear, '/linear'],
  [m.nav_circular, '/circular'],
] as const

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
            {NAV_ITEMS.map(([label, to]) => (
              <RouterLink
                key={to}
                to={to}
                color="textPrimary"
                sx={{ cursor: 'pointer' }}
              >
                {label()}
              </RouterLink>
            ))}
          </Stack>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => setLocale(getLocale() === 'en' ? 'th' : 'en')}
          >
            {getLocale() === 'en' ? m.thai() : m.english()}
          </Typography>
        </Stack>
      </Container>
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
