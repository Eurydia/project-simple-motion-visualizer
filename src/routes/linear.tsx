import { createFileRoute } from '@tanstack/react-router'
import { LinearMotionLab } from '../features/linear/LinearMotionLab'

export const Route = createFileRoute('/linear')({ component: LinearMotionLab })
