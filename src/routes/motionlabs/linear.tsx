import { ThemeProvider } from "@mui/system";
import { createFileRoute } from "@tanstack/react-router";
import { LINEAR_THEME } from "#/theme/motionlabs/linear";
import { LinearMotionLab } from "../../features/linear/LinearMotionLab";

export const Route = createFileRoute("/motionlabs/linear")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider theme={LINEAR_THEME}>
      <LinearMotionLab />
    </ThemeProvider>
  );
}
