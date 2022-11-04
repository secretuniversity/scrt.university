import { sveltekit } from '@sveltejs/kit/vite';

const target = process.env.CELADON_URL;

if (!target) {
	throw new Error('CELADON_URL is not set');
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
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
