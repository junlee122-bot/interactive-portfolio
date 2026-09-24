import { fileURLToPath, URL } from 'node:url'
import { seedDesignPlugin } from '@seed-design/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), seedDesignPlugin()],
  resolve: {
    alias: {
      'seed-design': fileURLToPath(new URL('./seed-design', import.meta.url)),
    },
  },
})
