import { createTheme } from '@mui/material/styles'
import { APP_THEME } from './app'

export const SPRING_THEME = createTheme(APP_THEME, {
  palette: {
    primary: {
      main: '#80cbc4',
      light: '#b2dfdb',
      dark: '#004d40',
    },
  },
})
