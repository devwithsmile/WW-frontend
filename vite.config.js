import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteMinifyPlugin } from 'vite-plugin-minify'; // Correct import for ViteMinifyPlugin

export default defineConfig({
  plugins: [
    react(),
    ViteMinifyPlugin(), // No issues here, works fine
  ],
  build: {
    minify: 'esbuild', // Ensures JS and CSS are minified
  },
});