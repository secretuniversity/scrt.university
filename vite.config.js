import { sveltekit } from '@sveltejs/kit/vite';

const apiUrl = process.env.CELADON_URL;

if (!apiUrl) {
	throw new Error('CELADON_URL is not set');
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: apiUrl,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
};

export default config;
