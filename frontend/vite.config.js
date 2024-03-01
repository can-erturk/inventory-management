import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@redux': path.resolve(__dirname, 'src/lib/stores/redux'),
      '@zustand': path.resolve(__dirname, 'src/lib/stores/zustand'),
    },
  },
})
