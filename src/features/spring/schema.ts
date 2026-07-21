import { z } from 'zod'
import { m } from '../../lib/paraglide/messages.js'
import type { SpringFormValues, SpringParameterSetId } from './config'

const number = (label: string) =>
  z.number({ error: m.validation_number({ label }) })

const baseSchema = z.object({
  amplitude: number(m.amplitude()),
  stiffness: number(m.stiffness()),
  damping: number(m.damping()),
  mass: number(m.mass()),
  omega: number(m.angular_frequency()),
  period: number(m.period()),
})

export const createSpringSchema = (
  setId: SpringParameterSetId,
): z.ZodType<SpringFormValues, SpringFormValues> =>
  baseSchema.check((context) => {
    const positiveFields: readonly (keyof SpringFormValues)[] =
      setId === 'physical'
        ? ['amplitude', 'stiffness', 'mass']
        : setId === 'frequency'
          ? ['amplitude', 'omega']
          : ['amplitude', 'period']
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
    if (context.value.damping < 0) {
      context.issues.push({
        code: 'custom',
        input: context.value.damping,
        path: ['damping'],
        message: m.validation_nonnegative({ label: m.damping() }),
      })
    }
  })
