import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
