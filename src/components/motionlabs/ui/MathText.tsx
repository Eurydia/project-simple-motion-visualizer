import Box from "@mui/material/Box";
import katex from "katex";
import type { FC } from "react";

export const MathText: FC<{
  math: string;
  display?: boolean;
}> = ({ math, display }) => {
  return (
    <Box
      component="var"
      sx={{ display: display ? "block" : "inline", fontStyle: "normal" }}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          output: "html",
        }),
      }}
    />
  );
};
