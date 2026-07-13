import { createFileRoute } from '@tanstack/react-router'
import { ParabolaMotionLab } from '../features/parabola/ParabolaMotionLab'

export const Route = createFileRoute('/parabola')({
  component: ParabolaMotionLab,
})
