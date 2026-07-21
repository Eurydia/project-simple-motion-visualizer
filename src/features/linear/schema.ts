import { z } from 'zod'
import { m } from '../../lib/paraglide/messages.js'
import type { LinearFormValues, LinearParameterSetId } from './config'

const number = (label: string) =>
  z.number({ error: m.validation_number({ label }) })
const baseSchema = z.object({
  position: number(m.start_position()),
  velocity: number(m.velocity()),
  endPosition: number(m.end_position()),
  travelTime: number(m.travel_time()),
})

export const createLinearSchema = (
  setId: LinearParameterSetId,
): z.ZodType<LinearFormValues, LinearFormValues> =>
  baseSchema.check((context) => {
    if (setId === 'endpoints' && context.value.travelTime <= 0) {
      context.issues.push({
        code: 'custom',
        input: context.value.travelTime,
        path: ['travelTime'],
        message: m.validation_positive({ label: m.travel_time() }),
      })
    }
  })
