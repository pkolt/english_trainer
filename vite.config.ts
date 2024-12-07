/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/english_trainer/',
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'service-worker.js',
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'English Trainer',
        short_name: 'English Trainer',
        description: 'Personal English trainer for you',
        orientation: 'portrait',
        icons: [
          { src: 'images/512.png', type: 'image/png', sizes: '512x512' },
          { src: 'images/512-maskable.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
        ],
        display: 'standalone',
        id: 'english_trainer',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    // globals: true, // Remove `cleanup()` from `setupTests.ts` if `globals: true`
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
    pool: 'threads',
    poolOptions: {
      threads: {
        useAtomics: true,
        isolate: true,
      },
    },
    // clearMocks: true,
    // restoreMocks: true,
    // mockReset: true,
    // cache: false,
    watch: false,
    update: false,
    css: false,
    coverage: {
      clean: true,
      include: ['src/**'],
      extension: ['.ts', '.tsx'],
      exclude: [
        'src/test-utils',
        'src/**/__mocks__',
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/App.tsx',
        'src/main.tsx',
        'src/router.tsx',
        'src/service-worker-register.ts',
        'src/service-worker.ts',
      ],
      provider: 'v8',
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      watermarks: {
        statements: [90, 95],
        branches: [90, 95],
        functions: [90, 95],
        lines: [90, 95],
      },
    },
  },
});
