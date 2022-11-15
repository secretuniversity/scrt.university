import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

console.log({
	config: {
		CELADON_URL: process.env.CELADON_URL,
		PUBLIC_SECRET_NETWORK_CHAIN_ID: process.env.PUBLIC_SECRET_NETWORK_CHAIN_ID,
		PUBLIC_SECRET_NETWORK_GRPC_URL: process.env.PUBLIC_SECRET_NETWORK_GRPC_URL
	}
});

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
