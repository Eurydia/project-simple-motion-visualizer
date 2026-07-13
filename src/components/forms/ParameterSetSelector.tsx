import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import type { FC } from 'react'
import type { MotionParameterSet } from '../../types/motion'

export const ParameterSetSelector: FC<{
  sets: readonly MotionParameterSet<string, string>[]
  selectedId: string
  onChange: (id: string) => void
}> = ({ sets, selectedId, onChange }) => (
  <ToggleButtonGroup
    exclusive
    fullWidth
    size="small"
    value={selectedId}
    onChange={(_, nextId: string | null) => {
      if (nextId !== null) onChange(nextId)
    }}
  >
    {sets.map((set) => (
      <ToggleButton disableTouchRipple key={set.id} value={set.id}>
        {set.label()}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
)
