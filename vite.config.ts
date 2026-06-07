import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import svgr from 'vite-plugin-svgr';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    target: browserslistToEsbuild(),
  },
};
