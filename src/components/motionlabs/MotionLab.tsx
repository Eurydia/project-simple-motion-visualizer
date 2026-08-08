import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import type { FC, ReactNode } from "react";
import { BaseLayout } from "#/components/layout/base-layout";
import type { MotionAppearance } from "#/types/motion";
import { FormulaPanel } from "./panels/FormulaPanel";
import { PlaybackPanel } from "./panels/PlaybackPanel";

export const MotionLab: FC<{
  appearance: MotionAppearance;
  parameterForm: ReactNode;
  visualization: ReactNode;
  currentTime: number;
  duration: number;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  onTimeChange: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  onReset: () => void;
}> = ({
  appearance,
  parameterForm,
  visualization,
  currentTime,
  duration,
  playing,
  onPlayingChange,
  onTimeChange,
  onStepFrame,
  onReset,
}) => {
  const t = useTheme();

  return (
    <BaseLayout title={appearance.title} color={t.palette.primary.main}>
      <Grid
        component="section"
        container
        spacing={4}
      >
        <Grid
          component="aside"
          size={{ xs: 12, md: 4 }}
        >
          {parameterForm}
        </Grid>
        <Grid
          component="section"
          size={{ xs: 12, md: 8 }}
        >
          <Stack component="section" spacing={4}>
            <PlaybackPanel
              visualization={visualization}
              currentTime={currentTime}
              duration={duration}
              playing={playing}
              onPlayingChange={onPlayingChange}
              onTimeChange={onTimeChange}
              onStepFrame={onStepFrame}
              onReset={onReset}
            />
            <FormulaPanel appearance={appearance} />
          </Stack>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
