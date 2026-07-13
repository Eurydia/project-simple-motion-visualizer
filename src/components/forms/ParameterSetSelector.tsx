import type { FC } from 'react'
import { Stack } from '@mui/system'
import Button from '@mui/material/Button'

export const ParameterSetSelector: FC<{
  options: ReadonlyArray<Readonly<{ id: string; label: string }>>
  activeValueId: string
  onChange: (id: string) => void
}> = (props) => {
  return (
    <Stack direction={'row'} spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {props.options.map((opt) => (
        <Button
          disableElevation
          key={opt.id}
          variant={opt.id === props.activeValueId ? 'contained' : 'outlined'}
          onClick={() => {
            if (props.activeValueId !== opt.id) {
              props.onChange(opt.id)
            }
          }}
        >
          {opt.label}
        </Button>
      ))}
    </Stack>
  )
}
