import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { ParameterFormLayout } from "#/components/motionlabs/forms/ParameterFormLayout";
import { ParameterSetSelector } from "#/components/motionlabs/forms/ParameterSetSelector";
import type { LinearParameterSetId } from "#/features/linear/config";
import { linearParameterSets } from "#/features/linear/config";
import type { useLinearMotion } from "#/hooks/use-linear-motion";

const isLinearParameterSetId = (value: string): value is LinearParameterSetId =>
  value === "velocity" || value === "endpoints";
export const LinearMotionForm: FC<{
  controller: ReturnType<typeof useLinearMotion>;
}> = ({ controller }) => {
  const parameterSet = linearParameterSets.find(
    (set) => set.id === controller.parameterSetId,
  );
  if (parameterSet === undefined)
    throw new Error(
      `Unknown linear parameter set: ${controller.parameterSetId}`,
    );
  return (
    <ParameterFormLayout
      selector={
        <ParameterSetSelector
          options={linearParameterSets}
          activeValueId={controller.parameterSetId}
          onChange={(id) => {
            if (isLinearParameterSetId(id)) controller.selectParameterSet(id);
          }}
        />
      }
      fields={
        <Stack component="section" spacing={3}>
          {parameterSet.parameters.map((parameter) => (
            <controller.form.AppField key={parameter.key} name={parameter.key}>
              {(field) => <field.MotionNumberField parameter={parameter} />}
            </controller.form.AppField>
          ))}
        </Stack>
      }
    />
  );
};
