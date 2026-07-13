import Stack from '@mui/material/Stack'
import type { FC } from 'react'
import type { useSpringMotion } from '../../hooks/use-spring-motion'
import { ParameterFormLayout } from '../../components/forms/ParameterFormLayout'
import { ParameterSetSelector } from '../../components/forms/ParameterSetSelector'
import { springAppearance, springParameterSets } from './config'

export const SpringMotionForm: FC<{
  controller: ReturnType<typeof useSpringMotion>
}> = ({ controller }) => {
  const parameterSet = springParameterSets.find(
    (set) => set.id === controller.parameterSetId,
  )
  if (parameterSet === undefined)
    throw new Error(
      `Unknown spring parameter set: ${controller.parameterSetId}`,
    )
  return (
    <ParameterFormLayout
      selector={
        <ParameterSetSelector
          options={springParameterSets}
          activeValueId={controller.parameterSetId}
          onChange={(id) => {
            if (id === 'physical' || id === 'frequency' || id === 'period') {
              controller.selectParameterSet(id)
            }
          }}
        />
      }
      fields={
        <Stack spacing={3}>
          {parameterSet.parameters.map((parameter) => (
            <controller.form.AppField key={parameter.key} name={parameter.key}>
              {(field) => (
                <field.MotionNumberField
                  parameter={parameter}
                  appearance={springAppearance}
                />
              )}
            </controller.form.AppField>
          ))}
        </Stack>
      }
    />
  )
}
