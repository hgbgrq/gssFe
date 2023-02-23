import { fileURLToPath, URL } from 'node:url'
import Pages from 'vite-plugin-pages'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/api' :{
        target:'http://localhost:8080/',
        changeOrigin: true,
      }
    }    
  }

  // https://github.com/hannoeru/vite-plugin-pages
  Pages({

  })

})
