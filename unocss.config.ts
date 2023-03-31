import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center'],
    ['flex-between', 'flex justify-between'],
  ],
  rules: [
    // primary color
    ['text-primary', { color: '#5bb870' }],
    // dark color
    ['text-dark-1', { color: '#222222' }],
    ['text-dark-2', { color: '#333333' }],
    ['text-dark-3', { color: '#666666' }],
    ['text-dark-4', { color: '#777777' }],
    ['text-dark-5', { color: '#888888' }],
    ['text-dark-6', { color: '#909090' }],
    ['text-dark-7', { color: '#999999' }],
    // light color
    ['text-light-1', { color: '#fafafa' }],
    ['text-light-2', { color: '#f8f9fb' }],
    ['text-light-3', { color: '#f0f0f0' }],
    ['text-light-4', { color: '#ebebeb' }],
    ['text-light-5', { color: '#e5e5e5' }],
    ['text-light-6', { color: '#d6dbe4' }],
    ['text-light-7', { color: '#cccccc' }],
    // other color
    ['text-white', { color: '#ffffff' }],
    ['text-red', { color: '#e76055' }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
