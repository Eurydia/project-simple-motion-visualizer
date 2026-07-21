import { getLocale } from '../paraglide/runtime'

export const getLocaleFontFamily = () => {
  return getLocale() === 'en' ? 'monospace' : [`'Mali'`, 'serif'].join(',')
}
