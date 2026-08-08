import type { FC } from "react";
import { MotionLab } from "#/components/motionlabs/MotionLab";
import { linearAppearance } from "#/features/linear/config";
import { useLinearMotion } from "#/hooks/use-linear-motion";
import { LinearMotionForm } from "./LinearMotionForm";
import { LinearMotionScene } from "./LinearMotionScene";

export const LinearMotionLab: FC = () => {
  const controller = useLinearMotion();
  return (
    <MotionLab
      appearance={linearAppearance}
      parameterForm={<LinearMotionForm controller={controller} />}
      visualization={
        <LinearMotionScene
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
