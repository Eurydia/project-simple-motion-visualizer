import { RoughNotation } from 'react-rough-notation'
import type { types as RoughNotationType } from 'react-rough-notation'
import type { FC, ReactNode } from 'react'

export const NotebookAnnotation: FC<{
  children: ReactNode
  type: RoughNotationType
  color?: string
  padding?: number | [number, number] | [number, number, number, number]
  strokeWidth?: number
}> = ({ children, type, color = '#e95f62', padding = 3, strokeWidth = 2 }) => (
  <RoughNotation
    animate
    animationDuration={500}
    color={color}
    iterations={2}
    padding={padding}
    show
    strokeWidth={strokeWidth}
    type={type}
  >
    {children}
  </RoughNotation>
)
