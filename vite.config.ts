
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  plugins: [
    react({
      // Configurações otimizadas do SWC
      jsxImportSource: '@emotion/react',
      plugins: [
        // Plugin para otimização automática de imports
        ['@swc/plugin-emotion', {}]
      ]
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['lovable-tagger'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'date-fns'
    ]
  },
  build: {
    // Configurações de build otimizadas para performance
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log'] : []
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors para melhor cache
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot'],
          'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge']
        },
        // Otimizar nomes de arquivos para cache
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/\.css$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Configurações de compressão
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development'
  },
  // Cache de dependências para builds mais rápidos
  cacheDir: 'node_modules/.vite'
}));
