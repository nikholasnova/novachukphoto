import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Optimize JPG images
      jpg: {
        quality: 82,
      },
      // Optimize PNG images
      png: {
        quality: 82,
      },
      // Enable WebP generation
      webp: {
        quality: 85,
      },
      // Cache optimized images for faster rebuilds
      cache: true,
      cacheLocation: './node_modules/.cache/vite-plugin-image-optimizer',
    }),
  ],
})
