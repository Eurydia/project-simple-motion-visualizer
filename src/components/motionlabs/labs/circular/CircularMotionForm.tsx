import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { ParameterFormLayout } from "#/components/motionlabs/forms/ParameterFormLayout";
import { ParameterSetSelector } from "#/components/motionlabs/forms/ParameterSetSelector";
import type { CircularParameterSetId } from "#/features/circular/config";
import { circularParameterSets } from "#/features/circular/config";
import type { useCircularMotion } from "#/hooks/use-circular-motion";

const isCircularParameterSetId = (
  value: string,
): value is CircularParameterSetId =>
  value === "angular" || value === "period" || value === "tangential";

export const CircularMotionForm: FC<{
  controller: ReturnType<typeof useCircularMotion>;
}> = ({ controller }) => {
  const parameterSet = circularParameterSets.find(
    (set) => set.id === controller.parameterSetId,
  );
  if (parameterSet === undefined)
    throw new Error(
      `Unknown circular parameter set: ${controller.parameterSetId}`,
    );
  return (
    <ParameterFormLayout
      selector={
        <ParameterSetSelector
          options={circularParameterSets}
          activeValueId={controller.parameterSetId}
          onChange={(id) => {
            if (isCircularParameterSetId(id)) controller.selectParameterSet(id);
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
