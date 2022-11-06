import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => ({
	plugins: [
		sveltekit(),
		EnvironmentPlugin({
			PUBLIC_SECRET_NETWORK_CHAIN_ID: undefined,
			PUBLIC_SECRET_NETWORK_GRPC_URL: undefined,
			CELADON_URL: undefined
		})
	],
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
