import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://medium.com/@fael-atom/struggling-with-vite-and-mui-42f3f5e0658d
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
})