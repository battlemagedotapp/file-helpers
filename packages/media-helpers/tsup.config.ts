import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/image/index.ts', 'src/audio/index.ts'],
  clean: true,
  dts: true,
  minify: false,
  sourcemap: true,
  format: ['esm'],
  external: [
    'react',
    'react-dom',
    'lucide-react',
    'react-hook-form',
    '@radix-ui/react-slot',
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-dialog',
    '@radix-ui/react-slider',
    'sonner',
  ],
})
