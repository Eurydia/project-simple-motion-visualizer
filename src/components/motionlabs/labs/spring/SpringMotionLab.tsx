import type { FC } from "react";
import { MotionLab } from "#/components/motionlabs/MotionLab";
import { springAppearance } from "#/features/spring/config";
import { useSpringMotion } from "#/hooks/use-spring-motion";
import { SpringMotionForm } from "./SpringMotionForm";
import { SpringMotionScene } from "./SpringMotionScene";

export const SpringMotionLab: FC = () => {
  const controller = useSpringMotion();

  return (
    <MotionLab
      appearance={springAppearance}
      parameterForm={<SpringMotionForm controller={controller} />}
      visualization={
        <SpringMotionScene
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
