import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { PARABOLA_THEME } from "#/theme/motionlabs/parabola";
import { ParabolaMotionLab } from "../../features/parabola/ParabolaMotionLab";

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
