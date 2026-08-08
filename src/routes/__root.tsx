import TranslateIcon from "@mui/icons-material/Translate";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/system/ThemeProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RouterLink } from "#/components/router/RouterLink";
import { NotebookAnnotation } from "#/components/ui/NotebookAnnotation";
import { m } from "#/lib/paraglide/messages";
import { getLocale, setLocale } from "#/lib/paraglide/runtime";
import type { FileRouteTypes } from "#/routeTree.gen";
import { APP_THEME } from "#/theme/app";

const NAV_ITEMS: ReadonlyArray<
  Readonly<{ label: string; to: FileRouteTypes["to"] }>
> = [
  { label: m.nav_spring(), to: "/motionlabs/spring" },
  { label: m.nav_parabola(), to: "/motionlabs/parabola" },
  { label: m.nav_linear(), to: "/motionlabs/linear" },
  { label: m.nav_circular(), to: "/motionlabs/circular" },
];

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  document.documentElement.lang = getLocale();
  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <Container component="header" maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Paper
          component="nav"
          elevation={0}
          sx={(theme) => ({
            backgroundColor: theme.alpha(
              theme.palette.background.paper,
              0.84,
            ),
            border: `${theme.spacing(0.125)} dashed ${theme.alpha(theme.palette.text.primary, 0.36)}`,
            boxShadow: `${theme.spacing(0.25)} ${theme.spacing(0.375)} 0 ${theme.alpha(theme.palette.text.primary, 0.1)}`,
            px: { xs: 2, md: 3 },
            py: 1.25,
          })}
        >
          <Stack
            component="ul"
            divider={
              <Box component="li" sx={{ display: "flex" }}>
                <Divider flexItem orientation="vertical" />
              </Box>
            }
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "flex-end",
              alignItems: "center",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <Stack
              component="li"
              direction="row"
              spacing={2}
              sx={{ listStyle: "none" }}
            >
              <Stack
                component="ul"
                direction="row"
                spacing={2}
                sx={{
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Box component="li">
                  <NotebookAnnotation
                    color="#e95f62"
                    padding={[1, 2]}
                    type="underline"
                  >
                    <RouterLink
                      sx={{ cursor: "pointer", fontWeight: 700 }}
                      color="textPrimary"
                      to="/"
                    >
                      {m.nav_home()}
                    </RouterLink>
                  </NotebookAnnotation>
                </Box>
                {NAV_ITEMS.map(({ label, to }) => (
                  <Box component="li" key={to}>
                    <RouterLink
                      to={to}
                      color="textPrimary"
                      sx={{ cursor: "pointer" }}
                    >
                      {label}
                    </RouterLink>
                  </Box>
                ))}
              </Stack>
            </Stack>
            <Box component="li">
              <Button
                disableElevation
                disableRipple
                variant="text"
                color="inherit"
                size="large"
                startIcon={<TranslateIcon />}
                onClick={() => setLocale(getLocale() === "en" ? "th" : "en")}
              >
                {getLocale() === "en" ? m.thai() : m.english()}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
      <Outlet />
    </ThemeProvider>
  );
}
