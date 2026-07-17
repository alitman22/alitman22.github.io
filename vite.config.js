import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildVersion = `v${Date.now().toString(36)}`;

function cacheBustBuiltAssets() {
  return {
    name: 'cache-bust-built-assets',
    transformIndexHtml(html) {
      return html
        .replace(/(<script\b[^>]*\bsrc=")([^"]+)"/g, (match, prefix, src) => {
          if (/^(https?:)?\/\//i.test(src) || src.includes('data:') || src.includes('mailto:')) {
            return match;
          }

          if (src.includes('assets/')) {
            const cleanSrc = src.split('?')[0];
            return `${prefix}${cleanSrc}?${buildVersion}"`;
          }

          return match;
        })
        .replace(/(<link\b[^>]*\bhref=")([^"]+)"/g, (match, prefix, href) => {
          if (/^(https?:)?\/\//i.test(href) || href.includes('data:') || href.includes('mailto:')) {
            return match;
          }

          if (href.includes('assets/')) {
            const cleanHref = href.split('?')[0];
            return `${prefix}${cleanHref}?${buildVersion}"`;
          }

          return match;
        });
    },
  };
}

export default defineConfig({
  plugins: [react(), cacheBustBuiltAssets()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_ANALYTICS_PROXY_TARGET || 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        stats: resolve(__dirname, 'stats.html'),
      },
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});
