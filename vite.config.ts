import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno, transformerVariantGroup } from 'unocss'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: { display: 'inline-block'}
        })
      ],
      transformers: [
        transformerVariantGroup()
      ]
    })
  ],
})
