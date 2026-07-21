import { z } from 'zod'
import { m } from '../../lib/paraglide/messages.js'
import type { CircularFormValues, CircularParameterSetId } from './config'

const number = (label: string) =>
  z.number({ error: m.validation_number({ label }) })
const baseSchema = z.object({
  radius: number(m.radius()),
  speed: number(m.angular_velocity()),
  angle: number(m.start_angle()),
  period: number(m.orbital_period()),
  tangentialVelocity: number(m.tangential_velocity()),
})

export const createCircularSchema = (
  setId: CircularParameterSetId,
): z.ZodType<CircularFormValues, CircularFormValues> =>
  baseSchema.check((context) => {
    const positiveFields: readonly (keyof CircularFormValues)[] =
      setId === 'period' ? ['radius', 'period'] : ['radius']
    for (const field of positiveFields) {
      if (context.value[field] <= 0) {
        context.issues.push({
          code: 'custom',
          input: context.value[field],
          path: [field],
          message: m.validation_positive({ label: field }),
        })
      }
    }
  })
