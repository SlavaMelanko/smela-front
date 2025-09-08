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
        open: false, // we'll open it manually with npm script
        gzipSize: true,
        brotliSize: true,
        template: 'treemap'
      })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
