import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const target = process.env.CELADON_URL;

	if (!target) {
		throw new Error('CELADON_URL is not set');
	}
	return defineConfig({
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
	});
};
