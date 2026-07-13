import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'

const config = defineConfig({
  base: '/project-simple-motion-visualizer/',
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['localStorage', 'baseLocale'],
    }),
    viteReact(),
  ],
})

export default config
