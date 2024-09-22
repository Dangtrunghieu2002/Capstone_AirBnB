import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // This sets up the '@' alias for the 'src' directory
      'components': path.resolve(__dirname, './src/components'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'pages': path.resolve(__dirname, './src/pages'),
      'templates': path.resolve(__dirname, './src/templates'),
    },
  },
});
