import { createTheme } from '@mui/material/styles'
import { APP_THEME } from './app'

export const CIRCULAR_THEME = createTheme(APP_THEME, {
  palette: {
    primary: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#880e4f',
    },
  },
})
