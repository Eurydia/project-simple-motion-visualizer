import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { ParabolaMotionLab } from "#/components/motionlabs/labs/parabola/ParabolaMotionLab";
import { PARABOLA_THEME } from "#/theme/motionlabs/parabola";

export const Route = createFileRoute("/motionlabs/parabola")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider theme={PARABOLA_THEME}>
      <ParabolaMotionLab />
    </ThemeProvider>
  );
}
