import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const devPort = Number.parseInt(process.env.VERITAS_DEV_PORT || '3000', 10)
const apiProxyTarget = process.env.VERITAS_API_PROXY_TARGET || ''

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: Number.isInteger(devPort) && devPort > 0 ? devPort : 3000,
    proxy: apiProxyTarget
      ? {
          '/api': {
            target: apiProxyTarget,
            changeOrigin: true,
          },
        }
      : undefined,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Vendor: React ecosystem — cached independently from app code
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router') || id.includes('node_modules/react/')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
