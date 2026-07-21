import type { MotionParameter } from '#/types/motion'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Box, Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import { MathText } from '../MathText'
import { useFieldContext } from '#/lib/form/form-contexts'

export const MotionNumberField: FC<{
  parameter: MotionParameter<string>
}> = ({ parameter }) => {
  const field = useFieldContext<number>()
  const error = field.state.meta.errors[0]
  const helperText =
    typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message)
      : parameter.hint
  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}
      >
        <Typography sx={{ fontWeight: 700 }}>{parameter.label}</Typography>
        <Chip
          label={<MathText math={parameter.symbol} />}
          sx={{
            bgcolor: (t) => t.palette.primary.light,
            color: (t) => t.palette.primary.dark,
            fontWeight: 700,
          }}
        />
      </Stack>
      <TextField
        fullWidth
        type="number"
        name={field.name}
        value={Number.isNaN(field.state.value) ? '' : field.state.value}
        error={!field.state.meta.isValid}
        helperText={helperText}
        onBlur={field.handleBlur}
        onChange={(event) => {
          const value = event.target.value
          field.handleChange(value === '' ? Number.NaN : Number(value))
        }}
        slotProps={{
          htmlInput: { step: parameter.step, 'aria-label': parameter.label },
          input: {
            endAdornment: parameter.unit ? (
              <InputAdornment position="end">{parameter.unit}</InputAdornment>
            ) : undefined,
          },
        }}
      />
    </Box>
  )
}
