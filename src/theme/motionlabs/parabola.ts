import { createTheme } from '@mui/material/styles'
import { APP_THEME } from '../app'

export const PARABOLA_THEME = createTheme(APP_THEME, {
  palette: {
    primary: {
      main: '#ffcc80',
      light: '#ffe0b2',
      dark: '#7c2d12',
    },
  },
})
