import Stack from '@mui/material/Stack'
import type { FC } from 'react'
import type { useParabolaMotion } from '../../hooks/use-parabola-motion'
import { ParameterFormLayout } from '../../components/forms/ParameterFormLayout'
import { ParameterSetSelector } from '../../components/forms/ParameterSetSelector'
import { parabolaParameterSets } from './config'
import type { ParabolaParameterSetId } from './config'

const isParabolaParameterSetId = (
  value: string,
): value is ParabolaParameterSetId =>
  value === 'polar' || value === 'components' || value === 'apex'
export const ParabolaMotionForm: FC<{
  controller: ReturnType<typeof useParabolaMotion>
}> = ({ controller }) => {
  const parameterSet = parabolaParameterSets.find(
    (set) => set.id === controller.parameterSetId,
  )
  if (parameterSet === undefined)
    throw new Error(
      `Unknown parabola parameter set: ${controller.parameterSetId}`,
    )
  return (
    <ParameterFormLayout
      selector={
        <ParameterSetSelector
          options={parabolaParameterSets}
          activeValueId={controller.parameterSetId}
          onChange={(id) => {
            if (isParabolaParameterSetId(id)) controller.selectParameterSet(id)
          }}
        />
      }
      fields={
        <Stack spacing={3}>
          {parameterSet.parameters.map((parameter) => (
            <controller.form.AppField key={parameter.key} name={parameter.key}>
              {(field) => <field.MotionNumberField parameter={parameter} />}
            </controller.form.AppField>
          ))}
        </Stack>
      }
    />
  )
}
