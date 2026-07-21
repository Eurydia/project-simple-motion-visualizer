import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/mali/300.css'
import '@fontsource/mali/400.css'
import '@fontsource/mali/500.css'
import '@fontsource/mali/700.css'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { fontFamily } from '@mui/system'

export const APP_THEME = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      background: { default: '#fafafa', paper: '#ffffff' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html:lang(en-US)': {
            fontFamily: 'monospace',
          },
          'html:lang(th-TH)': {
            fontFamily: ["'Mali'", 'serif'].join(','),
          },
        },
      },
    },
  }),
)
