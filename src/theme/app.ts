import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/mali/300.css'
import '@fontsource/mali/400.css'
import '@fontsource/mali/500.css'
import '@fontsource/mali/700.css'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const APP_THEME = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      background: { default: '#fbfaf2', paper: '#fffef9' },
    },
    typography: {
      fontFamily: 'var(--app-font-family)',
      h1: { fontWeight: 700, letterSpacing: '-0.035em' },
      h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root:lang(en)': {
            '--app-font-family': ['"Roboto"', 'sans-serif'].join(','),
          },
          ':root:lang(th)': {
            '--app-font-family': ['"Mali"', 'serif'].join(','),
          },
          body: {
            minHeight: '100vh',
            backgroundColor: '#fbfaf2',
            backgroundImage: [
              'linear-gradient(rgba(93, 139, 176, 0.07) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(93, 139, 176, 0.07) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '32px 32px',
          },
          '::selection': { backgroundColor: '#ffe58f' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 700, textTransform: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(36, 66, 87, 0.2)',
            boxShadow: '3px 4px 0 rgba(36, 66, 87, 0.12)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { backgroundColor: 'rgba(255, 255, 255, 0.72)' },
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: { boxShadow: '0 0 0 3px #fffef9, 0 0 0 5px currentColor' },
        },
      },
    },
  }),
)
