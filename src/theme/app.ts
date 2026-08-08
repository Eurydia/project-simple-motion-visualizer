import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/mali/300.css";
import "@fontsource/mali/400.css";
import "@fontsource/mali/500.css";
import "@fontsource/mali/700.css";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const APP_THEME = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: { default: "#fbfaf2", paper: "#fffef9" },
    },
    typography: {
      fontFamily: "var(--app-font-family)",
      h1: { fontWeight: 700, letterSpacing: "-0.035em" },
      h2: { fontWeight: 700, letterSpacing: "-0.025em" },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          ":root:lang(en)": {
            "--app-font-family": ['"Roboto"', "sans-serif"].join(","),
          },
          ":root:lang(th)": {
            "--app-font-family": ['"Mali"', "serif"].join(","),
          },
          body: {
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            backgroundImage: [
              `linear-gradient(${theme.alpha(theme.palette.info.main, 0.07)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
              `linear-gradient(90deg, ${theme.alpha(theme.palette.info.main, 0.07)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
            ].join(","),
            backgroundSize: `${theme.spacing(4)} ${theme.spacing(4)}`,
          },
          "::selection": { backgroundColor: "#ffe58f" },
        }),
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 700, textTransform: "none" },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `${theme.spacing(0.125)} solid ${theme.alpha(theme.palette.text.primary, 0.2)}`,
            boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.5)} 0 ${theme.alpha(theme.palette.text.primary, 0.12)}`,
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.alpha(theme.palette.common.white, 0.72),
          }),
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: ({ theme }) => ({
            boxShadow: `0 0 0 ${theme.spacing(0.375)} ${theme.palette.background.paper}, 0 0 0 ${theme.spacing(0.625)} currentColor`,
          }),
        },
      },
      MuiStack: { defaultProps: { useFlexGap: true } },
    },
  }),
);
