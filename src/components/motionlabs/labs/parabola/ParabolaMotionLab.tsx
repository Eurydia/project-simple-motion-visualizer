import type { FC } from "react";
import { MotionLab } from "#/components/motionlabs/MotionLab";
import { parabolaAppearance } from "#/features/parabola/config";
import { useParabolaMotion } from "#/hooks/use-parabola-motion";
import { ParabolaMotionForm } from "./ParabolaMotionForm";
import { ParabolaMotionScene } from "./ParabolaMotionScene";

export const ParabolaMotionLab: FC = () => {
  const controller = useParabolaMotion();
  return (
    <MotionLab
      appearance={parabolaAppearance}
      parameterForm={<ParabolaMotionForm controller={controller} />}
      visualization={
        <ParabolaMotionScene
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
