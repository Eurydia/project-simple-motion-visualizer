import katex from 'katex'
import type { FC } from 'react'
import 'katex/dist/katex.min.css'

export const MathText: FC<{
  math: string
  display?: boolean
}> = ({ math, display = false }) => {
  return (
    <span
      className={display ? 'math-text math-text--display' : 'math-text'}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          output: 'html',
        }),
      }}
    />
  )
}
