import { codecovVitePlugin } from '@codecov/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE &&
      visualizer({
        filename: 'dist/stats.html',
        open: false, // we're opening it with npm script
        gzipSize: true,
        brotliSize: true,
        template: 'treemap'
      }),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'smela-front',
      uploadToken: process.env.CODECOV_TOKEN
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      $: path.resolve(__dirname, 'public')
    }
  }
})
