import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Shiki from 'markdown-it-shiki'
import Inspect from 'vite-plugin-inspect'

// // Elements Plus auto import 사용을 위해 추가
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  /**
   * 빌드 시 해당 내용은 빌드에서 제외 됩니다.
   * 로컬 환경에서 개발 진행 시, 사용하는 접속 정보 입니다.
   */
  server: {
    host: true, // Host be set to true to use the network form to access project with ip
    port: 3333, // port number
    open: true, // Open browser automatically
    cors: true, // cross-domain setting permission
    strictPort: true, // If the port is occupied, exit directly
    proxy: {
      '/api': {
        // target: 'http://hgbgrq.iptime.org:9000',
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    },
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
      ],
      extensions: ['vue', 'md'],
    }),
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport ({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true,
      // resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
    Inspect(),
  ],
  // SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/_variables.scss";
        @import "./src/styles/_mixins.scss";
      `,
      },
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', /vue-i18n/, /element-plus/],
  },

  build: {
    commonjsOptions: {
      include: /node_modules/,
    },
  },
})
