import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import type { FC } from 'react'
import { MathText } from '../MathText'
import type { MotionAppearance, MotionParameter } from '../../types/motion'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const MotionNumberField: FC<{
  parameter: MotionParameter<string>
  appearance: MotionAppearance
}> = ({ parameter, appearance }) => {
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
          size="small"
          sx={{
            bgcolor: appearance.light,
            color: appearance.dark,
            fontFamily: 'serif',
            fontWeight: 800,
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
          htmlInput: { step: parameter.step },
          input: {
            endAdornment: parameter.unit ? (
              <InputAdornment position="end">{parameter.unit}</InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: appearance.dark,
          },
        }}
      />
    </Box>
  )
}

export const { useAppForm: useMotionForm } = createFormHook({
  fieldComponents: { MotionNumberField },
  formComponents: {},
  fieldContext,
  formContext,
})
