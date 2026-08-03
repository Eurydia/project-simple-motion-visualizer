import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { SPRING_THEME } from "#/theme/motionlabs/spring";
import { SpringMotionLab } from "../../features/spring/SpringMotionLab";

export const Route = createFileRoute("/motionlabs/spring")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider theme={SPRING_THEME}>
      <SpringMotionLab />
    </ThemeProvider>
  );
}
