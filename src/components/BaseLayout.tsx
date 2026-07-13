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
        sx={{ bgcolor: color, color: '#102027', py: { xs: 4, md: 5 }, px: 2 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 900,
            textTransform: 'capitalize',
            maxWidth: 'lg',
            mx: 'auto',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {children}
      </Container>
    </>
  )
}
