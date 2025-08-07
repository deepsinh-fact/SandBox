import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'layouts': path.resolve(__dirname, './src/layouts'),
      'views': path.resolve(__dirname, './src/views'),
      'Store': path.resolve(__dirname, './src/Store'),
      'Service': path.resolve(__dirname, './src/Service'),
    }
  }
})