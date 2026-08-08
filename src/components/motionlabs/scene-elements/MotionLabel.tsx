import type { FC } from "react";

export const MotionLabel: FC<{
  x: number;
  y: number;
  text: string;
  centered?: boolean;
}> = ({ x, y, text, centered = false }) => (
  <text
    x={x}
    y={y}
    fill="#455a64"
    fontFamily="monospace"
    fontSize="12"
    textAnchor={centered ? "middle" : "start"}
  >
    {text}
  </text>
);
