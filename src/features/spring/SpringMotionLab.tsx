import type { FC } from "react";
import { MotionLabLayout } from "../../components/layout/MotionLabLayout";
import { SpringMotionScene } from "../../components/motionlabs/scenes/SpringMotionScene";
import { useSpringMotion } from "../../hooks/use-spring-motion";
import { springAppearance } from "./config";
import { SpringMotionForm } from "./SpringMotionForm";

export const SpringMotionLab: FC = () => {
  const controller = useSpringMotion();

  return (
    <MotionLabLayout
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
