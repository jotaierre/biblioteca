import { defineConfig } from 'vite'

export default defineConfig({
  // Define a base como './' para que os links funcionem no GitHub Pages (subpastas)
  base: './',

  server: {
    port: 5173,
    open: true
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Indica ao Vite que existem dois pontos de entrada (duas telas)
        main: './index.html',
        menu: './menu.html'
      }
    }
  }
})