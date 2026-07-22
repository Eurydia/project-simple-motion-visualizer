import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import type { FC, ReactNode } from 'react'

export const ParameterFormLayout: FC<{
  selector: ReactNode
  fields: ReactNode
}> = ({ selector, fields }) => (
  <Card variant="outlined" sx={{ backgroundColor: 'rgba(255, 254, 249, 0.85)' }}>
    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
      <Stack spacing={4}>
        {selector}
        {fields}
      </Stack>
    </CardContent>
  </Card>
)
