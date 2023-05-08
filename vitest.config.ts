import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['**/__tests__/*.spec.{ts,js}'],
    globals: true,
    root: __dirname,
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})