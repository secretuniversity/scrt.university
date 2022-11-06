import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => ({
	plugins: [sveltekit(), EnvironmentPlugin({ CELADON_URL: undefined }, { loadEnvFiles: false })],
	server: {
		proxy: {
			'/api': {
				target: process.env.CELADON_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
}));
