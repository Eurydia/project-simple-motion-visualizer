import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import type { FC } from "react";

export const ParameterSetSelector: FC<{
  options: ReadonlyArray<Readonly<{ id: string; label: string }>>;
  activeValueId: string;
  onChange: (id: string) => void;
}> = (props) => {
  return (
    <Stack
      component="fieldset"
      direction="row"
      spacing={0.5}
      sx={{ border: 0, flexWrap: "wrap", margin: 0, padding: 0 }}
    >
      {props.options.map((opt) => {
        const selected = opt.id === props.activeValueId;
        return (
          <Button
            disableRipple
            disableElevation
            key={opt.id}
            variant="contained"
            onClick={() => {
              if (props.activeValueId !== opt.id) {
                props.onChange(opt.id);
              }
            }}
            sx={(t) => ({
              backgroundColor: selected ? t.palette.primary.dark : undefined,
              color: selected ? undefined : t.palette.primary.dark,
              ":hover": {
                color: !selected
                  ? t.palette.getContrastText(t.palette.primary.dark)
                  : undefined,
              },
            })}
          >
            {opt.label}
          </Button>
        );
      })}
    </Stack>
  );
};
