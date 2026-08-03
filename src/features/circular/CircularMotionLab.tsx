import type { FC } from "react";
import { MotionLabLayout } from "#/components/layout/MotionLabLayout";
import { CircularMotionScene } from "#/components/motionlabs/scenes/CircularMotionScene";
import { useCircularMotion } from "#/hooks/use-circular-motion";
import { CircularMotionForm } from "./CircularMotionForm";
import { circularAppearance } from "./config";

export const CircularMotionLab: FC = () => {
  const controller = useCircularMotion();
  return (
    <MotionLabLayout
      appearance={circularAppearance}
      parameterForm={<CircularMotionForm controller={controller} />}
      visualization={
        <CircularMotionScene
          simulation={controller.simulation}
          time={controller.currentTime}
        />
      }
      currentTime={controller.currentTime}
      duration={controller.duration}
      playing={controller.playing}
      onPlayingChange={controller.setPlaying}
      onTimeChange={controller.setCurrentTime}
      onStepFrame={controller.stepFrame}
      onReset={controller.reset}
    />
  );
};
