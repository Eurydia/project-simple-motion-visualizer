import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { FC, ReactNode } from "react";

export const ParameterFormLayout: FC<{
  selector: ReactNode;
  fields: ReactNode;
}> = ({ selector, fields }) => (
  <Card
    component="form"
    variant="outlined"
    sx={(theme) => ({
      backgroundColor: theme.alpha(theme.palette.background.paper, 0.85),
    })}
  >
    <CardContent component="section" sx={{ p: { xs: 3, md: 4 } }}>
      <Stack component="section" spacing={4}>
        {selector}
        {fields}
      </Stack>
    </CardContent>
  </Card>
);
