import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";
import { NotebookAnnotation } from "../ui/NotebookAnnotation";

export const BaseLayout: FC<{
  title: string;
  color: string;
  children: ReactNode;
}> = ({ title, color, children }) => {
  return (
    <>
      <Box
        component="header"
        sx={(theme) => ({
          backgroundColor: color,
          borderBottom: `${theme.spacing(0.375)} solid ${theme.alpha(theme.palette.text.primary, 0.22)}`,
          paddingY: { xs: 4, md: 5 },
          paddingX: 2,
        })}
      >
        <Container component="section" maxWidth="lg">
          <NotebookAnnotation color="#244257" padding={[2, 4]} type="underline">
            <Typography
              component="h1"
              variant="h1"
              sx={{
                textTransform: "capitalize",
                overflowWrap: "break-word",
              }}
            >
              {title}
            </Typography>
          </NotebookAnnotation>
        </Container>
      </Box>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ paddingY: { xs: 6, md: 8 } }}
      >
        {children}
      </Container>
    </>
  );
};
