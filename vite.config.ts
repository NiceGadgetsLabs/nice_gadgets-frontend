import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import browserslistToEsbuild from 'browserslist-to-esbuild';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    target: browserslistToEsbuild(),
  },
};
