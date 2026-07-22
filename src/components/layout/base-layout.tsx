import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import type { FC, ReactNode } from 'react'
import { NotebookAnnotation } from '../ui/NotebookAnnotation'

export const BaseLayout: FC<{
  title: string
  color: string
  children: ReactNode
}> = ({ title, color, children }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: color,
          borderBottom: '3px solid rgba(36, 66, 87, 0.22)',
          paddingY: { xs: 4, md: 5 },
          paddingX: 2,
        }}
      >
        <Container maxWidth="lg">
          <NotebookAnnotation color="#244257" padding={[2, 4]} type="underline">
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontFamily: '"Mali", var(--app-font-family)',
                textTransform: 'capitalize',
                overflowWrap: 'break-word',
              }}
            >
              {title}
            </Typography>
          </NotebookAnnotation>
        </Container>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ paddingY: { xs: 6, md: 8 } }}>
        <Box>{children}</Box>
      </Container>
    </>
  )
}
