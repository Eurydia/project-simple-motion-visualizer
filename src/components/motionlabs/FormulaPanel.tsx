import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import type { MotionAppearance } from '../../types/motion'
import { MathText } from './MathText'

export const FormulaPanel: FC<{ appearance: MotionAppearance }> = ({
  appearance,
}) => (
  <Card
    elevation={0}
    sx={(t) => ({
      backgroundColor: t.palette.primary.light,
      color: t.palette.primary.dark,
    })}
  >
    <CardContent sx={{ padding: 3, textAlign: 'center' }}>
      <Typography component="div" variant="h5" sx={{ fontWeight: 700 }}>
        <MathText math={appearance.formula} display />
      </Typography>
    </CardContent>
  </Card>
)
