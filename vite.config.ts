import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'

// Vite's SPA fallback redirects unknown routes to /index.html. The Decap
// CMS lives at /admin/index.html (a separate static doc), so we rewrite
// `/admin` and `/admin/` to that file in dev. Production (Vercel static
// hosting) serves it automatically.
function adminIndexFallback(): Plugin {
  return {
    name: 'admin-index-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? ''
        const path = url.split('?')[0]
        if (path === '/admin' || path === '/admin/') {
          const qs = url.includes('?') ? url.slice(url.indexOf('?')) : ''
          req.url = '/admin/index.html' + qs
        }
        next()
      })
    },
  }
}

export default defineConfig({
  server: {
    port: 4001,
    strictPort: true,
  },
  preview: {
    port: 4001,
    strictPort: true,
  },
  plugins: [
    { enforce: 'pre', ...mdx({ jsxImportSource: 'react' }) },
    react(),
    tailwindcss(),
    adminIndexFallback(),
  ],
})
