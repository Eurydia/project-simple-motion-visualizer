import { createFileRoute } from '@tanstack/react-router'
import { CircularMotionLab } from '../features/circular/CircularMotionLab'

export const Route = createFileRoute('/circular')({
  component: CircularMotionLab,
})
