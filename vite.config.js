import { sveltekit } from '@sveltejs/kit/vite';
import EnvironmentPlugin from 'vite-plugin-environment';

const target = process.env.CELADON_URL;

if (!target) {
	throw new Error('CELADON_URL is not set');
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), EnvironmentPlugin('all', { loadEnvFiles: false })],
	server: {
		proxy: {
			'/api': {
				target,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
};

export default config;
