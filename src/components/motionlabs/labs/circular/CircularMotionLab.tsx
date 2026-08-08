import type { FC } from "react";
import { MotionLab } from "#/components/motionlabs/MotionLab";
import { circularAppearance } from "#/features/circular/config";
import { useCircularMotion } from "#/hooks/use-circular-motion";
import { CircularMotionForm } from "./CircularMotionForm";
import { CircularMotionScene } from "./CircularMotionScene";

export const CircularMotionLab: FC = () => {
  const controller = useCircularMotion();
  return (
    <MotionLab
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
