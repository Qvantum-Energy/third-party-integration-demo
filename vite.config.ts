import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // DEV
      '/api': {
        target: 'https://api.qvantum.com/',
        changeOrigin: true,
      },
    },
  },
});
