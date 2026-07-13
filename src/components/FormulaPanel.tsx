import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import type { MotionAppearance } from '../types/motion'
import { MathText } from './MathText'

export const FormulaPanel: FC<{ appearance: MotionAppearance }> = ({
  appearance,
}) => (
  <Card
    elevation={0}
    sx={{ bgcolor: appearance.light, color: appearance.dark }}
  >
    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
      <Typography component="div" variant="h5" sx={{ fontWeight: 700 }}>
        <MathText math={appearance.formula} display />
      </Typography>
    </CardContent>
  </Card>
)
