import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/server/index.ts'],
  clean: true,
  dts: true,
  minify: false,
  sourcemap: true,
  format: ['esm'],
  external: ['react', 'react-dom'],
})
