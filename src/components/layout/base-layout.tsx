import { getLocaleFontFamily } from '#/lib/i18n/font-family'
import { getLocale } from '#/lib/paraglide/runtime'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import type { FC, ReactNode } from 'react'

export const BaseLayout: FC<{
  title: string
  color: string
  children: ReactNode
}> = ({ title, color, children }) => {
  return (
    <>
      <Box
        sx={{ backgroundColor: color, paddingY: { xs: 4, md: 5 }, paddingX: 2 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontFamily: getLocaleFontFamily(),
              fontWeight: 700,
              textTransform: 'capitalize',
              overflowWrap: 'break-word',
            }}
          >
            {title}
          </Typography>
        </Container>
      </Box>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ paddingY: { xs: 6, md: 8 } }}
      >
        {children}
      </Container>
    </>
  )
}
