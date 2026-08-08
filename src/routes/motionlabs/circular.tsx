import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { CircularMotionLab } from "#/components/motionlabs/labs/circular/CircularMotionLab";
import { CIRCULAR_THEME } from "#/theme/motionlabs/circular";

export const Route = createFileRoute("/motionlabs/circular")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider theme={CIRCULAR_THEME}>
      <CircularMotionLab />
    </ThemeProvider>
  );
}
