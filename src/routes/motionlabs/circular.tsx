import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { CIRCULAR_THEME } from "#/theme/motionlabs/circular";
import { CircularMotionLab } from "../../features/circular/CircularMotionLab";

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
