import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { SpringMotionLab } from "#/components/motionlabs/labs/spring/SpringMotionLab";
import { SPRING_THEME } from "#/theme/motionlabs/spring";

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
