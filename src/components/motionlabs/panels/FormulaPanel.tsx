import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import type { MotionAppearance } from "#/types/motion";
import { MathText } from "../ui/MathText";

export const FormulaPanel: FC<{ appearance: MotionAppearance }> = ({
  appearance,
}) => (
  <Card
    component="aside"
    elevation={0}
    sx={(t) => ({
      backgroundColor: t.palette.primary.light,
      color: t.palette.primary.dark,
    })}
  >
    <CardContent
      component="figure"
      sx={{ padding: 3, textAlign: "center", margin: 0 }}
    >
      <Typography component="p" variant="h5" sx={{ fontWeight: 700 }}>
        <MathText math={appearance.formula} display />
      </Typography>
    </CardContent>
  </Card>
);
