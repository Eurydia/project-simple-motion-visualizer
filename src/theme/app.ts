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
      background: { default: '#fafafa', paper: '#ffffff' },
    },
    typography: {
      fontFamily: 'var(--app-font-family)',
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root:lang(en)': {
            '--app-font-family': ['"Roboto"', 'sans-serif'].join(','),
          },

          ':root:lang(th)': {
            '--app-font-family': ['"Mali"', 'serif'].join(','),
          },
        },
      },
    },
  }),
)
