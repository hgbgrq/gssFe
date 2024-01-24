// src/main.ts
import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import type { UserModule } from '~/types'
import 'element-plus/dist/index.css'

const routes = setupLayouts(generatedRoutes)

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes, base: import.meta.env.BASE_URL },
  // function to have custom setups
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true,
      }),
    ).forEach(i => i.install?.(ctx))
  },
)
