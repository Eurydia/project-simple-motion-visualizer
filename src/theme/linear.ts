import { createTheme } from '@mui/material/styles'
import { APP_THEME } from './app'

export const LINEAR_THEME = createTheme(APP_THEME, {
  palette: {
    primary: {
      main: '#9fa8da',
      light: '#c5cae9',
      dark: '#283593',
    },
  },
})
