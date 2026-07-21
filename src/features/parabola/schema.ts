import { z } from 'zod'
import { m } from '../../lib/paraglide/messages.js'
import type { ParabolaFormValues, ParabolaParameterSetId } from './config'

const number = (label: string) =>
  z.number({ error: m.validation_number({ label }) })
const baseSchema = z.object({
  velocity: number(m.velocity()),
  angle: number(m.launch_angle()),
  gravity: number(m.gravity()),
  height: number(m.start_height()),
  velocityX: number(m.horizontal_velocity()),
  velocityY: number(m.vertical_velocity()),
  apexTime: number(m.time_apex()),
})

export const createParabolaSchema = (
  setId: ParabolaParameterSetId,
): z.ZodType<ParabolaFormValues, ParabolaFormValues> =>
  baseSchema.check((context) => {
    const positiveFields: readonly (keyof ParabolaFormValues)[] =
      setId === 'polar'
        ? ['velocity', 'gravity']
        : setId === 'apex'
          ? ['apexTime', 'gravity']
          : ['gravity']
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
