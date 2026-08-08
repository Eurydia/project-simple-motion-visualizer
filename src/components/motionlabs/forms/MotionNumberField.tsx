import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import type { FC } from "react";
import { useFieldContext } from "#/lib/form/form-contexts";
import type { MotionParameter } from "#/types/motion";
import { MathText } from "../ui/MathText";

export const MotionNumberField: FC<{
  parameter: MotionParameter<string>;
}> = ({ parameter }) => {
  const field = useFieldContext<number>();
  const error = field.state.meta.errors[0];
  const helperText =
    typeof error === "object" && error !== null && "message" in error
      ? String(error.message)
      : parameter.hint;
  return (
    <Box component="section">
      <Stack
        component="header"
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1 }}
      >
        <Typography component="h2" variant="body1" sx={{ fontWeight: 700 }}>
          {parameter.label}
        </Typography>
        <Chip
          component="data"
          value={parameter.symbol}
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
        value={Number.isNaN(field.state.value) ? "" : field.state.value}
        error={!field.state.meta.isValid}
        helperText={helperText}
        onBlur={field.handleBlur}
        onChange={(event) => {
          const value = event.target.value;
          field.handleChange(value === "" ? Number.NaN : Number(value));
        }}
        slotProps={{
          htmlInput: { step: parameter.step },
          input: {
            endAdornment: parameter.unit ? (
              <InputAdornment component="abbr" position="end">
                {parameter.unit}
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </Box>
  );
};
